"use server";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDb, schema } from "@/lib/db";
import { canEdit, requireUser } from "@/lib/auth/session";
import { addEvent, getContactsBundle, getSituation, listDispatches, listEvents } from "@/lib/data";
import { getWeatherSnapshot } from "@/lib/weather/kma";
import { ORG_SIDO, orgForSituation } from "@/lib/regions";
import { sopActions } from "@/lib/t3q/client";
import { buildContext, responseToSop } from "@/lib/sop/convert";
import { recipientIds } from "@/lib/sop/recipients";
import { appendMissions, orderMissions, patchMission, patchSopHead, putMission, removeMission } from "@/lib/sop/store";
import { composeReport } from "@/lib/report/compose";
import { progress } from "@/lib/sop/kind";
import { ensureExampleContacts } from "@/lib/contacts-seed";
import { getTutorialSeed, tutorialWeather } from "@/lib/tutorial";
import { WEATHER_SLOTS, type WeatherSlot } from "@/lib/report/weather";
import { fromLocalInput } from "@/lib/format";
import type { Mission, WeatherImage } from "@/lib/types";

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
  await db.insert(schema.situations).values({
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
  });
  await addEvent(id, { type: "start", title: "상황 등록", body: `${v.hazard} · 위기경보 ${v.alertLevel} · ${v.step}`, userName: u.name });
  await addEvent(id, {
    type: "weather",
    title: "기상특보 확인",
    body: weather.active.length ? weather.active.map((a) => a.name).join(", ") : "발효 중인 특보 없음",
    userName: u.name,
  });
  if (generate) await runSopGeneration(id, u.name);
  redirect(`/s/${id}`);
}

export async function updateSituation(id: string, v: SituationInput): Promise<{ error?: string }> {
  const { u, s } = await editable(id);
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
  revalidatePath(`/s/${id}`);
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
  revalidatePath(`/s/${id}`);
}

async function runSopGeneration(id: string, userName: string) {
  const db = await getDb();
  const [s] = await db.select().from(schema.situations).where(eq(schema.situations.id, id)).limit(1);
  const { data, fallback } = await sopActions({ context: buildContext(s), filter: { maxActions: 40 } }, { seedOnly: s.tutorial });
  const sop = responseToSop(data, fallback);
  await touch(id, { sop, status: "sop" });
  // 기본 세팅: 기관 연락망이 비어 있으면 예시 조직(자연재난과)을 넣어 상황전파 대상을 바로 고를 수 있게 한다
  if (await ensureExampleContacts(s.orgId)) {
    await addEvent(id, { type: "sop", title: "연락망 기본 세팅", body: "예시 조직(자연재난과·유관기관 등 11명)을 넣었습니다. 연락망에서 실제 담당자로 고쳐 쓰세요.", userName });
  }
  await addEvent(id, {
    type: "sop",
    title: "SOP 생성",
    body: `임무 ${sop.missions.length}건 (${sop.source === "t3q" ? "AI" : "기본 SOP"})`,
    userName,
  });
}

export async function generateSop(id: string) {
  const { u, s } = await editable(id);
  if (s.sop?.startedAt) throw new Error("실행 중인 SOP는 다시 생성할 수 없습니다.");
  await runSopGeneration(id, u.name);
  revalidatePath(`/s/${id}`);
}

export async function startSop(id: string) {
  const { u, s } = await editable(id);
  if (!s.sop) throw new Error("SOP가 없습니다.");
  await patchSopHead(id, { startedAt: new Date().toISOString(), endedAt: null });
  await touch(id, { status: "running" });
  await addEvent(id, { type: "sop", title: "SOP 실행 시작", body: `임무 ${s.sop.missions.length}건`, userName: u.name });
  revalidatePath(`/s/${id}`);
}

