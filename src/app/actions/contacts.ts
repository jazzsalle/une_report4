"use server";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { getDb, schema } from "@/lib/db";
import { requireUser } from "@/lib/auth/session";

async function manager(orgId: string) {
  const u = await requireUser();
  if (!(u.role === "admin" || (u.role === "manager" && u.orgId === orgId))) throw new Error("관리 권한이 없습니다.");
  return u;
}

export interface ContactInput {
  id?: string;
  orgId: string;
  unitId: string;
  name: string;
  title: string;
  duty: string;
  phone: string;
  email: string;
}

export async function saveContact(v: ContactInput) {
  await manager(v.orgId);
  if (!v.name.trim()) throw new Error("이름을 입력하세요.");
  const db = await getDb();
  if (v.id) {
    await db
      .update(schema.contacts)
      .set({ unitId: v.unitId, name: v.name, title: v.title, duty: v.duty, phone: v.phone, email: v.email })
      .where(and(eq(schema.contacts.id, v.id), eq(schema.contacts.orgId, v.orgId)));
  } else {
    await db.insert(schema.contacts).values({ ...v, id: nanoid(10), sort: 99 });
  }
  revalidatePath("/contacts");
}

export async function deleteContact(orgId: string, id: string) {
  await manager(orgId);
  const db = await getDb();
  await db.delete(schema.contacts).where(and(eq(schema.contacts.id, id), eq(schema.contacts.orgId, orgId)));
  const groups = await db.select().from(schema.contactGroups).where(eq(schema.contactGroups.orgId, orgId));
  for (const g of groups) {
    if (g.memberIds.includes(id)) {
      await db
        .update(schema.contactGroups)
        .set({ memberIds: g.memberIds.filter((x) => x !== id) })
        .where(eq(schema.contactGroups.id, g.id));
    }
  }
  revalidatePath("/contacts");
}

export async function saveUnit(v: { id?: string; orgId: string; parentId: string | null; name: string; kind: string }) {
  await manager(v.orgId);
  if (!v.name.trim()) throw new Error("이름을 입력하세요.");
  const db = await getDb();
  if (v.id) {
    await db
      .update(schema.orgUnits)
      .set({ name: v.name, parentId: v.parentId, kind: v.kind })
      .where(and(eq(schema.orgUnits.id, v.id), eq(schema.orgUnits.orgId, v.orgId)));
  } else {
    await db.insert(schema.orgUnits).values({ ...v, id: nanoid(10), sort: 99 });
  }
  revalidatePath("/contacts");
}

export async function deleteUnit(orgId: string, id: string) {
  await manager(orgId);
  const db = await getDb();
  const units = await db.select().from(schema.orgUnits).where(eq(schema.orgUnits.orgId, orgId));
  const has = units.some((u) => u.parentId === id);
  const people = await db.select().from(schema.contacts).where(eq(schema.contacts.unitId, id)).limit(1);
  if (has || people.length) throw new Error("하위 조직이나 담당자가 있으면 삭제할 수 없습니다.");
  await db.delete(schema.orgUnits).where(eq(schema.orgUnits.id, id));
  revalidatePath("/contacts");
}

export async function saveGroup(v: { id?: string; orgId: string; name: string; memberIds: string[] }) {
  await manager(v.orgId);
  if (!v.name.trim()) throw new Error("그룹명을 입력하세요.");
  const db = await getDb();
  if (v.id) {
    await db
      .update(schema.contactGroups)
      .set({ name: v.name, memberIds: v.memberIds })
      .where(and(eq(schema.contactGroups.id, v.id), eq(schema.contactGroups.orgId, v.orgId)));
  } else {
    await db.insert(schema.contactGroups).values({ ...v, id: nanoid(10), sort: 99 });
  }
  revalidatePath("/contacts");
}

export async function deleteGroup(orgId: string, id: string) {
  await manager(orgId);
  const db = await getDb();
  await db.delete(schema.contactGroups).where(and(eq(schema.contactGroups.id, id), eq(schema.contactGroups.orgId, orgId)));
  revalidatePath("/contacts");
}

export interface ImportRow {
  upper: string;
  unit: string;
  name: string;
  title: string;
  duty: string;
  phone: string;
  email: string;
  groups: string[];
}

/**
 * 연락망 엑셀 일괄 등록 — 없는 조직·전파그룹은 만들고,
 * 같은 조직의 같은 이름(또는 같은 이름·번호)이면 고치고, 없으면 추가한다. 엑셀에 없는 사람은 지우지 않는다.
 */
export async function importContacts(orgId: string, rows: ImportRow[]) {
  await manager(orgId);
  if (rows.length > 3000) throw new Error("한 번에 3,000명까지 올릴 수 있습니다.");
  const db = await getDb();
  const units = await db.select().from(schema.orgUnits).where(eq(schema.orgUnits.orgId, orgId));
  const people = await db.select().from(schema.contacts).where(eq(schema.contacts.orgId, orgId));
  const groups = await db.select().from(schema.contactGroups).where(eq(schema.contactGroups.orgId, orgId));
  const digits = (p: string) => p.replace(/\D/g, "");
  const stat = { added: 0, updated: 0, units: 0, groups: 0 };

  const findUnit = async (name: string, parentId: string | null) => {
    const hit = units.find((u) => u.name === name && (u.parentId ?? null) === parentId);
    if (hit) return hit.id;
    const sort = units.filter((u) => (u.parentId ?? null) === parentId).length;
    const nu = { id: nanoid(10), orgId, parentId, name, kind: parentId ? "dept" : "hq", sort };
    await db.insert(schema.orgUnits).values(nu);
    units.push(nu);
    stat.units++;
    return nu.id;
  };

  const members = new Map(groups.map((g) => [g.name, new Set(g.memberIds)]));
  for (const r of rows) {
    const name = r.name.trim();
    const unitName = r.unit.trim();
    if (!name || !unitName) continue;
    const parentId = r.upper.trim() ? await findUnit(r.upper.trim(), null) : null;
    const unitId = await findUnit(unitName, parentId);
    const data = { unitId, name, title: r.title, duty: r.duty, phone: r.phone, email: r.email };
    const same =
      people.find((p) => p.unitId === unitId && p.name === name) ??
      (r.phone ? people.find((p) => p.name === name && digits(p.phone) === digits(r.phone)) : undefined);
    let id: string;
    if (same) {
      await db.update(schema.contacts).set(data).where(eq(schema.contacts.id, same.id));
      Object.assign(same, data);
      id = same.id;
      stat.updated++;
    } else {
      const nc = { ...data, id: nanoid(10), orgId, sort: people.filter((p) => p.unitId === unitId).length };
      await db.insert(schema.contacts).values(nc);
      people.push(nc);
      id = nc.id;
      stat.added++;
    }
    for (const g of r.groups) {
      if (!members.has(g)) {
        members.set(g, new Set());
        stat.groups++;
      }
      members.get(g)!.add(id);
    }
  }

  for (const [name, set] of members) {
    const g = groups.find((x) => x.name === name);
    if (g) {
      if (set.size !== g.memberIds.length)
        await db.update(schema.contactGroups).set({ memberIds: Array.from(set) }).where(eq(schema.contactGroups.id, g.id));
    } else {
      await db.insert(schema.contactGroups).values({ id: nanoid(10), orgId, name, memberIds: Array.from(set), sort: groups.length + stat.groups });
    }
  }
  revalidatePath("/contacts");
  return stat;
}
