import { requireUser } from "@/lib/auth/session";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NewSituation } from "./NewSituation";
import { readLocation } from "@/lib/location";
import { ORG_SIDO } from "@/lib/regions";
import { getTutorialSeed } from "@/lib/tutorial";
import { toLocalInput } from "@/lib/format";
import type { SituationInput } from "@/app/actions/situation";

export default async function NewPage({ searchParams }: PageProps<"/new">) {
  const u = await requireUser();
  const sp = await searchParams;
  const db = await getDb();
  const [org] = await db.select().from(schema.orgs).where(eq(schema.orgs.id, u.orgId)).limit(1);
  const loc = await readLocation();
  const sido = loc?.sido ?? ORG_SIDO[u.orgId] ?? "부산광역시";
  // 따라하기: 시드 내용으로 한 번에 채울 값
  let tutorial: SituationInput | undefined;
  if (sp.tutorial === "1") {
    const t = (await getTutorialSeed()).situation;
    const now = toLocalInput(new Date());
    tutorial = {
      title: `${now.slice(2, 10).replace(/-/g, ".")}. ${t.titleSuffix}`,
      kind: t.kind as "real" | "drill",
      hazard: t.hazard,
      alertLevel: t.alertLevel,
      step: t.step,
      sido: t.sido,
      areas: t.areas,
      dept: t.dept,
      periodStart: now,
      periodEnd: null,
      currentStatus: t.currentStatus,
    };
  }
  return <NewSituation sido={sido} hazard={org?.defaultHazard ?? "태풍/호우"} tutorial={tutorial} />;
}
