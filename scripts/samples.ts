/**
 * 예시 문서 만들기 (평가·시연용) — 재난유형별 SOP·상황전파·상황일지가 다 들어간 예시 문서. 지울 수 없음(locked).
 *   이름은 「지역 재난유형 대응」 — 예시인지는 이름이 아니라 locked 로 구분한다 (M-04)
 *   운영관리자(admin): 재난유형 10종 1건씩 · 부산 담당자 2계정: 풍수해 1건씩 · 경북 담당자 2계정: 산불 1건씩
 *
 *   로컬:  npx tsx scripts/samples.ts --wipe --approve "운영 문서 초기화 승인"
 *   운영:  DATABASE_URL=... npx tsx scripts/samples.ts --wipe --approve "운영 문서 초기화 승인"
 *
 * --wipe: 모든 계정의 상황·상황일지·전파 기록·이력을 지우고 연락망을 처음 상태로 (계정·따라하기 시드는 그대로)
 * SOP 원본: src/data/samples/<key>.json (매뉴얼에서 추출, 실명·번호 없음)
 * 연락처: seed_docs/samples/<key>-contacts.json (실제 번호, 깃 제외) → 없으면 src/data/samples/contacts/<key>.json (번호를 OOO 으로 가린 공개본)
 */
import "dotenv/config";
import { config } from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import * as schema from "../src/lib/db/schema";
import { orgContactsSeed } from "../src/lib/db/seed-data";
import { responseToSop } from "../src/lib/sop/convert";
import { composeReport } from "../src/lib/report/compose";
import { BUSAN_PROCESS, BUSAN_SOURCE, stepOf } from "../src/lib/seed";
import type { Mission, Sop, WeatherSnapshot } from "../src/lib/types";
import type { SopAction, SopActionsResponse, SopMission } from "../src/lib/t3q/types";

config({ path: ".env.local" });
const APPROVAL = "운영 문서 초기화 승인";

/* ---------- 예시 원본 형식 (추출 결과) ---------- */
interface SampleContact {
  category: "AGENCY" | "INTERNAL" | "HIGHER" | "LOCAL_GOV";
  org: string;
  dept?: string;
  title?: string;
  name?: string;
  phones?: string[];
  mobile?: string;
  fax?: string[];
  note?: string;
}
interface Sample {
  key: string;
  hazard: string;
  manual: { docTitle: string; scope?: string; region?: string; version?: string };
  scenario: {
    titleCore: string;
    sido: string;
    areas: string[];
    alertLevel: string;
    step: string;
    dept: string;
    currentStatus: string;
    weather: { active: { name: string; areas: string; kind: string }[]; preliminary: string[]; infoLines: string[] };
  };
  missions: { missionCode: string; missionName: string }[];
  actions: (Omit<SopAction, "phase" | "orderHint" | "sources" | "responseStep" | "propagation" | "resources"> & {
    propagation?: SopAction["propagation"];
    resources?: SopAction["resources"];
    page?: number;
  })[];
  execution: {
    doneCodes: string[];
    doingCode?: string;
    results: Record<string, string>;
    propagateCode: string;
    propagateMessage: string;
    fieldNotes: string[];
  };
  contacts?: SampleContact[];
}

const STEP_CODE: Record<string, SopAction["responseStep"]> = {
  징후감지: "SIGN_DETECTION",
  초기대응: "INITIAL_RESPONSE",
  비상대응: "EMERGENCY_RESPONSE",
  수습복구: "RECOVERY",
};
const SHORT: Record<string, string> = { 다중밀집건축물붕괴대형사고: "다중밀집" };
const ADMIN_ORDER = ["heat", "flood", "quake", "dust", "wildfire", "infect", "livestock", "crowd", "radiation", "school"];

