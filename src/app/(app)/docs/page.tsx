import { requireUser } from "@/lib/auth/session";
import { listReports, listSituations } from "@/lib/data";
import { snapshotLabel } from "@/lib/report/snapshot";
import { DocsView } from "./DocsView";

export default async function DocsPage() {
  const u = await requireUser();
  const [reports, situations, trashed] = await Promise.all([listReports(u), listSituations(u), listSituations(u, { trashed: true })]);
  // 상황을 지워도 상황일지는 남는다 — 휴지통 상황도 찾고, 완전히 지워졌으면 상황일지 「상황 개요」에서 읽는다
  const sit = new Map([...situations, ...trashed].map((s) => [s.id, s]));
  const fromOverview = (body: string | null, re: RegExp) => body?.match(re)?.[1];
  return (
    <DocsView
      me={u.id}
      canManage={u.role !== "user"}
      rows={reports.map((r) => {
        const s = r.situationId ? sit.get(r.situationId) : undefined;
        return {
          id: r.id,
          title: r.title,
          locked: r.locked,
          // 만들 당시 단계 · 상황: 상위 상황명 (상황이 지워졌으면 생략)
          sub: [snapshotLabel(r.snapshot), s ? `상황: ${s.title}` : null].filter(Boolean).join(" · "),
          hazard: s?.hazard ?? fromOverview(r.overview, /재난유형: ([^\s(]+)/) ?? "-",
          level: s?.alertLevel ?? fromOverview(r.overview, /위기경보: ([^\s(]+)/) ?? "-",
          owner: r.ownerName ?? "-",
          ownerId: r.ownerId,
          updatedAt: r.updatedAt.toISOString(),
        };
      })}
    />
  );
}
