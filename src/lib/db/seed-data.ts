/**
 * 기본 조직·비상연락망 시드. 인명·연락처는 모두 가상 데이터(010-0000-xxxx)이며
 * 배포 후 기관 관리자가 연락망 화면에서 실제 담당자로 교체한다.
 */

export const ORGS = [
  { id: "busan", name: "부산광역시", short: "부산", stnId: "159", defaultHazard: "태풍/호우" },
  { id: "gyeongbuk", name: "경상북도", short: "경북", stnId: "143", defaultHazard: "산불" },
  { id: "une", name: "운영관리", short: "운영", stnId: "109", defaultHazard: "태풍/호우" },
  { id: "t3q", name: "T3Q", short: "T3Q", stnId: "159", defaultHazard: "태풍/호우" },
];

type UnitSeed = {
  name: string;
  kind: "hq" | "team" | "dept" | "agency";
  people?: [string, string, string][]; // [이름, 직위, 임무]
  children?: UnitSeed[];
};

const SURNAMES = "김이박최정강조윤장임한오서신권황안송류홍".split("");
const GIVEN = ["민준", "서연", "도윤", "지우", "하준", "서윤", "은우", "지민", "현우", "수빈", "준서", "예린", "건우", "다은", "우진", "채원", "시우", "지현", "유진", "태희"];
let nameSeq = 0;
function fake(): string {
  const n = nameSeq++;
  return SURNAMES[(n * 7) % SURNAMES.length] + GIVEN[(n * 3) % GIVEN.length];
}

const p = (title: string, duty = ""): [string, string, string] => [fake(), title, duty];

export const BUSAN_TREE: UnitSeed[] = [
  {
    name: "부산광역시 재난안전대책본부",
    kind: "hq",
    people: [p("본부장(시장)", "재대본 총괄"), p("차장(행정부시장)", "본부장 보좌"), p("통제관(시민안전실장)", "재난 수습 통제")],
    children: [
      {
        name: "재난상황관리반",
        kind: "team",
        children: [
          { name: "자연재난과", kind: "dept", people: [p("과장", "상황관리 총괄"), p("자연재난팀장", "상황보고"), p("주무관", "NDMS 입력"), p("주무관", "상황전파")] },
          { name: "재난안전상황실", kind: "dept", people: [p("실장", "상황실 운영"), p("상황근무자", "특보 접수·전파")] },
          { name: "사회재난과", kind: "dept", people: [p("팀장", "상황 지원")] },
        ],
      },
      {
        name: "시설응급복구반",
        kind: "team",
        children: [
          { name: "도로안전과", kind: "dept", people: [p("팀장", "도로 응급복구")] },
          { name: "하천관리과", kind: "dept", people: [p("팀장", "하천시설 점검")] },
          { name: "공공하수인프라과", kind: "dept", people: [p("팀장", "배수시설 관리")] },
        ],
      },
      {
        name: "긴급생활안정지원반",
        kind: "team",
        children: [{ name: "복지정책과", kind: "dept", people: [p("팀장", "이재민 구호")] }],
      },
      {
        name: "교통대책반",
        kind: "team",
        children: [{ name: "교통혁신과", kind: "dept", people: [p("팀장", "교통 통제·우회")] }],
      },
      {
        name: "재난수습홍보반",
        kind: "team",
        children: [{ name: "공보담당관", kind: "dept", people: [p("팀장", "언론 대응")] }],
      },
    ],
  },
  {
    name: "구·군 재난안전부서",
    kind: "agency",
    children: ["해운대구", "수영구", "동래구", "사상구", "강서구", "북구", "사하구", "기장군"].map((g) => ({
      name: `${g} 안전총괄과`,
      kind: "dept" as const,
      people: [p("과장"), p("재난담당")],
    })),
  },
  {
    name: "유관기관",
    kind: "agency",
    children: [
      { name: "부산소방재난본부", kind: "agency", people: [p("상황실장")] },
      { name: "부산경찰청", kind: "agency", people: [p("경비계장")] },
      { name: "부산지방기상청", kind: "agency", people: [p("예보관")] },
      { name: "육군 제53사단", kind: "agency", people: [p("작전과장")] },
      { name: "한국전력공사 부산본부", kind: "agency", people: [p("재난담당")] },
    ],
  },
];