function loadSample(key: string): Sample {
  if (key === "flood") return floodSample();
  const file = path.join("src/data/samples", `${key}.json`);
  const s = JSON.parse(fs.readFileSync(file, "utf8")) as Sample;
  // 매뉴얼 연락처: 실제 번호(seed_docs, 깃 제외)가 있으면 그것, 없으면 번호를 가린 공개본
  const real = path.join("seed_docs/samples", `${key}-contacts.json`);
  const masked = path.join("src/data/samples/contacts", `${key}.json`);
  const cf = [real, masked].find((f) => fs.existsSync(f));
  if (cf) s.contacts = JSON.parse(fs.readFileSync(cf, "utf8"));
  return s;
}

/** 태풍/호우: 부산 풍수해 현장조치 매뉴얼 시드(재난대응 프로세스 + 행동카드) 2단계 초기대응 */
function floodSample(): Sample {
  const acts = BUSAN_PROCESS.filter((a) => stepOf(a) === "초기대응");
  const missions = Array.from(new Map(acts.map((a) => [a.mission!.code, a.mission!])).values());
  const prop = acts.find((a) => a.propagateTo.length && /전파/.test(a.title)) ?? acts.find((a) => a.propagateTo.length)!;
  const codes = acts.map((a) => a.manualCode!);
  const done = codes.filter((c) => c !== prop.manualCode).slice(0, 4);
  return {
    key: "flood",
    hazard: "태풍/호우",
    manual: { docTitle: BUSAN_SOURCE, scope: "SIDO", region: "부산광역시", version: "2026.7." },
    scenario: {
      titleCore: "부산 태풍 북상 호우경보 대응",
      sido: "부산광역시",
      areas: ["해운대구", "수영구", "사하구"],
      alertLevel: "주의",
      step: "초기대응",
      dept: "자연재난과",
      currentStatus: "제○호 태풍 북상으로 부산 전역 호우주의보·태풍주의보 발효. 해운대구 저지대 도로 일부 침수 신고, 하천변 산책로 통제 중",
      weather: {
        active: [
          { name: "태풍주의보", areas: "부산(부산 전역)", kind: "watch" },
          { name: "호우주의보", areas: "부산(부산 전역)", kind: "watch" },
        ],
        preliminary: ["태풍경보 예비특보: 부산 (오늘 밤)"],
        infoLines: [
          "(현황) 제○호 태풍이 북위 32도 부근에서 북북동진 중이며, 부산은 시간당 20mm 안팎의 비가 내리고 있습니다.",
          "(전망) 오늘 밤부터 내일 새벽 사이 부산에 시간당 50mm 이상의 매우 강한 비와 최대순간풍속 35m/s의 강풍이 예상됩니다.",
        ],
      },
    },
    missions: missions.map((m) => ({ missionCode: m.code, missionName: m.name })),
    actions: acts.map((a) => ({
      actionCode: a.manualCode!,
      actionName: a.title,
      missionCode: a.mission!.code,
      phaseLabel: "2단계 초기대응",
      category: a.phase === "복구" ? "DAMAGE" : "RESPONSE",
      condition: a.condition,
      notes: a.notes,
      summary: a.content,
      organizations: [
        { name: a.lead, role: "LEAD" },
        ...a.support.map((n) => ({ name: n, role: "SUPPORT" as const })),
        ...a.collab.map((n) => ({ name: n, role: "COOPERATE" as const })),
      ],
      detailTasks: a.details.map((d, k) => ({ seq: k + 1, title: d, content: "" })),
      propagation: a.propagateTo.length
        ? [{ target: a.propagateTo.join(", "), targetType: "ORG", channelHint: "SMS", messageTemplate: a.propagateMsg || undefined }]
        : [],
      resources: a.resources.map((r) => ({ category: "자원", name: r })),
      page: a.page,
    })),
    execution: {
      doneCodes: done,
      doingCode: codes.find((c) => !done.includes(c) && c !== prop.manualCode),
      results: Object.fromEntries(done.map((c) => [c, "매뉴얼에 따라 조치하고 결과를 재난안전상황실에 보고함"])),
      propagateCode: prop.manualCode!,
      propagateMessage:
        "[부산시 재난안전대책본부] 태풍주의보·호우주의보 발효에 따라 비상 1단계 근무에 들어갑니다. 소관 취약시설(지하차도·하천변·해안가) 예찰과 통제를 강화하고 피해 발생 시 즉시 보고 바랍니다.",
      fieldNotes: [
        "해운대구 우동 지하차도 차량 통제 완료, 배수펌프 가동 중",
        "수영강 산책로 출입 통제선 설치, 현장 안내요원 2명 배치",
        "사하구 다대포 해안가 방문객 대피 안내 방송 실시",
      ],
    },
  };
}

