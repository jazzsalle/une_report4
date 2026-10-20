"use client";
import { useState } from "react";
import { Info } from "lucide-react";
import { Button, Modal } from "@/components/ui";

/**
 * 상황명 줄 「상황 정보」 → 상황 정보 창 (C-06). 모든 탭에서 보인다.
 * 상황 화면은 SOP가 있는 상황만 오므로(N-05) 조회만 — 상황 정보는 SOP 추출 기준이라 생성 뒤에는 고치지 않는다.
 */
export function SituationInfo({ rows, currentStatus }: { rows: [string, string][]; currentStatus: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Info size={18} /> 상황 정보
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="상황 정보"
        width={720}
        footer={<Button onClick={() => setOpen(false)}>닫기</Button>}
      >
        <dl>
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[140px_1fr] border-b border-line-weak py-4">
              <dt className="text-sub">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
          <div className="py-4">
            <dt className="mb-2 text-sub">현재 상황</dt>
            <dd className="whitespace-pre-line rounded-md bg-canvas p-4 leading-relaxed">
              {currentStatus || "입력된 내용 없음"}
            </dd>
          </div>
        </dl>
      </Modal>
    </>
  );
}
