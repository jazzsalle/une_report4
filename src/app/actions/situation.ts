"use server";
import { eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDb, schema } from "@/lib/db";
import { canEdit, requireUser } from "@/lib/auth/session";
import { addEvent, getContactsBundle, getSituation, listDispatches, listEvents } from "@/lib/data";
import { getWeatherSnapshot } from "@/lib/weather/kma";
import { ORG_SIDO, orgForSituation } from "@/lib/regions";
import { sopActions, T3Q_FAILED } from "@/lib/t3q/client";
import { buildContext, responseToSop } from "@/lib/sop/convert";
import { recipientIds } from "@/lib/sop/recipients";
import { orderMissions, patchMission, patchSopHead, putMission, removeMission } from "@/lib/sop/store";
import { composeReport } from "@/lib/report/compose";
import { snapshotOf } from "@/lib/report/snapshot";
import { progress } from "@/lib/sop/kind";
import { ensureExampleContacts } from "@/lib/contacts-seed";
import { getTutorialSeed, tutorialWeather } from "@/lib/tutorial";
import { WEATHER_SLOTS, type WeatherSlot } from "@/lib/report/weather";
import { fromLocalInput } from "@/lib/format";
import type { Mission, Sop, WeatherImage } from "@/lib/types";

async function editable(id: string) {
  const u = await requireUser();
  const s = await getSituation(u, id);
  if (!s) throw new Error("상황을 찾을 수 없습니다.");
  if (!canEdit(u, s)) throw new Error("편집 권한이 없습니다.");
  return { u, s };
}

async function touch(id: string, patch: Partial<typeof schema.situations.$inferInsert> = {}) {
  const db = await getDb();
  await db
    .update(schema.situations)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(schema.situations.id, id));
}

export interface SituationInput {
  title: string;
  kind: "real" | "drill";
  hazard: string;
  alertLevel: string;
  /** 대응단계 (징후감지/초기대응/비상대응/수습복구) */
  step: string;
  /** 발생 시도 */
  sido: string;
  areas: string[];
  /** 담당부서 — 매뉴얼에서 이 부서의 행만 뽑는다 */
  dept: string;
  periodStart: string; // datetime-local
  periodEnd: string | null;
  currentStatus: string;
}

function validate(v: SituationInput) {
  if (!v.title.trim()) return "상황 제목을 입력하세요.";
  if (!v.hazard) return "재난유형을 선택하세요.";
  if (!v.alertLevel) return "위기경보 수준을 선택하세요.";
  if (!v.step) return "대응단계를 선택하세요.";
  if (!v.sido) return "발생 시도를 선택하세요.";
  if (!v.dept?.trim()) return "담당부서를 입력하세요.";
  if (!v.periodStart) return "시작 일시를 입력하세요.";
  return null;
}

/** 새 상황 → 기상특보 저장 → (선택) SOP 생성까지 한 번에 */
export async function createSituation(
  v: SituationInput,
  generate: boolean,
  opts: { tutorial?: boolean } = {},
): Promise<{ error?: string }> {
  const u = await requireUser();
  const err = validate(v);
  if (err) return { error: err };
  const db = await getDb();
  // 따라하기: 시드 기상특보 (기상청 조회 없음)
  const weather = opts.tutorial ? tutorialWeather(await getTutorialSeed()) : await getWeatherSnapshot(v.sido);
  const id = nanoid(10);
  const row = {
    id,
    orgId: orgForSituation(u.orgId, v.sido),
    ownerId: u.id,
    title: v.title.trim(),
    kind: v.kind,
    hazard: v.hazard,
    alertLevel: v.alertLevel,
    responseStep: v.step,
    sido: v.sido,
    areas: v.areas,
    dept: v.dept.trim(),
    periodStart: new Date(fromLocalInput(v.periodStart)),
    periodEnd: v.periodEnd ? new Date(fromLocalInput(v.periodEnd)) : null,
    currentStatus: v.currentStatus,
    weather,
    tutorial: !!opts.tutorial,
    status: "setup",
  };
  // SOP를 먼저 만든다 — T3Q 호출이 실패하면 상황도 만들지 않고 오류를 보여 준다
  const sop = generate ? await buildSop(row) : null;
  if (typeof sop === "string") return { error: sop };
  await db.insert(schema.situations).values(row);
  await addEvent(id, { type: "start", title: "상황 등록", body: `${v.hazard} · 위기경보 ${v.alertLevel} · ${v.step}`, userName: u.name });
  await addEvent(id, {
    type: "weather",
    title: "기상특보 확인",
    body: weather.active.length ? weather.active.map((a) => a.name).join(", ") : "발효 중인 특보 없음",
    userName: u.name,
  });
  if (sop) await saveSop(id, row.orgId, sop, u.name);
  // SOP 생성하기 → 만든 SOP 바로 보기, 저장만 → 홈 상황 목록
  redirect(generate ? `/s/${id}/sop` : "/");
}

