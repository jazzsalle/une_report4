import tree from "@/data/regions.json";

export interface SigunguNode {
  c: string;
  n: string;
  /** 읍면동 */
  u: string[];
}
export interface SidoNode {
  c: string;
  n: string;
  s: SigunguNode[];
}

/** 전국 시도 → 시군구 → 읍면동 */
export const REGION_TREE = tree as SidoNode[];
export const SIDO_NAMES = REGION_TREE.map((s) => s.n);

export function sidoNode(name: string) {
  return REGION_TREE.find((s) => s.n === name);
}

/** 기관 → 기본 시도 */
export const ORG_SIDO: Record<string, string> = {
  busan: "부산광역시",
  gyeongbuk: "경상북도",
  une: "부산광역시",
};

/**
 * 시도별 기상청 특보 조회 정보
 * - stnId: 기상정보 발표 지점 (getWthrInfo / getWthrPwn)
 * - keys: 전국 특보현황(t6) 문구에서 이 시도를 찾는 말
 * - short: 시군구 이름 비교용 약칭 제거 규칙에 쓰는 시도 약칭
 */
export const SIDO_WEATHER: Record<string, { stnId: string; station: string; keys: string[] }> = {
  서울특별시: { stnId: "109", station: "서울", keys: ["서울"] },
  부산광역시: { stnId: "159", station: "부산", keys: ["부산"] },
  대구광역시: { stnId: "143", station: "대구", keys: ["대구"] },
  인천광역시: { stnId: "109", station: "서울", keys: ["인천", "서해5도", "강화"] },
  광주광역시: { stnId: "156", station: "광주", keys: ["광주"] },
  대전광역시: { stnId: "133", station: "대전", keys: ["대전"] },
  울산광역시: { stnId: "159", station: "부산", keys: ["울산"] },
  세종특별자치시: { stnId: "133", station: "대전", keys: ["세종"] },
  경기도: { stnId: "109", station: "서울", keys: ["경기"] },
  강원특별자치도: { stnId: "105", station: "강릉", keys: ["강원"] },
  충청북도: { stnId: "131", station: "청주", keys: ["충청북도", "충북"] },
  충청남도: { stnId: "133", station: "대전", keys: ["충청남도", "충남"] },
  전북특별자치도: { stnId: "146", station: "전주", keys: ["전북", "전라북도"] },
  전라남도: { stnId: "156", station: "광주", keys: ["전라남도", "전남", "흑산도", "거문도"] },
  경상북도: { stnId: "143", station: "대구", keys: ["경상북도", "경북", "울릉도"] },
  경상남도: { stnId: "159", station: "부산", keys: ["경상남도", "경남"] },
  제주특별자치도: { stnId: "184", station: "제주", keys: ["제주"] },
};

/** "포항시 남구" → "포항", "해운대구" → "해운대", "청송군" → "청송" (특보구역 표기와 비교용) */
export function shortSigungu(name: string) {
  const first = name.split(" ")[0];
  return first.length > 2 ? first.replace(/(시|군|구)$/, "") : first;
}

/** "해운대구 우동" 처럼 저장된 발생지역 → [시군구, 읍면동?] */
export function splitArea(a: string): [string, string | undefined] {
  const parts = a.split(" ");
  // 일반구가 있는 시 ("수원시 장안구 영화동")
  if (parts.length >= 3) return [`${parts[0]} ${parts[1]}`, parts.slice(2).join(" ")];
  if (parts.length === 2 && /(구)$/.test(parts[1]) && /(시)$/.test(parts[0])) return [a, undefined];
  return [parts[0], parts[1]];
}

/** "부산광역시" → "부산", "경상북도" → "경북", "전북특별자치도" → "전북", "경기도" → "경기" */
export function sidoShort(name: string) {
  if (/^(충청|전라|경상)[남북]도$/.test(name)) return name[0] + name[2];
  return name.slice(0, 2);
}

/** 시도 → 시범 기관 (연락망·문서 소속). 기관이 없는 시도는 null */
export const SIDO_ORG: Record<string, string> = {
  부산광역시: "busan",
  경상북도: "gyeongbuk",
};

/** 상황이 속할 기관: 운영관리 계정이 만든 상황은 발생 시도의 기관으로 */
export function orgForSituation(userOrg: string, sido: string) {
  if (userOrg !== "une") return userOrg;
  return SIDO_ORG[sido] ?? userOrg;
}
