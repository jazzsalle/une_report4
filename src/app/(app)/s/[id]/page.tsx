import { notFound } from "next/navigation";
import { requireUser, canEdit } from "@/lib/auth/session";
import { getSituation } from "@/lib/data";
import { toLocalInput } from "@/lib/format";
import { OverviewView } from "./OverviewView";
import { ORG_SIDO } from "@/lib/regions";

export default async function OverviewPage({ params }: PageProps<"/s/[id]">) {
  const { id } = await params;
  const u = await requireUser();
  const s = await getSituation(u, id);
  if (!s) notFound();
  return (
    <OverviewView
      id={s.id}
      editable={canEdit(u, s)}
      hasSop={!!s.sop}
      input={{
        title: s.title,
        kind: s.kind as "real" | "drill",
        hazard: s.hazard,
        alertLevel: s.alertLevel,
        step: s.responseStep,
        sido: s.sido || ORG_SIDO[s.orgId] || "부산광역시",
        areas: s.areas,
        dept: s.dept,
        periodStart: toLocalInput(s.periodStart),
        periodEnd: s.periodEnd ? toLocalInput(s.periodEnd) : null,
        currentStatus: s.currentStatus,
      }}
      weather={s.weather}
      images={s.weatherImages}
      me={{ name: u.name, dept: u.dept }}
    />
  );
}
