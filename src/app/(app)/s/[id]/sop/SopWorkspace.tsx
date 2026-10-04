"use client";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  PanelTopClose,
  FileText,
  ListChecks,
  Pencil,
  Play,
  Plus,
  RotateCcw,
  Sparkles,
  Square,
  Workflow,
  List,
} from "lucide-react";
import { Badge, Button, Card, Empty, Modal } from "@/components/ui";
import {
  RESPONSE_STEPS,
  STEP_LABEL,
  type Mission,
  type ResponseStep,
  type Sop,
} from "@/lib/types";
import type { ContactsBundle } from "@/lib/data";
import {
  deleteMission,
  endSop,
  generateSop,
  reopenSop,
  saveMission,
  startSop,
  createReport,
  addMissions,
  reorderMissions,
} from "@/app/actions/situation";
import { KindIcon } from "./KindIcon";
import { missionKind } from "@/lib/sop/kind";
import { missionFromLibrary, missionsFromLibrary } from "@/app/actions/library";
import { emptyMission } from "@/lib/sop/convert";
import { fmtDateTime, fmtTime } from "@/lib/format";
import { MissionDetail } from "./MissionDetail";
import { Timeline, type EventItem } from "./Timeline";
import { SopMetro } from "./SopMetro";
import {
  propagationTargets,
  sopChannel,
  type SopMessage,
} from "@/lib/sop/targets";

export type DispatchRow = {
  id: string;
  token: string;
  missionId: string;
  name: string;
  unit: string;
  phone: string;
  sentAt: string;
  readAt: string | null;
  doneAt: string | null;
  note: string;
  noteAt: string | null;
  ackAt: string | null;
};

export type LibraryItem = {
  code: string;
  stage: string;
  step: string;
  phase: string;
  title: string;
  lead: string;
};

export const MISSION_STATUS: Record<
  Mission["status"],
  { label: string; tone: "gray" | "blue" | "green" | "orange" }
> = {
  todo: { label: "대기", tone: "gray" },
  doing: { label: "진행 중", tone: "blue" },
  done: { label: "완료", tone: "green" },
  skipped: { label: "생략", tone: "orange" },
};

