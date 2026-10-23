"use server";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb, schema } from "@/lib/db";
import { requireUser } from "@/lib/auth/session";

/** 계정 발급·비밀번호 지정은 운영관리자만 */
async function admin() {
  const u = await requireUser();
  if (u.role !== "admin") throw new Error("운영관리자만 할 수 있습니다.");
  return u;
}

const ROLES = ["admin", "manager", "user", "t3q"];

/** 운영관리자가 직접 정하는 비밀번호 — 8자 이상, 영문과 숫자 포함 */
function checkPassword(pw: string) {
  if (pw.length < 8 || pw.length > 64 || !/[A-Za-z]/.test(pw) || !/\d/.test(pw)) throw new Error("비밀번호는 영문·숫자를 섞어 8자 이상으로 정하세요.");
}

export async function createUser(v: { loginId: string; name: string; dept: string; orgId: string; role: string; password: string }) {
  await admin();
  if (!ROLES.includes(v.role)) throw new Error("권한을 고르세요.");
  checkPassword(v.password);
  if (!/^[a-z0-9._-]{3,30}$/i.test(v.loginId)) throw new Error("아이디는 영문·숫자 3~30자로 입력하세요.");
  if (!v.name.trim()) throw new Error("이름을 입력하세요.");
  const db = await getDb();
  const [exist] = await db.select().from(schema.users).where(eq(schema.users.loginId, v.loginId)).limit(1);
  if (exist) throw new Error("이미 있는 아이디입니다.");
  await db.insert(schema.users).values({
    id: crypto.randomUUID(),
    loginId: v.loginId,
    name: v.name.trim(),
    dept: v.dept.trim(),
    orgId: v.orgId,
    role: v.role,
    passwordHash: await bcrypt.hash(v.password, 10),
  });
  revalidatePath("/admin");
}

async function target(id: string) {
  const db = await getDb();
  const [u] = await db.select().from(schema.users).where(eq(schema.users.id, id)).limit(1);
  if (!u) throw new Error("사용자를 찾을 수 없습니다.");
  return u;
}

/** 비밀번호 지정 — 운영관리자가 정한 값으로 */
export async function setPassword(id: string, password: string) {
  await admin();
  await target(id);
  checkPassword(password);
  const db = await getDb();
  await db.update(schema.users).set({ passwordHash: await bcrypt.hash(password, 10) }).where(eq(schema.users.id, id));
}

export async function updateUser(id: string, patch: { name?: string; dept?: string; role?: string; active?: boolean }) {
  const me = await admin();
  const t = await target(id);
  if (patch.role && !ROLES.includes(patch.role)) throw new Error("권한을 고르세요.");
  if (t.id === me.id && (patch.active === false || (patch.role && patch.role !== me.role))) {
    throw new Error("본인 계정의 권한·사용 여부는 바꿀 수 없습니다.");
  }
  const db = await getDb();
  await db.update(schema.users).set(patch).where(eq(schema.users.id, id));
  revalidatePath("/admin");
}