/* ---------- DB ---------- */
async function getDb() {
  const url = process.env.DATABASE_URL;
  if (url) {
    const { neon } = await import("@neondatabase/serverless");
    const { drizzle } = await import("drizzle-orm/neon-http");
    const { migrate } = await import("drizzle-orm/neon-http/migrator");
    const db = drizzle(neon(url), { schema });
    await migrate(db, { migrationsFolder: "drizzle" });
    return db;
  }
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  const db = drizzle(new PGlite(".data/pglite"), { schema });
  await migrate(db, { migrationsFolder: "drizzle" });
  return db as unknown as Awaited<ReturnType<typeof import("drizzle-orm/neon-http").drizzle<typeof schema>>>;
}
type DB = Awaited<ReturnType<typeof getDb>>;

/** 초기화: 문서 전부 삭제, 연락망은 처음 상태 (부산·경북 시드, 그 밖의 기관은 비움). 계정·따라하기 시드는 그대로 */
async function wipe(db: DB) {
  await db.delete(schema.dispatches);
  await db.delete(schema.events);
  await db.delete(schema.reports);
  await db.delete(schema.situations);
  await db.delete(schema.contactGroups);
  await db.delete(schema.contacts);
  await db.delete(schema.orgUnits);
  for (const orgId of ["busan", "gyeongbuk"] as const) {
    const s = orgContactsSeed(orgId);
    await db.insert(schema.orgUnits).values(s.units);
    await db.insert(schema.contacts).values(s.people);
    await db.insert(schema.contactGroups).values(s.groups);
  }
}

/** 운영관리(une) 연락망: 예시 매뉴얼의 연락처를 분류별 묶음으로, 예시마다 전파그룹 1개 */
async function buildUneContacts(db: DB, samples: Sample[]) {
  const orgId = "une";
  const unitId = new Map<string, string>();
  const unit = async (name: string, parent: string | null, kind: string) => {
    const k = `${parent}|${name}`;
    if (unitId.has(k)) return unitId.get(k)!;
    const id = nanoid(10);
    await db.insert(schema.orgUnits).values({ id, orgId, parentId: parent, name, kind, sort: unitId.size });
    unitId.set(k, id);
    return id;
  };
  const ROOT: Record<SampleContact["category"], string> = {
    AGENCY: "유관기관",
    LOCAL_GOV: "시·군·구 재난부서",
    HIGHER: "상급 보고처",
    INTERNAL: "매뉴얼 주관부서",
  };
  const seen = new Map<string, string>(); // org|dept|name → contact id
  const groups: Record<string, string[]> = {};
  for (const s of samples) {
    const list: SampleContact[] = s.contacts?.length
      ? s.contacts
      : // 연락처 파일이 없으면 협업기관 이름 + 자리표시 번호
        Array.from(new Set(s.actions.flatMap((a) => a.organizations.filter((o) => o.role === "COOPERATE").map((o) => o.name)))).map(
          (org) => ({ category: "AGENCY" as const, org, phones: ["000-0000-0000"] }),
        );
    const ids: string[] = [];
    for (const c of list) {
      const root = await unit(ROOT[c.category] ?? "유관기관", null, "agency");
      const u = await unit(c.org, root, "agency");
      const name = c.name || c.dept || "대표번호";
      const key = `${c.org}|${c.dept ?? ""}|${name}`;
      let id = seen.get(key);
      if (!id) {
        id = nanoid(10);
        await db.insert(schema.contacts).values({
          id,
          orgId,
          unitId: u,
          name,
          title: c.title ?? "",
          duty: c.name ? c.dept ?? "" : c.note ?? "",
          phone: c.mobile || c.phones?.[0] || "",
          email: "",
          sort: seen.size,
        });
        seen.set(key, id);
      }
      if (c.category === "AGENCY" || c.category === "LOCAL_GOV") ids.push(id);
    }
    groups[`${SHORT[s.hazard] ?? s.hazard} 유관기관`] = Array.from(new Set(ids));
  }
  let i = 0;
  for (const [name, memberIds] of Object.entries(groups)) {
    await db.insert(schema.contactGroups).values({ id: nanoid(10), orgId, name, memberIds, sort: i++ });
  }
}

