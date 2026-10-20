import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { requireUser } from "@/lib/auth/session";
import { listSituations, userNames } from "@/lib/data";
import { fmtDateTime, fmtTime } from "@/lib/format";
import clsx from "clsx";
import { Badge, Empty, Pager } from "@/components/ui";
import { PAGE_SIZE } from "@/lib/paging";
import { LevelBadge, SopStateLabel, situationHref } from "@/components/badges";
import { TourStart } from "@/components/TourStart";
import { SituationActions } from "./SituationActions";

export default async function Home({ searchParams }: PageProps<"/">) {
  const u = await requireUser();
  const all = await listSituations(u);
  const names = await userNames(all.map((s) => s.ownerId));
  const sp = await searchParams;
  // 내 상황 / 예시 (M-07) — 예시는 locked. 따라하기 상황은 내 상황
  const tab = sp.tab === "example" ? "example" : "mine";
  const mine = all.filter((s) => !s.locked);
  const examples = all.filter((s) => s.locked);
  const list = tab === "example" ? examples : mine;
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const page = Math.min(pages, Math.max(1, Number(sp.page) || 1));
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
          {/* 최근 상황 카드 (최근 수정 순) */}
          {all.length > 0 && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {all.slice(0, 4).map((s) => {
                const ms = s.sop?.missions ?? [];
                const done = ms.filter((m) => m.status === "done").length;
                return (
                  <Link
                    key={s.id}
                    href={situationHref(s)}
                    className="card flex h-[200px] flex-col border-2 border-transparent p-6 transition hover:border-primary"
                  >
                    <div className="flex gap-2">
                      {s.tutorial && <Badge tone="orange">따라하기</Badge>}
                      <Badge tone="blue">{s.hazard}</Badge>
                      <LevelBadge level={s.alertLevel} />
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-[19px] font-bold">
                      <span className="line-clamp-1">{s.title}</span>
                      <ChevronRight size={20} className="shrink-0" />
                    </div>
                    <div className="mt-auto flex items-center justify-between text-[16px] text-sub">
                      <SopStateLabel sop={s.sop} />
                      {ms.length > 0 && (
                        <span>
                          임무 {done}/{ms.length}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-[15px] text-mute">{fmtTime(s.updatedAt)} 수정</div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="relative -mt-6 rounded-t-[24px] bg-white px-6 pb-16 pt-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[20px] font-bold">상황 목록</h2>
            <div className="flex rounded-lg bg-canvas p-1">
              {(
                [
                  ["mine", "내 상황", mine.length],
                  ["example", "예시", examples.length],
                ] as const
              ).map(([k, label, n]) => (
                <Link
                  key={k}
                  href={k === "mine" ? "/" : "/?tab=example"}
                  className={clsx(
                    "flex h-10 items-center rounded-md px-4 text-[16px] font-semibold transition",
                    tab === k ? "bg-white text-tab shadow-sm" : "text-sub hover:text-ink",
                  )}
                >
                  {label} {n}
                </Link>
              ))}
            </div>
          </div>
          {list.length === 0 ? (
            <Empty>{tab === "example" ? "예시 상황이 없습니다." : "등록된 상황이 없습니다."}</Empty>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left text-[16px]">
                <thead className="bg-canvas text-[15px] font-semibold text-sub">
                  <tr>
                    <th className="px-4 py-4">상황명</th>
                    <th className="px-4 py-4">SOP 상태</th>
                    <th className="px-4 py-4">재난유형</th>
                    <th className="px-4 py-4">위기경보</th>
                    <th className="px-4 py-4">작성자</th>
                    <th className="px-4 py-4">수정 일시</th>
                    <th className="px-4 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {shown.map((s) => {
                    return (
                      <tr key={s.id} className="border-b border-line-weak hover:bg-canvas/60">
                        <td className="px-4 py-4">
                          <Link href={situationHref(s)} className="inline-flex items-center gap-1 font-medium hover:text-primary">
                            {s.title}
                            <ChevronRight size={18} />
                          </Link>
                          {s.tutorial && (
                            <span className="ml-2 align-middle">
                              <Badge tone="orange">따라하기</Badge>
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <SopStateLabel sop={s.sop} />
                        </td>
                        <td className="px-4 py-4">{s.hazard}</td>
                        <td className="px-4 py-4">
                          <LevelBadge level={s.alertLevel} />
                        </td>
                        <td className="px-4 py-4">{names.get(s.ownerId) ?? "-"}</td>
                        <td className="px-4 py-4 text-sub">{fmtDateTime(s.updatedAt)}</td>
                        <td className="w-14 px-2 py-2">
                          <SituationActions id={s.id} title={s.title} locked={s.locked} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pager page={page} total={list.length} base={tab === "example" ? "/?tab=example&page=" : "/?page="} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
