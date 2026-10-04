import "server-only";
import { selectSeed } from "@/lib/seed";
import type {
  SopActionsRequest,
  SopActionsResponse,
  SopAction,
  SopMission,
  WeatherSummaryRequest,
  WeatherSummaryResponse,
  T3QMeta,
} from "./types";

const LEVEL: Record<string, "관심" | "주의" | "경계" | "심각"> = {
  INTEREST: "관심",
  CAUTION: "주의",
  ALERT: "경계",
  SERIOUS: "심각",
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

/** API-01 모의: 공식 특보 원문을 규칙 기반으로 요약 (예측·판단 문구를 만들지 않는다) */
export async function mockWeatherSummary(req: WeatherSummaryRequest): Promise<WeatherSummaryResponse> {
  const region = req.context.responsibleRegion.name;
  const active = req.alerts.filter((a) => a.command !== "PRELIMINARY");
  const pre = req.alerts.filter((a) => a.command === "PRELIMINARY");

  const headline = active.length
    ? `${region} ${active.map((a) => a.kind).join("·")} 발효 중`
    : pre.length
      ? `${region} 예비특보 발표 — 발효 중인 특보 없음`
      : `${region} 발효 중인 기상특보 없음`;

  const keyPoints: string[] = [];
  active.forEach((a) => keyPoints.push(`${a.kind}: ${a.areas.map((x) => x.name).join(", ")}`));
  pre.slice(0, 2).forEach((a) => keyPoints.push(`예비특보 ${a.text ?? a.kind}`));

  // 기상정보 본문에서 (현황)/(전망) 문장 추출
  const info = req.weatherInfoText ?? "";
  const sentences = info
    .split(/\n/)
    .map((l) => l.replace(/^[○o]\s*/, "").trim())
    .filter((l) => /^\((현황|전망)\)/.test(l))
    .map((l) => l.replace(/\s+/g, " "));
  sentences.slice(0, 2).forEach((s) => keyPoints.push(s.length > 120 ? s.slice(0, 118) + "…" : s));

  const body = sentences.length
    ? sentences.join(" ")
    : active.length
      ? `기상청 공식 특보 기준 ${headline}.`
      : "기상청 발표 기준 현재 해당 지역에 발효 중인 특보가 없음.";

  return {
    meta: meta(),
    summary: { headline, body, keyPoints, affectedRegions: [req.context.responsibleRegion] },
    basis: { alertIds: req.alerts.map((a) => a.alertId), sourceLabel: "기상청 기상특보" },
    disclaimer: "공식 기상특보 원문이 우선합니다.",
  };
}

/** API-02 모의: 매뉴얼 시드에서 위기경보 수준에 맞는 조치를 추출 */
export async function mockSopActions(req: SopActionsRequest): Promise<SopActionsResponse> {
  const level = LEVEL[req.context.alertLevel] ?? "주의";
  const { source, actions } = selectSeed(req.context.disasterType.name, level);
  const missions = new Map<string, SopMission>();
  const out: SopAction[] = actions.map((a, i) => {
    const missionName = a.phase === "복구" ? "수습·복구" : `${a.stage} 단계 대응`;
    const mc = a.phase === "복구" ? "M-REC" : `M-${a.stage}`;
    if (!missions.has(mc)) missions.set(mc, { missionCode: mc, missionName, leadOrg: a.lead, actionCodes: [] });
    missions.get(mc)!.actionCodes.push(a.code);
    return {
      actionCode: a.code,
      actionName: a.title,
      phase: a.phase === "복구" ? "RECOVERY" : "RESPONSE",
      phaseLabel: a.manualStage ?? a.stage,
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
