import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { getSituation } from "@/lib/data";
import { fmtPeriod } from "@/lib/format";
import { STEP_LABEL, type ResponseStep } from "@/lib/types";
import { Badge } from "@/components/ui";
import { LevelBadge } from "@/components/badges";
import { SituationTabs } from "./SituationTabs";

export default async function SituationLayout({ children, params }: LayoutProps<"/s/[id]">) {
  const { id } = await params;
  const u = await requireUser();
  const s = await getSituation(u, id);
  if (!s) notFound();
  return (
    <div>
      <div className="no-print bg-white px-6 pt-6">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="mr-1 text-[24px] font-bold">{s.title}</h1>
            <Badge tone="blue">{s.kind === "drill" ? "안전한국훈련" : "실제재난"}</Badge>
            <Badge tone="gray">{s.hazard}</Badge>
            <LevelBadge level={s.alertLevel} />
            <Badge tone="blue">{STEP_LABEL[s.responseStep as ResponseStep] ?? s.responseStep}</Badge>
            <span className="ml-2 text-[16px] text-sub">{fmtPeriod(s.periodStart, s.periodEnd)}</span>
          </div>
          <SituationTabs id={id} status={s.status} />
        </div>
      </div>
      <div className="mx-auto max-w-[1680px] px-6 py-6">{children}</div>
    </div>
  );
}
