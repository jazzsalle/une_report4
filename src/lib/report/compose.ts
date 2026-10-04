import { STEP_LABEL, type ResponseStep, type Mission, type ReportContent, type ReportSection, type Sop, type WeatherSnapshot, type WeatherImages } from "@/lib/types";
import { weatherSection } from "./weather";
import { fmtTime, fmtPeriod } from "@/lib/format";

export interface ComposeInput {
  situation: {
    title: string;
    kind: string;
    hazard: string;
    alertLevel: string;
    responseStep: string;
    sido: string;
    areas: string[];
    periodStart: Date | string;
    periodEnd: Date | string | null;
    currentStatus: string;
    weather: WeatherSnapshot | null;
    weatherImages: WeatherImages | null;
    sop: Sop | null;
  };
  events: { at: Date | string; type: string; title: string; body: string; meta?: Record<string, unknown> | null }[];
  /** 상황전파 수신자별 현장 응답 */
  dispatches?: {
    missionId: string;
    name: string;
    unit: string;
    readAt: Date | string | null;
    doneAt: Date | string | null;
    note: string;
    noteAt: Date | string | null;
    ackAt: Date | string | null;
  }[];
  reporter: string;
  dept: string;
  orgName: string;
}

export const DEFAULT_TOC = [
  "상황 개요",
  "기상특보",
  "피해 현황",
  "대응 조치",
  "상황 전파",
  "복구 및 피해 조치",
  "향후 계획",
];

const STATUS_LABEL: Record<Mission["status"], string> = {
  todo: "대기",
  doing: "진행 중",
  done: "완료",
  skipped: "생략",
};

function recordsOf(input: ComposeInput, kinds: string[]) {
  return input.events.filter((e) => e.type === "record" && kinds.includes(String(e.meta?.kind ?? "")));
}

function missionLines(m: Mission): string[] {
  const lines: string[] = [];
  // 실행이력: 시각 → 실행내역
  const head = m.doneAt
    ? `${fmtTime(m.doneAt)} **${m.title}** 완료`
    : m.startedAt
      ? `${fmtTime(m.startedAt)} **${m.title}** 착수`
      : `**${m.title}**`;
  lines.push(`□ ${head}`);
  if (m.result.trim()) {
    m.result
      .split(/\r?\n/)
      .filter((l) => l.trim())
      .forEach((l) => lines.push(`○ ${l.trim().replace(/^[-○·□]\s*/, "")}`));
  }
  const done = m.details.filter((d) => d.done);
  if (!m.result.trim() && done.length) {
    done.forEach((d) => lines.push(`○ ${d.text}`));
  }
  const assignee = [m.lead, m.assignee].filter(Boolean).join(" / ");
  if (assignee) lines.push(`- 담당: ${assignee}`);
  return lines;
}