export async function updateSituation(id: string, v: SituationInput): Promise<{ error?: string }> {
  const { u, s } = await editable(id);
  // 상황 정보는 SOP 추출 기준 — SOP를 한 번 만들면 조회만
  if (s.sop) return { error: "SOP를 만든 뒤에는 상황 정보를 바꿀 수 없습니다." };
  const err = validate(v);
  if (err) return { error: err };
  const levelChanged = s.alertLevel !== v.alertLevel;
  const stepChanged = s.responseStep !== v.step;
  const deptChanged = s.dept !== v.dept.trim();
  // 발생 시도가 바뀌면 그 시도의 기상특보를 다시 가져온다
  const sidoChanged = (s.sido || "") !== v.sido;
  const weather = !sidoChanged ? undefined : s.tutorial ? tutorialWeather(await getTutorialSeed()) : await getWeatherSnapshot(v.sido);
  await touch(id, {
    title: v.title.trim(),
    kind: v.kind,
    hazard: v.hazard,
    alertLevel: v.alertLevel,
    responseStep: v.step,
    sido: v.sido,
    areas: v.areas,
    dept: v.dept.trim(),
    periodStart: new Date(fromLocalInput(v.periodStart)),
    periodEnd: v.periodEnd ? new Date(fromLocalInput(v.periodEnd)) : null,
    currentStatus: v.currentStatus,
    ...(weather ? { weather } : {}),
  });
  if (weather) {
    await addEvent(id, {
      type: "weather",
      title: `기상특보 갱신 (${v.sido})`,
      body: weather.active.length ? weather.active.map((a) => a.name).join(", ") : "발효 중인 특보 없음",
      userName: u.name,
    });
  }
  if (levelChanged) {
    await addEvent(id, { type: "change", title: "위기경보 변경", body: `${s.alertLevel} → ${v.alertLevel}`, userName: u.name });
  }
  if (stepChanged) {
    await addEvent(id, { type: "change", title: "대응단계 변경", body: `${s.responseStep} → ${v.step}`, userName: u.name });
  }
  if (deptChanged) {
    await addEvent(id, { type: "change", title: "담당부서 변경", body: `${s.dept} → ${v.dept.trim()}`, userName: u.name });
  }
  revalidatePath(`/s/${id}`, "layout");
  return {};
}

export async function refreshWeather(id: string) {
  const { u, s } = await editable(id);
  const weather = s.tutorial ? tutorialWeather(await getTutorialSeed()) : await getWeatherSnapshot(s.sido || ORG_SIDO[s.orgId] || "부산광역시");
  await touch(id, { weather });
  await addEvent(id, {
    type: "weather",
    title: "기상특보 갱신",
    body: weather.active.length ? weather.active.map((a) => a.name).join(", ") : "발효 중인 특보 없음",
    userName: u.name,
  });
  revalidatePath(`/s/${id}`, "layout");
}

/** T3Q(모의 모드·따라하기는 매뉴얼 시드)로 SOP를 만든다. 실패하면 화면에 보일 오류 문구 */
async function buildSop(s: Parameters<typeof buildContext>[0] & { tutorial: boolean }): Promise<Sop | string> {
  try {
    return responseToSop(await sopActions({ context: buildContext(s), filter: { maxActions: 40 } }, { seedOnly: s.tutorial }));
  } catch (e) {
    console.error("[sop] generation failed", e);
    return e instanceof Error && e.message === T3Q_FAILED ? T3Q_FAILED : "SOP를 만들지 못했습니다. 잠시 후 다시 시도하세요.";
  }
}

