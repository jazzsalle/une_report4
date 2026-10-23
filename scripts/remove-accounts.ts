/**
 * 계정 정리 — 지정한 아이디를 지운다. 그 계정이 만든 상황·상황일지가 있으면 지우지 않고 「중지」만 한다.
 *   로컬:  npx tsx scripts/remove-accounts.ts admin2
 *   운영:  DATABASE_URL=... npx tsx scripts/remove-accounts.ts admin2
 */
import "dotenv/config";
import { config } from "dotenv";
import { eq, inArray } from "drizzle-orm";
import * as schema from "../src/lib/db/schema";

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
  const ids = process.argv.slice(2);
  if (!ids.length) throw new Error("지울 아이디를 적어 주세요. 예: admin2");
  const db = await getDb();
  const target = process.env.DATABASE_URL ? "운영" : "로컬";
  const users = await db.select().from(schema.users).where(inArray(schema.users.loginId, ids));
  for (const id of ids) if (!users.some((u) => u.loginId === id)) console.log(`[${target}] ${id}: 없음`);
  for (const u of users) {
    const owns =
      (await db.select({ id: schema.situations.id }).from(schema.situations).where(eq(schema.situations.ownerId, u.id)).limit(1)).length +
      (await db.select({ id: schema.reports.id }).from(schema.reports).where(eq(schema.reports.ownerId, u.id)).limit(1)).length;
    if (owns) {
      await db.update(schema.users).set({ active: false }).where(eq(schema.users.id, u.id));
      console.log(`[${target}] ${u.loginId}: 만든 문서가 있어 「중지」로 바꿈`);
    } else {
      await db.delete(schema.users).where(eq(schema.users.id, u.id));
      console.log(`[${target}] ${u.loginId}: 지움`);
    }
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
