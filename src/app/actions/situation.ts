"use server";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDb, schema } from "@/lib/db";
import { canEdit, requireUser } from "@/lib/auth/session";
import { addEvent, getSituation, listEvents } from "@/lib/data";
import { getWeatherSnapshot } from "@/lib/weather/kma";
import { sopActions, weatherSummary } from "@/lib/t3q/client";
import { buildContext, responseToSop, snapshotToAlerts } from "@/lib/sop/convert";
import { composeReport } from "@/lib/report/compose";
import { fromLocalInput } from "@/lib/format";
import type { Mission, Sop, WeatherSummary } from "@/lib/types";

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
  areas: string[];
  periodStart: string; // datetime-local
  periodEnd: string | null;
  currentStatus: string;
}

function validate(v: SituationInput) {
  if (!v.title.trim()) return "상황 제목을 입력하세요.";
  if (!v.hazard) return "재난유형을 선택하세요.";
  if (!v.alertLevel) return "위기경보 수준을 선택하세요.";
  if (!v.periodStart) return "시작 일시를 입력하세요.";
  return null;
}

/** 새 상황 → 기상특보 저장 → (선택) SOP 생성까지 한 번에 */
export async function createSituation(v: SituationInput, generate: boolean): Promise<{ error?: string }> {
  const u = await requireUser();
  const err = validate(v);
  if (err) return { error: err };
  const db = await getDb();
  const [org] = await db.select().from(schema.orgs).where(eq(schema.orgs.id, u.orgId)).limit(1);
  const weather = await getWeatherSnapshot(org?.stnId ?? "159");
  const id = nanoid(10);
  await db.insert(schema.situations).values({
    id,
    orgId: u.orgId,
    ownerId: u.id,
    title: v.title.trim(),
    kind: v.kind,
    hazard: v.hazard,
    alertLevel: v.alertLevel,
    areas: v.areas,
    periodStart: new Date(fromLocalInput(v.periodStart)),
    periodEnd: v.periodEnd ? new Date(fromLocalInput(v.periodEnd)) : null,
    currentStatus: v.currentStatus,
    weather,
    status: "setup",
  });
  await addEvent(id, { type: "start", title: "상황 등록", body: `${v.hazard} · 위기경보 ${v.alertLevel}`, userName: u.name });
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
  await touch(id, {
    title: v.title.trim(),
    kind: v.kind,
    hazard: v.hazard,
    alertLevel: v.alertLevel,
    areas: v.areas,
    periodStart: new Date(fromLocalInput(v.periodStart)),
    periodEnd: v.periodEnd ? new Date(fromLocalInput(v.periodEnd)) : null,
    currentStatus: v.currentStatus,
  });
  if (levelChanged) {
    await addEvent(id, { type: "change", title: "위기경보 변경", body: `${s.alertLevel} → ${v.alertLevel}`, userName: u.name });
  }
  revalidatePath(`/s/${id}`);
  return {};
}

export async function refreshWeather(id: string) {
  const { u, s } = await editable(id);
  const db = await getDb();
  const [org] = await db.select().from(schema.orgs).where(eq(schema.orgs.id, s.orgId)).limit(1);
  const weather = await getWeatherSnapshot(org?.stnId ?? "159");
  await touch(id, { weather });
  await addEvent(id, {
    type: "weather",
    title: "기상특보 갱신",
    body: weather.active.length ? weather.active.map((a) => a.name).join(", ") : "발효 중인 특보 없음",
    userName: u.name,
  });
  revalidatePath(`/s/${id}`);
}

export async function summarizeWeather(id: string): Promise<WeatherSummary> {
  const { s } = await editable(id);
  const { data } = await weatherSummary({
    context: buildContext(s),
    alerts: snapshotToAlerts(s.weather),
    weatherInfoText: s.weather?.infoText,
    options: { style: "REPORT", maxChars: 400 },
  });
  const ws: WeatherSummary = {
    headline: data.summary.headline,
    body: data.summary.body,
    keyPoints: data.summary.keyPoints,
    source: data.meta.mock ? "mock" : "t3q",
    generatedAt: new Date().toISOString(),
  };
  await touch(id, { weatherSummary: ws });
  revalidatePath(`/s/${id}`);
  return ws;
}