async function saveSop(id: string, orgId: string, sop: Sop, userName: string) {
  await touch(id, { sop, status: "sop" });
  // 기본 세팅: 기관 연락망이 비어 있으면 예시 조직(자연재난과)을 넣어 상황전파 대상을 바로 고를 수 있게 한다
  if (await ensureExampleContacts(orgId)) {
    await addEvent(id, { type: "sop", title: "연락망 기본 세팅", body: "예시 조직(자연재난과·유관기관 등 11명)을 넣었습니다. 연락망에서 실제 담당자로 고쳐 쓰세요.", userName });
  }
  await addEvent(id, {
    type: "sop",
    title: "SOP 생성",
    body: `임무 ${sop.missions.length}건 (${sop.source === "t3q" ? "AI" : "기본 SOP"})`,
    userName,
  });
}

export async function generateSop(id: string): Promise<{ error?: string }> {
  const { u, s } = await editable(id);
  if (s.sop?.startedAt) return { error: "실행 중인 SOP는 다시 생성할 수 없습니다." };
  const sop = await buildSop(s);
  if (typeof sop === "string") return { error: sop };
  await saveSop(id, s.orgId, sop, u.name);
  revalidatePath(`/s/${id}`, "layout");
  return {};
}

export async function startSop(id: string) {
  const { u, s } = await editable(id);
  if (!s.sop) throw new Error("SOP가 없습니다.");
  await patchSopHead(id, { startedAt: new Date().toISOString(), endedAt: null });
  await touch(id, { status: "running" });
  await addEvent(id, { type: "sop", title: "SOP 실행 시작", body: `임무 ${s.sop.missions.length}건`, userName: u.name });
  revalidatePath(`/s/${id}`, "layout");
}

export async function endSop(id: string) {
  const { u, s } = await editable(id);
  if (!s.sop) throw new Error("SOP가 없습니다.");
  const { done, total } = progress(s.sop.missions);
  const now = new Date().toISOString();
  await patchSopHead(id, { endedAt: now, ...(s.sop.firstEndedAt ? {} : { firstEndedAt: now }) });
  await touch(id, { status: "done" });
  await addEvent(id, {
    type: "sop",
    title: "SOP 실행 종료",
    body: `완료 ${done} / 전체 ${total}`,
    userName: u.name,
  });
  revalidatePath(`/s/${id}`, "layout");
}

export async function reopenSop(id: string) {
  const { u, s } = await editable(id);
  if (!s.sop) return;
  await patchSopHead(id, { endedAt: null });
  await touch(id, { status: "running" });
  await addEvent(id, { type: "sop", title: "SOP 실행 재개", userName: u.name });
  revalidatePath(`/s/${id}`, "layout");
}

const STATUS_TEXT: Record<Mission["status"], string> = { todo: "대기", doing: "착수", done: "완료", skipped: "생략" };

/** 실행을 한 번 종료하면 실행 재개 뒤에도 SOP 편집(임무 추가·삭제·순서) 불가 (P-04). 임무 상세 기록은 종료 후에도 가능 */
const ENDED_EDIT = "SOP 실행을 한 번 종료한 뒤에는 SOP를 편집할 수 없습니다.";
const frozen = (sop: Sop) => !!(sop.endedAt || sop.firstEndedAt);

/** 실행 중 임무 저장 + 상태 변화는 이력으로 기록 */
export async function saveMission(id: string, mission: Mission) {
  const { u, s } = await editable(id);
  if (!s.sop) throw new Error("SOP가 없습니다.");
  const prev = s.sop.missions.find((m) => m.id === mission.id);
  if (!prev && frozen(s.sop)) throw new Error(ENDED_EDIT);
  await putMission(id, mission);
  if (s.sop.startedAt && prev && prev.status !== mission.status) {
    await addEvent(id, {
      type: "mission",
      title: `${mission.title} ${STATUS_TEXT[mission.status]}`,
      body: mission.status === "done" ? mission.result : "",
      missionId: mission.id,
      userName: u.name,
      meta: { status: mission.status },
    });
  }
  if (s.sop.startedAt && !prev) {
    await addEvent(id, { type: "mission", title: `임무 추가: ${mission.title}`, missionId: mission.id, userName: u.name });
  }
  return { ok: true };
}

