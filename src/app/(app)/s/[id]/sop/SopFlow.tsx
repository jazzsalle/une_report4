"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronUp, Info, Maximize2, Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui";
import type { Mission } from "@/lib/types";
import { STEP_LABEL } from "@/lib/types";
import { currentMission, isOnDemand, missionKind } from "@/lib/sop/kind";
import { isUnfinished } from "@/components/badges";
import { fmtTime } from "@/lib/format";

/** 대응단계 묶음 이름 — 매뉴얼 원문 단계명 그대로(1단계 징후감지, 심각 단계 …), 단계 없는 직접 추가 임무는 끝에 */
export function laneOf(m: Mission) {
  return m.stage.trim() ? m.stage.trim() : m.phase === "복구" ? STEP_LABEL.수습복구 : "직접 추가";
}
const byLane = (a: string, b: string) => (a === "직접 추가" ? 1 : b === "직접 추가" ? -1 : a.localeCompare(b));

/**
 * 왼쪽 세로 SOP 흐름 (P-09) — 대응단계별 번호 순 임무. 번호는 항상 보이고 상태는 색으로(P-03).
 * 완료 = 파랑 채움, 현재 임무 = 분홍, 상황판단 = 노란 마름모, 상황전파 = 하늘색 테두리. 필요시 임무는 단계 끝에 따로.
 * 번호·색은 가로 흐름도(크게 보기, SopMetro)와 같고 바탕도 같은 남색. 범례는 「ⓘ」 표시 안내 안에(P-15).
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
    // 생략 + 미완료(완료했지만 수행 확인 미체크)는 회색으로
    const dim = st === "skipped" || isUnfinished(m);
    return (
      <div
        key={m.id}
        data-mid={m.id}
        role="button"
        tabIndex={0}
        onClick={() => onSelect(m.id)}
        onKeyDown={(e) => e.key === "Enter" && onSelect(m.id)}
        className={clsx(
          "relative mx-2 flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 outline-none transition focus-visible:ring-2 focus-visible:ring-white/60",
          selected === m.id && !cur ? "bg-white/15" : "hover:bg-white/10",
        )}
      >
        {no === null ? (
          <span
            className={clsx(
              "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2",
              st === "done" ? "border-[#fb923c] bg-[#fb923c] text-[#0e1240]" : "border-dashed border-[#fb923c] text-[#fdba74]",
            )}
          >
            <Zap size={16} />
          </span>
        ) : (
          <span className="relative z-[1] mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center">
            <span
              className={clsx(
                "flex h-7 w-7 items-center justify-center border-[3px] text-[13px] font-bold text-white",
                kind === "decision" ? "rotate-45 rounded-[5px]" : "rounded-full",
                cur
                  ? "border-white bg-[#ff3d8b] shadow-[0_0_12px_rgba(255,61,139,.7)]"
                  : dim
                    ? "border-white/40 bg-white/20 text-white/60"
                    : st === "done"
                      ? clsx("bg-[#4f8cff]", kind === "decision" ? "border-[#fbbf24]" : kind === "propagation" ? "border-[#22d3ee]" : "border-white")
                      : kind === "decision"
                        ? "border-[#fbbf24] bg-[#141a52]"
                        : kind === "propagation"
                          ? "border-[#22d3ee] bg-[#141a52]"
                          : "border-white/70 bg-[#141a52]",
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
              cur
                ? "inline-block rounded-full bg-[#ff3d8b] px-3 py-1 font-bold text-white shadow-[0_0_16px_rgba(255,61,139,.6)]"
                : dim
                  ? "text-white/40"
                  : st === "done"
                    ? "font-semibold text-white"
                    : "text-white/80",
            )}
          >
            {m.title || "제목 없음"}
          </div>
          {m.condition && <div className="mt-0.5 text-[15px] font-semibold text-[#fdba74]">{m.condition}</div>}
          {(m.startedAt || m.doneAt) && (
            <div className="mt-0.5 text-[15px] text-white/60">
              {m.startedAt ? fmtTime(m.startedAt) : ""}
              {m.doneAt ? ` ~ ${fmtTime(m.doneAt).split(" ")[1]}` : m.startedAt ? " ~" : ""}
            </div>
          )}
        </div>
        {editing && (
          <span className="flex shrink-0 flex-col">
            <button className="rounded p-0.5 text-white/70 hover:bg-white/15 hover:text-white" aria-label="위로" onClick={(e) => (e.stopPropagation(), onMove(m.id, -1))}>
              <ChevronUp size={18} />
            </button>
            <button className="rounded p-0.5 text-white/70 hover:bg-white/15 hover:text-white" aria-label="아래로" onClick={(e) => (e.stopPropagation(), onMove(m.id, 1))}>
              <ChevronDown size={18} />
            </button>
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      data-tour="sop-flow"
      className="flex max-h-[520px] flex-col overflow-hidden rounded-[var(--radius-card)] bg-[radial-gradient(ellipse_at_top_left,#22307a_0%,#141a52_45%,#0e1240_100%)] text-white xl:h-full xl:max-h-none"
    >
      <div className="flex items-center gap-2 px-5 pb-2 pt-4">
        <h2 className="text-[19px] font-bold">SOP 흐름도</h2>
        <Legend />
        <button
          onClick={onBig}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 text-white/80 hover:bg-white/10 hover:text-white"
          aria-label="크게 보기"
          title="크게 보기"
        >
          <Maximize2 size={20} />
        </button>
      </div>
      <div ref={box} className="scroll-thin min-h-0 flex-1 overflow-y-auto pb-3">
        {groups.map((g) => (
          <div key={g.label}>
            <div className="sticky top-0 z-10 bg-[#141a52]/95 px-5 py-2">
              <span className="inline-block rounded-full bg-[#4f8cff] px-3 py-0.5 text-[15px] font-bold text-white">{g.label}</span>
            </div>
            <div className="relative">
              {/* 임무를 잇는 세로 선 */}
              <span className="pointer-events-none absolute bottom-5 left-[35px] top-5 w-0.5 bg-white/25" />
              {g.main.map((m) => row(m, g.nos.get(m.id) ?? null))}
            </div>
            {g.onDemand.length > 0 && (
              <div data-tour={g.label === firstOnDemand ? "ondemand" : undefined}>
                <div className="flex items-center gap-1.5 px-5 pb-1.5 pt-3 text-[15px] font-bold text-[#fdba74]">
                  <Zap size={16} /> 필요시 임무
                </div>
                {g.onDemand.map((m) => row(m, null))}
              </div>
            )}
          </div>
        ))}
      </div>
      {editing && (
        <div className="border-t border-white/15 p-4">
          <Button className="w-full" onClick={onAdd}>
            <Plus size={18} /> 임무 추가
          </Button>
        </div>
      )}
    </div>
  );
}

