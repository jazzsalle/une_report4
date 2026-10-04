import { requireUser } from "@/lib/auth/session";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NewSituation } from "./NewSituation";

export default async function NewPage() {
  const u = await requireUser();
  const db = await getDb();
  const [org] = await db.select().from(schema.orgs).where(eq(schema.orgs.id, u.orgId)).limit(1);
  return <NewSituation orgId={u.orgId === "une" ? "busan" : u.orgId} hazard={org?.defaultHazard ?? "태풍/호우"} />;
}