/* ---------- 예시 1건 ---------- */
/** 추출 예시 문장 앞의 시각(「14:05 …」)은 떼어 낸다 — 시각은 실행 기록이 정한다 */
const untimed = (t: string) => t.replace(/^\s*\d{1,2}:\d{2}\s*/, "");

/** stamp: 문서함 정렬용 수정 시각 (최근일수록 위) */
async function makeSample(db: DB, s: Sample, owner: typeof schema.users.$inferSelect, title: string, startHoursAgo: number, stamp: Date) {
  // 운영관리 예시는 운영관리 연락망(매뉴얼 연락처), 담당자 예시는 그 기관 연락망으로 전파
  const orgId = owner.orgId;
  const contactsOrg = orgId;
  const start = new Date(Date.now() - startHoursAgo * 3600_000);
  start.setMinutes(0, 0, 0);
  const at = (min: number) => new Date(start.getTime() + min * 60_000);
  const id = nanoid(10);

  // 기상특보
  const w = s.scenario.weather;
  const weather: WeatherSnapshot = {
    stnId: "",
    stnName: s.scenario.sido,
    announcedAt: start.toISOString(),
    retrievedAt: start.toISOString(),
    active: w.active.map((a) => ({ ...a, kind: a.kind === "warning" ? "warning" : "watch" })),
    preliminary: w.preliminary,
    infoText: w.infoLines.map((l) => `○ ${l}`).join("\n"),
    infoAt: start.toISOString(),
    nationwideText: "",
  };

  // SOP — 추출 결과를 API-02 응답 모양으로 만들어 앱과 같은 변환을 거친다
  const res: SopActionsResponse = {
    meta: { requestId: "sample", traceId: "sample", generatedAt: start.toISOString(), mock: false },
    disasterType: { code: s.key, name: s.hazard },
    manual: { docId: s.key, docTitle: s.manual.docTitle, scope: (s.manual.scope as "SIDO") ?? "SIDO", stepBasis: "RESPONSE_STEP" },
    missions: s.missions.map(
      (m): SopMission => ({ ...m, actionCodes: s.actions.filter((a) => a.missionCode === m.missionCode).map((a) => a.actionCode) }),
    ),
    actions: s.actions.map(
      (a, k): SopAction => ({
        ...a,
        phase: a.category === "DAMAGE" ? "RECOVERY" : "RESPONSE",
        responseStep: STEP_CODE[s.scenario.step],
        orderHint: k + 1,
        propagation: a.propagation ?? [],
        resources: a.resources ?? [],
        sources: [{ docId: s.key, docTitle: s.manual.docTitle, page: a.page }],
      }),
    ),
  };
  const sop: Sop = { ...responseToSop(res, false), source: "t3q", generatedAt: at(10).toISOString() };
  const byCode = new Map(sop.missions.map((m) => [m.code, m]));
  const ex = s.execution;
  const events: (typeof schema.events.$inferInsert)[] = [];
  const ev = (min: number, type: string, t: string, body = "", missionId?: string, meta?: Record<string, unknown>) =>
    events.push({ id: nanoid(10), situationId: id, at: at(min), type, title: t, body, missionId, userName: owner.name, meta });

  ev(0, "start", "상황 등록", `${s.hazard} · 위기경보 ${s.scenario.alertLevel} · ${s.scenario.step}`);
  ev(1, "weather", "기상특보 확인", w.active.map((a) => a.name).join(", ") || "발효 중인 특보 없음");
  ev(10, "sop", "SOP 생성", `임무 ${sop.missions.length}건 (${s.manual.docTitle} 기준)`);
  sop.startedAt = at(15).toISOString();
  ev(15, "sop", "SOP 실행 시작", `임무 ${sop.missions.length}건`);

  let t = 20;
  for (const code of ex.doneCodes) {
    const m = byCode.get(code);
    if (!m) continue;
    m.status = "done";
    m.startedAt = at(t).toISOString();
    m.doneAt = at(t + 12).toISOString();
    m.result = untimed(ex.results[code] ?? "매뉴얼에 따라 조치 완료");
    m.details = m.details.map((d) => ({ ...d, done: true, doneAt: m.doneAt }));
    ev(t, "mission", `${m.title} 착수`, "", m.id);
    ev(t + 12, "mission", `${m.title} 완료`, m.result, m.id);
    t += 18;
  }
  const doing = ex.doingCode ? byCode.get(ex.doingCode) : undefined;
  if (doing && doing.status === "todo") {
    doing.status = "doing";
    doing.startedAt = at(t).toISOString();
    if (doing.details[0]) doing.details[0] = { ...doing.details[0], done: true, doneAt: at(t + 5).toISOString() };
    ev(t, "mission", `${doing.title} 착수`, "", doing.id);
  }

  // 상황전파 — 그 기관 연락망의 유관기관 그룹
  const groups = await db.select().from(schema.contactGroups).where(eq(schema.contactGroups.orgId, contactsOrg));
  const short = SHORT[s.hazard] ?? s.hazard;
  const group = groups.find((g) => g.name === `${short} 유관기관`) ?? groups.find((g) => g.name === "유관기관") ?? groups[0];
  const pm: Mission | undefined = byCode.get(ex.propagateCode);
  const dispatchRows: (typeof schema.dispatches.$inferInsert)[] = [];
  if (pm && group?.memberIds.length) {
    const people = await db.select().from(schema.contacts).where(inArray(schema.contacts.id, group.memberIds));
    const units = await db.select().from(schema.orgUnits).where(eq(schema.orgUnits.orgId, contactsOrg));
    const unitName = new Map(units.map((u) => [u.id, u.name]));
    const sentAt = at(30);
    people.forEach((c, k) => {
      const note = untimed(ex.fieldNotes[k] ?? "");
      dispatchRows.push({
        id: nanoid(10),
        token: nanoid(22),
        situationId: id,
        missionId: pm.id,
        contactId: c.id,
        name: c.name,
        unit: unitName.get(c.unitId) ?? "",
        phone: c.phone,
        email: c.email,
        channel: "SMS",
        message: ex.propagateMessage,
        sentAt,
        readAt: k < people.length - 1 ? at(32 + k) : null,
        doneAt: k < Math.ceil(people.length / 2) ? at(55 + k * 4) : null,
        note,
        noteAt: note ? at(50 + k * 4) : null,
        ackAt: note ? at(60 + k * 4) : null,
        ackBy: note ? owner.name : "",
      });
    });
    const recipients = dispatchRows.map((r) => `${r.name}(${r.unit})`);
    pm.propagation = { ...pm.propagation, message: ex.propagateMessage, groupIds: [group.id], sentAt: sentAt.toISOString(), sentTo: recipients, channel: "SMS" };
    if (pm.status === "todo") {
      pm.status = "done";
      pm.startedAt = at(28).toISOString();
      pm.doneAt = at(31).toISOString();
      pm.result = `${group.name} ${recipients.length}명에게 상황전파`;
    }
    ev(30, "propagate", `상황전파: ${pm.title}`, `${ex.propagateMessage}\n→ ${recipients.length}명 (SMS)`, pm.id, { recipients, channel: "SMS" });
  }
  sop.endedAt = at(t + 30).toISOString();
  ev(t + 30, "sop", "SOP 실행 종료", `완료 ${sop.missions.filter((m) => m.status === "done").length} / 전체 ${sop.missions.length}`);

  const situation = {
    id,
    orgId,
    ownerId: owner.id,
    title,
    kind: "real",
    hazard: s.hazard,
    alertLevel: s.scenario.alertLevel,
    responseStep: s.scenario.step,
    sido: s.scenario.sido,
    areas: s.scenario.areas,
    dept: s.scenario.dept,
    periodStart: start,
    periodEnd: null,
    currentStatus: s.scenario.currentStatus,
    weather,
    sop,
    status: "done",
    locked: true,
    createdAt: stamp,
    updatedAt: stamp,
  };
  await db.insert(schema.situations).values(situation);
  await db.insert(schema.events).values(events);
  if (dispatchRows.length) await db.insert(schema.dispatches).values(dispatchRows);

  // 상황일지 — 앱의 「상황일지 작성」과 같은 구성
  const [org] = await db.select().from(schema.orgs).where(eq(schema.orgs.id, orgId)).limit(1);
  const content = composeReport({
    situation: { ...situation, weatherImages: null },
    events: events.map((e) => ({ at: e.at!, type: e.type, title: e.title, body: e.body ?? "", meta: e.meta ?? null })),
    dispatches: dispatchRows.map((d) => ({
      missionId: d.missionId,
      name: d.name,
      unit: d.unit ?? "",
      readAt: d.readAt ?? null,
      doneAt: d.doneAt ?? null,
      note: d.note ?? "",
      noteAt: d.noteAt ?? null,
      ackAt: d.ackAt ?? null,
    })),
    reporter: owner.name,
    dept: owner.dept || s.scenario.dept,
    orgName: org?.name ?? "",
  });
  const rid = nanoid(10);
  await db.insert(schema.reports).values({ id: rid, situationId: id, orgId, ownerId: owner.id, title: content.title, content, locked: true, createdAt: stamp, updatedAt: stamp });
  await db.insert(schema.events).values({ id: nanoid(10), situationId: id, at: at(t + 35), type: "report", title: "상황일지 작성", body: "", userName: owner.name });
  return { title, missions: sop.missions.length, dispatched: dispatchRows.length };
}

