import { requireUser } from "@/lib/auth/session";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getWeatherSnapshot } from "@/lib/weather/kma";
import { readLocation } from "@/lib/location";
import { ORG_SIDO } from "@/lib/regions";
import { Header } from "@/components/Header";
import { WeatherBar } from "@/components/WeatherBar";
import { Tour } from "@/components/Tour";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  const user = await requireUser();
  const db = await getDb();
  const [org] = await db.select().from(schema.orgs).where(eq(schema.orgs.id, user.orgId)).limit(1);
  const location = await readLocation();
  // 상단 특보: 현재 위치의 시도 (없으면 기관 시도)
  const sido = location?.sido ?? ORG_SIDO[user.orgId] ?? "부산광역시";
  const weather = await getWeatherSnapshot(sido);
  return (
    <div className="flex min-h-screen flex-col">
      <div className="no-print">
        <Header user={user} orgName={org?.name ?? ""} location={location} fallbackSido={sido} />
        <WeatherBar weather={weather} sigungu={location?.sigungu ?? ""} />
      </div>
      <div className="flex-1">{children}</div>
      <Tour />
    </div>
  );
}
