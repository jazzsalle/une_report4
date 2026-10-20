/** admin 운영관리(계정·매뉴얼 분석) · manager 기관관리(연락망 편집) · user 일반 · t3q T3Q 담당자(API 문서 열람). 상황·문서는 모두 자기 것만 */
export type Role = "admin" | "manager" | "user" | "t3q";

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
  /** 기상정보 발표 시각 (ISO) */
  infoAt?: string | null;
  /** 전국 특보 현황 원문 */
  nationwideText: string;
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
  /** 기상특보 현황 */
  alert?: WeatherImage;
  /** 레이더 영상 */
  radar?: WeatherImage;
  /** 위성영상 */
  satellite?: WeatherImage;
}

/* ---------- SOP ---------- */

export type MissionStatus = "todo" | "doing" | "done" | "skipped";

/** 임무 종류 — 처리 / 상황판단 / 상황전파 (SOP 컴포넌트 구분) */
export type MissionKind = "process" | "decision" | "propagation";

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
  /** 조직·부서 단위 지정 (하위 조직 포함, 발송 시점의 소속 인원) */
  unitIds?: string[];
  channel: "SMS" | "EMAIL";
  sentAt?: string;
  sentTo?: string[];
}

export interface Mission {
  id: string;
  code: string;
  /** 임무 종류 (비어 있으면 임무명으로 추정) */
  kind?: MissionKind;
  /** 상위 임무 [n] — 매뉴얼 재난대응 프로세스 */
  group?: { code: string; name: string };
  /** 수행 조건 (필요시 …) */
  condition?: string;
  /** 비고 (※ …) */
  notes?: string[];
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
  /** T3Q가 고른 매뉴얼 이름 — 「○○ 기준」 표시 */
  manual?: string;
  /** 요청한 담당부서가 매뉴얼에 있었는지 (false = 초기대응부서 기준으로 대신함) */
  deptMatched?: boolean;
  generatedAt: string;
  missions: Mission[];
  startedAt?: string;
  endedAt?: string;
  /** 처음 실행 종료한 시각 — 실행 재개해도 지우지 않는다. 있으면 SOP 편집 불가 (P-04) */
  firstEndedAt?: string;
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
  /** 그림 (선택, 나란히 배치) — 기상특보 보고의 기상특보 현황·레이더 영상·위성영상 */
  images?: { src: string; caption: string; width: number; height: number }[];
}

/** 상황일지를 만들 당시 대응 단계 (R-06) — 목록에서 판본을 구분 */
export interface ReportSnapshot {
  /** 대응단계 표기 (예: 2단계 초기대응) */
  step: string;
  done: number;
  total: number;
  started: boolean;
  ended: boolean;
}

export interface ReportContent {
  title: string;
  reporter: string;
  dept: string;
  reportedAt: string;
  sections: ReportSection[];
  /** 만들 당시 단계 — 2026-10-16 이전 상황일지에는 없음 */
  snapshot?: ReportSnapshot;
}
