import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { SessionUser } from "@/lib/types";

export const SESSION_COOKIE = "r4_session";
const MAX_AGE = 60 * 60 * 12; // 12시간

function secret() {
  const s = process.env.SESSION_SECRET ?? "dev-only-secret-change-me-dev-only-secret";
  return new TextEncoder().encode(s);
}

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function verifyToken(token: string | undefined): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return (payload as { user: SessionUser }).user ?? null;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  return verifyToken(jar.get(SESSION_COOKIE)?.value);
}

export async function requireUser(): Promise<SessionUser> {
  const u = await getSession();
  if (!u) redirect("/login");
  return u;
}

/** 기관 문서 편집 권한: 본인 작성 또는 기관 관리자 이상 */
export function canEdit(u: SessionUser, doc: { ownerId: string; orgId: string }) {
  if (u.role === "admin") return true;
  if (u.orgId !== doc.orgId) return false;
  return doc.ownerId === u.id || u.role === "manager";
}

export function canView(u: SessionUser, doc: { orgId: string }) {
  return u.role === "admin" || u.orgId === doc.orgId;
}
