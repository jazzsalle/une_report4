/**
 * T3Q 연계 API 계약.
 * API-02 SOP는 T3Q 납품본(API-SOP v2, 2026-10-19 · etc/T3Q_API/3…/MOIS_API-SOP_v2_openapi.json)이 정본이다.
 * API-03 인증 · API-04 연락망은 아직 T3Q가 제공하지 않았다 — docs/T3Q_API_요청서.md 의 요청안 그대로.
 * 계약을 바꾸면 public/api-docs/t3q.yaml · docs/T3Q_API_요청서.md 를 함께 고친다.
 */

export type WorkType = "REAL" | "DRILL";
export type AlertLevelCode = "INTEREST" | "CAUTION" | "ALERT" | "SERIOUS";

/** 대응단계 — 징후감지 / 초기대응 / 비상대응 / 수습·복구 (SOP 구성 기준) */
export type ResponseStepCode = "SIGN_DETECTION" | "INITIAL_RESPONSE" | "EMERGENCY_RESPONSE" | "RECOVERY";

/** (API-03·04 요청안) 재난유형 객체 */
export interface DisasterType {
  code: string;
  name: string;
  group?: string;
}

/** (API-04 요청안) 행정구역 */
export interface Region {
  code: string;
  name: string;
  level: "SIDO" | "SIGUNGU" | "EUPMYEONDONG";
}

/** (API-03·04 요청안) 응답 메타 — API-02 v2 응답에는 없다 */
export interface T3QMeta {
  requestId: string;
  traceId: string;
  generatedAt: string;
  model?: string;
  mock?: boolean;
  elapsedMs?: number;
}

/** T3Q 오류 본문 — 모든 API 공통 (게이트웨이 오류는 JSON이 아닐 수 있다) */
export interface T3QErrorBody {
  error: {
    code:
      | "INVALID_REQUEST"
      | "PAYLOAD_TOO_LARGE"
      | "NOT_FOUND"
      | "RATE_LIMIT"
      | "CTX_OVERFLOW"
      | "SAFETY_FILTER"
      | "TIMEOUT"
      | "NETWORK"
      | "LLM_ERROR"
      | "GENERATION_FAILED"
      | "SERVICE_UNAVAILABLE"
      | "UNKNOWN";
    message: string;
    retryable: boolean;
    retryAfter: number | null;
    requestId: string;
  };
}

/* ---------- API-02 SOP 콘텐츠 (T3Q API-SOP v2) — POST /reports/sop/actions ---------- */

/**
 * 상황정보 — 매뉴얼 선택: 재난유형 · 발생지역(responsibleRegion/affectedRegions 중 하나 이상) · 업무유형,
 * SOP 추출: 대응단계 · 위기경보 · 담당부서. 열거형은 한글 라벨과 영문 코드를 모두 받는다.
 * 선택 항목은 생략·null·빈 문자열을 모두 미지정으로 본다.
 */
export interface SopContext {
  /** 재난유형 라벨 10종(폭염, 태풍/호우 …) 또는 코드 */
  disasterType: string;
  /** 대응단계 코드 또는 한글(징후감지 …) */
  responseStep: ResponseStepCode | string;
  /** 행정구역 이름(예: 부산광역시) 또는 기관명(예: 국가유산청) */
  responsibleRegion?: string | null;
  /** 발생지역 이름 (예: 부산광역시 해운대구 우동) */
  affectedRegions?: string[] | null;
  /** 위기경보 — 매뉴얼 단계가 위기경보로 나뉜 경우에만 단계 선택에 쓴다 */
  alertLevel?: AlertLevelCode | string | null;
  /** 담당부서 원문 — 매뉴얼에서 이 부서의 행만 뽑는다 (R19) */
  department?: string | null;
  /* 아래는 참고용 */
  situationId?: string | null;
  workType?: WorkType | "" | null;
  baseTime?: string | null;
  title?: string | null;
  currentSituation?: string | null;
  period?: { start?: string | null; end?: string | null } | "" | null;
}

export interface SopActionsRequest {
  context: SopContext;
}

export interface OrgRef {
  name: string;
  role: "LEAD" | "SUPPORT" | "COOPERATE";
}

export interface DetailTask {
  seq: number;
  title: string;
  /** 비어 있으면 "" */
  content: string;
  /** 비어 있으면 "" (예: 붙임 2-1-①) */
  note: string;
}

