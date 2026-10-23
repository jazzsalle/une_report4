import { requireUser } from "@/lib/auth/session";
import { manualDocument } from "@/lib/t3q/client";

/**
 * 매뉴얼 원문 PDF — 임무 상세 「매뉴얼 원문 p.N 열기」(/manual/{docId}#page=N).
 * T3Q 원문을 우리 서버가 받아 그대로 넘긴다(중계): 로그인한 사용자만, T3Q 주소·인증서는 서버에만.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ docId: string }> }) {
  await requireUser();
  const { docId } = await params;
  if (!/^[\w-]{1,64}$/.test(docId)) return new Response("잘못된 문서입니다.", { status: 400 });
  const doc = await manualDocument(docId);
  if (!doc) return new Response("매뉴얼 원문을 불러오지 못했습니다.", { status: 502, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(doc.stream, {
    headers: {
      "Content-Type": doc.type,
      "Content-Disposition": "inline",
      "Cache-Control": "private, max-age=3600",
      ...(doc.length ? { "Content-Length": doc.length } : {}),
    },
  });
}
