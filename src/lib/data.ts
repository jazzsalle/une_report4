import "server-only";
import { and, asc, desc, eq, isNull, isNotNull } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getDb, schema } from "@/lib/db";
import type { SessionUser } from "@/lib/types";

export type Situation = typeof schema.situations.$inferSelect;
export type EventRow = typeof schema.events.$inferSelect;
export type Report = typeof schema.reports.$inferSelect;

const orgScope = (u: SessionUser, col: typeof schema.situations.orgId | typeof schema.reports.orgId) =>
  u.role === "admin" ? undefined : eq(col, u.orgId);

export async function listSituations(u: SessionUser, opts: { trashed?: boolean } = {}) {
  const db = await getDb();
  const s = schema.situations;
  return db
    .select()
    .from(s)
    .where(and(orgScope(u, s.orgId), opts.trashed ? isNotNull(s.deletedAt) : isNull(s.deletedAt)))
    .orderBy(desc(s.updatedAt));
}

export async function getSituation(u: SessionUser, id: string): Promise<Situation | null> {
  const db = await getDb();
  const [row] = await db.select().from(schema.situations).where(eq(schema.situations.id, id)).limit(1);
  if (!row) return null;
  if (u.role !== "admin" && row.orgId !== u.orgId) return null;
  return row;
}

export async function listEvents(situationId: string) {
  const db = await getDb();
  return db.select().from(schema.events).where(eq(schema.events.situationId, situationId)).orderBy(asc(schema.events.at));
}

export async function addEvent(
  situationId: string,
  e: { type: string; title: string; body?: string; missionId?: string | null; userName?: string; meta?: Record<string, unknown>; at?: Date },
) {
  const db = await getDb();
  const row = {
    id: nanoid(12),
    situationId,
    type: e.type,
    title: e.title,
    body: e.body ?? "",
    missionId: e.missionId ?? null,
    userName: e.userName ?? "",
    meta: e.meta ?? null,
    at: e.at ?? new Date(),
  };
  await db.insert(schema.events).values(row);
  return row;
}

export async function listReports(u: SessionUser, opts: { trashed?: boolean } = {}) {
  const db = await getDb();
  const r = schema.reports;
  return db
    .select({
      id: r.id,
      title: r.title,
      situationId: r.situationId,
      ownerId: r.ownerId,
      orgId: r.orgId,
      status: r.status,
      updatedAt: r.updatedAt,
      createdAt: r.createdAt,
      deletedAt: r.deletedAt,
      ownerName: schema.users.name,
    })
    .from(r)
    .leftJoin(schema.users, eq(schema.users.id, r.ownerId))
    .where(and(orgScope(u, r.orgId), opts.trashed ? isNotNull(r.deletedAt) : isNull(r.deletedAt)))
    .orderBy(desc(r.updatedAt));
}

export async function getReport(u: SessionUser, id: string): Promise<Report | null> {
  const db = await getDb();
  const [row] = await db.select().from(schema.reports).where(eq(schema.reports.id, id)).limit(1);
  if (!row) return null;
  if (u.role !== "admin" && row.orgId !== u.orgId) return null;
  return row;
}

export async function userNames(ids: string[]) {
  if (!ids.length) return new Map<string, string>();
  const db = await getDb();
  const rows = await db.select({ id: schema.users.id, name: schema.users.name }).from(schema.users);
  return new Map(rows.map((r) => [r.id, r.name]));
}

export async function getContactsBundle(orgId: string) {
  const db = await getDb();
  const [units, contacts, groups] = await Promise.all([
    db.select().from(schema.orgUnits).where(eq(schema.orgUnits.orgId, orgId)).orderBy(asc(schema.orgUnits.sort)),
    db.select().from(schema.contacts).where(eq(schema.contacts.orgId, orgId)).orderBy(asc(schema.contacts.sort)),
    db.select().from(schema.contactGroups).where(eq(schema.contactGroups.orgId, orgId)).orderBy(asc(schema.contactGroups.sort)),
  ]);
  return { units, contacts, groups };
}
export type ContactsBundle = Awaited<ReturnType<typeof getContactsBundle>>;
