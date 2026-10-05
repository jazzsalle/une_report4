import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { Badge, Card, CardHead } from "@/components/ui";
import { BackButton } from "@/components/BackButton";
import rows from "@/data/manual-analysis.json";
import { ManualTable, type ManualRow } from "./ManualTable";
import { TYPES } from "./types";

/** 단순 표 — 첫 줄이 머리 */
function Grid({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-x-auto px-6 pb-6 pt-4">
      <table className="w-full min-w-[720px] text-left text-[17px]">
        <thead className="bg-canvas text-[16px] font-semibold text-sub">
          <tr>
            {rows[0].map((h) => (
              <th key={h} className="px-4 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map((r, i) => (
            <tr key={i} className="border-b border-line-weak">
              {r.map((c, j) => (
                <td key={j} className={j === 0 ? "px-4 py-3 font-medium" : "px-4 py-3"}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const COUNTS = [
  ["유형", "문서 수", "조치 코드 있음", "행동카드 있음", "연락망 쪽 있음", "유관기관 종류(중앙값)", "휴대전화 섞임"],
  ["지자체 현장조치 행동매뉴얼", "18", "18", "17", "18", "11.5종", "17"],
  ["교육시설 매뉴얼", "6", "4", "0", "5", "10종", "2"],
  ["공공기관 행동매뉴얼", "5", "1", "1", "5", "6종", "3"],
  ["표준매뉴얼", "14", "0", "0", "13", "5.5종", "2"],
  ["위기대응 실무매뉴얼", "31", "1", "0", "31", "5종", "14"],
];

const CONTACTS = [
  ["매뉴얼 유형", "연락망 추출", "근거"],
  ["지자체 현장조치 행동매뉴얼", "높음", "기관 단위 표가 따로 있음, 유관기관 10~12종. 담당자 표에 성명·휴대전화가 함께 있음"],
  ["표준매뉴얼(신양식)·교육부 대응매뉴얼", "높음", "기관/부서/연락처 표"],
  ["위기대응 실무매뉴얼", "보통", "대부분 중앙부처 상황실·당직실 → 「상급 보고처」로. 지방청·유역환경청·시·도 표는 쓸모 큼"],
  ["인제", "보통", "「비상연락망 삭제본」이라 일부 표가 빔. 협업활동 쪽에서 보완"],
  ["그림 쪽·연락망 없는 문서", "낮음", "방사능(그림), 학교 감염병·미세먼지(없음) → 경고만"],
];

const ALERT = [
  ["매뉴얼", "단계 구분", "위기경보 필요?"],
  ["부산·영천 현장조치 행동매뉴얼 (지자체)", "대응단계 4단계가 표의 열. 대응단계 표기 부산 438회·영천 120회, 위기경보 단계 표기 2~3회", "필요 없음"],
  ["기후부 풍수해 · 환경부 산불 실무매뉴얼 (중앙)", "조치가 「관심 / 주의 / 경계 / 심각 단계」로 나뉨 (기후부 p.57·61·66·73)", "필요 — 징후감지 = 관심·주의라 1:1이 아님"],
];

const FIRST = [
  ["매뉴얼", "모양", "결과"],
  ["부산광역시 풍수해 현장조치 행동매뉴얼", "[n] / [n-m] / -, 프로세스 표 + 행동카드", "기준 문서 (R1~R9)"],
  ["영천시 풍수해 현장조치 행동매뉴얼 (2026.7.)", "행안부 표준 협업기능 코드, 흐름표 + 행동카드", "잘 맞음. 흐름표 조치 142건 = 행동카드 142장 (R10·R11·R13)"],
  ["기후부 풍수해 위기대응 실무매뉴얼 (2026.5.)", "위기경보별 조치목록, ①-1-1", "뼈대는 맞음. 중앙부처 내부 조치라 지자체 조치는 거의 없음 (R12·R14·R16)"],
  ["환경부 산불 실무매뉴얼 (2024)", "단계 × 주체 매트릭스, 번호 없음", "단계 4개 이름 일치. 행동카드 없어 세부행동 빈 조치 많음 (R16)"],
  ["인천항만공사 해양선박사고 행동매뉴얼 (2022.12.)", "(가) / 가-1. / ㅇ", "깊이로 맞음. 경보별로 같은 조치 반복 (R11·R15·R16)"],
];

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
            <a className="font-semibold text-primary underline" href="/api-docs/mapping.html#contacts">⑦ 연락망 추출</a>
          </p>
        </div>
      </Card>

      <Card className="mt-6">
        <CardHead title="한눈에 보기 — 글자로 센 수치" />
        <Grid rows={COUNTS} />
      </Card>

      <Card className="mt-6">
        <CardHead title="처음 규칙을 만든 매뉴얼" />
        <Grid rows={FIRST} />
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

      <Card className="mt-10">
        <CardHead title="연락망 자동 추출 가능성" />
        <Grid rows={CONTACTS} />
      </Card>

      <Card className="mt-6">
        <CardHead title="위기경보를 「선택」 항목으로 둔 근거" />
        <Grid rows={ALERT} />
      </Card>

      <h2 className="mb-3 mt-10 text-[22px] font-bold">문서별 결과</h2>
      <ManualTable rows={list} />
    </main>
  );
}
