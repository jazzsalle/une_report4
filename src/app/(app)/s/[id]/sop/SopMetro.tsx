"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Check, CircleCheck, Megaphone, Split, Users } from "lucide-react";
import type { Mission } from "@/lib/types";
import { KIND_LABEL, missionKind } from "@/lib/sop/kind";
import { fmtTime } from "@/lib/format";

/**
 * SOP 흐름도 — 임무를 역으로, 대응단계를 구간으로 보여준다.
 *  완료 구간: 밝은 파랑 / 현재 임무로 들어가는 구간: 분홍(흐름) / 남은 구간: 흐림
 */

const STEP = 176; // 역 간격
const ROW = 150; // 줄 간격
const PAD_X = 70;
const PAD_TOP = 70;

type StationBase =
  | { kind: "terminal"; id: string; label: string }
  | { kind: "mission"; id: string; m: Mission; no: number; lane: string; laneStart: boolean };
type Station = StationBase & { x: number; y: number };

export interface MetroPeople {
  /** 임무 id → 전파 대상 이름들 (그룹명·담당자) */
  targets: Record<string, string[]>;
}

function laneOf(m: Mission) {
  return /^[0-9]단계/.test(m.stage) ? m.stage : m.phase === "복구" ? "4단계 수습·복구" : "직접 추가";
}

const LANE_COLOR: Record<string, string> = {
  "1단계 징후감지": "#38bdf8",
  "2단계 초기대응": "#4f8cff",
  "3단계 비상대응": "#a78bfa",
  "4단계 수습·복구": "#34d399",
  "직접 추가": "#cbd5e1",
};

