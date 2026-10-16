import { notFound } from "next/navigation";
import { requireUser, canEdit } from "@/lib/auth/session";
import { getContactsBundle, getSituation, listDispatches, listEvents } from "@/lib/data";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { seedLibrary, stepOf } from "@/lib/seed";
import { ORG_SIDO, orgForSituation } from "@/lib/regions";
import { STEP_LABEL } from "@/lib/types";
import { SopWorkspace } from "./SopWorkspace";

export default async function SopPage({ params }: PageProps<"/s/[id]/sop">) {
  const { id } = await params;
  const u = await requireUser();
  const s = await getSituation(u, id);
  if (!s) notFound();
  const orgId = orgForSituation(s.orgId, s.sido);
  const db = await getDb();
  const [events, contacts, dispatches, [org]] = await Promise.all([
    listEvents(id),
    getContactsBundle(orgId),
    listDispatches(id),
    db.select().from(schema.orgs).where(eq(schema.orgs.id, orgId)).limit(1),
  ]);
  // SOP 생성과 같은 기준: 자연재난과 관련 행동카드
  const library = seedLibrary(s.hazard, s.sido || ORG_SIDO[s.orgId] || "")
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
      sido={s.sido || ORG_SIDO[s.orgId] || ""}
      title={s.title}
      orgName={org?.name ?? ""}
      dispatches={dispatches.map((d) => ({
        id: d.id,
        token: d.token,
        missionId: d.missionId,
        name: d.name,
        unit: d.unit,
        phone: d.phone,
        sentAt: d.sentAt.toISOString(),
        readAt: d.readAt?.toISOString() ?? null,
        doneAt: d.doneAt?.toISOString() ?? null,
        note: d.note,
        noteAt: d.noteAt?.toISOString() ?? null,
        ackAt: d.ackAt?.toISOString() ?? null,
      }))}
      step={s.responseStep}
    />
  );
}
