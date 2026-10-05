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
  /** 비어 있으면 「조직만」 줄 — 담당자 없는 조직을 남긴다 */
  name: string;
  title: string;
  duty: string;
  phone: string;
  email: string;
  groups: string[];
}

export interface ImportStat {
  added: number;
  updated: number;
  /** 새로 만든 조직 */
  units: number;
  /** 새로 만든 전파그룹 */
  groups: number;
  /** 맞추기: 지운 담당자 · 조직 */
  removed: number;
  removedUnits: number;
  removedNames: string[];
  removedUnitNames: string[];
}

/**
 * 연락망 엑셀 일괄 등록.
 *  - 조직: 「상위 조직 › 조직(부서)」을 조직도 **전체**에서 찾는다 (엑셀에는 바로 위 조직 이름만 있으므로
 *    맨 위에서만 찾으면 3단계 조직이 맨 위에 중복으로 생긴다). 없으면 만든다.
 *  - 담당자: 같은 조직의 같은 이름(또는 같은 이름·번호)이면 고치고, 없으면 추가.
 *  - sync(엑셀과 똑같이 맞추기): 엑셀에 없는 담당자를 지우고, 담당자·하위 조직이 없고 엑셀에도 없는 조직을 지운다.
 *    전파그룹 소속도 엑셀에 적힌 그대로 맞춘다.
 *  - dryRun: 바꾸지 않고 결과(몇 명 추가·수정·삭제)만 돌려준다 — 올리기 전 미리 보기용.
 */
