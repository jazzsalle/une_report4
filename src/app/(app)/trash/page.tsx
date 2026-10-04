import { requireUser } from "@/lib/auth/session";
import { listReports, listSituations } from "@/lib/data";
import { purgeExpired } from "@/app/actions/report";
import { TrashView } from "./TrashView";
import { daysLeft } from "@/lib/format";

export default async function TrashPage() {
  const u = await requireUser();
  await purgeExpired();
  const [reports, situations] = await Promise.all([listReports(u, { trashed: true }), listSituations(u, { trashed: true })]);
  const rows = [
    ...situations.map((s) => ({ id: s.id, kind: "상황" as const, title: s.title, deletedAt: s.deletedAt!.toISOString() })),
    ...reports.map((r) => ({ id: r.id, kind: "상황일지" as const, title: r.title, deletedAt: r.deletedAt!.toISOString() })),
  ].sort((a, b) => b.deletedAt.localeCompare(a.deletedAt));
  return <TrashView rows={rows.map((r) => ({ ...r, left: daysLeft(r.deletedAt) }))} />;
}
