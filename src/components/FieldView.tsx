"use client";
import { useVisibleRefresh } from "@/lib/use-visible-refresh";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { CheckCircle2, Megaphone, Send } from "lucide-react";
import { fieldRespond } from "@/app/actions/field";

export interface FieldData {
  orgName: string;
  situationTitle: string;
  missionTitle: string;
  message: string;
  name: string;
  sentAt: string;
  readAt: string | null;
  doneAt: string | null;
  note: string;
  noteAt: string | null;
  ackAt: string | null;
}

function hm(d: string | null) {
  if (!d) return "";
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(d));
}

/** 현장 담당자 모바일 응답 화면 — token 이 없으면 미리보기(버튼 동작 안 함) */
export function FieldView({ data, token }: { data: FieldData; token?: string }) {
  const router = useRouter();
  const [note, setNote] = useState(data.note);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const live = !!token;

  // 상황실 확인 여부를 주기적으로 갱신 (화면이 보일 때만)
  useVisibleRefresh(20000, live);

  const act = (kind: "read" | "done" | "note") =>
    live &&
    start(async () => {
      setError(null);
      try {
        await fieldRespond(token!, kind, kind === "note" ? note : undefined);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "보내지 못했습니다.");
      }
    });

  return (
    <div className="min-h-full bg-canvas text-ink">
      <header className="bg-tab px-5 pb-5 pt-4 text-white">
        <div className="flex items-center gap-2 text-[15px] text-white/80">
          <Megaphone size={17} /> 재난 상황전파 · {data.orgName}
        </div>
        <h1 className="mt-1 text-[21px] font-bold leading-snug">{data.situationTitle}</h1>
      </header>
      <div className="space-y-4 p-4">
        <section className="rounded-xl bg-white p-5 shadow-sm">
          <div className="text-[15px] text-sub">{data.name}님 · {hm(data.sentAt)} 수신</div>
          <h2 className="mt-1 text-[19px] font-bold leading-snug">{data.missionTitle}</h2>
          <p className="mt-3 whitespace-pre-line rounded-lg bg-primary-weak p-4 text-[17px] leading-relaxed">{data.message}</p>
        </section>

        {/* 순서: 수신 확인 → 조치사항 → 임무 완료 */}
        <Step no={1} label="수신 확인" at={data.readAt} onClick={() => act("read")} busy={pending || !live} />
        {!data.readAt && <p className="px-1 text-[16px] text-sub">수신 확인을 누르면 조치사항·임무 완료를 할 수 있습니다</p>}

        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="mb-2 text-[18px] font-bold">조치사항</h3>
          <textarea
            rows={4}
            value={note}
            disabled={!live || pending || !data.readAt}
            onChange={(e) => setNote(e.target.value)}
            placeholder="현장 조치 내용을 입력하세요"
            className="w-full rounded-lg border border-line p-3 text-[17px] leading-relaxed outline-none focus:border-primary"
          />
          <button
            onClick={() => act("note")}
            disabled={!live || pending || !data.readAt || !note.trim() || note === data.note}
            className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-xl border border-primary bg-white text-[18px] font-bold text-primary disabled:border-line disabled:text-mute"
          >
            <Send size={20} /> 조치사항 보내기
          </button>
          {data.noteAt && <p className="mt-2 text-[15px] text-sub">{hm(data.noteAt)} 보냄</p>}
          {error && <p className="mt-2 text-[15px] text-danger">{error}</p>}
        </section>

        <Step no={2} label="임무 완료" at={data.doneAt} onClick={() => act("done")} busy={pending || !live || !data.readAt} />

        {/* 상황실 확인: 누르는 곳이 아니라 상태 줄 */}
        {data.noteAt && (
          <p className={clsx("px-1 text-center text-[16px]", data.ackAt ? "font-semibold text-success" : "text-sub")}>
            {data.ackAt ? `✓ 상황실 확인 완료 · ${hm(data.ackAt)}` : "상황실 확인 대기 중"}
          </p>
        )}
      </div>
    </div>
  );
}

function Step({
  no,
  label,
  at,
  onClick,
  busy,
}: {
  no: number;
  label: string;
  at: string | null;
  onClick: () => void;
  busy: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!!at || busy}
      className={clsx(
        "flex h-16 w-full items-center gap-3 rounded-xl px-5 text-left text-[19px] font-bold transition",
        at ? "bg-success-weak text-success" : "bg-primary text-white active:bg-primary-strong disabled:bg-line",
      )}
    >
      {at ? (
        <CheckCircle2 size={26} />
      ) : (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-[17px]">{no}</span>
      )}
      <span className="flex-1">{label}</span>
      {at && <span className="text-[15px] font-medium">{hm(at)}</span>}
    </button>
  );
}
