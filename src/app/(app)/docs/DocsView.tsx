"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Search, Trash2 } from "lucide-react";
import { Badge, Button, Card, Empty, Modal } from "@/components/ui";
import { LevelBadge } from "@/components/badges";
import { trashReport } from "@/app/actions/report";
import { fmtDateTime } from "@/lib/format";
import { HAZARDS } from "@/lib/types";

type Row = {
  id: string;
  title: string;
  status: string;
  hazard: string;
  level: string;
  owner: string;
  ownerId: string;
  updatedAt: string;
};

export function DocsView({ rows, me, canManage }: { rows: Row[]; me: string; canManage: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [hazard, setHazard] = useState("");
  const [mine, setMine] = useState(false);
  const [pending, start] = useTransition();
  // 삭제 확인: 휴지통 아이콘을 누르면 한 번 더 묻는다
  const [del, setDel] = useState<Row | null>(null);
  const list = rows.filter(
    (r) => (!q || r.title.includes(q) || r.owner.includes(q)) && (!hazard || r.hazard === hazard) && (!mine || r.ownerId === me),
  );
  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8">
      <h1 className="mb-6 text-[28px] font-bold">문서함</h1>
      <Card className="p-6">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-[420px]">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-mute" />
            <input className="input pl-11" placeholder="제목·작성자 검색" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select className="input w-40" value={hazard} onChange={(e) => setHazard(e.target.value)}>
            <option value="">전체 재난</option>
            {HAZARDS.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-5 w-5 accent-primary" checked={mine} onChange={(e) => setMine(e.target.checked)} />
            내 문서
          </label>
          <span className="ml-auto text-sub">{list.length}건</span>
        </div>
        {list.length === 0 ? (
          <Empty>문서가 없습니다.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-canvas text-[15px] font-semibold text-sub">
                <tr>
                  <th className="px-4 py-4">문서명</th>
                  <th className="px-4 py-4">상태</th>
                  <th className="px-4 py-4">재난유형</th>
                  <th className="px-4 py-4">위기경보</th>
                  <th className="px-4 py-4">작성자</th>
                  <th className="px-4 py-4">수정 일시</th>
                  <th className="w-16 px-4 py-4" />
                </tr>
              </thead>
              <tbody>
                {list.map((r) => (
                  <tr key={r.id} className="border-b border-line-weak hover:bg-canvas/60">
                    <td className="px-4 py-4">
                      <Link href={`/reports/${r.id}`} className="inline-flex items-center gap-1 font-medium hover:text-primary">
                        {r.title} <ChevronRight size={18} />
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      {r.status === "final" ? <Badge tone="green">확정</Badge> : <Badge tone="gray">작성 중</Badge>}
                    </td>
                    <td className="px-4 py-4">{r.hazard}</td>
                    <td className="px-4 py-4">{r.level !== "-" ? <LevelBadge level={r.level} /> : "-"}</td>
                    <td className="px-4 py-4">{r.owner}</td>
                    <td className="px-4 py-4 text-sub">{fmtDateTime(r.updatedAt)}</td>
                    <td className="px-4 py-4">
                      {(r.ownerId === me || canManage) && r.status !== "final" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          aria-label="휴지통으로"
                          disabled={pending}
                          onClick={() => setDel(r)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        open={del !== null}
        onClose={() => setDel(null)}
        title="상황일지 삭제"
        width={480}
        footer={
          <>
            <Button onClick={() => setDel(null)}>취소</Button>
            <Button
              variant="danger"
              disabled={pending}
              onClick={() =>
                start(async () => {
                  await trashReport(del!.id);
                  setDel(null);
                  router.refresh();
                })
              }
            >
              삭제
            </Button>
          </>
        }
      >
        <p className="text-[18px] font-semibold leading-relaxed">「{del?.title}」을(를) 삭제하시겠습니까?</p>
        <p className="mt-2 text-[17px] text-sub">휴지통에서 7일간 보관 후 삭제됩니다.</p>
      </Modal>
    </main>
  );
}
