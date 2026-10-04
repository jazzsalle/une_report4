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
