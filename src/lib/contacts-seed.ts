import "server-only";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getDb, schema } from "@/lib/db";

/**
 * 기본 세팅: 연락망이 빈 기관에 간단한 자연재난과 예시 조직을 넣는다.
 * 「{기관명} 재난안전대책본부」 › 자연재난과 · 재난안전상황실 · OOO과 + 「유관기관」 5곳(소방·경찰·기상청·군·한전),
 * 담당자 11명(홍OO 등, 010-0000-0000), 전파그룹 「상황관리반」「유관기관」. 상황전파는 유관기관이 가장 중요해 꼭 넣는다.
 * 이미 조직이 있으면 아무것도 하지 않고 false. 운영관리(une)처럼 연락망을 쓰지 않는 기관도 건너뛴다.
 */
export async function ensureExampleContacts(orgId: string): Promise<boolean> {
  if (!orgId || orgId === "une") return false;
  const db = await getDb();
  const exist = await db.select().from(schema.orgUnits).where(eq(schema.orgUnits.orgId, orgId)).limit(1);
  if (exist.length) return false;
  const [org] = await db.select().from(schema.orgs).where(eq(schema.orgs.id, orgId)).limit(1);
  const hq = { id: nanoid(10), orgId, parentId: null, name: `${org?.name || "OO시"} 재난안전대책본부`, kind: "hq", sort: 0 };
  const depts = [
    { name: "자연재난과", people: [["김OO", "과장", "자연재난 총괄"], ["이OO", "자연재난팀장", "상황관리"], ["박OO", "주무관", "기상특보 전파"]] },
    { name: "재난안전상황실", people: [["최OO", "상황근무자", "상황 접수·보고"]] },
    { name: "OOO과", people: [["정OO", "팀장", "협업부서 담당"]] },
  ];
  const units = [hq, ...depts.map((d, i) => ({ id: nanoid(10), orgId, parentId: hq.id, name: d.name, kind: "dept", sort: i }))];
  const person = (unitId: string, [name, title, duty]: string[], sort: number) => ({
    id: nanoid(10),
    orgId,
    unitId,
    name,
    title,
    duty,
    phone: "010-0000-0000",
    email: "",
    sort,
  });
  // 유관기관 — 비상연락망 화면에서 별도 묶음으로 보인다
  const agencyRoot = { id: nanoid(10), orgId, parentId: null, name: "유관기관", kind: "agency", sort: 1 };
  const agencies = [
    ["OO소방본부", "송OO", "상황실장", "화재·구조 출동"],
    ["OO경찰청", "오OO", "경비계장", "교통통제·주민대피 지원"],
    ["OO지방기상청", "서OO", "예보관", "기상 정보 제공"],
    ["육군 제OO사단", "신OO", "작전과장", "대민지원 병력"],
    ["한국전력공사 OO본부", "권OO", "재난담당", "정전 복구"],
  ];
  const agencyUnits = agencies.map(([name], i) => ({ id: nanoid(10), orgId, parentId: agencyRoot.id, name, kind: "agency", sort: i }));
  units.push(agencyRoot, ...agencyUnits);
  const people = [
    person(hq.id, ["홍OO", "본부장", "재대본 총괄"], 0),
    ...depts.flatMap((d, i) => d.people.map((p, k) => person(units[i + 1].id, p, k))),
    ...agencies.map(([, name, title, duty], i) => person(agencyUnits[i].id, [name, title, duty], 0)),
  ];
  await db.insert(schema.orgUnits).values(units);
  await db.insert(schema.contacts).values(people);
  // 상황관리반 = 자연재난과 + 재난안전상황실
  const situationRoom = new Set([units[1].id, units[2].id]);
  const agencySet = new Set(agencyUnits.map((u) => u.id));
  await db.insert(schema.contactGroups).values([
    { id: nanoid(10), orgId, name: "상황관리반", sort: 0, memberIds: people.filter((p) => situationRoom.has(p.unitId)).map((p) => p.id) },
    { id: nanoid(10), orgId, name: "유관기관", sort: 1, memberIds: people.filter((p) => agencySet.has(p.unitId)).map((p) => p.id) },
  ]);
  return true;
}
