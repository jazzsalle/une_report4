"use client";
import { useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronUp, Maximize2, Plus, Zap } from "lucide-react";
import { Button, Card } from "@/components/ui";
import type { Mission } from "@/lib/types";
import { STEP_LABEL } from "@/lib/types";
import { currentMission, isOnDemand, missionKind } from "@/lib/sop/kind";
import { fmtTime } from "@/lib/format";

/** 대응단계 묶음 이름 (1단계 → 4단계 → 직접 추가) */
export function laneOf(m: Mission) {
  return /^[0-9]단계/.test(m.stage) ? m.stage : m.phase === "복구" ? STEP_LABEL.수습복구 : "직접 추가";
}
const byLane = (a: string, b: string) => (a === "직접 추가" ? 1 : b === "직접 추가" ? -1 : a.localeCompare(b));

/**
 * 왼쪽 세로 SOP 흐름 (P-09) — 대응단계별 번호 순 임무. 번호는 항상 보이고 상태는 색으로(P-03).
 * 완료 = 파랑 채움, 현재 임무 = 분홍, 상황판단 = 노란 마름모, 상황전파 = 하늘색 테두리. 필요시 임무는 단계 끝에 따로.
 * 번호는 가로 흐름도(크게 보기)와 같다.
 */
export function SopFlow({
  missions,
  selected,
  started,
  ended,
  editing,
  onSelect,
  onMove,
  onAdd,
  onBig,
}: {
  missions: Mission[];
  selected: string | null;
  started: boolean;
  ended: boolean;
  editing: boolean;
  onSelect: (id: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
  onAdd: () => void;
  onBig: () => void;
}) {
  const current = started && !ended ? currentMission(missions) : undefined;
  const groups = useMemo(() => {
    const lanes = Array.from(new Set(missions.map(laneOf))).sort(byLane);
    let no = 0;
    const nos = new Map<string, number>();
    lanes.forEach((l) => missions.filter((m) => laneOf(m) === l && !isOnDemand(m)).forEach((m) => nos.set(m.id, ++no)));
    return lanes.map((label) => {
      const all = missions.filter((m) => laneOf(m) === label);
      return { label, main: all.filter((m) => !isOnDemand(m)), onDemand: all.filter(isOnDemand), nos };
    });
  }, [missions]);
  const firstOnDemand = groups.find((g) => g.onDemand.length)?.label;

  // 현재 임무가 보이도록
  const box = useRef<HTMLDivElement>(null);
  const focus = current?.id;
  useEffect(() => {
    if (!focus) return;
    box.current?.querySelector(`[data-mid="${focus}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [focus]);

  const row = (m: Mission, no: number | null) => {
    const kind = missionKind(m);
    const st = m.status;
    const cur = current?.id === m.id;
    return (
      <div
        key={m.id}
        data-mid={m.id}
        role="button"
        tabIndex={0}
        onClick={() => onSelect(m.id)}
        onKeyDown={(e) => e.key === "Enter" && onSelect(m.id)}
        className={clsx(
          "flex cursor-pointer items-start gap-3 border-l-4 px-4 py-3 transition",
          selected === m.id ? "border-primary bg-primary-weak" : "border-transparent hover:bg-canvas",
        )}
      >
        {no === null ? (
          <span
            className={clsx(
              "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2",
              st === "done" ? "border-warning bg-warning text-white" : "border-dashed border-warning text-warning",
            )}
          >
            <Zap size={16} />
          </span>
        ) : (
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center">
            <span
              className={clsx(
                "flex h-7 w-7 items-center justify-center border-[3px] text-[13px] font-bold",
                kind === "decision" ? "rotate-45 rounded-[5px]" : "rounded-full",
                cur
                  ? "border-[#ff3d8b] bg-[#ff3d8b] text-white"
                  : st === "done"
                    ? clsx("bg-primary text-white", kind === "decision" ? "border-[#f5b301]" : kind === "propagation" ? "border-[#22b8d6]" : "border-primary")
                    : st === "skipped"
                      ? "border-line bg-canvas text-mute"
                      : kind === "decision"
                        ? "border-[#f5b301] bg-white text-ink"
                        : kind === "propagation"
                          ? "border-[#22b8d6] bg-white text-ink"
                          : "border-line bg-white text-ink",
              )}
            >
              <span className={clsx(kind === "decision" && "-rotate-45")}>{no}</span>
            </span>
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div
            className={clsx(
              "leading-snug",
              cur && "font-bold text-[#d6246e]",
              st === "skipped" && "text-mute line-through",
            )}
          >
            {m.title || "제목 없음"}
          </div>
          {m.condition && <div className="mt-0.5 text-[15px] font-semibold text-warning">{m.condition}</div>}
          {(m.startedAt || m.doneAt) && (
            <div className="mt-0.5 text-[15px] text-mute">
              {m.startedAt ? fmtTime(m.startedAt) : ""}
              {m.doneAt ? ` ~ ${fmtTime(m.doneAt).split(" ")[1]}` : m.startedAt ? " ~" : ""}
            </div>
          )}
        </div>
        {editing && (
          <span className="flex shrink-0 flex-col">
            <button className="rounded p-0.5 text-sub hover:bg-white hover:text-primary" aria-label="위로" onClick={(e) => (e.stopPropagation(), onMove(m.id, -1))}>
              <ChevronUp size={18} />
            </button>
            <button className="rounded p-0.5 text-sub hover:bg-white hover:text-primary" aria-label="아래로" onClick={(e) => (e.stopPropagation(), onMove(m.id, 1))}>
              <ChevronDown size={18} />
            </button>
          </span>
        )}
      </div>
    );
  };

  return (
    <Card tour="sop-flow" className="flex max-h-[520px] flex-col overflow-hidden xl:h-full xl:max-h-none">
      <div className="flex items-center gap-2 border-b border-line-weak px-5 py-3.5">
        <h2 className="text-[19px] font-bold">SOP 흐름</h2>
        <button
          onClick={onBig}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md text-sub hover:bg-canvas hover:text-ink"
          aria-label="크게 보기"
          title="크게 보기"
        >
          <Maximize2 size={20} />
        </button>
      </div>
      {/* 범례 (P-15 반영 안 함 — 그대로 보임) */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 border-b border-line-weak px-5 py-2 text-[15px] text-sub">
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-full bg-primary" /> 완료
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rotate-45 rounded-[3px] border-[3px] border-[#f5b301]" /> 상황판단
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-full border-[3px] border-[#22b8d6]" /> 상황전파
        </span>
        {current && (
          <span className="flex items-center gap-1.5">
            <span className="h-4 w-4 rounded-full bg-[#ff3d8b]" /> 현재 임무
          </span>
        )}
      </div>
      <div ref={box} className="scroll-thin min-h-0 flex-1 overflow-y-auto pb-2">
        {groups.map((g) => (
          <div key={g.label}>
            <div className="sticky top-0 z-10 bg-tab px-5 py-1.5 text-[15px] font-bold text-white">{g.label}</div>
            {g.main.map((m) => row(m, g.nos.get(m.id) ?? null))}
            {g.onDemand.length > 0 && (
              <div data-tour={g.label === firstOnDemand ? "ondemand" : undefined}>
                <div className="flex items-center gap-1.5 bg-warning-weak px-5 pb-1.5 pt-2.5 text-[15px] font-bold text-warning">
                  <Zap size={16} /> 필요시 임무
                </div>
                {g.onDemand.map((m) => row(m, null))}
              </div>
            )}
          </div>
        ))}
      </div>
      {editing && (
        <div className="border-t border-line-weak p-4">
          <Button className="w-full" onClick={onAdd}>
            <Plus size={18} /> 임무 추가
          </Button>
        </div>
      )}
    </Card>
  );
}