export const GB_TREE: UnitSeed[] = [
  {
    name: "경상북도 재난안전대책본부",
    kind: "hq",
    people: [p("본부장(도지사)", "재대본 총괄"), p("차장(행정부지사)", "본부장 보좌"), p("통제관(재난안전실장)", "재난 수습 통제")],
    children: [
      {
        name: "상황관리반",
        kind: "team",
        children: [
          { name: "자연재난과", kind: "dept", people: [p("과장", "상황관리 총괄"), p("팀장", "상황보고"), p("주무관", "NDMS 입력"), p("주무관", "상황전파")] },
          { name: "재난안전상황실", kind: "dept", people: [p("실장", "상황실 운영"), p("상황근무자", "산불 신고 접수")] },
        ],
      },
      {
        name: "산불진화지원반",
        kind: "team",
        children: [{ name: "산림자원과", kind: "dept", people: [p("과장", "진화자원 총괄"), p("산불방지팀장", "진화헬기 배치")] }],
      },
      {
        name: "주민대피지원반",
        kind: "team",
        children: [{ name: "자치행정과", kind: "dept", people: [p("팀장", "대피 지원")] }],
      },
      {
        name: "이재민구호반",
        kind: "team",
        children: [{ name: "복지정책과", kind: "dept", people: [p("팀장", "구호물자·임시주거")] }],
      },
      {
        name: "재난홍보반",
        kind: "team",
        children: [{ name: "대변인실", kind: "dept", people: [p("팀장", "언론 대응")] }],
      },
    ],
  },
  {
    name: "시·군 재난안전부서",
    kind: "agency",
    children: ["안동시", "의성군", "청송군", "영덕군", "영양군", "포항시", "경주시", "영천시"].map((g) => ({
      name: `${g} 안전재난과`,
      kind: "dept" as const,
      people: [p("과장"), p("산불담당")],
    })),
  },
  {
    name: "유관기관",
    kind: "agency",
    children: [
      { name: "남부지방산림청", kind: "agency", people: [p("산불방지과장")] },
      { name: "경북소방본부", kind: "agency", people: [p("상황실장")] },
      { name: "경북경찰청", kind: "agency", people: [p("경비계장")] },
      { name: "대구지방기상청", kind: "agency", people: [p("예보관")] },
      { name: "육군 제50사단", kind: "agency", people: [p("작전과장")] },
    ],
  },
];

export interface FlatUnit {
  id: string;
  orgId: string;
  parentId: string | null;
  name: string;
  kind: string;
  sort: number;
}
export interface FlatContact {
  id: string;
  orgId: string;
  unitId: string;
  name: string;
  title: string;
  duty: string;
  phone: string;
  email: string;
  sort: number;
}

export function flattenTree(orgId: string, tree: UnitSeed[]) {
  const units: FlatUnit[] = [];
  const people: FlatContact[] = [];
  let u = 0;
  let c = 0;
  const walk = (list: UnitSeed[], parentId: string | null) => {
    list.forEach((n, i) => {
      const id = `${orgId}-u${++u}`;
      units.push({ id, orgId, parentId, name: n.name, kind: n.kind, sort: i });
      (n.people ?? []).forEach(([name, title, duty], k) => {
        c++;
        people.push({
          id: `${orgId}-c${c}`,
          orgId,
          unitId: id,
          name,
          title,
          duty,
          phone: `010-0000-${String(1000 + c + (orgId === "busan" ? 0 : 500)).padStart(4, "0")}`,
          email: `${orgId}${c}@example.go.kr`,
          sort: k,
        });
      });
      if (n.children) walk(n.children, id);
    });
  };
  walk(tree, null);
  return { units, people };
}

/** 기본 전파그룹 — 부서명 포함 여부로 구성원 선택 */
export const GROUP_RULES: Record<string, { name: string; match: string[] }[]> = {
  busan: [
    { name: "재대본 지휘부", match: ["재난안전대책본부"] },
    { name: "상황관리반", match: ["자연재난과", "재난안전상황실", "사회재난과"] },
    { name: "구·군 재난부서", match: ["안전총괄과"] },
    { name: "유관기관", match: ["소방", "경찰", "기상청", "사단", "한국전력"] },
  ],
  gyeongbuk: [
    { name: "재대본 지휘부", match: ["재난안전대책본부"] },
    { name: "상황관리반", match: ["자연재난과", "재난안전상황실"] },
    { name: "산불진화지원", match: ["산림자원과", "산림청", "소방"] },
    { name: "시·군 재난부서", match: ["안전재난과"] },
    { name: "유관기관", match: ["산림청", "소방", "경찰", "기상청", "사단"] },
  ],
};

/** 기관 초기 연락망 (조직·담당자·전파그룹) — 처음 채울 때와 초기 상태로 되돌릴 때 함께 쓴다. 아이디가 고정이라 되돌려도 전파 지정이 다시 이어진다. */
export function orgContactsSeed(orgId: "busan" | "gyeongbuk") {
  const { units, people } = flattenTree(orgId, orgId === "busan" ? BUSAN_TREE : GB_TREE);
  const unitById = new Map(units.map((u) => [u.id, u]));
  const pathOf = (unitId: string) => {
    const names: string[] = [];
    let u = unitById.get(unitId);
    while (u) {
      names.push(u.name);
      u = u.parentId ? unitById.get(u.parentId) : undefined;
    }
    return names;
  };
  const groups = GROUP_RULES[orgId].map((g, i) => ({
    id: `${orgId}-g${i + 1}`,
    orgId,
    name: g.name,
    sort: i,
    memberIds: people
      .filter((p) => {
        const names = pathOf(p.unitId);
        // 지휘부 그룹은 본부 직속 인원만
        if (g.match[0].includes("대책본부")) return names[0].includes("대책본부");
        return g.match.some((m) => names[0].includes(m));
      })
      .map((p) => p.id),
  }));
  return { units, people, groups };
}
