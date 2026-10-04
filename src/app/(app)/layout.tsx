import { requireUser } from "@/lib/auth/session";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getWeatherSnapshot } from "@/lib/weather/kma";
import { Header } from "@/components/Header";
import { WeatherBar } from "@/components/WeatherBar";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const user = await requireUser();
  const db = await getDb();
  const [org] = await db.select().from(schema.orgs).where(eq(schema.orgs.id, user.orgId)).limit(1);
  const weather = await getWeatherSnapshot(org?.stnId ?? "159");
  return (
    <div className="flex min-h-screen flex-col">
      <div className="no-print">
        <Header user={user} orgName={org?.name ?? ""} />
        <WeatherBar weather={weather} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
