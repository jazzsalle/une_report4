import { requireUser } from "@/lib/auth/session";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NewSituation } from "./NewSituation";
import { readLocation } from "@/lib/location";
import { ORG_SIDO } from "@/lib/regions";

export default async function NewPage() {
  const u = await requireUser();
  const db = await getDb();
  const [org] = await db.select().from(schema.orgs).where(eq(schema.orgs.id, u.orgId)).limit(1);
  const loc = await readLocation();
  const sido = loc?.sido ?? ORG_SIDO[u.orgId] ?? "부산광역시";
  return <NewSituation sido={sido} hazard={org?.defaultHazard ?? "태풍/호우"} />;
}
