"use client";
import { useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { FileText, Play, Plus, RotateCcw, Sparkles, Square } from "lucide-react";
import { Badge, Button, Card, Empty, Modal } from "@/components/ui";
import type { Mission, Sop } from "@/lib/types";
import type { ContactsBundle } from "@/lib/data";
import {
  deleteMission,
  endSop,
  generateSop,
  reopenSop,
  saveMission,
  startSop,
  createReport,
} from "@/app/actions/situation";
import { missionFromLibrary } from "@/app/actions/library";
import { emptyMission } from "@/lib/sop/convert";
import { fmtDateTime, fmtTime } from "@/lib/format";
import { MissionDetail } from "./MissionDetail";
import { Timeline, type EventItem } from "./Timeline";

export type LibraryItem = { code: string; stage: string; phase: string; title: string; lead: string };

export const MISSION_STATUS: Record<Mission["status"], { label: string; tone: "gray" | "blue" | "green" | "orange" }> = {
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
}: {
  id: string;
  sop: Sop | null;
  editable: boolean;
  me: string;
  events: EventItem[];
  contacts: ContactsBundle;
  library: LibraryItem[];
  hazard: string;
}) {
  const router = useRouter();
  const [missions, setMissions] = useState<Mission[]>(sop?.missions ?? []);
  const [sel, setSel] = useState<string | null>(sop?.missions[0]?.id ?? null);
  const [busy, start] = useTransition();
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [adding, setAdding] = useState(false);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  // 서버에서 SOP가 새로 생성되면 동기화
  const sopKey = sop?.generatedAt;
  const [prevKey, setPrevKey] = useState(sopKey);
  if (sopKey !== prevKey) {
    setPrevKey(sopKey);
    setMissions(sop?.missions ?? []);
    setSel(sop?.missions.some((m) => m.id === sel) ? sel : (sop?.missions[0]?.id ?? null));
  }

  const running = !!sop?.startedAt && !sop?.endedAt;
  const ended = !!sop?.endedAt;
  const counts = useMemo(() => {
    const c = { todo: 0, doing: 0, done: 0, skipped: 0 };
    missions.forEach((m) => c[m.status]++);
    return c;
  }, [missions]);

  const current = missions.find((m) => m.id === sel) ?? null;

  /** 내용 수정은 0.8초 뒤 저장, 상태 변경은 즉시 저장 후 이력 갱신 */
  const update = (m: Mission, immediate = false) => {
    setMissions((list) => (list.some((x) => x.id === m.id) ? list.map((x) => (x.id === m.id ? m : x)) : [...list, m]));
    const t = timers.current.get(m.id);
    if (t) clearTimeout(t);
    if (immediate) {
      timers.current.delete(m.id);
      start(async () => {
        await saveMission(id, m);
        router.refresh();
      });
    } else {
      timers.current.set(
        m.id,
        setTimeout(() => {
          timers.current.delete(m.id);
          saveMission(id, m);
        }, 800),
      );
    }
  };

  const remove = (mid: string) => {
    setMissions((l) => l.filter((m) => m.id !== mid));
    setSel(missions.find((m) => m.id !== mid)?.id ?? null);
    start(async () => {
      await deleteMission(id, mid);
    });
  };

  const act = (fn: () => Promise<unknown>) =>
    start(async () => {
      await fn();
      router.refresh();
    });

  if (!sop) {
    return (
      <Card className="py-10">
        <Empty>생성된 SOP가 없습니다.</Empty>
        {editable && (
          <div className="flex justify-center">
            <Button size="lg" variant="primary" disabled={busy} onClick={() => act(() => generateSop(id))}>
              <Sparkles size={20} /> {busy ? "SOP 생성 중" : "SOP 생성하기"}
            </Button>
          </div>
        )}
      </Card>
    );
  }

  const groups: { label: string; items: Mission[] }[] = [
    { label: "대응", items: missions.filter((m) => m.phase === "대응") },
    { label: "복구", items: missions.filter((m) => m.phase === "복구") },
  ].filter((g) => g.items.length);

  return (
    <div className="space-y-5">
      {/* 실행 상태 바 */}
      <Card className="flex flex-wrap items-center gap-x-5 gap-y-3 px-6 py-4">
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
          완료 {counts.done} · 진행 중 {counts.doing} · 대기 {counts.todo} · 생략 {counts.skipped}
        </span>
        {sop.source === "mock" && !sop.startedAt && <Badge tone="gray">기본 SOP</Badge>}
        <div className="ml-auto flex flex-wrap gap-2">
          {editable && !sop.startedAt && (
            <>
              <Button disabled={busy} onClick={() => act(() => generateSop(id))}>
                <Sparkles size={18} /> 다시 생성
              </Button>
              <Button variant="primary" disabled={busy || !missions.length} onClick={() => act(() => startSop(id))}>
                <Play size={18} /> SOP 실행 시작
              </Button>
            </>
          )}
          {editable && running && (
            <Button variant="primary" disabled={busy} onClick={() => setConfirmEnd(true)}>
              <Square size={16} /> 실행 종료
            </Button>
          )}
          {editable && ended && (
            <>
              <Button disabled={busy} onClick={() => act(() => reopenSop(id))}>
                <RotateCcw size={18} /> 실행 재개
              </Button>
              <Button variant="primary" disabled={busy} onClick={() => start(() => createReport(id))}>
                <FileText size={18} /> 상황일지 작성
              </Button>
            </>
          )}
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[360px_1fr_380px]">
        {/* 기준 SOP */}
        <Card className="flex max-h-[calc(100vh-240px)] min-h-[560px] flex-col overflow-hidden">
          <div className="flex items-center justify-between px-5 pb-2 pt-5">
            <h2 className="text-[19px] font-bold">SOP 임무</h2>
            <span className="text-sub">{missions.length}건</span>
          </div>
          <div className="scroll-thin flex-1 overflow-y-auto pb-2">
            {groups.map((g) => (
              <div key={g.label}>
                <div className="px-5 pb-1 pt-4 text-[15px] font-bold text-sub">{g.label}</div>
                {g.items.map((m) => {
                  const st = MISSION_STATUS[m.status];
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSel(m.id)}
                      className={clsx(
                        "flex w-full items-start gap-3 border-l-4 px-5 py-3.5 text-left transition",
                        sel === m.id ? "border-primary bg-primary-weak" : "border-transparent hover:bg-canvas",
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <div className={clsx("leading-snug", m.status === "skipped" && "text-mute line-through")}>
                          {m.title || "제목 없음"}
                        </div>
                        {(m.startedAt || m.doneAt) && (
                          <div className="mt-1 text-[15px] text-mute">
                            {m.startedAt ? fmtTime(m.startedAt) : ""}
                            {m.doneAt ? ` ~ ${fmtTime(m.doneAt).split(" ")[1]}` : m.startedAt ? " ~" : ""}
                          </div>
                        )}
                      </div>
                      {sop.startedAt && <Badge tone={st.tone}>{st.label}</Badge>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          {editable && !ended && (
            <div className="border-t border-line-weak p-4">
              <Button className="w-full" onClick={() => setAdding(true)}>
                <Plus size={18} /> 임무 추가
              </Button>
            </div>
          )}
        </Card>

        {/* 임무 상세 */}
        <Card className="min-h-[560px]">
          {current ? (
            <MissionDetail
              key={current.id}
              mission={current}
              running={running}
              started={!!sop.startedAt}
              editable={editable && !ended}
              me={me}
              contacts={contacts}
              situationId={id}
              onChange={update}
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
        existing={missions.map((m) => m.code)}
        onAdd={(m) => {
          update(m, true);
          setSel(m.id);
          setAdding(false);
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
  existing,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  library: LibraryItem[];
  hazard: string;
  existing: string[];
  onAdd: (m: Mission) => void;
}) {
  const [q, setQ] = useState("");
  const [title, setTitle] = useState("");
  const [phase, setPhase] = useState<"대응" | "복구">("대응");
  const [pending, start] = useTransition();
  const list = library.filter((l) => !q || l.title.includes(q) || l.lead.includes(q));
  return (
    <Modal open={open} onClose={onClose} title="임무 추가" width={760}>
      <div className="mb-6 flex gap-2">
        <input
          className="input"
          placeholder="임무명 직접 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select className="input w-32" value={phase} onChange={(e) => setPhase(e.target.value as "대응" | "복구")}>
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
      <input className="input mb-3" placeholder="검색" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="scroll-thin max-h-[420px] overflow-y-auto rounded-md border border-line-weak">
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
              <Badge tone={l.phase === "복구" ? "orange" : "blue"}>{l.stage}</Badge>
              <span className="flex-1">{l.title}</span>
              <span className="text-[15px] text-sub">{l.lead}</span>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
