import type { Mission, MissionKind } from "@/lib/types";

export const KIND_LABEL: Record<MissionKind, string> = {
  process: "처리",
  decision: "상황판단",
  propagation: "상황전파",
};

/** 임무 종류: 직접 지정값 → 없으면 임무명으로 추정 (판단·회의 = 상황판단, 전파·보고·홍보 = 상황전파) */
export function missionKind(m: Pick<Mission, "kind" | "title">): MissionKind {
  if (m.kind) return m.kind;
  if (/판단|회의|결정/.test(m.title)) return "decision";
  if (/전파|보고|홍보|통보|문자|안내|발령/.test(m.title)) return "propagation";
  return "process";
}

/** 필요시 임무 — 조치 전체에 조건이 붙은 것(매뉴얼 R8). 흐름선에 넣지 않고 상황이 생기면 바로 실행한다. */
export function isOnDemand(m: Pick<Mission, "condition">): boolean {
  return !!m.condition?.trim();
}

/** 진행 집계 대상 — 필요시 임무는 실행했을 때만 센다 (실행 안 하면 해당 없음) */
export function counted(m: Pick<Mission, "condition" | "status">): boolean {
  return !isOnDemand(m) || m.status === "doing" || m.status === "done";
}

/** 현재 임무: 필요시 임무를 뺀 흐름에서 진행 중 → 없으면 첫 대기. skipId(방금 완료한 임무 등)는 뺀다 */
export function currentMission<T extends Pick<Mission, "id" | "condition" | "status">>(missions: T[], skipId?: string | null): T | undefined {
  const main = missions.filter((m) => m.id !== skipId && !isOnDemand(m));
  return main.find((m) => m.status === "doing") ?? main.find((m) => m.status === "todo");
}

/** 완료 / 전체 (필요시 미실행 제외) */
export function progress(missions: Pick<Mission, "condition" | "status">[]) {
  const list = missions.filter(counted);
  return { done: list.filter((m) => m.status === "done").length, total: list.length };
}
