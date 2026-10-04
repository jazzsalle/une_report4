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
  alertLevel: AlertLevelCode;
  /** 대응단계 — API-02 는 이 단계의 조치를 돌려준다 */
  responseStep: ResponseStepCode;
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

/* ---------- API-01 기상요약 ---------- */

export interface WeatherAlert {
  alertId: string;
  source: "KMA";
  kind: string;
  level: "WATCH" | "WARNING" | "PRELIMINARY";
  command: "ISSUE" | "CHANGE" | "EXTEND" | "RELEASE" | "PRELIMINARY";
  areas: { code: string; name: string }[];
  announcedAt: string;
  effectiveAt: string;
  releasedAt?: string;
  retrievedAt: string;
  text?: string;
}

export interface WeatherSummaryRequest {
  context: SituationContext;
  alerts: WeatherAlert[];
  /** 기상청 기상정보 본문 (getWthrInfo t1) */
  weatherInfoText?: string;
  options?: {
    maxChars?: number;
    style?: "BRIEF" | "REPORT";
  };
}

export interface WeatherSummaryResponse {
  meta: T3QMeta;
  summary: {
    headline: string;
    body: string;
    keyPoints: string[];
    timeline?: { time: string; text: string }[];
    affectedRegions: Region[];
    cautions?: string[];
  };
  basis: { alertIds: string[]; sourceLabel: string };
  disclaimer: string;
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

export interface SopMission {
  missionCode: string;
  missionName: string;
  leadOrg?: string;
  actionCodes: string[];
}

export interface SopActionsResponse {
  meta: T3QMeta;
  disasterType: DisasterType;
  missions: SopMission[];
  actions: SopAction[];
  organizationSummary?: { name: string; roles: OrgRef["role"][]; actionCodes: string[] }[];
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
