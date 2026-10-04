import { requireUser } from "@/lib/auth/session";
import { getContactsBundle } from "@/lib/data";
import { getDb, schema } from "@/lib/db";
import { ContactsView } from "./ContactsView";

export default async function ContactsPage({ searchParams }: PageProps<"/contacts">) {
  const u = await requireUser();
  const sp = await searchParams;
  const db = await getDb();
  const orgs = (await db.select().from(schema.orgs)).filter((o) => o.id !== "une");
  const orgId = u.role === "admin" ? String(sp.org ?? "busan") : u.orgId;
  const bundle = await getContactsBundle(orgId);
  return (
    <ContactsView
      orgId={orgId}
      orgs={u.role === "admin" ? orgs.map((o) => ({ id: o.id, name: o.name })) : []}
      bundle={bundle}
      canManage={u.role === "admin" || (u.role === "manager" && u.orgId === orgId)}
    />
  );
}
