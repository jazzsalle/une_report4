"use server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb, schema } from "@/lib/db";
import { createSession, destroySession, requireUser } from "@/lib/auth/session";
import type { Role } from "@/lib/types";

export async function login(_: unknown, form: FormData): Promise<{ error?: string }> {
  const loginId = String(form.get("loginId") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!loginId || !password) return { error: "아이디와 비밀번호를 입력하세요." };

  const db = await getDb();
  const [u] = await db.select().from(schema.users).where(eq(schema.users.loginId, loginId)).limit(1);
  if (!u || !u.active || !(await bcrypt.compare(password, u.passwordHash))) {
    return { error: "아이디 또는 비밀번호가 맞지 않습니다." };
  }
  await db.update(schema.users).set({ lastLoginAt: new Date() }).where(eq(schema.users.id, u.id));
  await createSession({
    id: u.id,
    loginId: u.loginId,
    name: u.name,
    dept: u.dept,
    orgId: u.orgId,
    role: u.role as Role,
  });
  redirect("/");
}

export async function logout() {
  await destroySession();
  redirect("/login");
}

/** 내 정보(이름·부서·비밀번호) 변경 */
export async function updateMe(_: unknown, form: FormData): Promise<{ error?: string; ok?: boolean }> {
  const me = await requireUser();
  const name = String(form.get("name") ?? "").trim();
  const dept = String(form.get("dept") ?? "").trim();
  const current = String(form.get("current") ?? "");
  const next = String(form.get("next") ?? "");
  if (!name) return { error: "이름을 입력하세요." };

  const db = await getDb();
  const [u] = await db.select().from(schema.users).where(eq(schema.users.id, me.id)).limit(1);
  if (!u) return { error: "사용자를 찾을 수 없습니다." };
  const patch: Partial<typeof schema.users.$inferInsert> = { name, dept };
  if (next) {
    if (next.length < 6) return { error: "새 비밀번호는 6자 이상이어야 합니다." };
    if (!(await bcrypt.compare(current, u.passwordHash))) return { error: "현재 비밀번호가 맞지 않습니다." };
    patch.passwordHash = await bcrypt.hash(next, 10);
  }
  await db.update(schema.users).set(patch).where(eq(schema.users.id, me.id));
  await createSession({ ...me, name, dept });
  return { ok: true };
}
