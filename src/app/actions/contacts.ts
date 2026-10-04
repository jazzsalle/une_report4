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
