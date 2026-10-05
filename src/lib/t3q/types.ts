/**
 * T3Q 연계 API 계약 — docs/T3Q_API_요청서.md 와 동일하게 유지한다.
 * 실제 연계 시 이 파일의 타입은 바꾸지 않고 client.ts 만 교체한다.
 */

export type WorkType = "REAL" | "DRILL";
export type AlertLevelCode = "INTEREST" | "CAUTION" | "ALERT" | "SERIOUS";

/** 대응단계 — 징후감지 / 초기대응 / 비상대응 / 수습·복구 (SOP 구성 기준) */
export type ResponseStepCode = "SIGN_DETECTION" | "INITIAL_RESPONSE" | "EMERGENCY_RESPONSE" | "RECOVERY";

export interface DisasterType {
  code: string;
  name: string;
  group?: string;
}

export interface Region {
  code: string;
  name: string;
  level: "SIDO" | "SIGUNGU" | "EUPMYEONDONG";
}

export interface SituationContext {
  situationId: string;
  workType: WorkType;
  responsibleRegion: Region;
  affectedRegions?: Region[];
  disasterType: DisasterType;
  /** (선택) 위기경보 — 매뉴얼 단계가 위기경보로 나뉜 경우(중앙부처 실무매뉴얼형)에만 단계 선택에 쓴다 */
  alertLevel?: AlertLevelCode;
  /** 대응단계 — API-02 는 이 단계의 조치를 돌려준다 */
  responseStep: ResponseStepCode;
  /** (v1.9) 담당부서 원문 — 매뉴얼에서 이 부서의 행만 뽑는다 (R19). 예: "자연재난과" */
  department?: string;
  baseTime: string;
  title?: string;
  currentSituation?: string;
  period?: { start: string; end?: string };
}

export interface T3QMeta {
  requestId: string;
  traceId: string;
  generatedAt: string;
  model?: string;
  mock?: boolean;
  elapsedMs?: number;
}

/* ---------- API-02 SOP 콘텐츠 ---------- */

export type ResponsePhase = "PREVENTION" | "PREPAREDNESS" | "RESPONSE" | "RECOVERY";

export interface SopActionsRequest {
  context: SituationContext;
  filter?: {
    phases?: ResponsePhase[];
    categories?: Array<"RESPONSE" | "DAMAGE">;
    maxActions?: number;
  };
}

export interface OrgRef {
  name: string;
  role: "LEAD" | "SUPPORT" | "COOPERATE";
  orgCode?: string;
  /** (v2.0) 행동카드·프로세스 표에 붙은 기관·부서 번호 (예: 「울산기상대(☎ …)」) — C8 */
  phones?: string[];
}

export interface DetailTask {
  seq: number;
  title: string;
  content: string;
  note?: string;
}

export interface PropagationTarget {
  target: string;
  targetType: "ORG" | "ROLE" | "PUBLIC";
  channelHint?: "SMS" | "EMAIL" | "BROADCAST" | "PHONE";
  /** 매뉴얼 전파 표의 구분·전파방법 원문 */
  method?: string;
  messageTemplate?: string;
}

export interface ResourceNeed {
  category: string;
  name: string;
  quantity?: number;
  unit?: string;
}

export interface SourceRef {
  docId: string;
  docTitle: string;
  page?: number;
  excerpt?: string;
}

export interface SopAction {
  actionCode: string;
  actionName: string;
  phase: ResponsePhase;
  phaseLabel?: string;
  /** 이 조치가 속한 대응단계 */
  responseStep?: ResponseStepCode;
  /** 수행 조건 — 조치 전체에 붙은 "필요시", "태풍 한반도 북상 우려시" 등 (원문 그대로, R8·R18). 있으면 「필요시 임무」 */
  condition?: string;
  /** 비고 — 매뉴얼의 ※·* 줄 */
  notes?: string[];
  /** 행동카드 연계코드 */
  linkedActionCodes?: string[];
  category: "RESPONSE" | "DAMAGE";
  missionCode: string;
  orderHint: number;
  summary?: string;
  organizations: OrgRef[];
  detailTasks: DetailTask[];
  propagation: PropagationTarget[];
  resources: ResourceNeed[];
  sources: SourceRef[];
}

