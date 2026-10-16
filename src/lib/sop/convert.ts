import { nanoid } from "nanoid";
import { STEP_LABEL, type Mission, type Sop } from "@/lib/types";
import type { SituationContext, SopActionsResponse, AlertLevelCode, ResponseStepCode } from "@/lib/t3q/types";
import { stepOf, type SeedAction } from "@/lib/seed";
import { ORG_SIDO, sidoNode, splitArea } from "@/lib/regions";

export const STEP_CODE: Record<string, ResponseStepCode> = {
  징후감지: "SIGN_DETECTION",
  초기대응: "INITIAL_RESPONSE",
  비상대응: "EMERGENCY_RESPONSE",
  수습복구: "RECOVERY",
};

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

/** 시도·발생지역 → 행정구역 (법정동 코드 10자리: 시도 2 + 시군구 3 + 읍면동 5) */
function regionsOf(sidoName: string, areas: string[]) {
  const node = sidoNode(sidoName) ?? sidoNode("부산광역시")!;
  const responsible = { code: node.c.padEnd(10, "0"), name: node.n, level: "SIDO" as const };
  const affected = areas.map((a) => {
    const [sgg, umd] = splitArea(a);
    const sn = node.s.find((x) => x.n === sgg);
    return {
      code: sn ? sn.c.padEnd(10, "0") : "",
      name: `${node.n} ${a}`,
      level: umd ? ("EUPMYEONDONG" as const) : ("SIGUNGU" as const),
    };
  });
  return { responsible, affected };
}

export function buildContext(s: {
  id: string;
  orgId: string;
  kind: string;
  hazard: string;
  alertLevel: string;
  responseStep: string;
  sido: string;
  areas: string[];
  dept?: string;
  title: string;
  currentStatus: string;
  periodStart: Date | string;
  periodEnd: Date | string | null;
}): SituationContext {
  const { responsible, affected } = regionsOf(s.sido || ORG_SIDO[s.orgId] || "부산광역시", s.areas);
  return {
    situationId: s.id,
    workType: s.kind === "drill" ? "DRILL" : "REAL",
    responsibleRegion: responsible,
    affectedRegions: affected,
    disasterType: { code: HAZARD_CODE[s.hazard]?.code ?? "ETC", name: s.hazard, group: HAZARD_CODE[s.hazard]?.group },
    alertLevel: LEVEL_CODE[s.alertLevel] ?? "CAUTION",
    responseStep: STEP_CODE[s.responseStep] ?? "INITIAL_RESPONSE",
    department: s.dept || undefined,
    baseTime: new Date().toISOString(),
    title: s.title,
    currentSituation: s.currentStatus || undefined,
    period: {
      start: new Date(s.periodStart).toISOString(),
      end: s.periodEnd ? new Date(s.periodEnd).toISOString() : undefined,
    },
  };
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
export function responseToSop(res: SopActionsResponse): Sop {
  const groupOf = new Map(res.missions.map((g) => [g.missionCode, { code: g.missionCode, name: g.missionName }]));
  const missions: Mission[] = res.actions
    .slice()
    .sort((a, b) => a.orderHint - b.orderHint)
    .map((a) => {
      const prop = a.propagation[0];
      return {
        ...emptyMission(a.phase === "RECOVERY" || a.category === "DAMAGE" ? "복구" : "대응"),
        code: a.actionCode,
        stage: a.phaseLabel ?? "",
        group: groupOf.get(a.missionCode),
        condition: a.condition || undefined,
        notes: a.notes?.length ? a.notes : undefined,
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
    source: res.meta.mock ? "mock" : "t3q",
    manual: res.manual?.docTitle,
    deptMatched: res.manual?.departmentMatched,
    generatedAt: new Date().toISOString(),
    missions,
  };
}

/** 매뉴얼 라이브러리 카드 → 임무 (임무 추가용) */
export function seedToMission(a: SeedAction): Mission {
  return {
    ...emptyMission(a.phase === "복구" ? "복구" : "대응"),
    code: a.code,
    stage: STEP_LABEL[stepOf(a)],
    group: a.mission,
    condition: a.condition,
    notes: a.notes,
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
