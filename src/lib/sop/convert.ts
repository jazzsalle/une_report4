import { nanoid } from "nanoid";
import { STEP_LABEL, type Mission, type Sop } from "@/lib/types";
import type { SopContext, SopActionsResponse, SopAction, AlertLevelCode, ResponseStepCode } from "@/lib/t3q/types";
import { stepOf, type SeedAction } from "@/lib/seed";
import { ORG_SIDO, sidoNode } from "@/lib/regions";

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

/** 재난유형 → T3Q 코드 (API-04 요청안 DisasterType.code). API-02 v2 는 한글 라벨을 그대로 보낸다 */
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

/** 시도·발생지역 → 행정구역 이름 (T3Q가 이름으로 매뉴얼을 고른다: 시군구 → 시도 → 중앙) */
function regionsOf(sidoName: string, areas: string[]) {
  const node = sidoNode(sidoName) ?? sidoNode("부산광역시")!;
  return { responsible: node.n, affected: areas.map((a) => `${node.n} ${a}`) };
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
}): SopContext {
  const { responsible, affected } = regionsOf(s.sido || ORG_SIDO[s.orgId] || "부산광역시", s.areas);
  return {
    situationId: s.id,
    workType: s.kind === "drill" ? "DRILL" : "REAL",
    responsibleRegion: responsible,
    affectedRegions: affected,
    disasterType: s.hazard,
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

/** PDF 줄바꿈이 한글 낱말 가운데 남은 것을 잇는다 (예: 「발효⏎됨에」) */
const joinBroken = (t: string) => t.replace(/([가-힣])\n([가-힣])/g, "$1$2");

/**
 * 세부항목 한 줄 — 제목 + (있으면) 비고. 내용(content)은 행동카드 본문이라 길고 표가 뒤섞여 오므로 넣지 않는다
 * (카드 본문은 「행동카드 상세보기」 원문 그림으로 본다). 제목이 없을 때만 내용 첫 줄
 */
function detailText(d: SopAction["detailTasks"][number]) {
  const title = d.title?.trim() || (d.content?.trim().split("\n")[0] ?? "");
  return d.note?.trim() ? `${title} (${d.note.trim()})` : title;
}

/**
 * 원문 위치 — sources 는 [프로세스 표 쪽, 행동카드 쪽…] 으로 오지만 순서 보장이 없고, 표 없는 조치·다른 표 쪽이 섞인 조치도 있다.
 * 응답 안에서 2개 이상 조치에 반복되는 쪽(프로세스 표 등)을 빼면 카드 후보가 남는다 (T3Q 실응답 137건 검증, 2026-10-27)
 */
function refOf(a: SopAction, repeat: Map<string, number>): Mission["ref"] {
  const src = a.sources?.filter((s) => s.docId) ?? [];
  if (!src.length) return undefined;
  const cards = src
    .filter((s) => s.docId === src[0].docId && (repeat.get(`${s.docId}:${s.pdfIndex}`) ?? 0) < 2)
    .map((s) => ({ page: s.page, pdfIndex: s.pdfIndex }));
  const first = cards[0] ?? src[0];
  return { docId: src[0].docId, page: first.page, pdfIndex: first.pdfIndex, ...(cards.length ? { cards } : {}) };
}

/** T3Q 응답(API-SOP v2, 조치 목록+상세) → SOP 임무 목록. source 는 호출부가 정한다 */
export function responseToSop(res: SopActionsResponse): Sop {
  // 주관(LEAD)은 T3Q(API-SOP v2, REQ-6)가 모든 조치에 채워 준다 — 주관이 비는 조치는 없다.
  // 혹시 LEAD가 비는 응답(옛 버전·예외)에만 쓰는 보완값: 표준매뉴얼은 고른 부서 칸 이름, 그 외는 비움
  // (현장조치 매뉴얼 departments 는 머리글이 섞일 수 있어 주관으로 쓰지 않는다).
  const rowOrg = res.manual?.manualKind === "표준" ? (res.manual.departments?.[0] ?? "") : "";
  const groupOf = new Map(res.missions.map((g) => [g.missionCode, { code: g.missionCode, name: g.missionName }]));
  const repeat = new Map<string, number>();
  for (const a of res.actions)
    for (const k of new Set(a.sources?.map((s) => `${s.docId}:${s.pdfIndex}`))) repeat.set(k, (repeat.get(k) ?? 0) + 1);
  const missions: Mission[] = res.actions
    .slice()
    .sort((a, b) => a.orderHint - b.orderHint)
    .map((a) => {
      const prop = a.propagation[0];
      // 표준문안은 문안이 있는 첫 전파 행에서 (전파 행마다 문안이 있는 것은 아니다)
      const template = a.propagation.find((p) => p.messageTemplate?.trim())?.messageTemplate ?? "";
      const leads = a.organizations.filter((o) => o.role === "LEAD").map((o) => o.name);
      const ref = refOf(a, repeat);
      return {
        ...emptyMission(a.phase === "RECOVERY" || a.category === "DAMAGE" ? "복구" : "대응"),
        code: a.actionCode,
        stage: a.phaseLabel ?? "",
        group: groupOf.get(a.missionCode),
        condition: a.condition?.trim() || undefined,
        notes: a.notes?.length ? a.notes : undefined,
        title: a.actionName,
        content: a.summary ?? "",
        // 주관이 여럿이면 첫째가 주관, 나머지는 지원 앞에
        lead: leads[0] ?? rowOrg,
        support: [...leads.slice(1), ...a.organizations.filter((o) => o.role === "SUPPORT").map((o) => o.name)],
        collab: a.organizations.filter((o) => o.role === "COOPERATE").map((o) => o.name),
        details: a.detailTasks.map((d) => ({ id: nanoid(6), text: detailText(d), done: false })).filter((d) => d.text),
        propagation: {
          message: joinBroken(template),
          targetHint: [...new Set(a.propagation.map((p) => p.target.trim()).filter(Boolean))],
          contactIds: [],
          groupIds: [],
          channel: prop?.channelHint === "EMAIL" ? "EMAIL" : "SMS",
        },
        resources: a.resources.map((r) => (r.quantity ? `${r.name} ${r.quantity}${r.unit ?? ""}` : r.name)),
        ...(ref ? { ref } : {}),
      };
    });
  return {
    source: "t3q",
    manual: res.manual?.docTitle,
    deptMatched: res.departmentMatched,
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
