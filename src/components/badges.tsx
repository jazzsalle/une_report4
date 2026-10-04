import { Badge } from "./ui";

const STATUS: Record<string, { label: string; tone: "gray" | "blue" | "orange" | "green" }> = {
  setup: { label: "상황 입력", tone: "gray" },
  sop: { label: "SOP 준비", tone: "blue" },
  running: { label: "SOP 실행 중", tone: "orange" },
  done: { label: "SOP 종료", tone: "green" },
};

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS[status] ?? STATUS.setup;
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

const LEVEL: Record<string, "blue" | "green" | "orange" | "red"> = {
  관심: "blue",
  주의: "green",
  경계: "orange",
  심각: "red",
};

export function LevelBadge({ level }: { level: string }) {
  return <Badge tone={LEVEL[level] ?? "gray"}>{level}</Badge>;
}
