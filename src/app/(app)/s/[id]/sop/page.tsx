import { notFound } from "next/navigation";
import { requireUser, canEdit } from "@/lib/auth/session";
import { getContactsBundle, getSituation, listEvents } from "@/lib/data";
import { seedLibrary, stepOf } from "@/lib/seed";
import { orgForSituation } from "@/lib/regions";
import { STEP_LABEL } from "@/lib/types";
import { SopWorkspace } from "./SopWorkspace";

export default async function SopPage({ params }: PageProps<"/s/[id]/sop">) {
  const { id } = await params;
  const u = await requireUser();
  const s = await getSituation(u, id);
  if (!s) notFound();
  const [events, contacts] = await Promise.all([listEvents(id), getContactsBundle(orgForSituation(s.orgId, s.sido))]);
  // SOP 생성과 같은 기준: 자연재난과 관련 행동카드
  const library = seedLibrary(s.hazard)
    .actions.filter((a) => a.nd !== false)
    .map((a) => ({
    code: a.code,
    stage: STEP_LABEL[stepOf(a)],
    step: stepOf(a),
    phase: a.phase,
    title: a.title,
    lead: a.lead,
  }));
  return (
    <SopWorkspace
      id={id}
      sop={s.sop}
      editable={canEdit(u, s)}
      me={u.name}
      events={events.map((e) => ({ ...e, at: e.at.toISOString() }))}
      contacts={contacts}
      library={library}
      hazard={s.hazard}
      step={s.responseStep}
    />
  );
}