export function SopWorkspace({
  id,
  sop,
  editable,
  me,
  events,
  contacts,
  library,
  hazard,
  step,
  title,
  orgName,
  dispatches,
}: {
  id: string;
  sop: Sop | null;
  editable: boolean;
  me: string;
  events: EventItem[];
  contacts: ContactsBundle;
  library: LibraryItem[];
  hazard: string;
  step: string;
  title: string;
  orgName: string;
  dispatches: DispatchRow[];
}) {
  const router = useRouter();
  const [missions, setMissions] = useState<Mission[]>(sop?.missions ?? []);
  const [sel, setSel] = useState<string | null>(sop?.missions[0]?.id ?? null);
  const [busy, start] = useTransition();
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [adding, setAdding] = useState(false);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  // 편집: 임무·세부항목 구성 / 실행: 체크·착수·완료·전파
  const [mode, setMode] = useState<"edit" | "run">(
    sop?.startedAt ? "run" : "edit",
  );
  // 보기: 목록 / 순서도
  const [view, setView] = useState<"list" | "flow">("list");
  // SOP 창 분리
  const [detached, setDetached] = useState(false);
  const win = useRef<Window | null>(null);
  const bc = useRef<BroadcastChannel | null>(null);
  const notify = () =>
    bc.current?.postMessage({ type: "changed" } satisfies SopMessage);

  useEffect(() => {
    const ch = new BroadcastChannel(sopChannel(id));
    bc.current = ch;
    ch.onmessage = (e: MessageEvent<SopMessage>) => {
      if (e.data.type === "select") setSel(e.data.id);
      if (e.data.type === "dock") setDetached(false);
      if (e.data.type === "hello") setDetached(true);
    };
    return () => ch.close();
  }, [id]);

  // 분리 창을 직접 닫으면 제자리로
  useEffect(() => {
    if (!detached) return;
    const t = setInterval(() => {
      if (win.current && win.current.closed) {
        win.current = null;
        setDetached(false);
      }
    }, 1000);
    return () => clearInterval(t);
  }, [detached]);

  const detach = () => {
    win.current = window.open(
      `/board/${id}`,
      `sop-board-${id}`,
      "width=1280,height=820",
    );
    if (win.current) setDetached(true);
  };
  const dock = () => {
    bc.current?.postMessage({ type: "dock" } satisfies SopMessage);
    win.current?.close();
    win.current = null;
    setDetached(false);
  };
  // 조치 완료 → SOP 흐름도(목록)로 돌아간다. 분리 창이면 그 창을 앞으로.
  const topRef = useRef<HTMLDivElement | null>(null);
  const backToFlow = () => {
    if (detached) {
      const w = win.current && !win.current.closed ? win.current : window.open("", `sop-board-${id}`);
      w?.focus();
      return;
    }
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
  };
  const select = (mid: string) => {
    setSel(mid);
    bc.current?.postMessage({ type: "select", id: mid } satisfies SopMessage);
  };

  // 서버에서 SOP가 새로 생성되면 동기화
  const sopKey = sop?.generatedAt;
  const [prevKey, setPrevKey] = useState(sopKey);
  if (sopKey !== prevKey) {
    setPrevKey(sopKey);
    setMissions(sop?.missions ?? []);
    setSel(
      sop?.missions.some((m) => m.id === sel)
        ? sel
        : (sop?.missions[0]?.id ?? null),
    );
  }

  const running = !!sop?.startedAt && !sop?.endedAt;
  const ended = !!sop?.endedAt;

  // 실행 중에는 현장 응답을 주기적으로 받아온다
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => router.refresh(), 15000);
    return () => clearInterval(t);
  }, [running, router]);

  const counts = useMemo(() => {
    const c = { todo: 0, doing: 0, done: 0, skipped: 0 };
    missions.forEach((m) => c[m.status]++);
    return c;
  }, [missions]);

  const current = missions.find((m) => m.id === sel) ?? null;

  /** 내용 수정은 0.8초 뒤 저장, 상태 변경은 즉시 저장 후 이력 갱신 */
  const update = (m: Mission, immediate = false) => {
    setMissions((list) =>
      list.some((x) => x.id === m.id)
        ? list.map((x) => (x.id === m.id ? m : x))
        : [...list, m],
    );
    const t = timers.current.get(m.id);
    if (t) clearTimeout(t);
    if (immediate) {
      timers.current.delete(m.id);
      start(async () => {
        await saveMission(id, m);
        router.refresh();
        notify();
      });
    } else {
      timers.current.set(
        m.id,
        setTimeout(() => {
          timers.current.delete(m.id);
          saveMission(id, m).then(notify);
        }, 800),
      );
    }
  };

  /** 같은 대응단계 안에서 한 칸 위/아래로 */
  const move = (mid: string, dir: -1 | 1) => {
    const i = missions.findIndex((m) => m.id === mid);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= missions.length) return;
    const next = [...missions];
    [next[i], next[j]] = [next[j], next[i]];
    setMissions(next);
    start(async () => {
      await reorderMissions(
        id,
        next.map((m) => m.id),
      );
      notify();
    });
  };

  const remove = (mid: string) => {
    setMissions((l) => l.filter((m) => m.id !== mid));
    setSel(missions.find((m) => m.id !== mid)?.id ?? null);
    start(async () => {
      await deleteMission(id, mid);
      notify();
    });
  };

  const act = (fn: () => Promise<unknown>) =>
    start(async () => {
      await fn();
      router.refresh();
      notify();
    });

  if (!sop) {
    return (
      <Card className="py-10">
        <Empty>생성된 SOP가 없습니다.</Empty>
        {editable && (
          <div className="flex justify-center">
            <Button
              size="lg"
              variant="primary"
              disabled={busy}
              onClick={() => act(() => generateSop(id))}
            >
              <Sparkles size={20} /> {busy ? "SOP 생성 중" : "SOP 생성하기"}
            </Button>
          </div>
        )}
      </Card>
    );
  }

  // 대응단계별 묶음 (1단계 → 4단계 → 직접 추가)
  const groupOf = (m: Mission) =>
    /^[0-9]단계/.test(m.stage)
      ? m.stage
      : m.phase === "복구"
        ? STEP_LABEL.수습복구
        : "직접 추가";
  const groups = Array.from(new Set(missions.map(groupOf)))
    .sort((a, b) =>
      a === "직접 추가" ? 1 : b === "직접 추가" ? -1 : a.localeCompare(b),
    )
    .map((label) => ({
      label,
      items: missions.filter((m) => groupOf(m) === label),
    }));

  return (
    <div className="space-y-5">
      {/* 실행 상태 바 */}
      <Card className="flex flex-wrap items-center gap-x-5 gap-y-3 px-6 py-4">
        <Segmented
          value={mode}
          onChange={setMode}
          items={[
            { value: "edit", label: "SOP 편집", icon: <Pencil size={17} /> },
            { value: "run", label: "SOP 실행", icon: <ListChecks size={18} /> },
          ]}
        />
        <Segmented
          value={view}
          onChange={setView}
          items={[
            { value: "list", label: "목록", icon: <List size={18} /> },
            { value: "flow", label: "순서도", icon: <Workflow size={18} /> },
          ]}
        />
        {detached ? (
          <Button size="sm" variant="primary" onClick={dock}>
            <PanelTopClose size={16} /> 창 복귀
          </Button>
        ) : (
          <Button size="sm" onClick={detach}>
            <ExternalLink size={16} /> 창 분리
          </Button>
        )}
        {running ? (
          <Badge tone="blue">실행 중</Badge>
        ) : ended ? (
          <Badge tone="green">실행 종료</Badge>
        ) : (
          <Badge tone="gray">실행 전</Badge>
        )}
        {sop.startedAt && (
          <span className="text-[16px] text-sub">
            시작 {fmtDateTime(sop.startedAt)}
            {sop.endedAt && ` · 종료 ${fmtTime(sop.endedAt)}`}
          </span>
        )}
        <span className="text-[17px] font-medium">
          완료 {counts.done} · 진행 중 {counts.doing} · 대기 {counts.todo} ·
          생략 {counts.skipped}
        </span>
        {sop.source === "mock" && !sop.startedAt && (
          <Badge tone="gray">기본 SOP</Badge>
        )}
        <div className="ml-auto flex flex-wrap gap-2">
          {editable && !sop.startedAt && (
            <>
              <Button
                disabled={busy}
                onClick={() => act(() => generateSop(id))}
              >
                <Sparkles size={18} /> 다시 생성
              </Button>
              <Button
                variant="primary"
                disabled={busy || !missions.length}
                onClick={() => {
                  setMode("run");
                  act(() => startSop(id));
                }}
              >
                <Play size={18} /> SOP 실행 시작
              </Button>
            </>
          )}
          {editable && running && (
            <Button
              variant="primary"
              disabled={busy}
              onClick={() => setConfirmEnd(true)}
            >
              <Square size={16} /> 실행 종료
            </Button>
          )}
          {editable && ended && (
            <>
              <Button
                disabled={busy}
                onClick={() => {
                  setMode("run");
                  act(() => reopenSop(id));
                }}
              >
                <RotateCcw size={18} /> 실행 재개
              </Button>
              <Button
                variant="primary"
                disabled={busy}
                onClick={() => start(() => createReport(id))}
              >
                <FileText size={18} /> 상황일지 작성
              </Button>
            </>
          )}
        </div>
      </Card>

      {detached && (
        <Card className="flex items-center gap-3 border border-primary-line bg-primary-weak/60 px-6 py-3">
          <ExternalLink size={18} className="text-primary" />
          <span className="font-medium">SOP가 별도 창에 열려 있습니다</span>
          <Button
            size="sm"
            className="ml-auto"
            onClick={() => win.current?.focus()}
          >
            창 보기
          </Button>
          <Button size="sm" variant="primary" onClick={dock}>
            <PanelTopClose size={16} /> 창 복귀
          </Button>
        </Card>
      )}

      <div ref={topRef} className="-mb-5 scroll-mt-28" />
      {view === "flow" && !detached && (
        <SopMetro
          missions={missions}
          selected={sel}
          started={!!sop.startedAt}
          ended={ended}
          people={{ targets: propagationTargets(missions, contacts) }}
          onSelect={select}
        />
      )}

      <div
        className={clsx(
          "grid gap-5",
          view === "list" && !detached
            ? "xl:grid-cols-[360px_1fr_380px]"
            : "xl:grid-cols-[1fr_380px]",
        )}
      >
        {/* SOP 임무 목록 */}
        {view === "list" && !detached && (
          <Card className="flex max-h-[calc(100vh-240px)] min-h-[560px] flex-col overflow-hidden">
            <div className="flex items-center justify-between px-5 pb-2 pt-5">
              <h2 className="text-[19px] font-bold">SOP 임무</h2>
              <span className="text-sub">{missions.length}건</span>
            </div>
            <div className="scroll-thin flex-1 overflow-y-auto pb-2">
              {groups.map((g) => (
                <div key={g.label}>
                  <div className="sticky top-0 z-10 bg-tab px-5 py-2 text-[15px] font-bold text-white">
                    {g.label}
                  </div>
                  {g.items.map((m, i) => {
                    const st = MISSION_STATUS[m.status];
                    const newGroup =
                      m.group && m.group.code !== g.items[i - 1]?.group?.code;
                    return (
                      <div key={m.id}>
                        {newGroup && (
                          <div className="border-b border-line-weak bg-canvas px-5 pb-1.5 pt-3 text-[15px] font-bold leading-snug">
                            [{m.group!.code}] {m.group!.name}
                          </div>
                        )}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => select(m.id)}
                          onKeyDown={(e) => e.key === "Enter" && select(m.id)}
                          className={clsx(
                            "group flex w-full cursor-pointer items-start gap-3 border-l-4 px-5 py-3.5 text-left transition",
                            sel === m.id
                              ? "border-primary bg-primary-weak"
                              : "border-transparent hover:bg-canvas",
                          )}
                        >
                          <KindIcon kind={missionKind(m)} />
                          <div className="min-w-0 flex-1">
                            <div
                              className={clsx(
                                "leading-snug",
                                m.status === "skipped" &&
                                  "text-mute line-through",
                              )}
                            >
                              {m.group && /^\d/.test(m.code) && (
                                <span className="mr-1.5 text-[15px] text-sub">
                                  {m.code}
                                </span>
                              )}
                              {m.title || "제목 없음"}
                              {m.condition && (
                                <span className="ml-1.5 rounded bg-warning-weak px-1.5 py-0.5 text-[13px] font-semibold text-warning">
                                  {m.condition}
                                </span>
                              )}
                            </div>
                            {(m.startedAt || m.doneAt) && (
                              <div className="mt-1 text-[15px] text-mute">
                                {m.startedAt ? fmtTime(m.startedAt) : ""}
                                {m.doneAt
                                  ? ` ~ ${fmtTime(m.doneAt).split(" ")[1]}`
                                  : m.startedAt
                                    ? " ~"
                                    : ""}
                              </div>
                            )}
                          </div>
                          {mode === "edit" && editable ? (
                            <span className="flex shrink-0 flex-col">
                              <button
                                className="rounded p-0.5 text-sub hover:bg-white hover:text-primary"
                                aria-label="위로"
                                onClick={(e) => (
                                  e.stopPropagation(),
                                  move(m.id, -1)
                                )}
                              >
                                <ChevronUp size={18} />
                              </button>
                              <button
                                className="rounded p-0.5 text-sub hover:bg-white hover:text-primary"
                                aria-label="아래로"
                                onClick={(e) => (
                                  e.stopPropagation(),
                                  move(m.id, 1)
                                )}
                              >
                                <ChevronDown size={18} />
                              </button>
                            </span>
                          ) : (
                            sop.startedAt && (
                              <Badge tone={st.tone}>{st.label}</Badge>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            {editable && mode === "edit" && (
              <div className="border-t border-line-weak p-4">
                <Button className="w-full" onClick={() => setAdding(true)}>
                  <Plus size={18} /> 임무 추가
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* 임무 상세 */}
        <Card className="min-h-[560px]">
          {current ? (
            <MissionDetail
              key={current.id}
              mission={current}
              mode={mode}
              dispatches={dispatches.filter((d) => d.missionId === current.id)}
              preview={{ orgName, situationTitle: title }}
              running={running}
              started={!!sop.startedAt}
              editable={editable}
              onAddMission={
                view === "flow" && mode === "edit" && editable
                  ? () => setAdding(true)
                  : undefined
              }
              me={me}
              contacts={contacts}
              situationId={id}
              onChange={update}
              onDone={backToFlow}
              onDelete={() => remove(current.id)}
            />
          ) : (
            <Empty>임무를 선택하세요.</Empty>
          )}
        </Card>

        {/* 수행 이력 · 상황 기록 */}
        <Timeline id={id} events={events} editable={editable} />
      </div>

      <Modal
        open={confirmEnd}
        onClose={() => setConfirmEnd(false)}
        title="SOP 실행 종료"
        width={480}
        footer={
          <>
            <Button onClick={() => setConfirmEnd(false)}>취소</Button>
            <Button
              variant="primary"
              disabled={busy}
              onClick={() => {
                setConfirmEnd(false);
                act(() => endSop(id));
              }}
            >
              종료
            </Button>
          </>
        }
      >
        <p className="text-[18px]">
          완료 {counts.done}건 · 미완료 {counts.todo + counts.doing}건
        </p>
        <p className="mt-2 text-sub">종료 후 상황일지를 작성할 수 있습니다.</p>
      </Modal>

      <AddMission
        open={adding}
        onClose={() => setAdding(false)}
        library={library}
        hazard={hazard}
        step={step}
        existing={missions.map((m) => m.code)}
        onAdd={(m) => {
          update(m, true);
          setSel(m.id);
          setAdding(false);
        }}
        onAddMany={(ms, label) => {
          setMissions((l) => [
            ...l,
            ...ms.filter((m) => !l.some((x) => x.code && x.code === m.code)),
          ]);
          if (ms[0]) setSel(ms[0].id);
          setAdding(false);
          start(async () => {
            await addMissions(id, ms, label);
            router.refresh();
          });
        }}
      />
    </div>
  );
}

function AddMission({
  open,
  onClose,
  library,
  hazard,
  step,
  existing,
  onAdd,
  onAddMany,
}: {
  open: boolean;
  onClose: () => void;
  library: LibraryItem[];
  hazard: string;
  step: string;
  existing: string[];
  onAdd: (m: Mission) => void;
  onAddMany: (ms: Mission[], label: string) => void;
}) {
  const [q, setQ] = useState("");
  const [title, setTitle] = useState("");
  const [phase, setPhase] = useState<"대응" | "복구">("대응");
  const [filter, setFilter] = useState<string>(step);
  const [pending, start] = useTransition();
  const list = library.filter(
    (l) =>
      (filter === "전체" || l.step === filter) &&
      (!q || l.title.includes(q) || l.lead.includes(q)),
  );
  const addable = list.filter((l) => !existing.includes(l.code));
  return (
    <Modal open={open} onClose={onClose} title="임무 추가" width={800}>
      <div className="mb-6 flex gap-2">
        <input
          className="input"
          placeholder="임무명 직접 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="input w-32"
          value={phase}
          onChange={(e) => setPhase(e.target.value as "대응" | "복구")}
        >
          <option>대응</option>
          <option>복구</option>
        </select>
        <Button
          variant="primary"
          disabled={!title.trim()}
          onClick={() => {
            onAdd({ ...emptyMission(phase), title: title.trim() });
            setTitle("");
          }}
        >
          추가
        </Button>
      </div>
      <h4 className="mb-2 font-bold">매뉴얼에서 선택</h4>
      <div className="mb-3 flex flex-wrap gap-2">
        {["전체", ...RESPONSE_STEPS].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={clsx(
              "h-10 rounded-md border px-3.5 text-[15px] font-medium",
              filter === st
                ? "border-primary bg-primary-weak text-primary-strong"
                : "border-line hover:border-primary",
            )}
          >
            {st === "전체" ? "전체" : STEP_LABEL[st as ResponseStep]}
          </button>
        ))}
      </div>
      <div className="mb-3 flex gap-2">
        <input
          className="input"
          placeholder="검색"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {filter !== "전체" && (
          <Button
            disabled={!addable.length || pending}
            onClick={() =>
              start(async () => {
                const ms = await missionsFromLibrary(
                  hazard,
                  addable.map((l) => l.code),
                );
                onAddMany(ms, STEP_LABEL[filter as ResponseStep]);
              })
            }
          >
            <Plus size={18} /> 이 단계 {addable.length}건 모두 추가
          </Button>
        )}
      </div>
      <div className="scroll-thin max-h-[400px] overflow-y-auto rounded-md border border-line-weak">
        {list.map((l) => {
          const has = existing.includes(l.code);
          return (
            <button
              key={l.code}
              disabled={has || pending}
              onClick={() =>
                start(async () => {
                  const m = await missionFromLibrary(hazard, l.code);
                  if (m) onAdd(m);
                })
              }
              className="flex w-full items-center gap-3 border-b border-line-weak px-4 py-3 text-left last:border-0 hover:bg-canvas disabled:opacity-40"
            >
              <Badge tone={l.step === "수습복구" ? "orange" : "blue"}>
                {l.stage}
              </Badge>
              <span className="flex-1">{l.title}</span>
              <span className="text-[15px] text-sub">{l.lead}</span>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}

function Segmented<T extends string>({
  value,
  onChange,
  items,
}: {
  value: T;
  onChange: (v: T) => void;
  items: { value: T; label: string; icon: React.ReactNode }[];
}) {
  return (
    <div className="flex rounded-lg bg-canvas p-1">
      {items.map((it) => (
        <button
          key={it.value}
          onClick={() => onChange(it.value)}
          className={clsx(
            "flex h-10 items-center gap-1.5 rounded-md px-4 text-[16px] font-semibold transition",
            value === it.value
              ? "bg-white text-tab shadow-sm"
              : "text-sub hover:text-ink",
          )}
        >
          {it.icon}
          {it.label}
        </button>
      ))}
    </div>
  );
}
