import { notFound } from "next/navigation";
import { requireUser, canEdit } from "@/lib/auth/session";
import { getReport, getSituation } from "@/lib/data";
import { ReportEditor } from "./ReportEditor";

export default async function ReportPage({ params }: PageProps<"/reports/[rid]">) {
  const { rid } = await params;
  const u = await requireUser();
  const r = await getReport(u, rid);
  if (!r || r.deletedAt) notFound();
  // 상황을 지워도 상황일지는 남는다 — 상황이 없으면(휴지통·삭제) 상황 경로 없이 문서만
  const s = r.situationId ? await getSituation(u, r.situationId) : null;
  return (
    <ReportEditor
      id={r.id}
      situationId={s ? s.id : null}
      situationTitle={s?.title ?? null}
      name={r.title}
      initial={r.content}
      locked={r.locked}
      hasHwpx={!!r.hwpxData}
      hwpxSavedAt={r.hwpxSavedAt?.toISOString() ?? null}
      editable={canEdit(u, r)}
    />
  );
}