export function composeReport(input: ComposeInput): ReportContent {
  const s = input.situation;
  const missions = s.sop?.missions ?? [];
  const sections: ReportSection[] = [];
  const sec = (title: string, body: string[], table?: ReportSection["table"]) =>
    sections.push({ id: `s${sections.length + 1}`, title, body: body.join("\n"), table });

  // 1. 상황 개요
  const overview = [
    `□ 재난유형: ${s.hazard}${s.kind === "drill" ? " (안전한국훈련)" : ""}`,
    `□ 위기경보: ${s.alertLevel} (대응단계: ${STEP_LABEL[s.responseStep as ResponseStep] ?? s.responseStep})`,
    `□ 대응기간: ${fmtPeriod(s.periodStart, s.periodEnd)}`,
  ];
  if (s.sido || s.areas.length) overview.push(`□ 발생지역: ${[s.sido, s.areas.join(", ")].filter(Boolean).join(" ")}`);
  if (s.currentStatus.trim()) {
    overview.push("□ 현재 상황");
    s.currentStatus
      .split(/\r?\n/)
      .filter((l) => l.trim())
      .forEach((l) => overview.push(`○ ${l.trim().replace(/^[-○·□]\s*/, "")}`));
  }
  recordsOf(input, ["상황"]).forEach((e) => overview.push(`○ (${fmtTime(e.at)}) ${e.body || e.title}`));
  sec("상황 개요", overview);

  // 2. 기상특보 — 기상특보 보고(특보 요약 + 특보발표현황·레이더 영상)
  const ws = weatherSection({ weather: s.weather, weatherImages: s.weatherImages }, `s${sections.length + 1}`);
  sections.push(ws);

  // 3. 피해 현황 (사용자 입력)
  const dmg = recordsOf(input, ["피해", "대피", "통제"]);
  const dmgLines: string[] = [];
  if (dmg.length) {
    for (const kind of ["피해", "대피", "통제"]) {
      const list = dmg.filter((e) => e.meta?.kind === kind);
      if (!list.length) continue;
      dmgLines.push(`□ ${kind === "피해" ? "피해 상황" : kind === "대피" ? "대피 현황" : "통제 현황"}`);
      list.forEach((e) => dmgLines.push(`○ (${fmtTime(e.at)}) ${e.body || e.title}`));
    }
  } else {
    dmgLines.push("□ 현재까지 접수된 피해 없음");
  }
  sec("피해 현황", dmgLines);

  // 4. 대응 조치 — SOP 실행이력
  const resp = missions.filter((m) => m.phase === "대응" && (m.status === "done" || m.status === "doing"));
  const respLines = resp.length ? resp.flatMap(missionLines) : ["□ 수행한 대응 조치 없음"];
  const history = missions
    .filter((m) => m.status !== "todo")
    .map((m) => [m.startedAt ? fmtTime(m.startedAt) : "-", m.title, STATUS_LABEL[m.status], m.lead || "-"]);
  sec(
    "대응 조치",
    respLines,
    history.length ? { head: ["시각", "임무", "상태", "담당"], rows: history } : undefined,
  );

  // 5. 상황 전파 — 시각 → 전파 내역, 현장 응답(수신확인·임무완료), 상황실이 확인한 현장 조치사항
  const ds = input.dispatches ?? [];
  const sent = missions.filter((m) => m.propagation.sentAt);
  const respOf = (mid: string) => {
    const list = ds.filter((d) => d.missionId === mid);
    if (!list.length) return "";
    return `수신확인 ${list.filter((d) => d.readAt).length} · 임무완료 ${list.filter((d) => d.doneAt).length} / ${list.length}명`;
  };
  const propLines = sent.length
    ? sent.map((m) => {
        const n = ds.filter((d) => d.missionId === m.id).length || (m.propagation.sentTo ?? []).length;
        const r = respOf(m.id);
        return `□ ${fmtTime(m.propagation.sentAt!)} ${m.title} 관련 전파 (${n}명)${r ? ` — ${r}` : ""}`;
      })
    : ["□ 상황 전파 내역 없음"];
  const acked = ds.filter((d) => d.note && d.ackAt).sort((x, y) => String(x.noteAt).localeCompare(String(y.noteAt)));
  if (acked.length) {
    propLines.push("□ 현장 조치사항");
    acked.forEach((d) => propLines.push(`○ ${fmtTime(d.noteAt ?? d.ackAt!)} ${d.name}(${d.unit}): ${d.note.replace(/\s+/g, " ")}`));
  }
  sec(
    "상황 전파",
    propLines,
    sent.length
      ? {
          head: ["시각", "수신", "내용", "응답"],
          rows: sent.map((m) => [
            fmtTime(m.propagation.sentAt!),
            (m.propagation.sentTo ?? []).slice(0, 4).join(", ") +
              ((m.propagation.sentTo ?? []).length > 4 ? ` 외 ${(m.propagation.sentTo ?? []).length - 4}명` : ""),
            m.propagation.message,
            respOf(m.id) || "-",
          ]),
        }
      : undefined,
  );

  // 6. 복구 및 피해 조치
  const rec: string[] = [];
  missions
    .filter((m) => m.phase === "복구" && m.status !== "todo")
    .forEach((m) => rec.push(...missionLines(m)));
  const dmgActs = missions.filter((m) => m.damage.trim());
  if (dmgActs.length) {
    rec.push("□ 피해 조치");
    dmgActs.forEach((m) =>
      m.damage
        .split(/\r?\n/)
        .filter((l) => l.trim())
        .forEach((l) => rec.push(`○ ${l.trim().replace(/^[-○·□]\s*/, "")}`)),
    );
  }
  const rr = recordsOf(input, ["응급복구", "자원투입"]);
  if (rr.length) {
    rec.push("□ 응급복구 및 자원 투입");
    rr.forEach((e) => rec.push(`○ (${fmtTime(e.at)}) ${e.body || e.title}`));
  }
  if (!rec.length) rec.push("□ 복구 및 피해 조치 내역 없음");
  sec("복구 및 피해 조치", rec);

  // 7. 향후 계획
  const remain = missions.filter((m) => m.status === "todo");
  const plan: string[] = [];
  if (remain.length) {
    plan.push("□ 미완료 임무 지속 추진");
    remain.slice(0, 8).forEach((m) => plan.push(`○ ${m.title}`));
  }
  plan.push("□ 기상특보 해제 시까지 상황관리 체계 유지 및 피해 발생 시 즉시 보고");
  sec("향후 계획", plan);

  return {
    title: `${s.title} 상황일지`,
    reporter: input.reporter,
    dept: input.dept,
    reportedAt: new Date().toISOString(),
    sections,
  };
}
