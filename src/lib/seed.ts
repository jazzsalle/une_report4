import busan from "@/data/busan-flood.json";
import { GB_WILDFIRE, GB_WILDFIRE_SOURCE } from "@/data/gb-wildfire";
import type { AlertLevel } from "@/lib/types";

export interface SeedAction {
  code: string;
  stage: string;
  phase: string;
  hazard: string[];
  title: string;
  content: string;
  details: string[];
  lead: string;
  support: string[];
  collab: string[];
  propagateTo: string[];
  propagateMsg: string;
  resources: string[];
  damageMeasures: string[];
  page: number;
  manualCode?: string;
  manualStage?: string;
  nd?: boolean;
}

const VERBS =
  "접수|보고|전파|지시|확인|점검|운영|강화|실시|편성|파악|지원|가동|해제|개최|배치|결정|수립|조사|처리|통제|대피|구호|복구|홍보|관리|정비|요청|시행|교육|제출|취합|확보|활동|발령|발표|소집|명령|건의|방문|발송|모니터링";

/** PDF 추출로 붙어버린 띄어쓰기 복원 */
export function prettifyTitle(t: string): string {
  let out = t.replace(/\s+/g, " ").trim();
  out = out
    .replace(/([가-힣])(\()/g, "$1 $2")
    .replace(/(\))([가-힣])/g, "$1 $2")
    .replace(/,(\S)/g, ", $1")
    .replace(/에따른/g, "에 따른 ")
    .replace(/([가-힣])및([가-힣])/g, "$1 및 $2")
    .replace(/([가-힣]{2,})등([가-힣])/g, "$1 등 $2")
    .replace(/([가-힣]{3,})(현황|체계|시설물|연락망|상황)([가-힣])/g, "$1 $2 $3")
    .replace(new RegExp(`([가-힣]{2,})(${VERBS})(?=[\\s(,․]|$|(${VERBS}))`, "g"), "$1 $2");
  return out.replace(/\s{2,}/g, " ").trim();
}

export const BUSAN_SOURCE: string = (busan as { source: string }).source;

export const BUSAN_FLOOD: SeedAction[] = (busan as { actions: SeedAction[] }).actions.map((a) => ({
  ...a,
  title: prettifyTitle(a.title),
  content: prettifyTitle(a.content),
}));

export function seedLibrary(hazard: string): { source: string; actions: SeedAction[] } {
  if (hazard === "산불") return { source: GB_WILDFIRE_SOURCE, actions: GB_WILDFIRE };
  return {
    source: BUSAN_SOURCE,
    actions: BUSAN_FLOOD.filter((a) => a.hazard.includes(hazard) || a.hazard.length === 0),
  };
}

/** 위기경보 수준별 기본 SOP 구성 (부산 매뉴얼: 징후감지=관심, 초기대응=주의, 비상대응=경계, 수습·복구=심각) */
export function selectSeed(hazard: string, level: AlertLevel): { source: string; actions: SeedAction[] } {
  const lib = seedLibrary(hazard);
  const mine = (a: SeedAction) => a.nd !== false;
  const stagesFor: Record<AlertLevel, string[]> = {
    관심: ["관심"],
    주의: ["주의"],
    경계: ["경계"],
    심각: ["경계", "심각"],
  };
  const resp = lib.actions.filter((a) => mine(a) && a.phase !== "복구" && stagesFor[level].includes(a.stage));
  const recovery =
    level === "경계" || level === "심각"
      ? lib.actions.filter((a) => mine(a) && a.phase === "복구").slice(0, hazard === "산불" ? 10 : 8)
      : [];
  return { source: lib.source, actions: [...resp, ...recovery] };
}