export async function deleteMission(id: string, missionId: string) {
  const { s } = await editable(id);
  if (!s.sop) return;
  if (frozen(s.sop)) throw new Error(ENDED_EDIT);
  await removeMission(id, missionId);
}

export async function reorderMissions(id: string, ids: string[]) {
  const { s } = await editable(id);
  if (!s.sop) return;
  if (frozen(s.sop)) throw new Error(ENDED_EDIT);
  await orderMissions(id, ids);
}

/** 상황전파 (모의 발송 — 실제 발송 모듈 연계 전) */
export interface DispatchLink {
  id: string;
  token: string;
  name: string;
  unit: string;
  phone: string;
}

/**
 * 상황전파 발송 — 수신자별 현장 응답 링크(토큰)를 만들고 발송 이력을 남긴다.
 * 실제 SMS·메일 발송은 UNE 발송 모듈 연계 시 이 함수에서 호출한다 (현재 모의 발송).
 */
/** 발송 방법 (P-20) — 문자·이메일 중 하나 이상 */
export type Channel = "SMS" | "EMAIL";
const CHANNEL_LABEL: Record<Channel, string> = { SMS: "문자", EMAIL: "이메일" };

export async function propagate(id: string, missionId: string, message: string, channels?: Channel[]) {
  const { u, s } = await editable(id);
  if (!s.sop) throw new Error("SOP가 없습니다.");
  // SOP 수정은 실행 전·중·종료 후 언제나 가능, 전파만 실행 중에
  if (!s.sop.startedAt || s.sop.endedAt) throw new Error("전파는 SOP 실행 중에 보낼 수 있습니다.");
  const mission = s.sop.missions.find((m) => m.id === missionId);
  if (!mission) throw new Error("임무를 찾을 수 없습니다.");
  const bundle = await getContactsBundle(orgForSituation(s.orgId, s.sido));
  const ids = recipientIds(bundle, mission.propagation);
  const unitName = new Map(bundle.units.map((x) => [x.id, x.name]));
  const ways = (channels?.length ? channels : [mission.propagation.channel]).filter((c): c is Channel => c === "SMS" || c === "EMAIL");
  if (!ways.length) throw new Error("발송 방법을 고르세요.");
  // 고른 방법의 연락처가 없는 사람은 그 방법으로 보내지 않는다 — 어느 방법도 없으면 빼고 보낸다
  const reach = (c: { phone: string; email: string }) =>
    ways.filter((w) => (w === "SMS" ? !!c.phone : !!c.email));
  const people = bundle.contacts.filter((c) => ids.has(c.id) && reach(c).length);
  if (!people.length) throw new Error("고른 발송 방법으로 연락할 수 있는 대상이 없습니다.");

  const db = await getDb();
  const sentAt = new Date();
  const rows = people.map((c) => ({
    id: nanoid(10),
    token: nanoid(22),
    situationId: id,
    missionId,
    contactId: c.id,
    name: c.name,
    unit: unitName.get(c.unitId) ?? "",
    phone: c.phone,
    email: c.email,
    channel: reach(c).join("+"),
    message,
    sentAt,
  }));
  await db.insert(schema.dispatches).values(rows);

  const recipients = rows.map((r) => `${r.name}(${r.unit})`);
  const sentMission = { ...mission, propagation: { ...mission.propagation, message, sentAt: sentAt.toISOString(), sentTo: recipients } };
  await patchMission(id, missionId, { propagation: sentMission.propagation });
  await addEvent(id, {
    type: "propagate",
    title: `상황전파: ${mission.title}`,
    body: `${message}
→ ${rows.length}명 (${ways.map((w) => CHANNEL_LABEL[w]).join("·")})`,
    missionId,
    userName: u.name,
    meta: { recipients, channel: ways.join("+") },
  });
  revalidatePath(`/s/${id}/sop`);
  return {
    mission: sentMission,
    links: rows.map((r) => ({ id: r.id, token: r.token, name: r.name, unit: r.unit, phone: r.phone })) as DispatchLink[],
  };
}

