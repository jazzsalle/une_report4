"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Check, CircleCheck, Megaphone, Users, Zap } from "lucide-react";
import type { Mission } from "@/lib/types";
import { KIND_LABEL, currentMission, isOnDemand, missionKind } from "@/lib/sop/kind";
import { fmtTime } from "@/lib/format";

/**
 * SOP 흐름도 — 임무를 역으로, 대응단계를 구간으로 보여준다.
 *  완료 구간: 밝은 파랑 / 현재 임무로 들어가는 구간: 분홍(흐름) / 남은 구간: 흐림
 *  필요시 임무(condition)는 흐름선에 넣지 않고 아래 「필요시 임무」 칸에 따로 둔다 — 상황이 생기면 순서와 상관없이 바로 실행
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

/** SopFlow laneOf 와 같은 기준 — 매뉴얼 원문 단계명 그대로 */
function laneOf(m: Mission) {
  return m.stage.trim() ? m.stage.trim() : m.phase === "복구" ? "4단계 수습·복구" : "직접 추가";
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

  const main = useMemo(() => missions.filter((m) => !isOnDemand(m)), [missions]);
  const onDemand = useMemo(() => {
    const lanes = Array.from(new Set(missions.map(laneOf))).sort();
    return lanes.flatMap((l) => missions.filter((m) => isOnDemand(m) && laneOf(m) === l));
  }, [missions]);
  const current = started && !ended ? currentMission(missions) : undefined;

  const { stations, height, segs } = useMemo(() => {
    const lanes = Array.from(new Set(main.map(laneOf))).sort((a, b) =>
      a === "직접 추가" ? 1 : b === "직접 추가" ? -1 : a.localeCompare(b),
    );
    const ordered = lanes.flatMap((l) => main.filter((m) => laneOf(m) === l));
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
  }, [main, width, started, current]);

  // 현재 임무가 보이도록 스크롤
  const focus = current?.id;
  useEffect(() => {
    if (!focus || !box.current) return;
    const st = stations.find((s) => s.id === focus);
    if (st) box.current.scrollTo({ top: Math.max(0, st.y - 120), behavior: "smooth" });
  }, [focus, stations]);

  const hoveredOnDemand = onDemand.find((m) => m.id === hover?.id);
  const hovered =
    (stations.find((s) => s.id === hover?.id && s.kind === "mission") as Extract<Station, { kind: "mission" }> | undefined) ??
    (hoveredOnDemand
      ? { kind: "mission" as const, id: hoveredOnDemand.id, m: hoveredOnDemand, no: 0, lane: laneOf(hoveredOnDemand), laneStart: false, x: 0, y: 0 }
      : undefined);

  return (
    <div
      ref={box}
      data-tour="sop-flow"
      className={clsx(
        "relative w-full overflow-auto rounded-[var(--radius-card)] bg-[radial-gradient(ellipse_at_top_left,#22307a_0%,#141a52_45%,#0e1240_100%)] text-white scroll-thin",
        fill ? "h-full" : "max-h-[560px]",
      )}
    >
      {/* 범례 */}
      <div className="sticky left-0 top-0 z-20 flex flex-wrap items-center gap-x-5 gap-y-1 bg-gradient-to-b from-[#141a52] to-transparent px-6 pb-3 pt-4 text-[15px]">
        <b className="text-[17px]">SOP 흐름도</b>
        <span className="flex items-center gap-1.5 text-white/80">
          <span className="h-5 w-5 rounded-full border-[3px] border-white bg-[#4f8cff]" /> 완료
        </span>
        <span className="flex items-center gap-1.5 text-white/80">
          <span className="flex h-5 w-5 rotate-45 items-center justify-center rounded-[4px] border-[3px] border-[#fbbf24]" /> 상황판단
        </span>
        <span className="flex items-center gap-1.5 text-white/80">
          <span className="h-5 w-5 rounded-full border-[3px] border-[#22d3ee]" />
          상황전파
        </span>
        {onDemand.length > 0 && (
          <span className="flex items-center gap-1.5 text-white/80">
            <span className="h-5 w-6 rounded-[5px] border-2 border-dashed border-[#fb923c]" /> 필요시
          </span>
        )}
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

      {onDemand.length > 0 && (
        <div className="border-t border-white/15 px-6 pb-6 pt-4" data-tour="ondemand">
          <div className="mb-3 flex items-center gap-2 text-[17px] font-bold text-[#fdba74]">
            <Zap size={18} /> 필요시 임무
          </div>
          <div className="flex flex-wrap gap-3">
            {onDemand.map((m) => (
              <OnDemandView
                key={m.id}
                m={m}
                selected={selected === m.id}
                onEnter={(rect) => setHover({ id: m.id, rect })}
                onLeave={() => setHover((h) => (h?.id === m.id ? null : h))}
                onClick={() => onSelect(m.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** 필요시 임무 — 점선 주황 칸. 실행하면 칠해지고 실행 시각이 붙는다 */
function OnDemandView({
  m,
  selected,
  onEnter,
  onLeave,
  onClick,
}: {
  m: Mission;
  selected: boolean;
  onEnter: (rect: DOMRect) => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const st = m.status;
  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => onEnter(e.currentTarget.getBoundingClientRect())}
      onMouseLeave={onLeave}
      onFocus={(e) => onEnter(e.currentTarget.getBoundingClientRect())}
      onBlur={onLeave}
      className={clsx(
        "relative flex max-w-[320px] items-center gap-2.5 rounded-lg border-2 px-4 py-2.5 text-left outline-none transition hover:scale-[1.03]",
        st === "done"
          ? "border-[#fb923c] bg-[#fb923c] text-[#0e1240]"
          : st === "doing"
            ? "animate-pulse border-[#fb923c] bg-[#fb923c]/30"
            : st === "skipped"
              ? "border-dashed border-white/30 text-white/40"
              : "border-dashed border-[#fb923c] bg-[#fb923c]/10",
        selected && "ring-4 ring-white/60",
      )}
    >
      {st === "done" ? <Check size={18} strokeWidth={3} className="shrink-0" /> : <Zap size={17} className="shrink-0 text-[#fdba74]" />}
      <span className="min-w-0">
        <span className="line-clamp-2 text-[15px] font-semibold leading-snug">{m.title}</span>
        <span className={clsx("block text-[14px]", st === "done" ? "text-[#0e1240]/80" : "text-[#fdba74]")}>
          {m.condition}
          {m.startedAt && ` · ${fmtTime(m.startedAt).split(" ").pop()} 실행`}
        </span>
      </span>
    </button>
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
  // 위기경보 단계(심각 단계 등)처럼 표에 없는 단계명은 기본 파랑
  const laneColor = LANE_COLOR[s.lane] ?? "#4f8cff";
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
                ? clsx("bg-[#4f8cff]", kind === "decision" ? "border-[#fbbf24]" : kind === "propagation" ? "border-[#22d3ee]" : "border-white")
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
          {/* 번호는 항상 표시, 상태는 색으로 (P-03) */}
          <span className={clsx("flex text-[13px] font-bold", kind === "decision" && "-rotate-45")}>{s.no}</span>
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
                ? "text-white/40"
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
        <span className="shrink-0 whitespace-nowrap rounded bg-canvas px-2 py-0.5 font-semibold">{KIND_LABEL[kind]}</span>
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
        {m.condition && <span className="ml-1.5 rounded bg-warning-weak px-1.5 text-[13px] text-warning box-decoration-clone">{m.condition}</span>}
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
