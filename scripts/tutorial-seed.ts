/**
 * 따라하기 시드 관리 — DB 잠금(트리거)이 걸려 있어 일반 삭제·비우기는 거절된다.
 *   확인:  npx tsx scripts/tutorial-seed.ts
 *   넣기:  npx tsx scripts/tutorial-seed.ts --put          (없을 때만 원본 src/data/tutorial-busan.json 으로)
 *   삭제:  npx tsx scripts/tutorial-seed.ts --delete --approve "따라하기 시드 삭제 승인"
 *   운영:  앞에 DATABASE_URL=... 를 붙인다
 */
import "dotenv/config";
import { config } from "dotenv";
import { sql } from "drizzle-orm";
import * as schema from "../src/lib/db/schema";
import seed from "../src/data/tutorial-busan.json";

config({ path: ".env.local" });
const APPROVAL = "따라하기 시드 삭제 승인";

async function getDb() {
  const url = process.env.DATABASE_URL;
  if (url) {
    const { neon } = await import("@neondatabase/serverless");
    const { drizzle } = await import("drizzle-orm/neon-http");
    const { migrate } = await import("drizzle-orm/neon-http/migrator");
    const db = drizzle(neon(url), { schema });
    await migrate(db, { migrationsFolder: "drizzle" });
    return db;
  }
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  const db = drizzle(new PGlite(".data/pglite"), { schema });
  await migrate(db, { migrationsFolder: "drizzle" });
  return db as unknown as Awaited<ReturnType<typeof import("drizzle-orm/neon-http").drizzle<typeof schema>>>;
}

async function main() {
  const args = process.argv.slice(2);
  const db = await getDb();
  const target = process.env.DATABASE_URL ? "운영" : "로컬";
  if (args.includes("--put")) {
    await db
      .insert(schema.tutorialSeeds)
      .values({ id: seed.id, name: seed.name, data: seed as unknown as Record<string, unknown> })
      .onConflictDoNothing();
  }
  if (args.includes("--delete")) {
    const i = args.indexOf("--approve");
    if (i < 0 || args[i + 1] !== APPROVAL) throw new Error(`삭제하려면 --approve "${APPROVAL}" 를 함께 적어야 합니다.`);
    // 잠금 해제는 이 한 문장(트랜잭션) 안에서만 유효하다
    await db.execute(sql.raw(`DO $$ BEGIN PERFORM set_config('app.tutorial_unlock', 'approve', true); DELETE FROM tutorial_seeds; END $$;`));
    console.log(`[${target}] 따라하기 시드를 승인 삭제했습니다.`);
  }
  const rows = await db.select().from(schema.tutorialSeeds);
  console.log(`[${target}] 따라하기 시드 ${rows.length}건:`, rows.map((r) => `${r.id} — ${r.name}`).join(", ") || "없음");
  process.exit(0);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
