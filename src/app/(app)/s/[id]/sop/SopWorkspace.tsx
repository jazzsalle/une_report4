"use client";
import { useVisibleRefresh } from "@/lib/use-visible-refresh";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Eraser, FileText, Pencil, Play, RotateCcw, Sparkles, Square, Check } from "lucide-react";
import { Badge, Button, Card, Empty, Modal } from "@/components/ui";
import type { Mission, Sop } from "@/lib/types";
import type { ContactsBundle } from "@/lib/data";
import {
  deleteMission,
  endSop,
  generateSop,
  reopenSop,
  resetSop,
  saveMission,
  startSop,
  createReport,
  reorderMissions,
} from "@/app/actions/situation";
import { counted, currentMission } from "@/lib/sop/kind";
import { emptyMission } from "@/lib/sop/convert";
import { fmtDateTime, fmtTime } from "@/lib/format";
import { MissionDetail } from "./MissionDetail";
import { Timeline, type EventItem } from "./Timeline";
import { SopFlow } from "./SopFlow";
import { sopChannel, type SopMessage } from "@/lib/sop/targets";

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

export const MISSION_STATUS: Record<
  Mission["status"],
  { label: string; tone: "gray" | "blue" | "green" | "orange" }
> = {
  todo: { label: "대기", tone: "gray" },
  doing: { label: "진행 중", tone: "blue" },
  done: { label: "완료", tone: "green" },
  skipped: { label: "생략", tone: "orange" },
};

/** 세 영역(흐름 · 임무 상세 · 수행 이력)은 화면 높이에 맞추고 각자 안쪽에서 스크롤 (P-16) */
const PANE = "xl:h-[calc(100vh-300px)] xl:min-h-[560px]";

