import "server-only";
import { BUSAN_SOURCE, selectSeed, stepOf, stepLabelOf } from "@/lib/seed";
import { STEP_CODE } from "@/lib/sop/convert";
import { sidoShort } from "@/lib/regions";
import type { ResponseStep } from "@/lib/types";
import type {
  ContactEntry,
  ContactsRequest,
  ContactsResponse,
  SopActionsRequest,
  SopActionsResponse,
  SopAction,
  SopMission,
  T3QMeta,
} from "./types";

const STEP_BY_CODE: Record<string, ResponseStep> = {
  SIGN_DETECTION: "징후감지",
  INITIAL_RESPONSE: "초기대응",
  EMERGENCY_RESPONSE: "비상대응",
  RECOVERY: "수습복구",
};

function meta(): T3QMeta {
  return {
    requestId: crypto.randomUUID(),
    traceId: `mock-${Date.now()}`,
    generatedAt: new Date().toISOString(),
    model: "seed",
    mock: true,
  };
}

/**
 * 시드는 재난대응 프로세스 표의 초기대응부서 행(부산 p.34)만 담고 있다.
 * 다른 부서를 요청하면 같은 시드를 주되 「일치 없음」으로 알린다 (R19 — 없으면 초기대응 행으로 대신).
 */
const SEED_DEPTS = ["재난상황실", "자연재난과"];
const norm = (s: string) => s.replace(/\s/g, "");
function deptMatched(dept?: string): boolean {
  if (!dept?.trim()) return true;
  const d = norm(dept);
  // 「시민안전실 자연재난과」처럼 상위 조직이 붙어도 같은 부서, 「시민안전실」만 적어도 그 아래 부서 묶음
  return [...SEED_DEPTS, "시민안전실"].some((k) => d.includes(k) || (d.length >= 3 && k.includes(d)));
}

/** API-02 모의: 매뉴얼 시드에서 대응단계에 맞는 조치를 추출 */
export async function mockSopActions(req: SopActionsRequest): Promise<SopActionsResponse> {
  const step = STEP_BY_CODE[req.context.responseStep] ?? "초기대응";
  const { source, actions } = selectSeed(req.context.disasterType.name, req.context.responsibleRegion.name, step);
  const missions = new Map<string, SopMission>();
  const out: SopAction[] = actions.map((a, i) => {
    const mc = a.mission?.code ?? `M-${STEP_CODE[stepOf(a)]}`;
    const missionName = a.mission?.name ?? stepLabelOf(a);
    if (!missions.has(mc))
      missions.set(mc, { missionCode: mc, missionName, responseStep: STEP_CODE[stepOf(a)], leadOrg: a.lead, actionCodes: [] });
    missions.get(mc)!.actionCodes.push(a.code);
    return {
      actionCode: a.manualCode ?? a.code,
      actionName: a.title,
      phase: a.phase === "복구" ? "RECOVERY" : "RESPONSE",
      phaseLabel: stepLabelOf(a),
      responseStep: STEP_CODE[stepOf(a)],
      condition: a.condition,
      notes: a.notes,
      category: a.phase === "복구" ? "DAMAGE" : "RESPONSE",
      missionCode: mc,
      orderHint: i + 1,
      summary: a.content,
      organizations: [
        { name: a.lead, role: "LEAD" as const },
        ...a.support.map((n) => ({ name: n, role: "SUPPORT" as const })),
        ...a.collab.map((n) => ({ name: n, role: "COOPERATE" as const })),
      ],
      detailTasks: [...a.details, ...a.damageMeasures].map((d, k) => ({ seq: k + 1, title: d, content: d })),
      propagation: a.propagateTo.length
        ? [
            {
              target: a.propagateTo.join(", "),
              targetType: "ORG" as const,
              channelHint: "SMS" as const,
              messageTemplate: a.propagateMsg || undefined,
            },
          ]
        : [],
      resources: a.resources.map((r) => ({ category: "자원", name: r })),
      sources: a.page ? [{ docId: "seed", docTitle: source, page: a.page }] : [],
    };
  });
  // 실제 연계 응답 지연 흉내
  await new Promise((r) => setTimeout(r, 900));
  return {
    meta: meta(),
    disasterType: req.context.disasterType,
    manual: {
      docId: "seed",
      docTitle: source,
      scope: "SIDO",
      stepBasis: "RESPONSE_STEP",
      // 부서 행 구분은 부산 풍수해 시드에만 있다 (산불·공통 시드는 판단하지 않음)
      ...(source === BUSAN_SOURCE
        ? { departments: SEED_DEPTS, departmentMatched: deptMatched(req.context.department) }
        : {}),
    },
    missions: [...missions.values()],
    actions: out,
  };
}

/**
 * API-04 모의: 매뉴얼 연락망 예시. 실제 번호는 넣지 않는다(공개 저장소) — 모두 자리표시.
 * 실제 연계(live)에서는 T3Q가 매뉴얼 연락망 표(C1~C10)에서 뽑아 준다.
 */
export async function mockContacts(req: ContactsRequest): Promise<ContactsResponse> {
  const short = sidoShort(req.region.name);
  const doc = { docId: "seed-contacts", docTitle: `${req.region.name} 현장조치 행동매뉴얼 (예시)` };
  const e = (category: ContactEntry["category"], org: string, dept: string, title: string, page: number, extra: Partial<ContactEntry> = {}): ContactEntry => ({
    category,
    org,
    dept,
    title,
    phones: ["000-000-0000"],
    asOf: "예시",
    source: { ...doc, page },
    ...extra,
  });
  await new Promise((r) => setTimeout(r, 400));
  return {
    meta: meta(),
    manuals: [{ ...doc, scope: "SIDO", region: req.region, stepBasis: "RESPONSE_STEP" }],
    entries: [
      e("AGENCY", `${short}소방재난본부`, "119종합상황실", "상황실장", 28, { fax: ["000-000-0001"], night: ["000-000-0002"] }),
      e("AGENCY", `${short}경찰청`, "경비교통과", "경비계장", 28),
      e("AGENCY", `${short}지방기상청`, "예보과", "예보관", 28),
      e("AGENCY", "육군 제OO사단", "작전과", "작전과장", 28),
      e("AGENCY", `한국전력공사 ${short}본부`, "재난안전팀", "재난담당", 29),
      e("AGENCY", `한국가스안전공사 ${short}지역본부`, "안전관리부", "담당", 29),
      e("AGENCY", `대한적십자사 ${short}지사`, "재난안전팀", "담당", 29),
      e("AGENCY", `KT ${short}본부`, "네트워크운용팀", "담당", 29),
      e("HIGHER", "행정안전부", "중앙재난안전상황실", "상황실", 27),
      e("INTERNAL", req.region.name, "자연재난과", "과장", 25, { name: "홍OO", mobile: "010-0000-0000" }),
      e("INTERNAL", req.region.name, "재난안전상황실", "상황근무자", 25),
    ],
    warnings: [{ code: "IMAGE_PAGE", message: "유관기관 비상연락망 일부가 그림 쪽이라 뽑지 못했습니다.", docId: doc.docId, page: 30 }],
  };
}
