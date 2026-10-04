import Link from "next/link";
import { notFound } from "next/navigation";
import { and, desc, eq, isNull } from "drizzle-orm";
import { ChevronRight } from "lucide-react";
import { requireUser, canEdit } from "@/lib/auth/session";
import { getSituation } from "@/lib/data";
import { getDb, schema } from "@/lib/db";
import { fmtDateTime } from "@/lib/format";
import { Badge, Card, CardHead, Empty } from "@/components/ui";
import { CreateReportButton } from "./CreateReportButton";

export default async function SituationReports({ params }: PageProps<"/s/[id]/report">) {
  const { id } = await params;
  const u = await requireUser();
  const s = await getSituation(u, id);
  if (!s) notFound();
  const db = await getDb();
  const reports = await db
    .select()
    .from(schema.reports)
    .where(and(eq(schema.reports.situationId, id), isNull(schema.reports.deletedAt)))
    .orderBy(desc(schema.reports.updatedAt));
  const ms = s.sop?.missions ?? [];

  return (
    <Card>
      <CardHead
        title="상황일지"
        right={canEdit(u, s) && <CreateReportButton id={id} primary={s.status === "done" || reports.length === 0} />}
      />
      {s.status !== "done" && (
        <div className="mx-6 mt-5 rounded-md bg-warning-weak px-5 py-4 text-warning">
          {s.sop?.startedAt
            ? `SOP 실행 중 · 완료 ${ms.filter((m) => m.status === "done").length}/${ms.length}`
            : "SOP 실행 전"}
        </div>
      )}
      {reports.length === 0 ? (
        <Empty>작성된 상황일지가 없습니다.</Empty>
      ) : (
        <ul className="px-6 py-3">
          {reports.map((r) => (
            <li key={r.id} className="border-b border-line-weak last:border-0">
              <Link href={`/reports/${r.id}`} className="flex items-center gap-4 py-5 hover:text-primary">
                <span className="text-[18px] font-semibold">{r.title}</span>
                {r.status === "final" ? <Badge tone="green">확정</Badge> : <Badge tone="gray">작성 중</Badge>}
                <span className="ml-auto text-sub">{fmtDateTime(r.updatedAt)}</span>
                <ChevronRight size={20} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
