import { notFound } from "next/navigation";
import { requireUser, canEdit } from "@/lib/auth/session";
import { getReport, getSituation } from "@/lib/data";
import { ReportEditor } from "./ReportEditor";

export default async function ReportPage({ params }: PageProps<"/reports/[rid]">) {
  const { rid } = await params;
  const u = await requireUser();
  const r = await getReport(u, rid);
  if (!r || r.deletedAt) notFound();
  const s = r.situationId ? await getSituation(u, r.situationId) : null;
  return (
    <ReportEditor
      id={r.id}
      situationId={r.situationId}
      situationTitle={s?.title ?? null}
      initial={r.content}
      status={r.status}
      locked={r.locked}
      hasHwpx={!!r.hwpxData}
      hwpxSavedAt={r.hwpxSavedAt?.toISOString() ?? null}
      editable={canEdit(u, r)}
    />
  );
}
