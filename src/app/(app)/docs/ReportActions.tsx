"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button, Modal, MoreMenu } from "@/components/ui";
import { trashReport } from "@/app/actions/report";

/**
 * 상황일지 목록 줄 끝 「⋯」: 삭제 (R-12). 문서명은 「… 상황일지 n보」로 자동으로 정해지고 바꾸지 않는다.
 * 예시는 삭제 없음 → 메뉴 자체를 두지 않는다.
 */
export function ReportActions({ id, name, canDelete }: { id: string; name: string; canDelete: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  if (!canDelete) return null;
  const close = () => !pending && setOpen(false);
  const trash = () =>
    start(async () => {
      try {
        await trashReport(id);
        setOpen(false);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "삭제하지 못했습니다.");
      }
    });

  return (
    <>
      <div className="flex justify-end">
        <MoreMenu
          items={[{ label: "삭제", icon: <Trash2 size={18} />, danger: true, onClick: () => (setError(""), setOpen(true)) }]}
        />
      </div>
      <Modal
        open={open}
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
