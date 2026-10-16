import { STEP_LABEL, type ReportSnapshot, type ResponseStep, type Sop } from "@/lib/types";
import { progress } from "@/lib/sop/kind";

/** 상황일지를 자동 작성하는 시점의 대응 단계 */
export function snapshotOf(s: { responseStep: string; sop: Sop | null }): ReportSnapshot {
  const p = progress(s.sop?.missions ?? []);
  return {
    step: STEP_LABEL[s.responseStep as ResponseStep] ?? s.responseStep,
    done: p.done,
    total: p.total,
    started: !!s.sop?.startedAt,
    ended: !!s.sop?.endedAt,
  };
}

/** 목록 표시: 「2단계 초기대응 · 임무 3/15 완료 시점」, 실행 종료 후면 「대응 종료 후」 */
export function snapshotLabel(snap?: ReportSnapshot | null): string | null {
  if (!snap) return null;
  if (snap.ended) return "대응 종료 후";
  if (!snap.started || !snap.total) return snap.step;
  return `${snap.step} · 임무 ${snap.done}/${snap.total} 완료 시점`;
}
