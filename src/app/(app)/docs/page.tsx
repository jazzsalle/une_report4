import { requireUser } from "@/lib/auth/session";
import { listReports, listSituations } from "@/lib/data";
import { DocsView } from "./DocsView";

export default async function DocsPage() {
  const u = await requireUser();
  const [reports, situations] = await Promise.all([listReports(u), listSituations(u)]);
  const sit = new Map(situations.map((s) => [s.id, s]));
  return (
    <DocsView
      me={u.id}
      canManage={u.role !== "user"}
      rows={reports.map((r) => {
        const s = r.situationId ? sit.get(r.situationId) : undefined;
        return {
          id: r.id,
          title: r.title,
          status: r.status,
          locked: r.locked,
          hazard: s?.hazard ?? "-",
          level: s?.alertLevel ?? "-",
          owner: r.ownerName ?? "-",
          ownerId: r.ownerId,
          updatedAt: r.updatedAt.toISOString(),
        };
      })}
    />
  );
}
