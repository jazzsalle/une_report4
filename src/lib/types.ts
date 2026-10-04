export type Role = "admin" | "manager" | "user";

export interface SessionUser {
  id: string;
  loginId: string;
  name: string;
  dept: string;
  orgId: string;
  role: Role;
}

export const HAZARDS = ["호우", "태풍", "대설", "산불"] as const;
export type Hazard = (typeof HAZARDS)[number];

export const ALERT_LEVELS = ["관심", "주의", "경계", "심각"] as const;
export type AlertLevel = (typeof ALERT_LEVELS)[number];

/* ---------- 기상 ---------- */

export interface WeatherAlertItem {
  /** 예: 호우주의보 */
  name: string;
  /** 발효 지역 */
  areas: string;
  kind: "warning" | "watch" | "preliminary";
}

export interface WeatherSnapshot {
  stnId: string;
  stnName: string;
  /** 기상청 발표시각 (ISO) */
  announcedAt: string | null;
  retrievedAt: string;
  /** 현재 발효중 특보 (전국 현황에서 해당 지역 추출) */
  active: WeatherAlertItem[];
  /** 예비특보 */
  preliminary: string[];
  /** 기상정보 본문 */
  infoText: string;
  /** 전국 특보 현황 원문 */
  nationwideText: string;
}

export interface WeatherSummary {
  headline: string;
  body: string;
  keyPoints: string[];
  source: "t3q" | "mock";
  generatedAt: string;
}

/* ---------- SOP ---------- */

export type MissionStatus = "todo" | "doing" | "done" | "skipped";

export interface MissionDetail {
  id: string;
  text: string;
  done: boolean;
  doneAt?: string;
}

export interface Propagation {
  message: string;
  /** 참고 전파대상 (매뉴얼) */
  targetHint: string[];
  /** 담당자/그룹 지정 — 연락망 연계 */
  contactIds: string[];
  groupIds: string[];
  channel: "SMS" | "EMAIL";
  sentAt?: string;
  sentTo?: string[];
}

export interface Mission {
  id: string;
  code: string;
  /** 대응 / 복구 */
  phase: "대응" | "복구";
  stage: string;
  title: string;
  content: string;
  lead: string;
  support: string[];
  collab: string[];
  details: MissionDetail[];
  propagation: Propagation;
  resources: string[];
  status: MissionStatus;
  startedAt?: string;
  doneAt?: string;
  /** 조치결과 */
  result: string;
  /** 피해조치 / 복구 내용 */
  damage: string;
  assignee: string;
}

export interface Sop {
  source: "t3q" | "mock";
  generatedAt: string;
  missions: Mission[];
  startedAt?: string;
  endedAt?: string;
}

/* ---------- 상황 기록 (사용자 입력 현황) ---------- */

export type RecordKind = "상황" | "피해" | "대피" | "응급복구" | "자원투입" | "통제";

export const RECORD_KINDS: RecordKind[] = ["상황", "피해", "대피", "통제", "자원투입", "응급복구"];

/* ---------- 상황일지 ---------- */

export interface ReportSection {
  id: string;
  title: string;
  /** 문단 — 줄 앞 기호로 수준 표시: "□ ", "○ ", "- " */
  body: string;
  /** 표 (선택) */
  table?: { head: string[]; rows: string[][] };
}

export interface ReportContent {
  title: string;
  reporter: string;
  dept: string;
  reportedAt: string;
  sections: ReportSection[];
}