export async function importContacts(
  orgId: string,
  rows: ImportRow[],
  opts: { sync?: boolean; dryRun?: boolean } = {},
): Promise<ImportStat> {
  await manager(orgId);
  if (rows.length > 3000) throw new Error("한 번에 3,000명까지 올릴 수 있습니다.");
  const db = await getDb();
  const units = await db.select().from(schema.orgUnits).where(eq(schema.orgUnits.orgId, orgId));
  const people = await db.select().from(schema.contacts).where(eq(schema.contacts.orgId, orgId));
  const groups = await db.select().from(schema.contactGroups).where(eq(schema.contactGroups.orgId, orgId));
  const digits = (p: string) => p.replace(/\D/g, "");
  const stat: ImportStat = { added: 0, updated: 0, units: 0, groups: 0, removed: 0, removedUnits: 0, removedNames: [], removedUnitNames: [] };

  // 1) 계획 — 메모리에서만 계산
  const newUnits: (typeof units)[number][] = [];
  const nameOf = (id: string | null) => (id ? units.find((u) => u.id === id)?.name : undefined);
  const makeUnit = (name: string, parentId: string | null) => {
    const sort = units.filter((u) => (u.parentId ?? null) === parentId).length;
    const nu = { id: nanoid(10), orgId, parentId, name, kind: parentId ? "dept" : "hq", sort };
    units.push(nu);
    newUnits.push(nu);
    stat.units++;
    return nu;
  };
  /** 이름으로 조직 찾기 (어느 깊이든). 없으면 맨 위에 만든다 */
  const byName = (name: string) => units.find((u) => u.name === name) ?? makeUnit(name, null);
  const resolveUnit = (upper: string, name: string) => {
    const same = units.filter((u) => u.name === name);
    if (upper) {
      const hit = same.find((u) => nameOf(u.parentId) === upper);
      if (hit) return hit;
      return makeUnit(name, byName(upper).id);
    }
    return same.find((u) => !u.parentId) ?? same[0] ?? makeUnit(name, null);
  };

  const touchedUnits = new Set<string>();
  const seen = new Set<string>();
  const inserts: (typeof people)[number][] = [];
  const updates: { id: string; data: Partial<(typeof people)[number]> }[] = [];
  const members = new Map(groups.map((g) => [g.name, new Set(opts.sync ? [] : g.memberIds)]));
  const keepIds = new Set<string>(); // 맞추기에서 엑셀에 없는 사람의 소속은 아래에서 따로 지운다

  for (const r of rows) {
    const unitName = r.unit.trim();
    if (!unitName) continue;
    const u = resolveUnit(r.upper.trim(), unitName);
    touchedUnits.add(u.id);
    if (u.parentId) touchedUnits.add(u.parentId);
    const name = r.name.trim();
    if (!name) continue; // 조직만 있는 줄
    const data = { unitId: u.id, name, title: r.title, duty: r.duty, phone: r.phone, email: r.email };
    const same =
      people.find((p) => !seen.has(p.id) && p.unitId === u.id && p.name === name) ??
      (r.phone ? people.find((p) => !seen.has(p.id) && p.name === name && digits(p.phone) === digits(r.phone)) : undefined);
    let id: string;
    if (same) {
      updates.push({ id: same.id, data });
      Object.assign(same, data);
      id = same.id;
      stat.updated++;
    } else {
      const nc = { ...data, id: nanoid(10), orgId, sort: people.filter((p) => p.unitId === u.id).length };
      people.push(nc);
      inserts.push(nc);
      id = nc.id;
      stat.added++;
    }
    seen.add(id);
    keepIds.add(id);
    for (const g of r.groups) {
      if (!members.has(g)) {
        members.set(g, new Set());
        stat.groups++;
      }
      members.get(g)!.add(id);
    }
  }

  // 맞추기: 엑셀에 없는 담당자 → 삭제, 빈 조직 → 삭제(하위부터)
  const removePeople = opts.sync ? people.filter((p) => !seen.has(p.id)) : [];
  const removeUnits: string[] = [];
  if (opts.sync) {
    const alive = new Set(people.filter((p) => seen.has(p.id)).map((p) => p.unitId));
    let left = units.filter((u) => !touchedUnits.has(u.id) && !alive.has(u.id));
    for (let changed = true; changed; ) {
      changed = false;
      for (const u of left) {
        const hasChild = units.some((c) => c.parentId === u.id && !removeUnits.includes(c.id));
        if (!hasChild) {
          removeUnits.push(u.id);
          changed = true;
        }
      }
      left = left.filter((u) => !removeUnits.includes(u.id));
    }
    // 맞추기가 아니면 기존 소속 유지, 맞추기면 엑셀에 없는 사람은 어떤 그룹에도 남지 않는다
    for (const set of members.values()) for (const id of set) if (!keepIds.has(id)) set.delete(id);
  }
  stat.removed = removePeople.length;
  stat.removedUnits = removeUnits.length;
  stat.removedNames = removePeople.map((p) => `${nameOf(p.unitId) ?? ""} ${p.name}`.trim());
  stat.removedUnitNames = removeUnits.map((id) => nameOf(id) ?? "");
  if (opts.dryRun) return stat;

  // 2) 반영 — 조직(위부터) → 담당자 → 삭제(담당자 → 조직 하위부터) → 전파그룹
  for (const u of newUnits) await db.insert(schema.orgUnits).values(u);
  for (const c of inserts) await db.insert(schema.contacts).values(c);
  for (const x of updates) await db.update(schema.contacts).set(x.data).where(eq(schema.contacts.id, x.id));
  for (const p of removePeople) await db.delete(schema.contacts).where(and(eq(schema.contacts.id, p.id), eq(schema.contacts.orgId, orgId)));
  for (const id of removeUnits) await db.delete(schema.orgUnits).where(and(eq(schema.orgUnits.id, id), eq(schema.orgUnits.orgId, orgId)));
  for (const [name, set] of members) {
    const g = groups.find((x) => x.name === name);
    const ids = Array.from(set);
    if (g) {
      const same = ids.length === g.memberIds.length && ids.every((i) => g.memberIds.includes(i));
      if (!same) await db.update(schema.contactGroups).set({ memberIds: ids }).where(eq(schema.contactGroups.id, g.id));
    } else {
      await db.insert(schema.contactGroups).values({ id: nanoid(10), orgId, name, memberIds: ids, sort: groups.length + stat.groups });
    }
  }
  revalidatePath("/contacts");
  return stat;
}
