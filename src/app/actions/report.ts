"use server";
import { and, eq, isNotNull, lt } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb, schema } from "@/lib/db";
import { canEdit, requireUser } from "@/lib/auth/session";
import { getReport, getSituation, listEvents } from "@/lib/data";
import { composeReport } from "@/lib/report/compose";
import type { ReportContent } from "@/lib/types";

async function editable(rid: string) {
  const u = await requireUser();
  const r = await getReport(u, rid);
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

export async function saveReport(rid: string, content: ReportContent) {
  await editable(rid);
  await patch(rid, { content, title: content.title });
  return { savedAt: new Date().toISOString() };
}

/** 최신 SOP 실행이력·상황기록으로 다시 구성 (보고자·제목은 유지) */
export async function recomposeReport(rid: string): Promise<ReportContent> {
  const { u, r } = await editable(rid);
  if (!r.situationId) return r.content;
  const s = await getSituation(u, r.situationId);
  if (!s) return r.content;
  const db = await getDb();
  const [org] = await db.select().from(schema.orgs).where(eq(schema.orgs.id, s.orgId)).limit(1);
  const fresh = composeReport({
    situation: s,
    events: await listEvents(s.id),
    reporter: r.content.reporter,
    dept: r.content.dept,
    orgName: org?.name ?? "",
  });
  const content = { ...fresh, title: r.content.title };
  await patch(rid, { content, hwpxData: null, hwpxSavedAt: null });
  return content;
}

/** 한글 편집기 저장본 (base64). null 이면 삭제 */
export async function saveHwpx(rid: string, base64: string | null) {
  await editable(rid);
  if (base64 && base64.length > 8_000_000) throw new Error("문서가 너무 큽니다.");
  await patch(rid, { hwpxData: base64, hwpxSavedAt: base64 ? new Date() : null });
  return { savedAt: new Date().toISOString() };
}

export async function getHwpx(rid: string): Promise<string | null> {
  const u = await requireUser();
  const r = await getReport(u, rid);
  return r?.hwpxData ?? null;
}

export async function setReportStatus(rid: string, status: "draft" | "final") {
  await editable(rid);
  await patch(rid, { status });
  revalidatePath(`/reports/${rid}`);
}

export async function trashReport(rid: string) {
  await editable(rid);
  await patch(rid, { deletedAt: new Date() });
  revalidatePath("/docs");
}

export async function restoreReport(rid: string) {
  await editable(rid);
  await patch(rid, { deletedAt: null });
  revalidatePath("/trash");
}

export async function purgeReport(rid: string) {
  const { r } = await editable(rid);
  if (!r.deletedAt) return;
  const db = await getDb();
  await db.delete(schema.reports).where(eq(schema.reports.id, rid));
  revalidatePath("/trash");
}

export async function restoreSituation(id: string) {
  const u = await requireUser();
  const s = await getSituation(u, id);
  if (!s || !canEdit(u, s)) throw new Error("권한이 없습니다.");
  const db = await getDb();
  await db.update(schema.situations).set({ deletedAt: null }).where(eq(schema.situations.id, id));
  revalidatePath("/trash");
}

export async function purgeSituation(id: string) {
  const u = await requireUser();
  const s = await getSituation(u, id);
  if (!s || !canEdit(u, s) || !s.deletedAt) throw new Error("권한이 없습니다.");
  const db = await getDb();
  await db.delete(schema.events).where(eq(schema.events.situationId, id));
  await db.delete(schema.situations).where(eq(schema.situations.id, id));
  revalidatePath("/trash");
}

/** 7일 지난 휴지통 비우기 (크론 + 휴지통 화면 진입 시) */
export async function purgeExpired() {
  const db = await getDb();
  const cutoff = new Date(Date.now() - 7 * 24 * 3600 * 1000);
  const old = await db
    .select({ id: schema.situations.id })
    .from(schema.situations)
    .where(and(isNotNull(schema.situations.deletedAt), lt(schema.situations.deletedAt, cutoff)));
  for (const s of old) {
    await db.delete(schema.events).where(eq(schema.events.situationId, s.id));
    await db.delete(schema.situations).where(eq(schema.situations.id, s.id));
  }
  const r = await db
    .delete(schema.reports)
    .where(and(isNotNull(schema.reports.deletedAt), lt(schema.reports.deletedAt, cutoff)))
    .returning({ id: schema.reports.id });
  return { situations: old.length, reports: r.length };
}
