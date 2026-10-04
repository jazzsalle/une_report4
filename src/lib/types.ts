export type Role = "admin" | "manager" | "user";

export interface SessionUser {
  id: string;
  loginId: string;
  name: string;
  dept: string;
  orgId: string;
  role: Role;
}

export const HAZARDS = [
  "폭염",
  "태풍/호우",
  "지진",
  "황사",
  "산불",
  "감염병",
  "가축질병",
  "다중밀집건축물붕괴대형사고",
  "정부주요시설",
  "학교시설",
] as const;
export type Hazard = (typeof HAZARDS)[number];

export const ALERT_LEVELS = ["관심", "주의", "경계", "심각"] as const;
export type AlertLevel = (typeof ALERT_LEVELS)[number];

/** 재난대응 프로세스 4단계 — SOP 구성 기준 (부산 매뉴얼 Ⅲ장) */
export const RESPONSE_STEPS = ["징후감지", "초기대응", "비상대응", "수습복구"] as const;
export type ResponseStep = (typeof RESPONSE_STEPS)[number];

export const STEP_LABEL: Record<ResponseStep, string> = {
  징후감지: "1단계 징후감지",
  초기대응: "2단계 초기대응",
  비상대응: "3단계 비상대응",
  수습복구: "4단계 수습·복구",
};

/** 위기경보 → 추천 대응단계 (매뉴얼 ★ 기준) */
export const STEP_BY_LEVEL: Record<AlertLevel, ResponseStep> = {
  관심: "징후감지",
  주의: "초기대응",
  경계: "비상대응",
  심각: "비상대응",
};

/* ---------- 기상 ---------- */

export interface WeatherAlertItem {
  /** 예: 호우주의보 */
  name: string;
  /** 발효 지역 */
  areas: string;
  /** 시도 안의 세부 특보구역 (예: 포항, 경주) */
  subs?: string[];
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

/** 기상특보 보고 이미지 (data URL, 브라우저에서 축소 후 저장) */
export interface WeatherImage {
  src: string;
  /** 기준 시각 (캡션 "○○시 현재") */
  at: string;
  width: number;
  height: number;
}
export interface WeatherImages {
  /** 특보발표현황 */
  alert?: WeatherImage;
  /** 레이더 영상 */
  radar?: WeatherImage;
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
  /** 그림 (선택, 나란히 배치) — 기상특보 보고의 특보발표현황·레이더 영상 */
  images?: { src: string; caption: string; width: number; height: number }[];
}

export interface ReportContent {
  title: string;
  reporter: string;
  dept: string;
  reportedAt: string;
  sections: ReportSection[];
}