async function runSopGeneration(id: string, userName: string) {
  const db = await getDb();
  const [s] = await db.select().from(schema.situations).where(eq(schema.situations.id, id)).limit(1);
  const { data, fallback } = await sopActions({ context: buildContext(s), filter: { maxActions: 40 } });
  const sop = responseToSop(data, fallback);
  await touch(id, { sop, status: "sop" });
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

/** SOP 편집 저장 (실행 전) */
export async function saveSop(id: string, sop: Sop) {
  await editable(id);
  await touch(id, { sop });
}

export async function startSop(id: string) {
  const { u, s } = await editable(id);
  if (!s.sop) throw new Error("SOP가 없습니다.");
  const sop = { ...s.sop, startedAt: new Date().toISOString(), endedAt: undefined };
  await touch(id, { sop, status: "running" });
  await addEvent(id, { type: "sop", title: "SOP 실행 시작", body: `임무 ${sop.missions.length}건`, userName: u.name });
  revalidatePath(`/s/${id}`);
}

export async function endSop(id: string) {
  const { u, s } = await editable(id);
  if (!s.sop) throw new Error("SOP가 없습니다.");
  const done = s.sop.missions.filter((m) => m.status === "done").length;
  const sop = { ...s.sop, endedAt: new Date().toISOString() };
  await touch(id, { sop, status: "done" });
  await addEvent(id, {
    type: "sop",
    title: "SOP 실행 종료",
    body: `완료 ${done} / 전체 ${sop.missions.length}`,
    userName: u.name,
  });
  revalidatePath(`/s/${id}`);
}

export async function reopenSop(id: string) {
  const { u, s } = await editable(id);
  if (!s.sop) return;
  await touch(id, { sop: { ...s.sop, endedAt: undefined }, status: "running" });
  await addEvent(id, { type: "sop", title: "SOP 실행 재개", userName: u.name });
  revalidatePath(`/s/${id}`);
}

const STATUS_TEXT: Record<Mission["status"], string> = { todo: "대기", doing: "착수", done: "완료", skipped: "생략" };

/** 실행 중 임무 저장 + 상태 변화는 이력으로 기록 */
export async function saveMission(id: string, mission: Mission) {
  const { u, s } = await editable(id);
  if (!s.sop) throw new Error("SOP가 없습니다.");
  const prev = s.sop.missions.find((m) => m.id === mission.id);
  const exists = !!prev;
  const missions = exists ? s.sop.missions.map((m) => (m.id === mission.id ? mission : m)) : [...s.sop.missions, mission];
  await touch(id, { sop: { ...s.sop, missions } });
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
  await touch(id, { sop: { ...s.sop, missions: s.sop.missions.filter((m) => m.id !== missionId) } });
}

export async function reorderMissions(id: string, ids: string[]) {
  const { s } = await editable(id);
  if (!s.sop) return;
  const map = new Map(s.sop.missions.map((m) => [m.id, m]));
  const missions = ids.map((i) => map.get(i)).filter(Boolean) as Mission[];
  await touch(id, { sop: { ...s.sop, missions } });
}

/** 상황전파 (모의 발송 — 실제 발송 모듈 연계 전) */
export async function propagate(id: string, missionId: string, recipients: string[], message: string) {
  const { u, s } = await editable(id);
  if (!s.sop) throw new Error("SOP가 없습니다.");
  const now = new Date().toISOString();
  const missions = s.sop.missions.map((m) =>
    m.id === missionId ? { ...m, propagation: { ...m.propagation, message, sentAt: now, sentTo: recipients } } : m,
  );
  await touch(id, { sop: { ...s.sop, missions } });
  const m = missions.find((x) => x.id === missionId)!;
  await addEvent(id, {
    type: "propagate",
    title: `상황전파: ${m.title}`,
    body: message,
    missionId,
    userName: u.name,
    meta: { recipients, channel: m.propagation.channel },
  });
  return missions.find((x) => x.id === missionId)!;
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
