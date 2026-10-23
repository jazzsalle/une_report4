"use server";
import { and, eq, isNotNull, lt } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb, schema } from "@/lib/db";
import { canEdit, requireUser } from "@/lib/auth/session";
import { getReport, getSituation } from "@/lib/data";
import type { ReportContent } from "@/lib/types";

async function editable(rid: string, opts: { trashed?: boolean } = {}) {
  const u = await requireUser();
  const r = await getReport(u, rid, opts);
  if (!r) throw new Error("문서를 찾을 수 없습니다.");
  if (!canEdit(u, r)) throw new Error("편집 권한이 없습니다.");
  return { u, r };
}

async function patch(rid: string, p: Partial<typeof schema.reports.$inferInsert>) {
  const db = await getDb();
  await db
    .update(schema.reports)
    .set({ ...p, updatedAt: new Date() })
    .where(eq(schema.reports.id, rid));
}

/** 본문 저장 — 문서 안 제목(content.title)을 고쳐도 문서명(reports.title)은 그대로 (R-12) */
export async function saveReport(rid: string, content: ReportContent) {
  await editable(rid);
  await patch(rid, { content });
  return { savedAt: new Date().toISOString() };
}

/** 서버 액션 한도(4MB) 안쪽 — base64 기준 */
const HWPX_MAX_BASE64 = 3_900_000;

/** 한글 편집기 저장본 (base64). null 이면 삭제 */
export async function saveHwpx(rid: string, base64: string | null) {
  await editable(rid);
  if (base64 && base64.length > HWPX_MAX_BASE64) throw new Error("문서가 너무 커서 저장할 수 없습니다. 그림 크기를 줄여 주세요.");
  await patch(rid, { hwpxData: base64, hwpxSavedAt: base64 ? new Date() : null });
  return { savedAt: new Date().toISOString() };
}

export async function getHwpx(rid: string): Promise<string | null> {
  const u = await requireUser();
  const r = await getReport(u, rid);
  return r?.hwpxData ?? null;
}

export async function trashReport(rid: string) {
  const { r } = await editable(rid);
  if (r.locked) throw new Error("예시 문서는 지울 수 없습니다.");
  await patch(rid, { deletedAt: new Date() });
  revalidatePath("/docs");
  if (r.situationId) revalidatePath(`/s/${r.situationId}/report`);
}

export async function restoreReport(rid: string) {
  await editable(rid, { trashed: true });
  await patch(rid, { deletedAt: null });
  revalidatePath("/trash");
}

export async function purgeReport(rid: string) {
  const { r } = await editable(rid, { trashed: true });
  if (!r.deletedAt || r.locked) return;
  const db = await getDb();
  await db.delete(schema.reports).where(eq(schema.reports.id, rid));
  revalidatePath("/trash");
}

export async function restoreSituation(id: string) {
  const u = await requireUser();
  const s = await getSituation(u, id, { trashed: true });
  if (!s || !canEdit(u, s)) throw new Error("권한이 없습니다.");
  const db = await getDb();
  await db.update(schema.situations).set({ deletedAt: null }).where(eq(schema.situations.id, id));
  revalidatePath("/trash");
}

export async function purgeSituation(id: string) {
  const u = await requireUser();
  const s = await getSituation(u, id, { trashed: true });
  if (!s || !canEdit(u, s) || !s.deletedAt) throw new Error("권한이 없습니다.");
  await purgeSituationRows(id);
  revalidatePath("/trash");
}

/** 상황 영구 삭제: 그 상황의 이벤트·전파도 함께. 상황일지는 남긴다(문서함에서 따로 지움) */
async function purgeSituationRows(id: string) {
  const db = await getDb();
  await db.delete(schema.events).where(eq(schema.events.situationId, id));
  await db.delete(schema.dispatches).where(eq(schema.dispatches.situationId, id));
  await db.delete(schema.situations).where(eq(schema.situations.id, id));
}

/** 7일 지난 휴지통 비우기 (크론 + 휴지통 화면 진입 시) */
export async function purgeExpired() {
  const db = await getDb();
  const cutoff = new Date(Date.now() - 7 * 24 * 3600 * 1000);
  const old = await db
    .select({ id: schema.situations.id })
    .from(schema.situations)
    .where(and(isNotNull(schema.situations.deletedAt), lt(schema.situations.deletedAt, cutoff)));
  for (const s of old) await purgeSituationRows(s.id);
  const r = await db
    .delete(schema.reports)
    .where(and(isNotNull(schema.reports.deletedAt), lt(schema.reports.deletedAt, cutoff)))
    .returning({ id: schema.reports.id });
  return { situations: old.length, reports: r.length };
}
