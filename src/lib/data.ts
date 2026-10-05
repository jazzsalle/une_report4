import "server-only";
import { and, asc, desc, eq, isNull, isNotNull } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getDb, schema } from "@/lib/db";
import type { SessionUser } from "@/lib/types";

export type Situation = typeof schema.situations.$inferSelect;
export type EventRow = typeof schema.events.$inferSelect;
export type Report = typeof schema.reports.$inferSelect;

/** 문서 범위: 모든 계정(운영관리자 포함)은 자기가 만든 상황·문서만. 다른 계정 문서는 그 계정으로 들어가서 본다 */
const ownScope = (u: SessionUser, col: typeof schema.situations.ownerId | typeof schema.reports.ownerId) => eq(col, u.id);

export async function listSituations(u: SessionUser, opts: { trashed?: boolean } = {}) {
  const db = await getDb();
  const s = schema.situations;
  return db
    .select()
    .from(s)
    .where(and(ownScope(u, s.ownerId), opts.trashed ? isNotNull(s.deletedAt) : isNull(s.deletedAt)))
    .orderBy(desc(s.updatedAt));
}

export async function getSituation(u: SessionUser, id: string): Promise<Situation | null> {
  const db = await getDb();
  const [row] = await db.select().from(schema.situations).where(eq(schema.situations.id, id)).limit(1);
  if (!row) return null;
  if (row.ownerId !== u.id) return null;
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
    .where(and(ownScope(u, r.ownerId), opts.trashed ? isNotNull(r.deletedAt) : isNull(r.deletedAt)))
    .orderBy(desc(r.updatedAt));
}

export async function getReport(u: SessionUser, id: string): Promise<Report | null> {
  const db = await getDb();
  const [row] = await db.select().from(schema.reports).where(eq(schema.reports.id, id)).limit(1);
  if (!row) return null;
  if (row.ownerId !== u.id) return null;
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

export type Dispatch = typeof schema.dispatches.$inferSelect;

export async function listDispatches(situationId: string) {
  const db = await getDb();
  return db
    .select()
    .from(schema.dispatches)
    .where(eq(schema.dispatches.situationId, situationId))
    .orderBy(asc(schema.dispatches.sentAt));
}

/** 현장 응답 화면용: 토큰 → 발송 + 상황·임무 */
export async function getDispatchByToken(token: string) {
  const db = await getDb();
  const [d] = await db.select().from(schema.dispatches).where(eq(schema.dispatches.token, token)).limit(1);
  if (!d) return null;
  const [s] = await db.select().from(schema.situations).where(eq(schema.situations.id, d.situationId)).limit(1);
  if (!s) return null;
  const [org] = await db.select().from(schema.orgs).where(eq(schema.orgs.id, s.orgId)).limit(1);
  const mission = s.sop?.missions.find((m) => m.id === d.missionId) ?? null;
  return { d, situation: { title: s.title, hazard: s.hazard, sido: s.sido }, orgName: org?.name ?? "", mission };
}
