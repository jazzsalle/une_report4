import "server-only";
import { BUSAN_SOURCE, selectSeed, stepOf, stepLabelOf } from "@/lib/seed";
import { STEP_CODE } from "@/lib/sop/convert";
import type { ResponseStep } from "@/lib/types";
import type {
  SopActionsRequest,
  SopActionsResponse,
  SopAction,
  SopMission,
} from "./types";

const STEP_BY_CODE: Record<string, ResponseStep> = {
  SIGN_DETECTION: "징후감지",
  INITIAL_RESPONSE: "초기대응",
  EMERGENCY_RESPONSE: "비상대응",
  RECOVERY: "수습복구",
};

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
  const step = STEP_BY_CODE[req.context.responseStep] ?? (req.context.responseStep as ResponseStep) ?? "초기대응";
  const region = req.context.responsibleRegion ?? req.context.affectedRegions?.[0]?.split(" ")[0] ?? "";
  const { source, actions } = selectSeed(req.context.disasterType, region, step);
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
      condition: a.condition ?? "",
      notes: a.notes ?? [],
      category: a.phase === "복구" ? "DAMAGE" : "NORMAL",
      missionCode: mc,
      orderHint: i + 1,
      summary: a.content ?? "",
      organizations: [
        { name: a.lead, role: "LEAD" as const },
        ...a.support.map((n) => ({ name: n, role: "SUPPORT" as const })),
        ...a.collab.map((n) => ({ name: n, role: "COOPERATE" as const })),
      ],
      detailTasks: [...a.details, ...a.damageMeasures].map((d, k) => ({ seq: k + 1, title: d, content: "", note: "" })),
      propagation: a.propagateTo.length
        ? [
            {
              target: a.propagateTo.join(", "),
              targetType: "ORG" as const,
              channelHint: "SMS" as const,
              method: "",
              messageTemplate: a.propagateMsg || "",
            },
          ]
        : [],
      resources: a.resources.map((r) => ({ name: r, quantity: null, unit: "" })),
      // 시드는 원문 PDF 가 없다 — 원문 링크를 만들지 않도록 비운다
      sources: [],
      alertLevel: null,
    };
  });
  // 실제 연계 응답 지연 흉내
  await new Promise((r) => setTimeout(r, 900));
  // 부서 행 구분은 부산 풍수해 시드에만 있다 (산불·공통 시드는 판단하지 않음)
  const busan = source === BUSAN_SOURCE;
  return {
    manual: {
      docId: "seed",
      docTitle: source,
      version: "",
      scope: "SIDO",
      region: { name: region, level: "SIDO" },
      stepBasis: "RESPONSE_STEP",
      departments: busan ? SEED_DEPTS : [],
    },
    departmentMatched: busan ? deptMatched(req.context.department ?? undefined) : true,
    warnings: [],
    missions: [...missions.values()],
    actions: out,
  };
}
