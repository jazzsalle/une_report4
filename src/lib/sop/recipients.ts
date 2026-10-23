/** 전파 대상(전파그룹·조직·담당자) → 실제 수신자 — 화면과 서버가 같이 쓴다 */

type Unit = { id: string; parentId: string | null; name: string };
type Contact = { id: string; unitId: string; name: string; title: string };
type Group = { id: string; name: string; memberIds: string[] };
export type RecipientBundle<C extends Contact = Contact> = { units: Unit[]; contacts: C[]; groups: Group[] };
export type Selection = { contactIds: string[]; groupIds: string[]; unitIds?: string[] };

/** 조직과 그 하위 조직 id 전체 */
export function unitTree(units: Unit[], id: string): string[] {
  const out = [id];
  for (let i = 0; i < out.length; i++) units.filter((u) => u.parentId === out[i]).forEach((u) => out.push(u.id));
  return out;
}

/** 조직에 속한 담당자 (하위 조직 포함) */
export function unitMembers(b: Pick<RecipientBundle, "units" | "contacts">, id: string): string[] {
  const ids = new Set(unitTree(b.units, id));
  return b.contacts.filter((c) => ids.has(c.unitId)).map((c) => c.id);
}

export function recipientIds(b: RecipientBundle, s: Selection): Set<string> {
  const ids = new Set(s.contactIds);
  b.groups.filter((g) => s.groupIds.includes(g.id)).forEach((g) => g.memberIds.forEach((x) => ids.add(x)));
  (s.unitIds ?? []).forEach((u) => unitMembers(b, u).forEach((x) => ids.add(x)));
  return ids;
}

export function resolveRecipients<C extends Contact>(b: RecipientBundle<C>, s: Selection) {
  const ids = recipientIds(b, s);
  const unit = new Map(b.units.map((u) => [u.id, u.name]));
  return b.contacts.filter((c) => ids.has(c.id)).map((c) => ({ ...c, unit: unit.get(c.unitId) ?? "" }));
}