/** 현장 조치사항 확인 → 현장 화면에 「상황실 확인 완료」 표시, 상황일지 반영 대상 */
export async function ackDispatch(id: string, dispatchId: string) {
  const { u } = await editable(id);
  const db = await getDb();
  const [d] = await db.select().from(schema.dispatches).where(eq(schema.dispatches.id, dispatchId)).limit(1);
  if (!d || d.situationId !== id) throw new Error("응답을 찾을 수 없습니다.");
  await db.update(schema.dispatches).set({ ackAt: new Date(), ackBy: u.name }).where(eq(schema.dispatches.id, dispatchId));
  await addEvent(id, {
    type: "response",
    title: `현장 응답 확인: ${d.name}`,
    body: d.note || (d.doneAt ? "임무완료" : "수신확인"),
    missionId: d.missionId,
    userName: u.name,
    meta: { dispatchId, kind: "ack" },
  });
  revalidatePath(`/s/${id}/sop`);
}

/** 사용자 상황 기록 (피해·대피·통제·자원투입·응급복구·상황) */
export async function addRecord(id: string, kind: string, text: string, at?: string) {
  const { u } = await editable(id);
  if (!text.trim()) return;
  await addEvent(id, {
    type: "record",
    title: kind,
    body: text.trim(),
    userName: u.name,
    meta: { kind },
    at: at ? new Date(fromLocalInput(at)) : new Date(),
  });
  await touch(id);
  revalidatePath(`/s/${id}`, "layout");
}

export async function deleteRecord(id: string, eventId: string) {
  await editable(id);
  const db = await getDb();
  await db.delete(schema.events).where(eq(schema.events.id, eventId));
  revalidatePath(`/s/${id}`, "layout");
}

/** 상황일지 생성 — 입력·실행이력으로 자동 구성 */
export async function createReport(id: string) {
  const { u, s } = await editable(id);
  const db = await getDb();
  const [org] = await db.select().from(schema.orgs).where(eq(schema.orgs.id, s.orgId)).limit(1);
  const events = await listEvents(id);
  const content = {
    ...composeReport({
      situation: s,
      events,
      dispatches: await listDispatches(id),
      reporter: u.name,
      dept: u.dept,
      orgName: org?.name ?? "",
    }),
    // 만들 당시 단계 (R-06) — 같은 이름의 상황일지를 목록에서 구분
    snapshot: snapshotOf(s),
  };
  const rid = nanoid(10);
  await db.insert(schema.reports).values({
    id: rid,
    situationId: id,
    orgId: s.orgId,
    ownerId: u.id,
    title: content.title,
    content,
  });
  await addEvent(id, { type: "report", title: "상황일지 작성", userName: u.name });
  redirect(`/reports/${rid}`);
}

/** 상황 이름 바꾸기 (홈 목록) */
export async function renameSituation(id: string, title: string): Promise<{ error?: string }> {
  const { u, s } = await editable(id);
  const t = title.trim();
  if (!t) return { error: "상황 제목을 입력하세요." };
  if (t === s.title) return {};
  await touch(id, { title: t });
  await addEvent(id, { type: "change", title: "상황 제목 변경", body: `${s.title} → ${t}`, userName: u.name });
  revalidatePath("/");
  return {};
}

/**
 * 상황 복사 (홈 목록) — 상황정보·기상특보·SOP·수행 이력·상황전파·현장 응답·상황일지(한글 저장본 포함)를 통째로 복사한다.
 * 기상 그림·한글 파일이 커서 서버로 옮기지 않고 DB 안에서 한 문장으로 복사한다(한 문장이라 중간에 실패해도 반쪽 사본이 남지 않는다).
 * 현장 응답 링크(토큰)는 새로 만들어 원본 링크로 사본이 바뀌지 않게 하고, 예시·따라하기 표시는 떼어 낸다.
 * 상황일지 제목이 원래 상황 제목으로 시작하면 그 부분을 새 제목으로 바꾼다.
 */
