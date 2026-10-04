import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC = ["/login", "/api/cron", "/sso/", "/m/"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const token = req.cookies.get("r4_session")?.value;
  let ok = false;
  if (token) {
    try {
      const s = process.env.SESSION_SECRET ?? "dev-only-secret-change-me-dev-only-secret";
      await jwtVerify(token, new TextEncoder().encode(s));
      ok = true;
    } catch {}
  }
  if (ok) return NextResponse.next();
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|templates|fonts|rhwp-studio|api-docs|.*\\.(?:png|svg|jpg|ico|woff2?)$).*)"],
};
