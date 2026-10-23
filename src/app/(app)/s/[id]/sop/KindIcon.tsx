import clsx from "clsx";
import { Megaphone, Split, Wrench } from "lucide-react";
import type { MissionKind } from "@/lib/types";
import { KIND_LABEL } from "@/lib/sop/kind";

/** 임무 종류 아이콘 — 상황판단(마름모) · 상황전파(확성기) · 처리 */
export function KindIcon({ kind, size = 30 }: { kind: MissionKind; size?: number }) {
  const icon = size * 0.55;
  return (
    <span
      title={KIND_LABEL[kind]}
      aria-label={KIND_LABEL[kind]}
      className={clsx(
        "flex shrink-0 items-center justify-center",
        kind === "decision" && "rotate-45 rounded-md bg-warning-weak text-warning",
        kind === "propagation" && "rounded-full bg-info-weak text-info",
        kind === "process" && "rounded-full bg-canvas text-sub",
      )}
      style={{ width: size, height: size }}
    >
      <span className={clsx(kind === "decision" && "-rotate-45")}>
        {kind === "decision" ? <Split size={icon} /> : kind === "propagation" ? <Megaphone size={icon} /> : <Wrench size={icon} />}
      </span>
    </span>
  );
}
