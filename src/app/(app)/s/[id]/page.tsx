import { notFound } from "next/navigation";
import { requireUser, canEdit } from "@/lib/auth/session";
import { getSituation } from "@/lib/data";
import { toLocalInput } from "@/lib/format";
import { OverviewView } from "./OverviewView";

export default async function OverviewPage({ params }: PageProps<"/s/[id]">) {
  const { id } = await params;
  const u = await requireUser();
  const s = await getSituation(u, id);
  if (!s) notFound();
  return (
    <OverviewView
      id={s.id}
      orgId={s.orgId}
      editable={canEdit(u, s)}
      hasSop={!!s.sop}
      input={{
        title: s.title,
        kind: s.kind as "real" | "drill",
        hazard: s.hazard,
        alertLevel: s.alertLevel,
        step: s.responseStep,
        areas: s.areas,
        periodStart: toLocalInput(s.periodStart),
        periodEnd: s.periodEnd ? toLocalInput(s.periodEnd) : null,
        currentStatus: s.currentStatus,
      }}
      weather={s.weather}
      summary={s.weatherSummary}
    />
  );
}
