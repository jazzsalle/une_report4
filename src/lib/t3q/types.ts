/**
 * T3Q 연계 API 계약 — docs/T3Q_API_요청서.md 와 동일하게 유지한다.
 * 실제 연계 시 이 파일의 타입은 바꾸지 않고 client.ts 만 교체한다.
 */

export type WorkType = "REAL" | "DRILL";
export type AlertLevelCode = "INTEREST" | "CAUTION" | "ALERT" | "SERIOUS";

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