export async function copySituation(id: string, title: string): Promise<{ error?: string }> {
  const u = await requireUser();
  const s = await getSituation(u, id);
  if (!s) return { error: "상황을 찾을 수 없습니다." };
  const t = title.trim();
  if (!t) return { error: "상황 제목을 입력하세요." };
  const nid = nanoid(10);
  const newId = sql`${nid}::text || '-' || id`;
  const renamed = (col: ReturnType<typeof sql>) =>
    sql`case when left(${col}, length(${s.title}::text)) = ${s.title}::text then ${t}::text || substr(${col}, length(${s.title}::text) + 1) else ${col} end`;
  const db = await getDb();
  await db.execute(sql`
    with
    sit as (
      insert into situations (id, org_id, owner_id, title, kind, hazard, alert_level, response_step, sido, areas, dept,
        tutorial, locked, period_start, period_end, current_status, weather, weather_images, sop, status, created_at, updated_at)
      select ${nid}::text, org_id, ${u.id}::text, ${t}::text, kind, hazard, alert_level, response_step, sido, areas, dept,
        false, false, period_start, period_end, current_status, weather, weather_images, sop, status, now(), now()
      from situations where id = ${id}
    ),
    dis as (
      insert into dispatches (id, token, situation_id, mission_id, contact_id, name, unit, phone, email, channel, message,
        sent_at, read_at, done_at, note, note_at, ack_at, ack_by)
      select ${newId}, replace(gen_random_uuid()::text, '-', ''), ${nid}::text, mission_id, contact_id, name, unit, phone, email, channel, message,
        sent_at, read_at, done_at, note, note_at, ack_at, ack_by
      from dispatches where situation_id = ${id}
    ),
    evt as (
      insert into events (id, situation_id, at, type, title, body, mission_id, user_name, meta)
      select ${newId}, ${nid}::text, at, type, title, body, mission_id, user_name,
        case when meta->>'dispatchId' is not null
          then jsonb_set(meta, '{dispatchId}', to_jsonb(${nid}::text || '-' || (meta->>'dispatchId'))) else meta end
      from events where situation_id = ${id}
    ),
    rep as (
      insert into reports (id, situation_id, org_id, owner_id, title, content, hwpx_data, hwpx_saved_at, status, locked, created_at, updated_at)
      select ${newId}, ${nid}::text, org_id, ${u.id}::text, ${renamed(sql`title`)},
        case when content->>'title' is null then content
          else jsonb_set(content, '{title}', to_jsonb(${renamed(sql`(content->>'title')`)})) end,
        hwpx_data, hwpx_saved_at, status, false, now(), now()
      from reports where situation_id = ${id} and deleted_at is null
    )
    insert into events (id, situation_id, type, title, body, user_name)
    values (${nanoid(12)}, ${nid}, 'start', '문서 복사', ${`원본: ${s.title}`}, ${u.name})
  `);
  revalidatePath("/");
  return {};
}

export async function trashSituation(id: string) {
  const { s } = await editable(id);
  if (s.locked) throw new Error("예시 문서는 지울 수 없습니다.");
  await touch(id, { deletedAt: new Date() });
  revalidatePath("/");
  redirect("/");
}

/** 기상특보 보고 그림 저장 (기상특보 현황 / 레이더 영상 / 위성영상). img=null 이면 삭제 */
export async function saveWeatherImage(id: string, which: WeatherSlot, img: WeatherImage | null) {
  if (!WEATHER_SLOTS.some((x) => x.key === which)) throw new Error("그림 칸이 올바르지 않습니다.");
  const { u, s } = await editable(id);
  if (img && img.src.length > 3_000_000) throw new Error("그림이 너무 큽니다.");
  if (img && !/^data:image\/(jpeg|png);base64,/.test(img.src)) throw new Error("그림 형식이 올바르지 않습니다.");
  const next = { ...(s.weatherImages ?? {}) };
  if (img) next[which] = img;
  else delete next[which];
  await touch(id, { weatherImages: next });
  if (img) {
    await addEvent(id, {
      type: "weather",
      title: `${WEATHER_SLOTS.find((x) => x.key === which)!.label} 그림 첨부`,
      userName: u.name,
    });
  }
  revalidatePath(`/s/${id}`, "layout");
}
