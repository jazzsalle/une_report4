"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb, schema } from "@/lib/db";
import { addEvent } from "@/lib/data";

/**
 * 현장 응답 (로그인 없이 링크 토큰으로) — 수신확인 → 임무완료 → 조치사항
 * 응답은 수행 이력에 남고, 조치사항은 상황실이 「확인」해야 상황일지에 사실로 들어간다.
 */
export async function fieldRespond(token: string, kind: "read" | "done" | "note", note?: string) {
  if (!/^[A-Za-z0-9_-]{16,40}$/.test(token)) throw new Error("잘못된 링크입니다.");
  const db = await getDb();
  const [d] = await db.select().from(schema.dispatches).where(eq(schema.dispatches.token, token)).limit(1);
  if (!d) throw new Error("만료되었거나 잘못된 링크입니다.");
  const now = new Date();
  const patch: Partial<typeof schema.dispatches.$inferInsert> = {};
  let title = "";
  let body = "";
  if (kind === "read") {
    if (d.readAt) return;
    patch.readAt = now;
    title = `현장 수신확인: ${d.name}`;
  } else if (kind === "done") {
    if (d.doneAt) return;
    patch.doneAt = now;
    if (!d.readAt) patch.readAt = now;
    title = `현장 임무완료: ${d.name}`;
  } else {
    const text = (note ?? "").trim().slice(0, 1000);
    if (!text) throw new Error("조치사항을 입력하세요.");
    patch.note = text;
    patch.noteAt = now;
    patch.ackAt = null;
    if (!d.readAt) patch.readAt = now;
    title = `현장 조치사항: ${d.name}`;
    body = text;
  }
  await db.update(schema.dispatches).set(patch).where(eq(schema.dispatches.id, d.id));
  await addEvent(d.situationId, {
    type: "response",
    title,
    body,
    missionId: d.missionId,
    userName: `${d.name}(${d.unit})`,
    meta: { dispatchId: d.id, kind, verify: kind === "note" ? "확인 필요" : "확인" },
    at: now,
  });
  revalidatePath(`/m/${token}`);
  revalidatePath(`/s/${d.situationId}/sop`);
}