export interface PropagationTarget {
  target: string;
  targetType: "ORG" | "ROLE" | "PUBLIC" | null;
  channelHint: "SMS" | "EMAIL" | "BROADCAST" | "PHONE" | "" | null;
  /** 매뉴얼 전파 표의 구분·전파방법 원문 */
  method: string;
  /** 매뉴얼 행동카드의 「표준문안」 원문. 없으면 "" */
  messageTemplate: string;
}

export interface ResourceNeed {
  name: string;
  quantity: number | null;
  unit: string;
}

/** 근거 위치 — page 는 표기 쪽수, pdfIndex 는 PDF 안 0부터 센 쪽 (뷰어 이동 = pdfIndex + 1) */
export interface SopSource {
  docId: string;
  docTitle: string;
  page: number;
  pdfIndex: number;
}

export interface SopAction {
  /** 여러 코드가 한 줄이면 "3-3,3-4". 한글 코드(가-1)도 있다 */
  actionCode: string;
  actionName: string;
  missionCode: string;
  responseStep: ResponseStepCode;
  /** 매뉴얼 원문 단계명 (예: 1단계 징후감지, 심각 단계) */
  phaseLabel: string;
  category: "NORMAL" | "DAMAGE";
  /** 수행 조건 원문 — 있으면 「필요시 임무」, 없으면 "" */
  condition: string;
  /** 없으면 "" */
  summary: string;
  detailTasks: DetailTask[];
  organizations: OrgRef[];
  propagation: PropagationTarget[];
  resources: ResourceNeed[];
  /** 비고 — 매뉴얼의 ※·* 줄 */
  notes: string[];
  sources: SopSource[];
  phase: "RESPONSE" | "RECOVERY";
  orderHint: number;
  alertLevel: string | null;
}

/** 임무 = 매뉴얼 재난대응 프로세스의 상위 항목 [n] */
export interface SopMission {
  missionCode: string;
  missionName: string;
  responseStep: ResponseStepCode;
  /** 이 임무에 속한 조치 — 매뉴얼 기재 순서 */
  actionCodes: string[];
  functionCode?: string;
  functionName?: string;
  leadOrg?: string;
}

/** T3Q가 고른 매뉴얼 — 재난유형 → 발생 시군구 → 시도 → 중앙 순 */
export interface SopManual {
  /** /documents/{docId}/download 로 원문 PDF */
  docId: string;
  docTitle: string;
  version: string;
  scope: "SIGUNGU" | "SIDO" | "CENTRAL" | "OTHER";
  /** 중앙 매뉴얼은 code 가 없다 (예: { name: "국가유산청", level: "CENTRAL" }) */
  region: { code?: string; name: string; level: string };
  stepBasis: "RESPONSE_STEP" | "ALERT_LEVEL";
  /** 실제로 고른 부서 칸·주관부서 원문 */
  departments: string[];
}

export interface ExtractionWarning {
  code:
    | "NO_LOCAL_ACTIONS"
    | "AMBIGUOUS_STEP"
    | "AMBIGUOUS_CODE"
    | "IMAGE_PAGE"
    | "UNMATCHED_TABLE"
    | "OTHER"
    | "IGNORED_FIELD"
    | "TRUNCATED";
  message: string;
  docId?: string;
  page?: number;
  actionCode?: string;
}

export interface SopActionsResponse {
  manual: SopManual;
  /** 요청 부서가 매뉴얼에 있었는지 — false 면 초기대응(총괄) 행으로 대신함 */
  departmentMatched: boolean;
  warnings: ExtractionWarning[];
  missions: SopMission[];
  actions: SopAction[];
}

/* ---------- (API-04 요청안) 매뉴얼 참조·근거 ---------- */

/** T3Q가 고른 매뉴얼 (API-04 요청안 모양) */
export interface ManualRef {
  docId: string;
  docTitle: string;
  scope: "SIGUNGU" | "SIDO" | "CENTRAL";
  region?: Region;
  version?: string;
  stepBasis: "RESPONSE_STEP" | "ALERT_LEVEL";
  departments?: string[];
  departmentMatched?: boolean;
}

export interface SourceRef {
  docId: string;
  docTitle: string;
  page?: number;
  excerpt?: string;
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
