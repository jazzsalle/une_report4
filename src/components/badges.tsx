import clsx from "clsx";
import type { Sop } from "@/lib/types";

/** SOP 상태 — SOP 화면 배지와 같은 이름 (M-03). 점 + 글자 */
export type SopState = "none" | "ready" | "running" | "ended";

export function sopState(sop: Pick<Sop, "startedAt" | "endedAt"> | null | undefined): SopState {
  if (!sop) return "none";
  if (sop.endedAt) return "ended";
  if (sop.startedAt) return "running";
  return "ready";
}

const SOP_STATE: Record<SopState, { label: string; dot: string }> = {
  none: { label: "미생성", dot: "bg-placeholder" },
  ready: { label: "실행 전", dot: "bg-mute" },
  running: { label: "실행 중", dot: "bg-primary" },
  ended: { label: "실행 종료", dot: "bg-success" },
};

export function SopStateLabel({ sop }: { sop: Pick<Sop, "startedAt" | "endedAt"> | null | undefined }) {
  const s = SOP_STATE[sopState(sop)];
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap font-medium">
      <span className={clsx("size-2.5 shrink-0 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

/** 위기경보 배지: 관심 파랑 · 주의 노랑 · 경계 주황 · 심각 빨강 */
const LEVEL: Record<string, string> = {
  관심: "bg-primary-weak text-primary-strong",
  주의: "bg-level-yellow-weak text-level-yellow",
  경계: "bg-level-orange-weak text-level-orange",
  심각: "bg-danger-weak text-danger",
};

export function LevelBadge({ level, prefix }: { level: string; prefix?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex h-7 shrink-0 items-center whitespace-nowrap rounded px-2.5 text-[14px] font-semibold",
        LEVEL[level] ?? "bg-canvas text-sub",
      )}
    >
      {prefix && `${prefix} `}
      {level}
    </span>
  );
}

/** 상황을 열 주소: SOP가 없으면 상황정보 등록(이어서 작성), 있으면 상황 화면 (N-05) */
export function situationHref(s: { id: string; sop: unknown }) {
  return s.sop ? `/s/${s.id}/sop` : `/new?resume=${s.id}`;
}
