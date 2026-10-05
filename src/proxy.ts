import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC = ["/login", "/api/cron", "/sso/", "/m/"];

/** 문서 열람 권한: API 문서·대응설명서는 운영관리자·T3Q, 매뉴얼 분석 그림은 운영관리자만 */
const DOCS: { prefix: string; roles: string[] }[] = [
  { prefix: "/api-docs", roles: ["admin", "t3q"] },
  { prefix: "/analysis", roles: ["admin"] },
];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const token = req.cookies.get("r4_session")?.value;
  let role: string | null = null;
  if (token) {
    try {
      const s = process.env.SESSION_SECRET ?? "dev-only-secret-change-me-dev-only-secret";
      const { payload } = await jwtVerify(token, new TextEncoder().encode(s));
      role = (payload as { user?: { role?: string } }).user?.role ?? "";
    } catch {}
  }
  if (role === null) {
    if (pathname.startsWith("/api/")) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const doc = DOCS.find((d) => pathname === d.prefix || pathname.startsWith(d.prefix + "/"));
  if (doc && !doc.roles.includes(role)) return NextResponse.redirect(new URL("/", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|templates|fonts|rhwp-studio|api-docs|analysis|.*\.(?:png|svg|jpg|ico|woff2?)$).*)",
    // 문서·분석 그림은 정적 파일이라도 권한을 확인한다
    "/api-docs",
    "/api-docs/:path*",
    "/analysis/:path*",
  ],
};
