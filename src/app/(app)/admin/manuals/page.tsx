import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { Badge, Card, CardHead } from "@/components/ui";
import { BackButton } from "@/components/BackButton";
import rows from "@/data/manual-analysis.json";
import { ManualTable, type ManualRow } from "./ManualTable";
import { TYPES } from "./types";

/**
 * 운영관리 · 매뉴얼 분석 (운영관리자 전용 — T3Q 에 공개하는 /api-docs 에는 두지 않는다)
 * 약 80개 매뉴얼로 SOP·연락망 추출 규칙을 검증한 결과. 데이터: src/data/manual-analysis.json
 */
export default async function ManualAnalysisPage() {
  const u = await requireUser();
  if (u.role !== "admin") redirect("/");
  const list = rows as ManualRow[];
  const byGroup = list.reduce<Record<string, number>>((m, r) => ((m[r.group] = (m[r.group] ?? 0) + 1), m), {});

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-8">
      <div className="mb-3">
        <BackButton fallback="/admin" />
      </div>
      <h1 className="text-[28px] font-bold">매뉴얼 분석</h1>
      <p className="mt-2 text-[17px] text-sub">
        재난 매뉴얼 {list.length}종(중복 제외)으로 SOP·연락망 추출 규칙을 검증한 결과입니다. 2026. 10. 5. 기준.
      </p>

      <Card className="mt-6">
        <CardHead title="왜 이렇게 많이 봤나" />
        <div className="space-y-3 px-6 pb-6 pt-4 text-[17px] leading-relaxed">
          <p>
            T3Q가 어떤 매뉴얼을 고르더라도 SOP와 연락망이 최대한 맞게 나오고, 맞지 않는 문서가 와도 <b>서비스가 깨지지 않게</b> 하려는 것입니다.
          </p>
          <p>
            그래서 규칙은 <b>여러 문서에 두루 통하는 일반 규칙</b>(SOP R1~R25, 연락망 C1~C10)으로만 두고, 규칙으로 정할 수 없는 곳은 만들지 않고 경고로 남깁니다(R25 예외 원칙).
            문서 하나가 안 맞는다고 규칙을 늘리지 않습니다.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {Object.entries(byGroup).map(([g, n]) => (
              <Badge key={g} tone="blue">
                {g} {n}
              </Badge>
            ))}
          </div>
          <p className="text-[16px] text-sub">
            규칙 원문: <a className="font-semibold text-primary underline" href="/api-docs/mapping.html#rules">대응설명서 · 추출 규칙</a> ·{" "}
            <a className="font-semibold text-primary underline" href="/api-docs/mapping.html#contacts">⑧ 연락망 추출</a>
          </p>
        </div>
      </Card>

      <h2 className="mb-3 mt-10 text-[22px] font-bold">유형별로 보기 — SOP 규칙이 잘 맞는 순서</h2>
      <div className="space-y-6">
        {TYPES.map((t) => (
          <Card key={t.key}>
            <CardHead
              title={
                <span className="flex flex-wrap items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#052b57] text-[16px] text-white">{t.rank}</span>
                  {t.name}
                  <Badge tone={t.sopTone}>SOP {t.sop}</Badge>
                  <Badge tone={t.contactTone}>연락망 {t.contact}</Badge>
                </span>
              }
            />
            <div className="grid gap-6 px-6 pb-6 pt-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <div className="space-y-4">
                {t.shots.map((s) => (
                  <figure key={s.src} className="overflow-hidden rounded-lg border border-line bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.src} alt={s.caption} className="block h-auto w-full" />
                    <figcaption className="border-t border-line-weak px-4 py-2 text-[15px] text-sub">{s.caption}</figcaption>
                  </figure>
                ))}
              </div>
              <div className="space-y-4 text-[17px] leading-relaxed">
                <p className="text-sub">{t.docs}</p>
                <ol className="space-y-2">
                  {t.boxes.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[14px] font-bold text-white"
                        style={{ background: b.color }}
                      >
                        {i + 1}
                      </span>
                      <span>
                        <b>{b.label}</b> — {b.text}
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="rounded-md bg-canvas px-4 py-3">
                  <div className="font-bold">그래서</div>
                  <p className="mt-1">{t.result}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="mb-3 mt-10 text-[22px] font-bold">문서별 결과</h2>
      <ManualTable rows={list} />
    </main>
  );
}
