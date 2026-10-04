"use server";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb, schema } from "@/lib/db";
import { requireUser } from "@/lib/auth/session";

async function admin(targetOrg?: string) {
  const u = await requireUser();
  if (u.role === "admin") return u;
  if (u.role === "manager" && (!targetOrg || targetOrg === u.orgId)) return u;
  throw new Error("관리 권한이 없습니다.");
}

function newPassword() {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[crypto.randomInt(chars.length)];
  return `${s}!${crypto.randomInt(10, 99)}`;
}

export async function createUser(v: { loginId: string; name: string; dept: string; orgId: string; role: string }) {
  const me = await admin(v.orgId);
  if (!/^[a-z0-9._-]{3,30}$/i.test(v.loginId)) throw new Error("아이디는 영문·숫자 3~30자로 입력하세요.");
  if (!v.name.trim()) throw new Error("이름을 입력하세요.");
  if (me.role !== "admin" && v.role === "admin") throw new Error("권한이 없습니다.");
  const db = await getDb();
  const [exist] = await db.select().from(schema.users).where(eq(schema.users.loginId, v.loginId)).limit(1);
  if (exist) throw new Error("이미 있는 아이디입니다.");
  const pw = newPassword();
  await db.insert(schema.users).values({
    id: crypto.randomUUID(),
    loginId: v.loginId,
    name: v.name.trim(),
    dept: v.dept.trim(),
    orgId: v.orgId,
    role: v.role,
    passwordHash: await bcrypt.hash(pw, 10),
  });
  revalidatePath("/admin");
  return { password: pw };
}

async function target(id: string) {
  const db = await getDb();
  const [u] = await db.select().from(schema.users).where(eq(schema.users.id, id)).limit(1);
  if (!u) throw new Error("사용자를 찾을 수 없습니다.");
  await admin(u.orgId);
  return u;
}

export async function resetPassword(id: string) {
  await target(id);
  const pw = newPassword();
  const db = await getDb();
  await db.update(schema.users).set({ passwordHash: await bcrypt.hash(pw, 10) }).where(eq(schema.users.id, id));
  return { password: pw };
}

export async function updateUser(id: string, patch: { name?: string; dept?: string; role?: string; active?: boolean }) {
  const t = await target(id);
  const me = await requireUser();
  if (patch.role === "admin" && me.role !== "admin") throw new Error("권한이 없습니다.");
  if (t.id === me.id && (patch.active === false || (patch.role && patch.role !== me.role))) {
    throw new Error("본인 계정의 권한·사용 여부는 바꿀 수 없습니다.");
  }
  const db = await getDb();
  await db.update(schema.users).set(patch).where(eq(schema.users.id, id));
  revalidatePath("/admin");
}
