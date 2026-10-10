"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy, Pencil } from "lucide-react";
import { Button, Modal } from "@/components/ui";
import { copySituation, renameSituation } from "@/app/actions/situation";

/** 홈 상황 목록의 이름 변경 · 복사 */
export function SituationActions({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<null | "rename" | "copy">(null);
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
      <div className="flex justify-end gap-1">
        <Button size="sm" variant="ghost" onClick={() => open("rename")}>
          <Pencil size={17} /> 이름 변경
        </Button>
        <Button size="sm" variant="ghost" onClick={() => open("copy")}>
          <Copy size={17} /> 복사
        </Button>
      </div>
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
