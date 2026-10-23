import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { getDb, schema } from "@/lib/db";
import { createSession } from "@/lib/auth/session";
import { verifyUserToken } from "@/lib/t3q/client";
import type { T3QUser } from "@/lib/t3q/types";
import type { Role } from "@/lib/types";

/**
 * T3Q 플랫폼 링크 로그인 (API-03)
 *   T3Q 링크 → GET /sso/t3q?token=<1회용 토큰>&next=/new
 *   → T3Q /auth/verify 로 토큰 확인 → 사용자 연결(없으면 생성) → 세션 발급 → next 로 이동
 * T3Q 계정은 아이디 "t3q:<userId>" 로 저장되며 비밀번호 로그인은 할 수 없다.
 */

const ORG_BY_CODE: Record<string, string> = { "6260000": "busan", "6470000": "gyeongbuk" };

function orgOf(u: T3QUser): string | null {
  if (u.orgCode && ORG_BY_CODE[u.orgCode]) return ORG_BY_CODE[u.orgCode];
  if (u.orgName.includes("부산")) return "busan";
  if (u.orgName.includes("경상북도") || u.orgName.includes("경북")) return "gyeongbuk";
  return null;
}

function fail(req: NextRequest, reason: string) {
  const url = new URL("/login", req.url);
  url.searchParams.set("sso", reason);
  return NextResponse.redirect(url);
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const next = req.nextUrl.searchParams.get("next") ?? "/";
  if (!token) return fail(req, "no-token");

  let user: T3QUser;
  try {
    user = (await verifyUserToken(token)).user;
  } catch (e) {
    console.error("[sso] verify failed", e);
    return fail(req, "invalid");
  }
  const orgId = orgOf(user);
  if (!orgId) return fail(req, "org");

  const db = await getDb();
  const loginId = `t3q:${user.userId}`;
  const role: Role = user.roles?.includes("MANAGER") ? "manager" : "user";
  const [found] = await db.select().from(schema.users).where(eq(schema.users.loginId, loginId)).limit(1);
  let id = found?.id;
  if (found) {
    if (!found.active) return fail(req, "inactive");
    await db
      .update(schema.users)
      .set({ name: user.name, dept: user.deptName ?? found.dept, orgId, lastLoginAt: new Date() })
      .where(eq(schema.users.id, found.id));
  } else {
    id = crypto.randomUUID();
    await db.insert(schema.users).values({
      id,
      loginId,
      name: user.name,
      dept: user.deptName ?? "",
      orgId,
      role,
      passwordHash: await bcrypt.hash(crypto.randomBytes(24).toString("hex"), 10),
      lastLoginAt: new Date(),
    });
  }

  await createSession({
    id: id!,
    loginId,
    name: user.name,
    dept: user.deptName ?? found?.dept ?? "",
    orgId,
    role: (found?.role as Role) ?? role,
  });
  // 외부 주소로의 이동은 막는다
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
  return NextResponse.redirect(new URL(safeNext, req.url));
}
