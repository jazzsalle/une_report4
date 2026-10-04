import {
  pgTable,
  text,
  timestamp,
  jsonb,
  integer,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import type {
  WeatherSnapshot,
  WeatherSummary,
  WeatherImages,
  Sop,
  ReportContent,
} from "@/lib/types";

/** 기관 (부산광역시 / 경상북도 / 운영) */
export const orgs = pgTable("orgs", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  short: text("short").notNull(),
  /** 기상청 특보 지점번호 (부산 159, 대구·경북 143) */
  stnId: text("stn_id").notNull(),
  defaultHazard: text("default_hazard").notNull(),
});

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  loginId: text("login_id").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  dept: text("dept").notNull().default(""),
  orgId: text("org_id").notNull(),
  /** admin: 전체 관리 / manager: 기관 관리 / user: 일반 */
  role: text("role").notNull().default("user"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
});

/** 상황 (업무 세션) */
export const situations = pgTable(
  "situations",
  {
    id: text("id").primaryKey(),
    orgId: text("org_id").notNull(),
    ownerId: text("owner_id").notNull(),
    title: text("title").notNull(),
    /** real: 실제재난 / drill: 안전한국훈련 */
    kind: text("kind").notNull().default("real"),
    hazard: text("hazard").notNull(),
    alertLevel: text("alert_level").notNull(),
    /** 대응단계: 징후감지 / 초기대응 / 비상대응 / 수습복구 */
    responseStep: text("response_step").notNull().default("초기대응"),
    /** 발생 시도 (전국) */
    sido: text("sido").notNull().default(""),
    /** 발생지역: "해운대구" 또는 "해운대구 우동" */
    areas: jsonb("areas").$type<string[]>().notNull().default([]),
    periodStart: timestamp("period_start", { withTimezone: true }).notNull(),
    periodEnd: timestamp("period_end", { withTimezone: true }),
    currentStatus: text("current_status").notNull().default(""),
    weather: jsonb("weather").$type<WeatherSnapshot | null>(),
    weatherSummary: jsonb("weather_summary").$type<WeatherSummary | null>(),
    /** 기상특보 보고: 특보발표현황·레이더 영상 이미지 */
    weatherImages: jsonb("weather_images").$type<WeatherImages | null>(),
    sop: jsonb("sop").$type<Sop | null>(),
    /** setup → sop → running → done */
    status: text("status").notNull().default("setup"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => [index("situations_org_idx").on(t.orgId)],
);

/** 상황 이벤트 원장 — SOP 실행이력과 사용자 기록 */
export const events = pgTable(
  "events",
  {
    id: text("id").primaryKey(),
    situationId: text("situation_id").notNull(),
    at: timestamp("at", { withTimezone: true }).notNull().defaultNow(),
    type: text("type").notNull(),
    title: text("title").notNull(),
    body: text("body").notNull().default(""),
    missionId: text("mission_id"),
    userName: text("user_name").notNull().default(""),
    meta: jsonb("meta").$type<Record<string, unknown>>(),
  },
  (t) => [index("events_situation_idx").on(t.situationId)],
);

/** 상황일지 문서 */
export const reports = pgTable(
  "reports",
  {
    id: text("id").primaryKey(),
    situationId: text("situation_id"),
    orgId: text("org_id").notNull(),
    ownerId: text("owner_id").notNull(),
    title: text("title").notNull(),
    content: jsonb("content").$type<ReportContent>().notNull(),
    /** 한글 편집기에서 저장한 HWPX (base64) */
    hwpxData: text("hwpx_data"),
    hwpxSavedAt: timestamp("hwpx_saved_at", { withTimezone: true }),
    status: text("status").notNull().default("draft"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => [index("reports_org_idx").on(t.orgId)],
);

/** 조직 단위 (비상연락망 트리) */
export const orgUnits = pgTable("org_units", {
  id: text("id").primaryKey(),
  orgId: text("org_id").notNull(),
  parentId: text("parent_id"),
  name: text("name").notNull(),
  /** hq: 본부 / team: 실무반 / dept: 부서 / agency: 유관기관 */
  kind: text("kind").notNull().default("dept"),
  sort: integer("sort").notNull().default(0),
});

export const contacts = pgTable("contacts", {
  id: text("id").primaryKey(),
  orgId: text("org_id").notNull(),
  unitId: text("unit_id").notNull(),
  name: text("name").notNull(),
  title: text("title").notNull().default(""),
  duty: text("duty").notNull().default(""),
  phone: text("phone").notNull().default(""),
  email: text("email").notNull().default(""),
  sort: integer("sort").notNull().default(0),
});

export const contactGroups = pgTable("contact_groups", {
  id: text("id").primaryKey(),
  orgId: text("org_id").notNull(),
  name: text("name").notNull(),
  memberIds: jsonb("member_ids").$type<string[]>().notNull().default([]),
  sort: integer("sort").notNull().default(0),
});

/** 상황전파 수신자별 발송·현장 응답 (링크 토큰 기반, 무인증 모바일 응답) */
export const dispatches = pgTable(
  "dispatches",
  {
    id: text("id").primaryKey(),
    token: text("token").notNull().unique(),
    situationId: text("situation_id").notNull(),
    missionId: text("mission_id").notNull(),
    contactId: text("contact_id"),
    name: text("name").notNull(),
    unit: text("unit").notNull().default(""),
    phone: text("phone").notNull().default(""),
    email: text("email").notNull().default(""),
    channel: text("channel").notNull().default("SMS"),
    message: text("message").notNull().default(""),
    sentAt: timestamp("sent_at", { withTimezone: true }).notNull().defaultNow(),
    /** 수신확인 */
    readAt: timestamp("read_at", { withTimezone: true }),
    /** 임무완료 */
    doneAt: timestamp("done_at", { withTimezone: true }),
    /** 현장 조치사항 */
    note: text("note").notNull().default(""),
    noteAt: timestamp("note_at", { withTimezone: true }),
    /** 상황실 확인 (현장에 「확인 완료」로 표시) */
    ackAt: timestamp("ack_at", { withTimezone: true }),
    ackBy: text("ack_by").notNull().default(""),
  },
  (t) => [index("dispatches_situation_idx").on(t.situationId)],
);