export function SopMetro({
  missions,
  selected,
  started,
  ended,
  people,
  onSelect,
  fill,
}: {
  missions: Mission[];
  selected: string | null;
  started: boolean;
  ended: boolean;
  people: MetroPeople;
  onSelect: (id: string) => void;
  /** 분리 창: 높이를 내용에 맞추지 않고 부모를 채운다 */
  fill?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1200);
  const [hover, setHover] = useState<{ id: string; rect: DOMRect } | null>(null);

  useLayoutEffect(() => {
    if (!box.current) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  const current = started && !ended ? (missions.find((m) => m.status === "doing") ?? missions.find((m) => m.status === "todo")) : undefined;

  const { stations, height, segs } = useMemo(() => {
    const lanes = Array.from(new Set(missions.map(laneOf))).sort((a, b) =>
      a === "직접 추가" ? 1 : b === "직접 추가" ? -1 : a.localeCompare(b),
    );
    const ordered = lanes.flatMap((l) => missions.filter((m) => laneOf(m) === l));
    const perRow = Math.max(3, Math.floor((width - PAD_X * 2) / STEP));
    const all: StationBase[] = [
      { kind: "terminal", id: "start", label: "시작" },
      ...ordered.map((m, i) => ({
        kind: "mission" as const,
        id: m.id,
        m,
        no: i + 1,
        lane: laneOf(m),
        laneStart: i === 0 || laneOf(ordered[i - 1]) !== laneOf(m),
      })),
      { kind: "terminal", id: "end", label: "종료" },
    ];
    const left = PAD_X + (width - PAD_X * 2 - perRow * STEP) / 2 + STEP / 2;
    const stations: Station[] = all.map((s, i) => {
      const r = Math.floor(i / perRow);
      const c = i % perRow;
      const col = r % 2 === 0 ? c : perRow - 1 - c;
      return { ...s, x: left + col * STEP, y: PAD_TOP + r * ROW };
    });
    // 구간 경로 (줄 바뀜은 반원으로)
    const segs = stations.slice(0, -1).map((a, i) => {
      const b = stations[i + 1];
      let d: string;
      if (a.y === b.y) d = `M${a.x},${a.y} L${b.x},${b.y}`;
      else {
        const r = ROW / 2;
        const rightTurn = Math.floor(i / perRow) % 2 === 0;
        const edge = rightTurn ? a.x + STEP * 0.42 : a.x - STEP * 0.42;
        d = `M${a.x},${a.y} L${edge},${a.y} A${r},${r} 0 0 ${rightTurn ? 1 : 0} ${edge},${b.y} L${b.x},${b.y}`;
      }
      const from = a.kind === "mission" ? a.m : null;
      const passed = a.kind === "terminal" ? started : from ? from.status === "done" || from.status === "skipped" : false;
      const into = !!current && b.id === current.id;
      return { d, passed, into };
    });
    const rows = Math.ceil(stations.length / perRow);
    return { stations, height: PAD_TOP + (rows - 1) * ROW + 90, segs };
  }, [missions, width, started, current]);

  // 현재 임무가 보이도록 스크롤
  const focus = current?.id;
  useEffect(() => {
    if (!focus || !box.current) return;
    const st = stations.find((s) => s.id === focus);
    if (st) box.current.scrollTo({ top: Math.max(0, st.y - 120), behavior: "smooth" });
  }, [focus, stations]);

  const hovered = stations.find((s) => s.id === hover?.id && s.kind === "mission") as
    | Extract<Station, { kind: "mission" }>
    | undefined;
  const done = missions.filter((m) => m.status === "done").length;

  return (
    <div
      ref={box}
      className={clsx(
        "relative w-full overflow-auto rounded-[var(--radius-card)] bg-[radial-gradient(ellipse_at_top_left,#22307a_0%,#141a52_45%,#0e1240_100%)] text-white scroll-thin",
        fill ? "h-full" : "max-h-[560px]",
      )}
    >
      {/* 범례 */}
      <div className="sticky left-0 top-0 z-20 flex flex-wrap items-center gap-x-5 gap-y-1 bg-gradient-to-b from-[#141a52] to-transparent px-6 pb-3 pt-4 text-[15px]">
        <b className="text-[17px]">SOP 흐름도</b>
        <span className="text-white/70">
          완료 {done} / {missions.length}
        </span>
        <span className="flex items-center gap-1.5 text-white/80">
          <span className="flex h-5 w-5 rotate-45 items-center justify-center rounded-[4px] bg-[#fbbf24]" /> 상황판단
        </span>
        <span className="flex items-center gap-1.5 text-white/80">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22d3ee] text-[#0e1240]">
            <Megaphone size={12} />
          </span>
          상황전파
        </span>
        {current && (
          <span className="flex items-center gap-1.5 text-white/80">
            <span className="h-3 w-6 rounded-full bg-[#ff3d8b]" /> 현재 임무
          </span>
        )}
      </div>

      <div className="relative" style={{ height }}>
        <svg className="absolute inset-0" width="100%" height={height}>
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {segs.map((s, i) => (
            <path key={`bg${i}`} d={s.d} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={8} strokeLinecap="round" />
          ))}
          {segs.map((s, i) =>
            s.passed ? (
              <path key={`p${i}`} d={s.d} fill="none" stroke="#4f8cff" strokeWidth={8} strokeLinecap="round" filter="url(#glow)" />
            ) : s.into ? (
              <path
                key={`c${i}`}
                d={s.d}
                fill="none"
                stroke="#ff3d8b"
                strokeWidth={6}
                strokeLinecap="round"
                strokeDasharray="10 10"
                className="animate-[dash_1s_linear_infinite]"
                filter="url(#glow)"
              />
            ) : null,
          )}
        </svg>

        {stations.map((s) =>
          s.kind === "terminal" ? (
            <div
              key={s.id}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: s.x, top: s.y }}
            >
              <span
                className={clsx(
                  "flex h-11 w-11 items-center justify-center rounded-full border-4 text-[14px] font-bold",
                  (s.id === "start" && started) || (s.id === "end" && ended)
                    ? "border-white bg-[#4f8cff]"
                    : "border-white/40 bg-[#141a52] text-white/70",
                )}
              >
                {s.label}
              </span>
            </div>
          ) : (
            <StationView
              key={s.id}
              s={s}
              current={current?.id === s.id}
              selected={selected === s.id}
              onEnter={(rect) => setHover({ id: s.id, rect })}
              onLeave={() => setHover((h) => (h?.id === s.id ? null : h))}
              onClick={() => onSelect(s.id)}
            />
          ),
        )}

        {hovered &&
          hover &&
          createPortal(<HoverCard s={hovered} rect={hover.rect} targets={people.targets[hovered.id] ?? []} />, document.body)}
      </div>
    </div>
  );
}

