/**
 * DB 스키마만 최신으로 맞춘다(계정·기본 데이터는 만들지 않음).
 *   사내 배포서버:  npm run db:migrate        (서비스 폴더의 .env 의 DATABASE_URL 사용)
 * Neon 주소면 Neon 드라이버, 그 밖의 Postgres 는 일반 연결(pg)로 붙는다.
 */
import "dotenv/config";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL 이 없습니다. 서비스 폴더의 .env 를 확인하세요.");
  const neonHost = (() => {
    try {
      return new URL(url).hostname.endsWith(".neon.tech");
    } catch {
      return false;
    }
  })();
  if (process.env.DB_DRIVER === "neon" || (process.env.DB_DRIVER !== "pg" && neonHost)) {
    const { neon } = await import("@neondatabase/serverless");
    const { drizzle } = await import("drizzle-orm/neon-http");
    const { migrate } = await import("drizzle-orm/neon-http/migrator");
    await migrate(drizzle(neon(url)), { migrationsFolder: "drizzle" });
  } else {
    const { Pool } = await import("pg");
    const { drizzle } = await import("drizzle-orm/node-postgres");
    const { migrate } = await import("drizzle-orm/node-postgres/migrator");
    const pool = new Pool({ connectionString: url });
    try {
      await migrate(drizzle(pool), { migrationsFolder: "drizzle" });
    } finally {
      await pool.end();
    }
  }
  console.log("DB 스키마 최신으로 반영 완료");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
