"use client";
import "@xyflow/react/dist/style.css";
import { useEffect, useMemo } from "react";
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import clsx from "clsx";
import { Check } from "lucide-react";
import type { Mission } from "@/lib/types";

const W = 210;
const H = 76;
const GAP_X = 50;
const PER_ROW = 5;
const ROW_H = 120;
const LANE_GAP = 40;

type MissionNodeData = { m: Mission; current: boolean; selected: boolean; no: number };
type LaneNodeData = { label: string };
type EndNodeData = { label: string; active: boolean };

function MissionNode({ data }: NodeProps<Node<MissionNodeData>>) {
  const { m, current, selected, no } = data;
  return (
    <div
      className={clsx(
        "relative flex h-[76px] w-[210px] cursor-pointer flex-col justify-center rounded-lg border-2 px-3 text-[14px] leading-snug shadow-sm transition",
        m.status === "done" && "border-success bg-success-weak",
        m.status === "doing" && "border-primary bg-primary-weak",
        m.status === "skipped" && "border-dashed border-line bg-canvas text-mute",
        m.status === "todo" && "border-line bg-white",
        current && "ring-4 ring-primary/30",
        selected && "outline outline-2 outline-offset-2 outline-tab",
      )}
    >
      <Handle type="target" position={Position.Left} className="!h-2 !w-2 !border-0 !bg-transparent" />
      <div className="flex items-center gap-1 text-[12px] font-semibold text-sub">
        <span>{no}</span>
        {m.status === "done" && <Check size={13} className="text-success" />}
        {m.status === "doing" && <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />}
      </div>
      <div className={clsx("line-clamp-2 font-semibold", m.status === "skipped" && "line-through")}>{m.title}</div>
      <Handle type="source" position={Position.Right} className="!h-2 !w-2 !border-0 !bg-transparent" />
    </div>
  );
}

function LaneNode({ data }: NodeProps<Node<LaneNodeData>>) {
  return (
    <div className="flex h-[76px] w-[150px] items-center justify-center rounded-lg bg-tab px-3 text-center text-[15px] font-bold text-white">
      {data.label}
    </div>
  );
}

function EndNode({ data }: NodeProps<Node<EndNodeData>>) {
  return (
    <div
      className={clsx(
        "flex h-[52px] w-[96px] items-center justify-center rounded-full border-2 text-[15px] font-bold",
        data.active ? "border-success bg-success text-white" : "border-line bg-white text-sub",
      )}
    >
      <Handle type="target" position={Position.Left} className="!h-2 !w-2 !border-0 !bg-transparent" />
      {data.label}
      <Handle type="source" position={Position.Right} className="!h-2 !w-2 !border-0 !bg-transparent" />
    </div>
  );
}

const nodeTypes = { mission: MissionNode, lane: LaneNode, end: EndNode };

function laneOf(m: Mission) {
  return /^\d단계/.test(m.stage) ? m.stage : m.phase === "복구" ? "4단계 수습·복구" : "직접 추가";
}

function build(missions: Mission[], selected: string | null, started: boolean, ended: boolean) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const current = started && !ended ? (missions.find((m) => m.status === "doing") ?? missions.find((m) => m.status === "todo")) : undefined;

  const lanes = Array.from(new Set(missions.map(laneOf))).sort((a, b) =>
    a === "직접 추가" ? 1 : b === "직접 추가" ? -1 : a.localeCompare(b),
  );
  // 화면 순서 = 단계별 묶음 순서 (목록과 동일)
  const ordered = lanes.flatMap((l) => missions.filter((m) => laneOf(m) === l));

  let y = 0;
  const pos = new Map<string, { x: number; y: number }>();
  lanes.forEach((lane) => {
    const items = ordered.filter((m) => laneOf(m) === lane);
    const rows = Math.max(1, Math.ceil(items.length / PER_ROW));
    nodes.push({ id: `lane-${lane}`, type: "lane", position: { x: 0, y }, data: { label: lane }, draggable: false, selectable: false });
    items.forEach((m, i) => {
      const r = Math.floor(i / PER_ROW);
      const c = i % PER_ROW;
      pos.set(m.id, { x: 190 + c * (W + GAP_X), y: y + r * ROW_H });
    });
    y += rows * ROW_H + LANE_GAP;
  });

  nodes.push({
    id: "start",
    type: "end",
    position: { x: 190 - 140, y: -90 },
    data: { label: "시작", active: started },
    draggable: false,
  });
  ordered.forEach((m, i) => {
    nodes.push({
      id: m.id,
      type: "mission",
      position: pos.get(m.id)!,
      data: { m, current: current?.id === m.id, selected: selected === m.id, no: i + 1 },
      draggable: false,
    });
  });
  const last = ordered.length ? pos.get(ordered[ordered.length - 1].id)! : { x: 190, y: 0 };
  nodes.push({
    id: "end",
    type: "end",
    position: { x: last.x + W + GAP_X, y: last.y + 12 },
    data: { label: "종료", active: ended },
    draggable: false,
  });

  const chain = ["start", ...ordered.map((m) => m.id), "end"];
  for (let i = 0; i < chain.length - 1; i++) {
    const from = ordered.find((m) => m.id === chain[i]);
    const to = chain[i + 1];
    const passed = chain[i] === "start" ? started : from ? from.status === "done" || from.status === "skipped" : false;
    const into = current?.id === to;
    edges.push({
      id: `e-${chain[i]}-${to}`,
      source: chain[i],
      target: to,
      type: "smoothstep",
      animated: into,
      style: { stroke: into ? "#256ef4" : passed ? "#267337" : "#cdd1d5", strokeWidth: into || passed ? 2.5 : 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: into ? "#256ef4" : passed ? "#267337" : "#cdd1d5" },
    });
  }
  return { nodes, edges, current };
}

function Flow({
  missions,
  selected,
  started,
  ended,
  onSelect,
}: {
  missions: Mission[];
  selected: string | null;
  started: boolean;
  ended: boolean;
  onSelect: (id: string) => void;
}) {
  const { nodes, edges, current } = useMemo(() => build(missions, selected, started, ended), [missions, selected, started, ended]);
  const rf = useReactFlow();
  const focus = current?.id;
  useEffect(() => {
    if (!focus) return;
    const n = rf.getNode(focus);
    if (n) rf.setCenter(n.position.x + W / 2, n.position.y + H / 2, { zoom: 0.95, duration: 500 });
  }, [focus, rf]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodeClick={(_, n) => n.type === "mission" && onSelect(n.id)}
      fitView
      fitViewOptions={{ padding: 0.15 }}
      minZoom={0.3}
      maxZoom={1.5}
      nodesConnectable={false}
      proOptions={{ hideAttribution: true }}
    >
      <Background gap={20} color="#e6e8ea" />
      <Controls showInteractive={false} position="bottom-right" />
    </ReactFlow>
  );
}

export function SopFlow(props: Parameters<typeof Flow>[0]) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
}
