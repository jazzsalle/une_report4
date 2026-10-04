import { redirect } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { requireUser } from "@/lib/auth/session";
import { getDb, schema } from "@/lib/db";
import { AdminView } from "./AdminView";

export default async function AdminPage() {
  const u = await requireUser();
  if (u.role === "user") redirect("/");
  const db = await getDb();
  const orgs = await db.select().from(schema.orgs);
  const users = await db
    .select()
    .from(schema.users)
    .where(u.role === "admin" ? undefined : eq(schema.users.orgId, u.orgId))
    .orderBy(asc(schema.users.orgId), asc(schema.users.loginId));
  return (
    <AdminView
      meId={u.id}
      isAdmin={u.role === "admin"}
      myOrg={u.orgId}
      orgs={orgs.map((o) => ({ id: o.id, name: o.name }))}
      users={users.map((x) => ({
        id: x.id,
        loginId: x.loginId,
        name: x.name,
        dept: x.dept,
        orgId: x.orgId,
        role: x.role,
        active: x.active,
        lastLoginAt: x.lastLoginAt?.toISOString() ?? null,
      }))}
    />
  );
}