/** 임무 = 매뉴얼 재난대응 프로세스의 상위 항목 [n] */
export interface SopMission {
  missionCode: string;
  missionName: string;
  responseStep?: ResponseStepCode;
  /** 협업기능 (행안부 표준 ①~⑬ → "1"~"13") */
  functionCode?: string;
  functionName?: string;
  leadOrg?: string;
  /** 이 임무에 속한 조치 [n-m] — 매뉴얼 기재 순서 */
  actionCodes: string[];
}

/** T3Q가 고른 매뉴얼 — 재난유형 → 발생 시군구 → 시도 → 중앙 순 */
export interface ManualRef {
  docId: string;
  docTitle: string;
  scope: "SIGUNGU" | "SIDO" | "CENTRAL";
  region?: Region;
  version?: string;
  /** 단계를 대응단계로 골랐는지, 위기경보로 골랐는지 */
  stepBasis: "RESPONSE_STEP" | "ALERT_LEVEL";
  /** (v1.9) 실제로 고른 부서 칸·주관부서 원문 (예: ["재난상황실", "자연재난과"]) */
  departments?: string[];
  /** (v1.9) 요청 부서가 매뉴얼에 있었는지 — false 면 초기대응(총괄) 행으로 대신함 */
  departmentMatched?: boolean;
}

/** (v2.0) 예외 원칙 — 규칙으로 정할 수 없는 곳은 만들지 않고 원문을 두고 여기에 알린다 */
export interface ExtractionWarning {
  code: "NO_LOCAL_ACTIONS" | "AMBIGUOUS_STEP" | "AMBIGUOUS_CODE" | "IMAGE_PAGE" | "UNMATCHED_TABLE" | "OTHER";
  message: string;
  docId?: string;
  page?: number;
  actionCode?: string;
}

export interface SopActionsResponse {
  meta: T3QMeta;
  disasterType: DisasterType;
  manual?: ManualRef;
  warnings?: ExtractionWarning[];
  missions: SopMission[];
  actions: SopAction[];
  organizationSummary?: { name: string; roles: OrgRef["role"][]; actionCodes: string[] }[];
}

/* ---------- API-04 매뉴얼 연락망 (v2.0) ---------- */

/** 연락망 분류 — 유관기관 / 우리 기관 내부 부서 / 상급 보고처(중앙부처 상황실 등) / 시·도·시군구 */
export type ContactCategory = "AGENCY" | "INTERNAL" | "HIGHER" | "LOCAL_GOV";

export interface ContactsRequest {
  /** 매뉴얼 고르기는 API-02 와 같은 규칙 (재난유형 → 시군구 → 시도 → 중앙). 재난유형이 없으면 그 지역의 모든 매뉴얼 */
  region: Region;
  affectedRegions?: Region[];
  disasterType?: DisasterType;
  documents?: { docId: string }[];
}

/** 연락처 1줄 — 문서에 있으면 성명·직위·휴대전화도 그대로 (내부용) */
export interface ContactEntry {
  category: ContactCategory;
  /** 기관명 (예: 부산경찰청) */
  org: string;
  /** 부서 (예: 경비교통과) */
  dept?: string;
  title?: string;
  name?: string;
  /** 사무실·대표 번호 (지역번호 붙여서, 범위 「~5」는 그대로) */
  phones: string[];
  mobile?: string;
  fax?: string[];
  /** 야간·당직 번호 */
  night?: string[];
  email?: string;
  note?: string;
  /** 표의 기준일 원문 (예: 2026. 2월 기준) */
  asOf?: string;
  source: SourceRef;
}

export interface ContactsResponse {
  meta: T3QMeta;
  manuals: ManualRef[];
  entries: ContactEntry[];
  warnings?: ExtractionWarning[];
}

/* ---------- API-03 사용자 인증 (T3Q 플랫폼 링크 로그인) ---------- */

export interface AuthVerifyRequest {
  /** T3Q 플랫폼이 링크에 붙여 준 1회용 토큰 */
  token: string;
}

export interface T3QUser {
  userId: string;
  loginId?: string;
  name: string;
  /** 행정표준기관코드 (부산광역시 6260000, 경상북도 6470000) */
  orgCode?: string;
  orgName: string;
  deptName?: string;
  position?: string;
  email?: string;
  roles?: Array<"USER" | "MANAGER" | "ADMIN">;
}

export interface AuthVerifyResponse {
  meta: T3QMeta;
  user: T3QUser;
  /** T3Q 세션 만료 시각 */
  expiresAt?: string;
}
