import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { getSituation } from "@/lib/data";
import { fmtPeriod } from "@/lib/format";
import { STEP_LABEL, type ResponseStep } from "@/lib/types";
import { ORG_SIDO } from "@/lib/regions";
import { readLocation } from "@/lib/location";
import { Badge } from "@/components/ui";
import { LevelBadge } from "@/components/badges";
import { SituationTabs } from "./SituationTabs";
import { BackButton } from "@/components/BackButton";

export default async function SituationLayout({ children, params }: LayoutProps<"/s/[id]">) {
  const { id } = await params;
  const u = await requireUser();
  const s = await getSituation(u, id);
  if (!s) notFound();
  const sido = s.sido || ORG_SIDO[s.orgId] || "부산광역시";
  const loc = await readLocation();
  return (
    <div>
      <div className="no-print bg-white px-6 pt-6">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-wrap items-center gap-2">
            {/* 같은 상황의 탭끼리는 건너뛰고, 상황을 열기 전 화면으로 */}
            <BackButton fallback="/" skip={[`/s/${id}`]} />
            <h1 className="mr-1 text-[24px] font-bold">{s.title}</h1>
            {s.tutorial && <Badge tone="orange">따라하기</Badge>}
            {s.locked && <Badge tone="blue">예시</Badge>}
            <Badge tone="blue">{s.kind === "drill" ? "안전한국훈련" : "실제재난"}</Badge>
            <Badge tone="gray">{s.hazard}</Badge>
            <LevelBadge level={s.alertLevel} />
            <Badge tone="blue">{STEP_LABEL[s.responseStep as ResponseStep] ?? s.responseStep}</Badge>
            <Badge tone="gray">{s.dept}</Badge>
            <Badge tone={loc && loc.sido !== sido ? "orange" : "gray"}>발생 {sido}</Badge>
            {loc && loc.sido !== sido && <span className="text-[15px] text-warning">상단 특보는 현재 위치 {loc.sido} 기준</span>}
            <span className="ml-2 text-[16px] text-sub">{fmtPeriod(s.periodStart, s.periodEnd)}</span>
          </div>
          <SituationTabs id={id} status={s.status} />
        </div>
      </div>
      <div className="mx-auto max-w-[1680px] px-6 py-6">{children}</div>
    </div>
  );
}
