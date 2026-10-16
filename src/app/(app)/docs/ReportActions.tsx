"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { Button, Modal, MoreMenu } from "@/components/ui";
import { renameReport, trashReport } from "@/app/actions/report";

/**
 * 상황일지 목록 줄 끝 「⋯」: 이름 변경 · 삭제 (R-11·R-12).
 * 이름 변경은 문서명(목록·내보낸 파일 이름)만 바꾸고 문서 안 제목은 그대로. 예시는 삭제 없음.
 */
export function ReportActions({ id, name, canDelete }: { id: string; name: string; canDelete: boolean }) {
  const router = useRouter();
  const [mode, setMode] = useState<null | "rename" | "trash">(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  const close = () => !pending && setMode(null);
  const rename = () =>
    start(async () => {
      try {
        const r = await renameReport(id, value);
        if (r.error) return setError(r.error);
        setMode(null);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "처리하지 못했습니다.");
      }
    });
  const trash = () =>
    start(async () => {
      try {
        await trashReport(id);
        setMode(null);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "삭제하지 못했습니다.");
      }
    });

  return (
    <>
      <div className="flex justify-end">
        <MoreMenu
          items={[
            {
              label: "이름 변경",
              icon: <Pencil size={18} />,
              onClick: () => (setValue(name), setError(""), setMode("rename")),
            },
            ...(canDelete
              ? [{ label: "삭제", icon: <Trash2 size={18} />, danger: true, onClick: () => (setError(""), setMode("trash")) }]
              : []),
          ]}
        />
      </div>
      <Modal
        open={mode === "rename"}
        onClose={close}
        title="이름 변경"
        width={520}
        footer={
          <>
            <Button onClick={close} disabled={pending}>
              취소
            </Button>
            <Button variant="primary" disabled={pending || !value.trim()} onClick={rename}>
              {pending ? "저장 중" : "저장"}
            </Button>
          </>
        }
      >
        <label className="mb-2 block font-medium">문서명</label>
        <input
          className="input"
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.nativeEvent.isComposing && value.trim() && !pending && rename()}
        />
        {error && <p className="mt-2 text-[15px] text-danger">{error}</p>}
      </Modal>
      <Modal
        open={mode === "trash"}
        onClose={close}
        title="상황일지 삭제"
        width={480}
        footer={
          <>
            <Button onClick={close} disabled={pending}>
              취소
            </Button>
            <Button variant="danger" disabled={pending} onClick={trash}>
              삭제
            </Button>
          </>
        }
      >
        <p className="text-[18px] font-semibold leading-relaxed">「{name}」을(를) 삭제하시겠습니까?</p>
        <p className="mt-2 text-[17px] text-sub">휴지통에서 7일간 보관 후 삭제됩니다.</p>
        {error && <p className="mt-2 text-[15px] text-danger">{error}</p>}
      </Modal>
    </>
  );
}
