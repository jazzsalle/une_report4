"use client";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ChevronRight, Search } from "lucide-react";
import { Card, Empty, Pager } from "@/components/ui";
import { PAGE_SIZE } from "@/lib/paging";
import { LevelBadge } from "@/components/badges";
import { fmtDateTime } from "@/lib/format";
import { HAZARDS } from "@/lib/types";
import { ReportActions } from "./ReportActions";

type Row = {
  id: string;
  /** 문서명 (목록·내보낸 파일 이름) */
  title: string;
  hazard: string;
  level: string;
  owner: string;
  ownerId: string;
  updatedAt: string;
  locked?: boolean;
  /** 문서명 아래 줄: 만들 당시 단계 · 상황: 상위 상황명 (R-06·D-03) */
  sub: string;
};

/** 상황일지 관리 — 모든 상황의 상황일지 (내 문서 / 예시) */
export function DocsView({ rows, me, canManage }: { rows: Row[]; me: string; canManage: boolean }) {
  const [q, setQ] = useState("");
  const [hazard, setHazard] = useState("");
  const [tab, setTab] = useState<"mine" | "sample">("mine");
  const [page, setPage] = useState(1);
  const found = rows.filter((r) => (!q || r.title.includes(q) || r.owner.includes(q)) && (!hazard || r.hazard === hazard));
  const mine = found.filter((r) => !r.locked);
  const sample = found.filter((r) => r.locked);
  const list = tab === "mine" ? mine : sample;
  // 지운 뒤 마지막 쪽이 비면 앞 쪽으로
  const cur = Math.min(page, Math.max(1, Math.ceil(list.length / PAGE_SIZE)));
  const shown = list.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE);
  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8">
      <h1 className="mb-6 text-[28px] font-bold">상황일지 관리</h1>
      <Card className="p-6">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-[420px]">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-mute" />
            <input className="input pl-11" placeholder="문서명·작성자 검색" value={q} onChange={(e) => (setQ(e.target.value), setPage(1))} />
          </div>
          <select className="input w-40" value={hazard} onChange={(e) => (setHazard(e.target.value), setPage(1))}>
            <option value="">전체 재난</option>
            {HAZARDS.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
          <div className="ml-auto flex rounded-lg bg-canvas p-1" role="tablist">
            {(
              [
                ["mine", `내 문서 ${mine.length}`],
                ["sample", `예시 ${sample.length}`],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                role="tab"
                aria-selected={tab === k}
                onClick={() => (setTab(k), setPage(1))}
                className={clsx(
                  "h-10 rounded-md px-4 text-[16px] font-semibold transition",
                  tab === k ? "bg-white text-primary shadow-sm" : "text-sub hover:text-ink",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        {list.length === 0 ? (
          <Empty>상황일지가 없습니다.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-canvas text-[15px] font-semibold text-sub">
                <tr>
                  <th className="px-4 py-4">문서명</th>
                  <th className="px-4 py-4">재난유형</th>
                  <th className="px-4 py-4">위기경보</th>
                  <th className="px-4 py-4">작성자</th>
                  <th className="px-4 py-4">수정 일시</th>
                  <th className="w-14 px-2 py-4" />
                </tr>
              </thead>
              <tbody>
                {shown.map((r) => (
                  <tr key={r.id} className="border-b border-line-weak hover:bg-canvas/60">
                    <td className="px-4 py-4">
                      <Link href={`/reports/${r.id}`} className="inline-flex items-center gap-1 font-medium hover:text-primary">
                        {r.title} <ChevronRight size={18} />
                      </Link>
                      {r.sub && <div className="mt-1 text-[16px] text-sub">{r.sub}</div>}
                    </td>
                    <td className="px-4 py-4">{r.hazard}</td>
                    <td className="px-4 py-4">{r.level !== "-" ? <LevelBadge level={r.level} /> : "-"}</td>
                    <td className="px-4 py-4">{r.owner}</td>
                    <td className="px-4 py-4 text-sub">{fmtDateTime(r.updatedAt)}</td>
                    <td className="px-2 py-2">
                      {(r.ownerId === me || canManage) && (
                        <ReportActions id={r.id} name={r.title} canDelete={!r.locked} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pager page={cur} total={list.length} onChange={setPage} />
          </div>
        )}
      </Card>
    </main>
  );
}
