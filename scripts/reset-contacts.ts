/**
 * 기관 연락망을 초기 상태로 되돌린다 (조직·담당자·전파그룹을 지우고 seed-data 로 다시 채움).
 * 다른 기관, 상황·문서·계정은 건드리지 않는다.
 *   로컬(PGlite):  npx tsx scripts/reset-contacts.ts busan          (개발 서버를 끈 상태에서)
 *   운영(Neon):    DATABASE_URL=... npx tsx scripts/reset-contacts.ts busan
 * 확인만:          ... reset-contacts.ts busan --dry
 */
import "dotenv/config";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import * as schema from "../src/lib/db/schema";
import { orgContactsSeed } from "../src/lib/db/seed-data";

config({ path: ".env.local" });

async function getDb() {
  const url = process.env.DATABASE_URL;
  if (url) {
    const { neon } = await import("@neondatabase/serverless");
    const { drizzle } = await import("drizzle-orm/neon-http");
    return drizzle(neon(url), { schema });
  }
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  return drizzle(new PGlite(".data/pglite"), { schema }) as unknown as Awaited<
    ReturnType<typeof import("drizzle-orm/neon-http").drizzle<typeof schema>>
  >;
}

async function main() {
  const orgId = process.argv[2];
  const dry = process.argv.includes("--dry");
  if (orgId !== "busan" && orgId !== "gyeongbuk") throw new Error("기관을 적어 주세요: busan 또는 gyeongbuk");
  const db = await getDb();
  const target = process.env.DATABASE_URL ? "운영" : "로컬";

  const now = {
    units: (await db.select().from(schema.orgUnits).where(eq(schema.orgUnits.orgId, orgId))).length,
    people: (await db.select().from(schema.contacts).where(eq(schema.contacts.orgId, orgId))).length,
    groups: (await db.select().from(schema.contactGroups).where(eq(schema.contactGroups.orgId, orgId))).length,
  };
  const seed = orgContactsSeed(orgId);
  console.log(`[${target}] ${orgId} 지금: 조직 ${now.units} · 담당자 ${now.people} · 전파그룹 ${now.groups}`);
  console.log(`[${target}] ${orgId} 초기: 조직 ${seed.units.length} · 담당자 ${seed.people.length} · 전파그룹 ${seed.groups.length}`);
  if (dry) {
    console.log("확인만 했습니다 (--dry). 바꾸지 않았습니다.");
    process.exit(0);
  }

  // 지우기: 전파그룹 → 담당자 → 조직 / 채우기: 조직 → 담당자 → 전파그룹 (다시 실행해도 같은 결과)
  await db.delete(schema.contactGroups).where(eq(schema.contactGroups.orgId, orgId));
  await db.delete(schema.contacts).where(eq(schema.contacts.orgId, orgId));
  await db.delete(schema.orgUnits).where(eq(schema.orgUnits.orgId, orgId));
  await db.insert(schema.orgUnits).values(seed.units);
  await db.insert(schema.contacts).values(seed.people);
  await db.insert(schema.contactGroups).values(seed.groups);

  const after = {
    units: (await db.select().from(schema.orgUnits).where(eq(schema.orgUnits.orgId, orgId))).length,
    people: (await db.select().from(schema.contacts).where(eq(schema.contacts.orgId, orgId))).length,
  };
  console.log(`[${target}] ${orgId} 되돌림 완료: 조직 ${after.units} · 담당자 ${after.people}`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
