import busan from "@/data/busan-flood.json";
import { GB_WILDFIRE, GB_WILDFIRE_SOURCE } from "@/data/gb-wildfire";
import { COMMON_SOURCE, commonActions } from "@/data/common-sop";
import { STEP_LABEL, type ResponseStep } from "@/lib/types";

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

/** 재난유형별 매뉴얼 시드: 태풍/호우 = 부산 풍수해 매뉴얼, 산불 = 경북 산불 샘플, 그 외 = 공통 기본 SOP */
export function seedLibrary(hazard: string): { source: string; actions: SeedAction[] } {
  if (hazard === "산불") return { source: GB_WILDFIRE_SOURCE, actions: GB_WILDFIRE };
  if (hazard === "태풍/호우") {
    return {
      source: BUSAN_SOURCE,
      actions: BUSAN_FLOOD.filter((a) => a.hazard.includes("호우") || a.hazard.includes("태풍") || a.hazard.length === 0),
    };
  }
  return { source: COMMON_SOURCE, actions: commonActions(hazard) };
}

/**
 * 행동카드의 대응단계.
 * 부산 매뉴얼은 원문 단계(1단계 징후감지 …)를 그대로 쓰고,
 * 그 외 시드는 위기경보 표기를 매뉴얼 ★ 기준으로 바꾼다 (관심→징후감지, 주의→초기대응, 경계·심각→비상대응, 복구→수습복구).
 */
export function stepOf(a: SeedAction): ResponseStep {
  const m = a.manualStage ?? "";
  if (m.includes("징후")) return "징후감지";
  if (m.includes("초기")) return "초기대응";
  if (m.includes("비상")) return "비상대응";
  if (m.includes("수습") || m.includes("복구")) return "수습복구";
  if (a.phase === "복구") return "수습복구";
  if (a.stage === "관심") return "징후감지";
  if (a.stage === "주의") return "초기대응";
  return "비상대응";
}

export function stepLabelOf(a: SeedAction) {
  return STEP_LABEL[stepOf(a)];
}

/** 대응단계별 기본 SOP 구성 — 선택한 단계의 행동카드만 */
export function selectSeed(hazard: string, step: ResponseStep): { source: string; actions: SeedAction[] } {
  const lib = seedLibrary(hazard);
  const mine = (a: SeedAction) => a.nd !== false;
  return { source: lib.source, actions: lib.actions.filter((a) => mine(a) && stepOf(a) === step) };
}