async function main() {
  const args = process.argv.slice(2);
  const target = process.env.DATABASE_URL ? "운영" : "로컬";
  const i = args.indexOf("--approve");
  if (args.includes("--wipe") && (i < 0 || args[i + 1] !== APPROVAL)) throw new Error(`초기화하려면 --approve "${APPROVAL}" 를 함께 적어야 합니다.`);
  const db = await getDb();
  const samples = Object.fromEntries(ADMIN_ORDER.map((k) => [k, loadSample(k)])) as Record<string, Sample>;
  if (args.includes("--wipe")) {
    await wipe(db);
    console.log(`[${target}] 문서 전부 삭제, 연락망 처음 상태로 (계정·따라하기 시드 유지)`);
  }
  await buildUneContacts(db, Object.values(samples));

  const users = await db.select().from(schema.users);
  const by = (loginId: string) => users.find((u) => u.loginId === loginId);
  const out: string[] = [];
  const admin = by("admin");
  if (admin) {
    for (const [n, key] of ADMIN_ORDER.entries()) {
      const s = samples[key];
      const r = await makeSample(db, s, admin, s.scenario.titleCore, 30 - n * 2, new Date(Date.now() - n * 60_000));
      out.push(`admin · ${r.title} · 임무 ${r.missions} · 전파 ${r.dispatched}명`);
    }
  }
  for (const [ids, key, title] of [
    [["busan-admin", "busan01"], "flood", "부산 태풍·호우 대응"],
    [["gb-admin", "gb01"], "wildfire", "경북 대형산불 대응"],
  ] as const) {
    for (const loginId of ids) {
      const u = by(loginId);
      if (!u) continue;
      const r = await makeSample(db, samples[key], u, title, 6, new Date());
      out.push(`${loginId} · ${r.title} · 임무 ${r.missions} · 전파 ${r.dispatched}명`);
    }
  }
  console.log(`[${target}] 예시 문서 ${out.length}건 (삭제 잠금)\n  ` + out.join("\n  "));
  process.exit(0);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
