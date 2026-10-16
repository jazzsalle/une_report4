import { requireUser } from "@/lib/auth/session";
import { listReports, listSituations } from "@/lib/data";
import { DocsView } from "./DocsView";

export default async function DocsPage() {
  const u = await requireUser();
  const [reports, situations, trashed] = await Promise.all([listReports(u), listSituations(u), listSituations(u, { trashed: true })]);
  const sit = new Map(situations.map((s) => [s.id, s]));
  // 휴지통에 있는 상황의 상황일지는 상황과 함께 숨긴다 (복원하면 다시 보임)
  const hidden = new Set(trashed.map((s) => s.id));
  return (
    <DocsView
      me={u.id}
      canManage={u.role !== "user"}
      rows={reports.filter((r) => !r.situationId || !hidden.has(r.situationId)).map((r) => {
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
