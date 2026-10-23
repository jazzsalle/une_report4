"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, Trash2 } from "lucide-react";
import { Badge, Button, Card, Empty, Modal, Pager } from "@/components/ui";
import { PAGE_SIZE } from "@/lib/paging";
import { purgeReport, purgeSituation, restoreReport, restoreSituation } from "@/app/actions/report";
import { fmtDateTime } from "@/lib/format";

type Row = { id: string; kind: "상황" | "상황일지"; title: string; deletedAt: string; left: number };


export function TrashView({ rows }: { rows: Row[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [target, setTarget] = useState<Row | null>(null);
  const [page, setPage] = useState(1);
  const cur = Math.min(page, Math.max(1, Math.ceil(rows.length / PAGE_SIZE)));
  const shown = rows.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE);
  const run = (fn: () => Promise<unknown>) => start(async () => (await fn(), router.refresh()));

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8">
      <h1 className="mb-2 text-[28px] font-bold">휴지통</h1>
      <p className="mb-6 text-sub">삭제 후 7일이 지나면 완전히 삭제됩니다.</p>
      <Card className="p-6">
        {rows.length === 0 ? (
          <Empty>휴지통이 비어 있습니다.</Empty>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-canvas text-[15px] font-semibold text-sub">
              <tr>
                <th className="px-4 py-4">구분</th>
                <th className="px-4 py-4">이름</th>
                <th className="px-4 py-4">삭제 일시</th>
                <th className="px-4 py-4">남은 기간</th>
                <th className="px-4 py-4" />
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => {
                const left = r.left;
                return (
                  <tr key={r.kind + r.id} className="border-b border-line-weak">
                    <td className="px-4 py-4">
                      <Badge tone={r.kind === "상황" ? "blue" : "gray"}>{r.kind}</Badge>
                    </td>
                    <td className="px-4 py-4 font-medium">{r.title}</td>
                    <td className="px-4 py-4 text-sub">{fmtDateTime(r.deletedAt)}</td>
                    <td className="px-4 py-4">{left}일</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          disabled={pending}
                          onClick={() => run(() => (r.kind === "상황" ? restoreSituation(r.id) : restoreReport(r.id)))}
                        >
                          <RotateCcw size={16} /> 복원
                        </Button>
                        <Button size="sm" variant="danger" disabled={pending} onClick={() => setTarget(r)}>
                          <Trash2 size={16} /> 영구 삭제
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Pager page={cur} total={rows.length} onChange={setPage} />
      </Card>
      <Modal
        open={!!target}
        onClose={() => setTarget(null)}
        title="영구 삭제"
        width={440}
        footer={
          <>
            <Button onClick={() => setTarget(null)}>취소</Button>
            <Button
              variant="danger"
              onClick={() => {
                const t = target!;
                setTarget(null);
                run(() => (t.kind === "상황" ? purgeSituation(t.id) : purgeReport(t.id)));
              }}
            >
              삭제
            </Button>
          </>
        }
      >
        <p className="text-[18px]">{target?.title}</p>
      </Modal>
    </main>
  );
}
