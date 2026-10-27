import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { getSituation } from "@/lib/data";
import { fmtPeriod } from "@/lib/format";
import { SituationInfo } from "./SituationInfo";
import { STEP_LABEL, type ResponseStep } from "@/lib/types";
import { ORG_SIDO } from "@/lib/regions";
import { Badge } from "@/components/ui";
import { LevelBadge, sopState } from "@/components/badges";
import { SituationTabs } from "./SituationTabs";
import { TourResume } from "@/components/Tour";

export default async function SituationLayout({ children, params }: LayoutProps<"/s/[id]">) {
  const { id } = await params;
  const u = await requireUser();
  const s = await getSituation(u, id);
  if (!s) notFound();
  // SOP가 없는 상황은 상황 화면 대신 상황정보 등록(이어서 작성)으로 (N-05)
  if (!s.sop) redirect(`/new?resume=${s.id}`);
  const sido = s.sido || ORG_SIDO[s.orgId] || "부산광역시";
  return (
    <div>
      {/* 따라하기 상황을 다시 열면 그 진행도에 맞춰 따라하기 말풍선을 이어서 켠다 */}
      {s.tutorial && <TourResume sid={s.id} state={sopState(s.sop)} />}
      <div className="no-print bg-white px-6 pt-6">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="mr-1 text-[24px] font-bold">{s.title}</h1>
            {s.tutorial && <Badge tone="orange">따라하기</Badge>}
            {s.locked && <Badge tone="blue">예시</Badge>}
            {/* 제목 옆에는 대응 판단에 필요한 위기경보·대응단계만 (C-08). 발생지역·대응 기간 등은 「상황 정보」 창 */}
            <LevelBadge level={s.alertLevel} prefix="위기경보" />
            <Badge tone="blue">{STEP_LABEL[s.responseStep as ResponseStep] ?? s.responseStep}</Badge>
            <span className="ml-auto">
              <SituationInfo
                currentStatus={s.currentStatus}
                rows={[
                  ["업무유형", s.kind === "drill" ? "안전한국훈련" : "실제재난"],
                  ["재난유형", s.hazard],
                  ["위기경보", s.alertLevel],
                  ["대응단계", STEP_LABEL[s.responseStep as ResponseStep] ?? s.responseStep],
                  ["발생지역", `${sido} ${s.areas.length ? s.areas.join(", ") : "전역"}`],
                  ["담당부서", s.dept || "-"],
                  ["대응 기간", fmtPeriod(s.periodStart, s.periodEnd)],
                ]}
              />
            </span>
          </div>
          <SituationTabs id={id} status={s.status} />
        </div>
      </div>
      <div className="mx-auto max-w-[1680px] px-6 py-6">{children}</div>
    </div>
  );
}
