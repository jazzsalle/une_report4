"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy, Pencil, Trash2 } from "lucide-react";
import { Button, Modal, MoreMenu } from "@/components/ui";
import { copySituation, renameSituation, trashSituation } from "@/app/actions/situation";

/** 홈 상황 목록 줄 끝 「⋯」: 이름 변경 · 복사 · 휴지통으로 (예시는 휴지통 없음) */
export function SituationActions({ id, title, locked }: { id: string; title: string; locked?: boolean }) {
  const router = useRouter();
  const [mode, setMode] = useState<null | "rename" | "copy">(null);
  const [trash, setTrash] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  const open = (m: "rename" | "copy") => {
    setMode(m);
    setName(m === "copy" ? `${title} (사본)` : title);
    setError("");
  };
  const close = () => !pending && setMode(null);
  const submit = () =>
    start(async () => {
      try {
        const r = mode === "copy" ? await copySituation(id, name) : await renameSituation(id, name);
        if (r.error) return setError(r.error);
        setMode(null);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "처리하지 못했습니다.");
      }
    });

  return (
    <>
      <div className="flex justify-end">
        <MoreMenu
          items={[
            { label: "이름 변경", icon: <Pencil size={18} />, onClick: () => open("rename") },
            { label: "복사", icon: <Copy size={18} />, onClick: () => open("copy") },
            ...(locked
              ? []
              : [{ label: "휴지통으로", icon: <Trash2 size={18} />, danger: true, onClick: () => (setError(""), setTrash(true)) }]),
          ]}
        />
      </div>
      <Modal
        open={trash}
        onClose={() => !pending && setTrash(false)}
        title="상황 삭제"
        width={460}
        footer={
          <>
            <Button onClick={() => setTrash(false)} disabled={pending}>
              취소
            </Button>
            <Button
              variant="danger"
              disabled={pending}
              onClick={() =>
                start(async () => {
                  try {
                    await trashSituation(id);
                  } catch (e) {
                    setError(e instanceof Error ? e.message : "삭제하지 못했습니다.");
                  }
                })
              }
            >
              휴지통으로
            </Button>
          </>
        }
      >
        <p className="text-[18px] font-semibold leading-relaxed">「{title}」을(를) 휴지통으로 보낼까요?</p>
        <p className="mt-2 text-[17px] text-sub">휴지통에서 7일간 보관 후 삭제됩니다. 상황일지는 문서함에 그대로 남습니다.</p>
        {error && <p className="mt-2 text-[15px] text-danger">{error}</p>}
      </Modal>
      <Modal
        open={mode !== null}
        onClose={close}
        title={mode === "copy" ? "상황 복사" : "이름 변경"}
        width={520}
        footer={
          <>
            <Button onClick={close} disabled={pending}>
              취소
            </Button>
            <Button variant="primary" disabled={pending || !name.trim()} onClick={submit}>
              {mode === "copy" ? (pending ? "복사 중" : "복사") : pending ? "저장 중" : "저장"}
            </Button>
          </>
        }
      >
        <label className="mb-2 block font-medium">상황 제목</label>
        <input
          className="input"
          value={name}
          autoFocus
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.nativeEvent.isComposing && name.trim() && !pending && submit()}
        />
        {error && <p className="mt-2 text-[15px] text-danger">{error}</p>}
      </Modal>
    </>
  );
}
