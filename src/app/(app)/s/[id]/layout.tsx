import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { getSituation } from "@/lib/data";
import { fmtPeriod } from "@/lib/format";
import { SituationInfo } from "./SituationInfo";
import { STEP_LABEL, type ResponseStep } from "@/lib/types";
import { ORG_SIDO } from "@/lib/regions";
import { readLocation } from "@/lib/location";
import { Badge } from "@/components/ui";
import { SituationTabs } from "./SituationTabs";

export default async function SituationLayout({ children, params }: LayoutProps<"/s/[id]">) {
  const { id } = await params;
  const u = await requireUser();
  const s = await getSituation(u, id);
  if (!s) notFound();
  // SOP가 없는 상황은 상황 화면 대신 상황정보 등록(이어서 작성)으로 (N-05)
  if (!s.sop) redirect(`/new?resume=${s.id}`);
  const sido = s.sido || ORG_SIDO[s.orgId] || "부산광역시";
  const loc = await readLocation();
  return (
    <div>
      <div className="no-print bg-white px-6 pt-6">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="mr-1 text-[24px] font-bold">{s.title}</h1>
            {s.tutorial && <Badge tone="orange">따라하기</Badge>}
            {s.locked && <Badge tone="blue">예시</Badge>}
            {/* 제목 옆에는 대응단계·발생지역만 (재난구분·유형·위기경보·담당부서는 상황정보에서) */}
            <Badge tone="blue">{STEP_LABEL[s.responseStep as ResponseStep] ?? s.responseStep}</Badge>
            <Badge tone={loc && loc.sido !== sido ? "orange" : "gray"}>발생 {sido}</Badge>
            {loc && loc.sido !== sido && <span className="text-[15px] text-warning">상단 특보는 현재 위치 {loc.sido} 기준</span>}
            <span className="ml-2 text-[16px] text-sub">{fmtPeriod(s.periodStart, s.periodEnd)}</span>
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
