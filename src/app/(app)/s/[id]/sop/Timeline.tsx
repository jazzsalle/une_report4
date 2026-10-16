"use client";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Plus, X } from "lucide-react";
import { Badge, Button, Card, Modal } from "@/components/ui";
import { addRecord, deleteRecord } from "@/app/actions/situation";
import { RECORD_KINDS } from "@/lib/types";
import { fmtTime, toLocalInput } from "@/lib/format";

export interface EventItem {
  id: string;
  at: string;
  type: string;
  title: string;
  body: string;
  userName: string;
  meta: Record<string, unknown> | null;
}

const TYPE: Record<string, { label: string; tone: "blue" | "gray" | "green" | "orange" | "red" }> = {
  start: { label: "업무", tone: "gray" },
  weather: { label: "기상", tone: "blue" },
  change: { label: "변경", tone: "orange" },
  sop: { label: "SOP", tone: "blue" },
  mission: { label: "조치", tone: "green" },
  propagate: { label: "전파", tone: "blue" },
  record: { label: "기록", tone: "orange" },
  response: { label: "현장", tone: "green" },
  report: { label: "일지", tone: "gray" },
};

const PLACEHOLDER: Record<string, string> = {
  상황: "예) 하천 수위 상승, 하부도로 통제 검토",
  피해: "예) ○○동 주택 2동 침수, 인명피해 없음",
  대피: "예) ○○동 저지대 주민 12세대 25명 대피",
  통제: "예) ○○ 지하차도 차량 통제 (14:20~)",
  자원투입: "예) 양수기 12대, 공무원 20명 투입",
  응급복구: "예) ○○로 토사 제거 완료",
};

/** 수행 이력 — SOP 실행 이력과 상황 기록을 시간순으로. 기록 입력은 「기록 추가」 창 (P-10) */
export function Timeline({ id, events, editable }: { id: string; events: EventItem[]; editable: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [filter, setFilter] = useState<"all" | "record">("all");

  useEffect(() => {
    const h = () => router.refresh();
    window.addEventListener("r4:refresh", h);
    return () => window.removeEventListener("r4:refresh", h);
  }, [router]);

  const list = [...events].reverse().filter((e) => filter === "all" || e.type === "record");

  return (
    <Card className="flex max-h-[560px] min-h-[420px] flex-col overflow-hidden xl:h-full xl:max-h-none">
      <div className="border-b border-line-weak px-5 pb-3 pt-3.5">
        <div className="flex items-center gap-2">
          <h2 className="text-[19px] font-bold">수행 이력</h2>
          {editable && (
            <Button size="sm" className="ml-auto" onClick={() => setOpen(true)}>
              <Plus size={17} /> 기록 추가
            </Button>
          )}
        </div>
        <div className="mt-2 flex gap-1 text-[15px]">
          {(
            [
              ["all", "전체"],
              ["record", "기록"],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={clsx("rounded px-2.5 py-1", filter === k ? "bg-tab text-white" : "text-sub hover:bg-canvas")}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <ol className="scroll-thin min-h-0 flex-1 overflow-y-auto px-5 pb-4">
        {list.map((e) => {
          const t = TYPE[e.type] ?? TYPE.start;
          return (
            <li key={e.id} className="group flex gap-3 border-b border-line-weak py-3.5 last:border-0">
              <span className="w-[86px] shrink-0 pt-0.5 text-[15px] text-sub">{fmtTime(e.at)}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Badge tone={t.tone}>{e.type === "record" ? String(e.meta?.kind ?? "기록") : t.label}</Badge>
                  <span className="font-medium">{e.type === "record" ? "" : e.title}</span>
                </div>
                {e.body && <p className="mt-1 line-clamp-3 whitespace-pre-line text-[16px] text-sub">{e.body}</p>}
              </div>
              {editable && e.type === "record" && (
                <button
                  className="invisible self-start text-mute hover:text-danger group-hover:visible"
                  onClick={() => start(async () => (await deleteRecord(id, e.id), router.refresh()))}
                  aria-label="기록 삭제"
                  disabled={pending}
                >
                  <X size={18} />
                </button>
              )}
            </li>
          );
        })}
      </ol>
      <RecordModal id={id} open={open} onClose={() => setOpen(false)} />
    </Card>
  );
}

/** 기록 추가 창 — 종류(기본 「상황」) · 내용 · 시각 → 추가하면 이력 맨 위 */
function RecordModal({ id, open, onClose }: { id: string; open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [kind, setKind] = useState<string>("상황");
  const [text, setText] = useState("");
  const [at, setAt] = useState("");
  const [pending, start] = useTransition();
  const close = () => {
    if (pending) return;
    setText("");
    setAt("");
    setKind("상황");
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={close}
      title="기록 추가"
      width={600}
      footer={
        <>
          <Button onClick={close} disabled={pending}>
            취소
          </Button>
          <Button
            variant="primary"
            disabled={!text.trim() || pending}
            onClick={() =>
              start(async () => {
                await addRecord(id, kind, text, at || undefined);
                router.refresh();
                setText("");
                setAt("");
                setKind("상황");
                onClose();
              })
            }
          >
            <Plus size={17} /> 추가
          </Button>
        </>
      }
    >
      <div className="mb-2 font-medium">기록 종류</div>
      <div className="mb-4 flex flex-wrap gap-2">
        {RECORD_KINDS.map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={clsx(
              "h-11 rounded-md border px-4 font-medium",
              kind === k ? "border-primary bg-primary-weak text-primary-strong" : "border-line hover:border-primary",
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="mb-2 font-medium">내용</div>
      <textarea rows={3} className="input" placeholder={PLACEHOLDER[kind]} value={text} onChange={(e) => setText(e.target.value)} />
      <div className="mb-2 mt-4 font-medium">기록 시각</div>
      <input
        type="datetime-local"
        className="input max-w-[320px]"
        value={at || toLocalInput(new Date())}
        onChange={(e) => setAt(e.target.value)}
      />
    </Modal>
  );
}