function StationView({
  s,
  current,
  selected,
  onEnter,
  onLeave,
  onClick,
}: {
  s: Extract<Station, { kind: "mission" }>;
  current: boolean;
  selected: boolean;
  onEnter: (rect: DOMRect) => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const kind = missionKind(s.m);
  const st = s.m.status;
  const laneColor = LANE_COLOR[s.lane] ?? "#cbd5e1";
  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => onEnter(e.currentTarget.getBoundingClientRect())}
      onMouseLeave={onLeave}
      onFocus={(e) => onEnter(e.currentTarget.getBoundingClientRect())}
      onBlur={onLeave}
      className="group absolute flex w-[160px] -translate-x-1/2 flex-col items-center outline-none"
      style={{ left: s.x, top: s.y - 17 }}
    >
      {s.laneStart && (
        <span
          className="absolute -top-9 whitespace-nowrap rounded-full px-3 py-0.5 text-[14px] font-bold text-[#0e1240]"
          style={{ background: laneColor }}
        >
          {s.lane}
        </span>
      )}
      {/* 역 표시 */}
      <span
        className={clsx(
          "relative flex h-[34px] items-center justify-center transition group-hover:scale-110",
          current ? "min-w-[34px]" : "w-[34px]",
        )}
      >
        {current && <span className="absolute inset-[-8px] animate-ping rounded-full bg-[#ff3d8b]/40" />}
        <span
          className={clsx(
            "relative flex h-[30px] w-[30px] items-center justify-center border-[3px] shadow-lg",
            kind === "decision" ? "rotate-45 rounded-[6px]" : "rounded-full",
            current
              ? "border-white bg-[#ff3d8b]"
              : st === "done"
                ? "border-white bg-[#4f8cff]"
                : st === "skipped"
                  ? "border-white/40 bg-white/20"
                  : kind === "decision"
                    ? "border-[#fbbf24] bg-[#141a52]"
                    : kind === "propagation"
                      ? "border-[#22d3ee] bg-[#141a52]"
                      : "border-white/70 bg-[#141a52]",
            selected && "ring-4 ring-white/60",
          )}
        >
          <span className={clsx("flex", kind === "decision" && "-rotate-45")}>
            {st === "done" ? (
              <Check size={16} strokeWidth={3} />
            ) : kind === "decision" ? (
              <Split size={14} className={current ? "" : "text-[#fbbf24]"} />
            ) : kind === "propagation" ? (
              <Megaphone size={14} className={current ? "" : "text-[#22d3ee]"} />
            ) : (
              <span className="text-[12px] font-bold">{s.no}</span>
            )}
          </span>
        </span>
      </span>
      {/* 역 이름 */}
      <span
        className={clsx(
          "mt-2.5 line-clamp-2 max-w-[156px] text-center text-[15px] leading-snug",
          current
            ? "rounded-full bg-[#ff3d8b] px-3 py-1 font-bold text-white shadow-[0_0_16px_rgba(255,61,139,.6)]"
            : st === "done"
              ? "font-semibold text-white"
              : st === "skipped"
                ? "text-white/40 line-through"
                : "text-white/75",
        )}
      >
        {s.m.title}
      </span>
    </button>
  );
}

function HoverCard({
  s,
  rect,
  targets,
}: {
  s: Extract<Station, { kind: "mission" }>;
  rect: DOMRect;
  targets: string[];
}) {
  const m = s.m;
  const kind = missionKind(m);
  // 화면 기준 위치: 역 아래가 넉넉하면 아래, 아니면 위
  const left = Math.min(Math.max(rect.left + rect.width / 2 - 180, 12), window.innerWidth - 372);
  const below = window.innerHeight - rect.bottom > 340;
  const done = m.details.filter((d) => d.done).length;
  return (
    <div
      className="pointer-events-none fixed z-[60] w-[360px] rounded-xl bg-white p-4 text-ink shadow-[0_16px_40px_rgba(0,0,0,.35)]"
      style={{ left, top: below ? rect.bottom + 8 : undefined, bottom: below ? undefined : window.innerHeight - rect.top + 8 }}
    >
      <div className="mb-2 flex items-center gap-2 text-[14px] text-sub">
        <span className="rounded bg-canvas px-2 py-0.5 font-semibold">{KIND_LABEL[kind]}</span>
        <span>{s.lane}</span>
        {m.doneAt && (
          <span className="ml-auto flex items-center gap-1 text-success">
            <CircleCheck size={15} /> {fmtTime(m.doneAt)}
          </span>
        )}
      </div>
      {m.group && (
        <div className="mb-0.5 text-[14px] text-sub">
          [{m.group.code}] {m.group.name}
        </div>
      )}
      <div className="mb-2 text-[17px] font-bold leading-snug">
        {m.title}
        {m.condition && <span className="ml-1.5 rounded bg-warning-weak px-1.5 text-[13px] text-warning">{m.condition}</span>}
      </div>
      {m.details.length > 0 && (
        <div className="mb-3">
          <div className="mb-1 text-[14px] font-semibold text-sub">
            세부항목 {done}/{m.details.length}
          </div>
          <ul className="space-y-1 text-[15px] leading-snug">
            {m.details.slice(0, 6).map((d) => (
              <li key={d.id} className="flex gap-1.5">
                <span className={d.done ? "text-success" : "text-placeholder"}>{d.done ? "✓" : "○"}</span>
                <span className={clsx("line-clamp-2", d.done && "text-sub")}>{d.text}</span>
              </li>
            ))}
            {m.details.length > 6 && <li className="text-sub">외 {m.details.length - 6}건</li>}
          </ul>
        </div>
      )}
      {(m.propagation.message || targets.length > 0) && (
        <div className="mb-3 rounded-md bg-info-weak p-2.5">
          <div className="mb-1 flex items-center gap-1.5 text-[14px] font-semibold text-info">
            <Megaphone size={15} /> 상황전파
            {m.propagation.sentAt && <span className="ml-auto">{fmtTime(m.propagation.sentAt)} 발송</span>}
          </div>
          {m.propagation.message && <p className="line-clamp-3 text-[14px] leading-snug">{m.propagation.message}</p>}
          {targets.length > 0 && <p className="mt-1 text-[14px] text-sub">대상 · {targets.join(", ")}</p>}
        </div>
      )}
      <div className="flex items-center gap-1.5 text-[14px] text-sub">
        <Users size={15} /> 담당 · {[m.lead, m.assignee].filter(Boolean).join(" / ") || "-"}
      </div>
    </div>
  );
}
