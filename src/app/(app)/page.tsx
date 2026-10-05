import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { requireUser } from "@/lib/auth/session";
import { listSituations, userNames } from "@/lib/data";
import { fmtDateTime, fmtTime } from "@/lib/format";
import { Badge, Empty } from "@/components/ui";
import { StatusBadge, LevelBadge } from "@/components/badges";
import { TourStart } from "@/components/TourStart";

export default async function Home() {
  const u = await requireUser();
  const list = await listSituations(u);
  const names = await userNames(list.map((s) => s.ownerId));
  const recent = list.slice(0, 3);

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#bfe3ff] via-[#d9efff] to-[#eef7ff] px-6 pb-16 pt-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/40 blur-2xl" />
        <div className="pointer-events-none absolute left-1/3 top-24 h-72 w-72 rounded-full bg-[#9fd4ff]/40 blur-3xl" />
        <div className="relative mx-auto max-w-[1440px]">
          <h1 className="text-[32px] font-bold leading-snug">
            <span className="text-primary">{u.name}</span>님,
            <br />
            재난 상황을 기록하고 상황일지를 만들어보세요!
          </h1>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/new"
              className="card flex h-[200px] flex-col items-center justify-center gap-3 border-2 border-transparent text-[18px] font-semibold transition hover:border-primary"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                <Plus size={30} />
              </span>
              새 상황 시작
            </Link>
            <TourStart />
            {recent.slice(0, 2).map((s) => {
              const ms = s.sop?.missions ?? [];
              const done = ms.filter((m) => m.status === "done").length;
              return (
                <Link
                  key={s.id}
                  href={`/s/${s.id}`}
                  className="card flex h-[200px] flex-col border-2 border-transparent p-6 transition hover:border-primary"
                >
                  <div className="flex gap-2">
                    {s.tutorial && <Badge tone="orange">따라하기</Badge>}
                    {s.locked && <Badge tone="blue">예시</Badge>}
                    <Badge tone="blue">{s.hazard}</Badge>
                    <LevelBadge level={s.alertLevel} />
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-[19px] font-bold">
                    <span className="line-clamp-1">{s.title}</span>
                    <ChevronRight size={20} className="shrink-0" />
                  </div>
                  <div className="mt-auto flex items-center justify-between text-[16px] text-sub">
                    <StatusBadge status={s.status} />
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
        </div>
      </section>

      <section className="relative -mt-6 rounded-t-[24px] bg-white px-6 pb-16 pt-8">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="mb-4 text-[20px] font-bold">상황 목록</h2>
          {list.length === 0 ? (
            <Empty>등록된 상황이 없습니다.</Empty>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-[16px]">
                <thead className="bg-canvas text-[15px] font-semibold text-sub">
                  <tr>
                    <th className="px-4 py-4">상황명</th>
                    <th className="px-4 py-4">진행</th>
                    <th className="px-4 py-4">재난유형</th>
                    <th className="px-4 py-4">위기경보</th>
                    <th className="px-4 py-4">작성자</th>
                    <th className="px-4 py-4">수정 일시</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((s) => {
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
