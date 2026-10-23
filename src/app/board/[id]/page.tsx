import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { getContactsBundle, getSituation } from "@/lib/data";
import { orgForSituation } from "@/lib/regions";
import { BoardView } from "./BoardView";

/** 분리된 SOP 창 (머리말 없이 흐름도만) */
export default async function BoardPage({ params }: PageProps<"/board/[id]">) {
  const { id } = await params;
  const u = await requireUser();
  const s = await getSituation(u, id);
  if (!s || !s.sop) notFound();
  const contacts = await getContactsBundle(orgForSituation(s.orgId, s.sido));
  return (
    <BoardView
      id={id}
      title={s.title}
      sop={s.sop}
      groups={contacts.groups.map((g) => ({ id: g.id, name: g.name, memberIds: g.memberIds }))}
      contacts={contacts.contacts.map((c) => ({ id: c.id, name: c.name, title: c.title }))}
      units={contacts.units.map((u) => ({ id: u.id, name: u.name }))}
    />
  );
}
