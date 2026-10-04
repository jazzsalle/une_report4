import "server-only";
import { selectSeed, stepOf, stepLabelOf } from "@/lib/seed";
import { STEP_CODE } from "@/lib/sop/convert";
import type { ResponseStep } from "@/lib/types";
import type {
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

/** API-02 모의: 매뉴얼 시드에서 위기경보 수준에 맞는 조치를 추출 */
export async function mockSopActions(req: SopActionsRequest): Promise<SopActionsResponse> {
  const step = STEP_BY_CODE[req.context.responseStep] ?? "초기대응";
  const { source, actions } = selectSeed(req.context.disasterType.name, step);
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
    missions: [...missions.values()],
    actions: out,
  };
}
