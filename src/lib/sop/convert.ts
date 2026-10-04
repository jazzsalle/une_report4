import { nanoid } from "nanoid";
import type { Mission, Sop, WeatherSnapshot } from "@/lib/types";
import type { SituationContext, SopActionsResponse, WeatherAlert, AlertLevelCode } from "@/lib/t3q/types";
import type { SeedAction } from "@/lib/seed";

export const LEVEL_CODE: Record<string, AlertLevelCode> = {
  관심: "INTEREST",
  주의: "CAUTION",
  경계: "ALERT",
  심각: "SERIOUS",
};

/** 재난유형 → T3Q 코드 (API 요청서 DisasterType.code 와 동일) */
export const HAZARD_CODE: Record<string, { code: string; group: string }> = {
  폭염: { code: "HEAT_WAVE", group: "자연재난" },
  "태풍/호우": { code: "TYPHOON_HEAVY_RAIN", group: "자연재난" },
  지진: { code: "EARTHQUAKE", group: "자연재난" },
  황사: { code: "YELLOW_DUST", group: "자연재난" },
  산불: { code: "WILDFIRE", group: "사회재난" },
  감염병: { code: "INFECTIOUS_DISEASE", group: "사회재난" },
  가축질병: { code: "LIVESTOCK_DISEASE", group: "사회재난" },
  다중밀집건축물붕괴대형사고: { code: "CROWDED_BUILDING_COLLAPSE", group: "사회재난" },
  정부주요시설: { code: "GOV_MAJOR_FACILITY", group: "사회재난" },
  학교시설: { code: "SCHOOL_FACILITY", group: "사회재난" },
};

const REGION: Record<string, { code: string; name: string }> = {
  busan: { code: "2600000000", name: "부산광역시" },
  gyeongbuk: { code: "4700000000", name: "경상북도" },
};

export function buildContext(s: {
  id: string;
  orgId: string;
  kind: string;
  hazard: string;
  alertLevel: string;
  areas: string[];
  title: string;
  currentStatus: string;
  periodStart: Date | string;
  periodEnd: Date | string | null;
}): SituationContext {
  const r = REGION[s.orgId] ?? REGION.busan;
  return {
    situationId: s.id,
    workType: s.kind === "drill" ? "DRILL" : "REAL",
    responsibleRegion: { ...r, level: "SIDO" },
    affectedRegions: s.areas.map((a) => ({ code: "", name: a, level: "SIGUNGU" as const })),
    disasterType: { code: HAZARD_CODE[s.hazard]?.code ?? "ETC", name: s.hazard, group: HAZARD_CODE[s.hazard]?.group },
    alertLevel: LEVEL_CODE[s.alertLevel] ?? "CAUTION",
    baseTime: new Date().toISOString(),
    title: s.title,
    currentSituation: s.currentStatus || undefined,
    period: {
      start: new Date(s.periodStart).toISOString(),
      end: s.periodEnd ? new Date(s.periodEnd).toISOString() : undefined,
    },
  };
}

export function snapshotToAlerts(w: WeatherSnapshot | null): WeatherAlert[] {
  if (!w) return [];
  const t = w.announcedAt ?? w.retrievedAt;
  return [
    ...w.active.map((a, i) => ({
      alertId: `WA-${i + 1}`,
      source: "KMA" as const,
      kind: a.name,
      level: a.kind === "warning" ? ("WARNING" as const) : ("WATCH" as const),
      command: "ISSUE" as const,
      areas: [{ code: "", name: a.areas }],
      announcedAt: t,
      effectiveAt: t,
      retrievedAt: w.retrievedAt,
    })),
    ...w.preliminary.map((p, i) => ({
      alertId: `WP-${i + 1}`,
      source: "KMA" as const,
      kind: "예비특보",
      level: "PRELIMINARY" as const,
      command: "PRELIMINARY" as const,
      areas: [],
      announcedAt: t,
      effectiveAt: t,
      retrievedAt: w.retrievedAt,
      text: p,
    })),
  ];
}

export function emptyMission(phase: "대응" | "복구" = "대응"): Mission {
  return {
    id: nanoid(8),
    code: "",
    phase,
    stage: "",
    title: "",
    content: "",
    lead: "",
    support: [],
    collab: [],
    details: [],
    propagation: { message: "", targetHint: [], contactIds: [], groupIds: [], channel: "SMS" },
    resources: [],
    status: "todo",
    result: "",
    damage: "",
    assignee: "",
  };
}

/** T3Q 응답(조치 목록+상세) → SOP 임무 목록 */
export function responseToSop(res: SopActionsResponse, fallback: boolean): Sop {
  const missions: Mission[] = res.actions
    .slice()
    .sort((a, b) => a.orderHint - b.orderHint)
    .map((a) => {
      const prop = a.propagation[0];
      return {
        ...emptyMission(a.phase === "RECOVERY" || a.category === "DAMAGE" ? "복구" : "대응"),
        code: a.actionCode,
        stage: a.phaseLabel ?? "",
        title: a.actionName,
        content: a.summary ?? "",
        lead: a.organizations.find((o) => o.role === "LEAD")?.name ?? "",
        support: a.organizations.filter((o) => o.role === "SUPPORT").map((o) => o.name),
        collab: a.organizations.filter((o) => o.role === "COOPERATE").map((o) => o.name),
        details: a.detailTasks.map((d) => ({ id: nanoid(6), text: d.title || d.content, done: false })),
        propagation: {
          message: prop?.messageTemplate ?? "",
          targetHint: a.propagation.map((p) => p.target),
          contactIds: [],
          groupIds: [],
          channel: prop?.channelHint === "EMAIL" ? "EMAIL" : "SMS",
        },
        resources: a.resources.map((r) => (r.quantity ? `${r.name} ${r.quantity}${r.unit ?? ""}` : r.name)),
      };
    });
  return {
    source: res.meta.mock || fallback ? "mock" : "t3q",
    generatedAt: new Date().toISOString(),
    missions,
  };
}

/** 매뉴얼 라이브러리 카드 → 임무 (임무 추가용) */
export function seedToMission(a: SeedAction): Mission {
  return {
    ...emptyMission(a.phase === "복구" ? "복구" : "대응"),
    code: a.code,
    stage: a.manualStage ?? a.stage,
    title: a.title,
    content: a.content,
    lead: a.lead,
    support: a.support,
    collab: a.collab,
    details: [...a.details, ...a.damageMeasures].map((d) => ({ id: nanoid(6), text: d, done: false })),
    propagation: {
      message: a.propagateMsg,
      targetHint: a.propagateTo,
      contactIds: [],
      groupIds: [],
      channel: "SMS",
    },
    resources: a.resources,
  };
}