export function SopWorkspace({
  id,
  sop,
  editable,
  me,
  events,
  contacts,
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
  title: string;
  orgName: string;
  dispatches: DispatchRow[];
}) {
  const router = useRouter();
  const [missions, setMissions] = useState<Mission[]>(sop?.missions ?? []);
  const missionsRef = useRef(missions);
  useEffect(() => {
    missionsRef.current = missions;
  }, [missions]);
  // 처음 고를 임무: 실행 중이면 흐름 분홍(현재 임무)과 같은 임무, 아니면 첫 임무
  const pickFirst = (list: Mission[]) =>
    (sop?.startedAt && !sop?.endedAt ? currentMission(list)?.id : undefined) ?? list[0]?.id ?? null;
  const [sel, setSel] = useState<string | null>(() => pickFirst(sop?.missions ?? []));
  const [busy, start] = useTransition();
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [adding, setAdding] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  // 기본은 보기(실행) 화면, 고칠 때만 「SOP 편집」 (P-11). 실행을 한 번 종료하면 재개해도 편집 불가 (P-04)
  const [editing, setEditing] = useState(false);
  const bc = useRef<BroadcastChannel | null>(null);
  const notify = () =>
    bc.current?.postMessage({ type: "changed" } satisfies SopMessage);

  // 따라하기: 말풍선이 가리키는 임무를 고른다 (코드로)
  useEffect(() => {
    const on = (e: Event) => {
      const code = (e as CustomEvent<string>).detail;
      const m = missionsRef.current.find((x) => x.code === code || x.code === `BSN-${code}`);
      if (m) setSel(m.id);
    };
    window.addEventListener("r4-tour-select", on);
    return () => window.removeEventListener("r4-tour-select", on);
  }, []);

  // 크게 보기 창에서 임무를 누르면 여기서 그 임무를 고른다
  useEffect(() => {
    const ch = new BroadcastChannel(sopChannel(id));
    bc.current = ch;
    ch.onmessage = (e: MessageEvent<SopMessage>) => {
      if (e.data.type === "select") setSel(e.data.id);
    };
    return () => ch.close();
  }, [id]);

  /** 크게 보기 — 가로 흐름도 새 창 (상황실 큰 화면용, P-13) */
  const openBig = () => window.open(`/board/${id}`, `sop-board-${id}`, "width=1280,height=820")?.focus();

  const select = (mid: string) => {
    setSel(mid);
    bc.current?.postMessage({ type: "select", id: mid } satisfies SopMessage);
  };
  // 조치 완료 → 다음 현재 임무(흐름 분홍과 같은 기준)를 고른다. 흐름은 왼쪽에 고정이라 화면 이동 없음
  const next = () => {
    // 완료 처리가 아직 상태에 반영되기 전이라 방금 완료한 임무(선택 중인 임무)는 뺀다
    const n = currentMission(missions, sel);
    if (n) select(n.id);
  };

  // 서버 값이 바뀌면(다시 생성, 다른 사람의 저장) 동기화 — 내가 고치는 중(저장 대기)인 임무는 내 것을 유지
  const serverKey = useMemo(
    () => `${sop?.generatedAt}|${JSON.stringify(sop?.missions ?? [])}`,
    [sop],
  );
  const [prevKey, setPrevKey] = useState(serverKey);
  if (serverKey !== prevKey) {
    setPrevKey(serverKey);
    const fresh = sop?.missions ?? [];
    setMissions((cur) =>
      fresh.map((m) =>
        timers.current.has(m.id) ? (cur.find((x) => x.id === m.id) ?? m) : m,
      ),
    );
    setSel(
      fresh.some((m) => m.id === sel) ? sel : pickFirst(fresh),
    );
  }

  const running = !!sop?.startedAt && !sop?.endedAt;
  const ended = !!sop?.endedAt;
  const frozen = ended || !!sop?.firstEndedAt;
  // 편집 중에 다른 창에서 실행을 종료했으면 편집을 닫는다
  if (frozen && editing) setEditing(false);

  // 실행 중에는 현장 응답·다른 사람의 저장을 주기적으로 받아온다 (화면이 보일 때만)
  useVisibleRefresh(15000, running);

  const counts = useMemo(() => {
    const c = { todo: 0, doing: 0, done: 0, skipped: 0 };
    // 필요시 임무는 실행했을 때만 센다
    missions.filter(counted).forEach((m) => c[m.status]++);
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

  /** 저장 대기 중인 내용 수정을 바로 저장 (실행 종료·편집 종료 전) */
  const flushSaves = () =>
    Promise.all(
      [...timers.current.entries()].map(([mid, t]) => {
        clearTimeout(t);
        timers.current.delete(mid);
        const m = missionsRef.current.find((x) => x.id === mid);
        return m ? saveMission(id, m) : undefined;
      }),
    );

  /** 같은 대응단계 안에서 한 칸 위/아래로 */
  const move = (mid: string, dir: -1 | 1) => {
    const i = missions.findIndex((m) => m.id === mid);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= missions.length) return;
    const nextList = [...missions];
    [nextList[i], nextList[j]] = [nextList[j], nextList[i]];
    setMissions(nextList);
    start(async () => {
      await reorderMissions(
        id,
        nextList.map((m) => m.id),
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

  /** 다시 생성 (편집 모드, 실행 전만) — T3Q 호출이 실패하면 화면에 알린다 */
  const generate = () => {
    setGenError(null);
    start(async () => {
      const r = await generateSop(id);
      if (r.error) return setGenError(r.error);
      router.refresh();
      notify();
    });
  };

  // SOP가 없는 상황 — SOP는 상황정보 등록(이어서 작성)에서 만든다 (N-05)
  if (!sop) {
    return (
      <Card className="py-10">
        <Empty>생성된 SOP가 없습니다.</Empty>
        {editable && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-[17px]">상황정보 등록에서 SOP를 생성하세요.</p>
            <Link
              href={`/new?resume=${id}`}
              className="inline-flex h-14 items-center gap-1.5 rounded-md bg-primary px-7 text-[18px] font-medium text-white transition hover:bg-primary-strong"
            >
              <Sparkles size={20} /> 상황정보 등록으로
            </Link>
          </div>
        )}
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      {/* 도구줄 — 왼쪽 상태 정보, 오른쪽 SOP 작업 버튼 (P-12) */}
      <Card className="flex flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4">
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {editing ? (
              <Badge tone="orange">편집 중</Badge>
            ) : running ? (
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
              완료 {counts.done} · 진행 중 {counts.doing} · 대기 {counts.todo} · 생략 {counts.skipped}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Badge tone="gray">{sop.source === "t3q" ? "AI" : "기본 SOP"}</Badge>
            {sop.manual && (
              <span className="flex items-center gap-1.5 text-[16px] text-sub">
                <BookOpen size={17} />
                {sop.manual.replace(/\s*\([^)]*\)\s*$/, "")} 기준
              </span>
            )}
            {sop.centralStandard && (
              <span className="text-[16px] font-semibold text-warning">지역 매뉴얼 없음 — 중앙 표준매뉴얼의 지자체 공통 역할만 담겨 있습니다</span>
            )}
            {sop.deptMatched === false && !sop.centralStandard && (
              <span className="text-[16px] font-semibold text-warning">요청 부서 없음 — 초기대응부서 기준</span>
            )}
            {genError && <span className="text-[16px] font-semibold text-danger">{genError}</span>}
          </div>
        </div>
        {editable && (
          <div className="ml-auto flex flex-wrap gap-2">
            {editing ? (
              <>
                {!sop.startedAt && (
                  <Button disabled={busy} onClick={generate}>
                    <Sparkles size={18} /> 다시 생성
                  </Button>
                )}
                <Button
                  variant="primary"
                  data-tour="edit-done"
                  onClick={() => {
                    setEditing(false);
                    start(async () => {
                      await flushSaves();
                      router.refresh();
                      notify();
                    });
                  }}
                >
                  <Check size={18} /> 편집 종료
                </Button>
              </>
            ) : (
              <>
                {!frozen && (
                  <Button data-tour="sop-edit" onClick={() => setEditing(true)}>
                    <Pencil size={17} /> SOP 편집
                  </Button>
                )}
                {!sop.startedAt && (
                  <Button
                    variant="primary"
                    disabled={busy || !missions.length}
                    data-tour="sop-start"
                    onClick={() => act(() => startSop(id))}
                  >
                    <Play size={18} /> SOP 실행 시작
                  </Button>
                )}
                {running && (
                  <Button variant="outline" disabled={busy} onClick={() => setConfirmEnd(true)} data-tour="sop-end">
                    <Square size={16} /> 실행 종료
                  </Button>
                )}
                {sop.startedAt && (
                  <Button disabled={busy} onClick={() => setConfirmReset(true)}>
                    <Eraser size={18} /> SOP 초기화
                  </Button>
                )}
                {ended && (
                  <>
                    <Button disabled={busy} onClick={() => act(() => reopenSop(id))}>
                      <RotateCcw size={18} /> 실행 재개
                    </Button>
                    <Button
                      variant="primary"
                      disabled={busy}
                      onClick={() => start(() => createReport(id))}
                      data-tour="report-create"
                    >
                      <FileText size={18} /> 상황일지 작성
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </Card>

      {/* 흐름 · 임무 상세 · 수행 이력 3단 (P-09·P-10·P-16) */}
      <div className="grid gap-5 xl:grid-cols-[minmax(300px,340px)_minmax(0,1fr)_minmax(300px,360px)]">
        <div className={PANE}>
          <SopFlow
            missions={missions}
            selected={sel}
            started={!!sop.startedAt}
            ended={ended}
            editing={editing && editable}
            onSelect={select}
            onMove={move}
            onAdd={() => setAdding(true)}
            onBig={openBig}
          />
        </div>

        <Card className={`flex min-h-[560px] flex-col overflow-hidden ${PANE}`}>
          <div className="border-b border-line-weak px-6 py-3.5">
            <h2 className="text-[19px] font-bold">임무 상세</h2>
          </div>
          {current ? (
            <div className="min-h-0 flex-1">
              <MissionDetail
                key={current.id}
                mission={current}
                mode={editing ? "edit" : "run"}
                dispatches={dispatches.filter((d) => d.missionId === current.id)}
                preview={{ orgName, situationTitle: title }}
                running={running}
                started={!!sop.startedAt}
                editable={editable}
                me={me}
                contacts={contacts}
                situationId={id}
                onChange={update}
                onDone={next}
                onDelete={() => remove(current.id)}
              />
            </div>
          ) : (
            <Empty>임무를 선택하세요.</Empty>
          )}
        </Card>

        <div className={PANE}>
          <Timeline id={id} events={events} editable={editable} />
        </div>
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
                act(async () => {
                  await flushSaves();
                  await endSop(id);
                });
              }}
            >
              종료
            </Button>
          </>
        }
      >
        <p className="text-[18px]">
          완료 {counts.done} · 진행 중 {counts.doing} · 대기 {counts.todo} · 생략 {counts.skipped}
        </p>
        {counts.todo + counts.doing > 0 && (
          <p className="mt-2">진행 중·대기 임무는 상황일지 「7. 향후 계획」에 들어갑니다.</p>
        )}
      </Modal>
      {/* SOP 초기화 — 임무 구성은 두고 실행 전으로. 작성한 상황일지는 남는다 */}
      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="SOP 초기화"
        width={560}
        footer={
          <>
            <Button onClick={() => setConfirmReset(false)}>취소</Button>
            <Button
              variant="danger"
              disabled={busy}
              onClick={() => {
                setConfirmReset(false);
                act(async () => {
                  await flushSaves();
                  await resetSop(id);
                });
              }}
            >
              초기화
            </Button>
          </>
        }
      >
        <p className="break-keep text-[18px] font-semibold">SOP를 실행 전으로 되돌립니다. 임무 목록은 그대로 두고, 다시 편집할 수 있습니다.</p>
        <div className="mt-4 rounded-md bg-danger-weak px-5 py-4">
          <div className="font-semibold text-danger">지워지는 것</div>
          <ul className="mt-1 list-disc pl-5">
            <li>임무 진행 상태 · 수행 확인 · 조치결과</li>
            <li>상황전파 기록과 현장 응답 (보낸 응답 링크는 더 이상 열리지 않음)</li>
            <li>수행 이력의 실행 · 임무 · 전파 기록</li>
          </ul>
        </div>
        <div className="mt-3 rounded-md bg-canvas px-5 py-4">
          <div className="font-semibold">그대로 남는 것</div>
          <p className="mt-1">작성한 상황일지 · 상황 기록 · 상황 정보 · 기상특보</p>
        </div>
      </Modal>

      <AddMission
        open={adding}
        onClose={() => setAdding(false)}
        onAdd={(m) => {
          update(m, true);
          setSel(m.id);
          setAdding(false);
        }}
      />
    </div>
  );
}

/** 임무 추가 — 임무명과 대응·복구만 정해 직접 추가 (내용은 추가 뒤 임무 상세에서 채운다) */
function AddMission({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (m: Mission) => void;
}) {
  const [title, setTitle] = useState("");
  const [phase, setPhase] = useState<"대응" | "복구">("대응");
  const add = () => {
    if (!title.trim()) return;
    onAdd({ ...emptyMission(phase), title: title.trim() });
    setTitle("");
  };
  return (
    <Modal open={open} onClose={onClose} title="임무 추가" width={640}>
      <div className="flex gap-2">
        <input
          className="input"
          placeholder="임무명"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.nativeEvent.isComposing && add()}
        />
        <select
          className="input w-32"
          value={phase}
          onChange={(e) => setPhase(e.target.value as "대응" | "복구")}
        >
          <option>대응</option>
          <option>복구</option>
        </select>
        <Button variant="primary" disabled={!title.trim()} onClick={add}>
          추가
        </Button>
      </div>
    </Modal>
  );
}
