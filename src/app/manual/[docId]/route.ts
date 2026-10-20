import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { sopMode } from "@/lib/t3q/client";

/**
 * 매뉴얼 원문 PDF 열기 — 임무 상세 「매뉴얼 원문 p.34 열기」.
 * T3Q 문서 주소(T3Q_SOP_URL)는 서버에만 두고, 로그인한 사용자만 T3Q 원문 보기로 보낸다. ?p= PDF 쪽(1부터)
 */
export async function GET(req: Request, { params }: { params: Promise<{ docId: string }> }) {
  await requireUser();
  const { docId } = await params;
  if (sopMode() !== "live" || !/^[\w-]{1,64}$/.test(docId)) notFound();
  const page = Number(new URL(req.url).searchParams.get("p")) || 1;
  const base = process.env.T3Q_SOP_URL!.replace(/\/$/, "");
  redirect(`${base}/documents/${docId}/download?disposition=inline#page=${page}`);
}
