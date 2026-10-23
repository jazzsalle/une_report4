import { NextResponse, type NextRequest } from "next/server";

/**
 * 다른 사이트에서 끌어다 놓은 그림 가져오기 (브라우저 교차출처 제한 우회)
 * 공공 기상·재난 사이트 그림만 허용한다.
 */
const ALLOW = [
  "kma.go.kr",
  "weather.go.kr",
  "typhoon.or.kr",
  "forest.go.kr",
  "safekorea.go.kr",
  "data.go.kr",
  "me.go.kr",
  "hrfco.go.kr",
  "go.kr",
];

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url") ?? "";
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return NextResponse.json({ error: "주소가 올바르지 않습니다." }, { status: 400 });
  }
  if (!/^https?:$/.test(url.protocol) || !ALLOW.some((d) => url.hostname === d || url.hostname.endsWith(`.${d}`))) {
    return NextResponse.json({ error: "공공기관 사이트 그림만 가져올 수 있습니다." }, { status: 400 });
  }
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000), redirect: "follow" });
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !type.startsWith("image/")) {
      return NextResponse.json({ error: "그림을 가져오지 못했습니다." }, { status: 400 });
    }
    const buf = await res.arrayBuffer();
    if (buf.byteLength > 4_000_000) return NextResponse.json({ error: "그림이 너무 큽니다." }, { status: 400 });
    return new NextResponse(buf, { headers: { "content-type": type, "cache-control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "그림을 가져오지 못했습니다." }, { status: 400 });
  }
}