/** 「ⓘ」 표시 안내 — 누르면 범례 말풍선 (P-15) */
function Legend() {
  const box = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("mousedown", down);
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("mousedown", down);
      window.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <span ref={box} className="relative">
      <button
        type="button"
        aria-label="표시 안내"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
      >
        <Info size={20} />
      </button>
      {open && (
        <div className="absolute left-0 top-10 z-30 w-48 space-y-2.5 rounded-xl bg-white p-4 text-[16px] text-ink shadow-[0_16px_40px_rgba(0,0,0,.35)]">
          <b className="block">표시 안내</b>
          <span className="flex items-center gap-2.5">
            <span className="h-4 w-4 rounded-full bg-[#4f8cff]" /> 완료
          </span>
          <span className="flex items-center gap-2.5">
            <span className="ml-0.5 h-3.5 w-3.5 rotate-45 rounded-[3px] border-[3px] border-[#fbbf24]" /> 상황판단
          </span>
          <span className="flex items-center gap-2.5">
            <span className="h-4 w-4 rounded-full border-[3px] border-[#22d3ee]" /> 상황전파
          </span>
          <span className="flex items-center gap-2.5">
            <span className="h-3 w-6 rounded-full bg-[#ff3d8b]" /> 현재 임무
          </span>
        </div>
      )}
    </span>
  );
}