export async function endSop(id: string) {
  const { u, s } = await editable(id);
  if (!s.sop) throw new Error("SOP가 없습니다.");
  const { done, total } = progress(s.sop.missions);
  await patchSopHead(id, { endedAt: new Date().toISOString() });
  await touch(id, { status: "done" });
  await addEvent(id, {
    type: "sop",
    title: "SOP 실행 종료",
    body: `완료 ${done} / 전체 ${total}`,
    userName: u.name,
  });
  revalidatePath(`/s/${id}`);
}

export async function reopenSop(id: string) {
  const { u, s } = await editable(id);
  if (!s.sop) return;
  await patchSopHead(id, { endedAt: null });
  await touch(id, { status: "running" });
  await addEvent(id, { type: "sop", title: "SOP 실행 재개", userName: u.name });
  revalidatePath(`/s/${id}`);
}

const STATUS_TEXT: Record<Mission["status"], string> = { todo: "대기", doing: "착수", done: "완료", skipped: "생략" };

/** 실행 중 임무 저장 + 상태 변화는 이력으로 기록 */
export async function saveMission(id: string, mission: Mission) {
  const { u, s } = await editable(id);
  if (!s.sop) throw new Error("SOP가 없습니다.");
  const prev = s.sop.missions.find((m) => m.id === mission.id);
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

/** 임무 여러 개를 한 번에 추가 (단계 전환 시 매뉴얼 임무 일괄 추가) */
export async function addMissions(id: string, add: Mission[], label: string) {
  const { u, s } = await editable(id);
  if (!s.sop || !add.length) return;
  const have = new Set(s.sop.missions.map((m) => m.code).filter(Boolean));
  const fresh = add.filter((m) => !m.code || !have.has(m.code));
  await appendMissions(id, fresh);
  if (s.sop.startedAt) {
    await addEvent(id, { type: "mission", title: `임무 추가: ${label}`, body: `${fresh.length}건`, userName: u.name });
  }
  revalidatePath(`/s/${id}/sop`);
}

export async function deleteMission(id: string, missionId: string) {
  const { s } = await editable(id);
  if (!s.sop) return;
  await removeMission(id, missionId);
}

export async function reorderMissions(id: string, ids: string[]) {
  const { s } = await editable(id);
  if (!s.sop) return;
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
export async function propagate(id: string, missionId: string, message: string) {
  const { u, s } = await editable(id);
  if (!s.sop) throw new Error("SOP가 없습니다.");
  const mission = s.sop.missions.find((m) => m.id === missionId);
  if (!mission) throw new Error("임무를 찾을 수 없습니다.");
  const bundle = await getContactsBundle(orgForSituation(s.orgId, s.sido));
  const ids = recipientIds(bundle, mission.propagation);
  const unitName = new Map(bundle.units.map((x) => [x.id, x.name]));
  const people = bundle.contacts.filter((c) => ids.has(c.id));
  if (!people.length) throw new Error("전파 대상을 선택하세요.");

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
    channel: mission.propagation.channel,
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
→ ${rows.length}명 (${mission.propagation.channel})`,
    missionId,
    userName: u.name,
    meta: { recipients, channel: mission.propagation.channel },
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
  revalidatePath(`/s/${id}`);
}

export async function deleteRecord(id: string, eventId: string) {
  await editable(id);
  const db = await getDb();
  await db.delete(schema.events).where(eq(schema.events.id, eventId));
  revalidatePath(`/s/${id}`);
}

/** 상황일지 생성 — 입력·실행이력으로 자동 구성 */
export async function createReport(id: string) {
  const { u, s } = await editable(id);
  const db = await getDb();
  const [org] = await db.select().from(schema.orgs).where(eq(schema.orgs.id, s.orgId)).limit(1);
  const events = await listEvents(id);
  const content = composeReport({
    situation: s,
    events,
    dispatches: await listDispatches(id),
    reporter: u.name,
    dept: u.dept,
    orgName: org?.name ?? "",
  });
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

export async function trashSituation(id: string) {
  await editable(id);
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
  revalidatePath(`/s/${id}`);
}
