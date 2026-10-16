import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { requireUser } from "@/lib/auth/session";
import { listSituations, userNames } from "@/lib/data";
import { fmtDateTime } from "@/lib/format";
import { Badge, Empty, Pager } from "@/components/ui";
import { PAGE_SIZE } from "@/lib/paging";
import { StatusBadge, LevelBadge } from "@/components/badges";
import { TourStart } from "@/components/TourStart";
import { SituationActions } from "./SituationActions";

export default async function Home({ searchParams }: PageProps<"/">) {
  const u = await requireUser();
  const list = await listSituations(u);
  const names = await userNames(list.map((s) => s.ownerId));
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const page = Math.min(pages, Math.max(1, Number((await searchParams).page) || 1));
  const shown = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#bfe3ff] via-[#d9efff] to-[#eef7ff] px-6 pb-16 pt-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/40 blur-2xl" />
        <div className="pointer-events-none absolute left-1/3 top-24 h-72 w-72 rounded-full bg-[#9fd4ff]/40 blur-3xl" />
        <div className="relative mx-auto max-w-[1440px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 className="text-[32px] font-bold leading-snug">
              <span className="text-primary">{u.name}</span>님,
              <br />
              재난 상황을 기록하고 상황일지를 만들어보세요!
            </h1>
            <div className="flex gap-3">
              <Link
                href="/new"
                className="inline-flex h-14 items-center gap-1.5 rounded-md bg-primary px-7 text-[18px] font-medium text-white transition hover:bg-primary-strong"
              >
                <Plus size={22} /> 새 상황 시작
              </Link>
              <TourStart />
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-6 rounded-t-[24px] bg-white px-6 pb-16 pt-8">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="mb-4 text-[20px] font-bold">상황 목록</h2>
          {list.length === 0 ? (
            <Empty>등록된 상황이 없습니다.</Empty>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left text-[16px]">
                <thead className="bg-canvas text-[15px] font-semibold text-sub">
                  <tr>
                    <th className="px-4 py-4">상황명</th>
                    <th className="px-4 py-4">진행</th>
                    <th className="px-4 py-4">재난유형</th>
                    <th className="px-4 py-4">위기경보</th>
                    <th className="px-4 py-4">작성자</th>
                    <th className="px-4 py-4">수정 일시</th>
                    <th className="px-4 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {shown.map((s) => {
                    const ms = s.sop?.missions ?? [];
                    const done = ms.filter((m) => m.status === "done").length;
                    return (
                      <tr key={s.id} className="border-b border-line-weak hover:bg-canvas/60">
                        <td className="px-4 py-4">
                          <Link href={`/s/${s.id}`} className="inline-flex items-center gap-1 font-medium hover:text-primary">
                            {s.title}
                            <ChevronRight size={18} />
                          </Link>
                          {(s.tutorial || s.locked) && (
                            <span className="ml-2 align-middle">
                              <Badge tone={s.locked ? "blue" : "orange"}>{s.locked ? "예시" : "따라하기"}</Badge>
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <StatusBadge status={s.status} />
                            {ms.length > 0 && <span className="text-sub">{done}/{ms.length}</span>}
                          </div>
                        </td>
                        <td className="px-4 py-4">{s.hazard}</td>
                        <td className="px-4 py-4">
                          <LevelBadge level={s.alertLevel} />
                        </td>
                        <td className="px-4 py-4">{names.get(s.ownerId) ?? "-"}</td>
                        <td className="px-4 py-4 text-sub">{fmtDateTime(s.updatedAt)}</td>
                        <td className="w-14 px-2 py-2">
                          <SituationActions id={s.id} title={s.title} locked={s.locked || s.tutorial} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pager page={page} total={list.length} base="/?page=" />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
