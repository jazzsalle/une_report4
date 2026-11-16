import "server-only";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

type DB = ReturnType<typeof drizzleNeon<typeof schema>>;

const g = globalThis as unknown as { __db?: Promise<DB> };

/**
 * DATABASE_URL 이 Neon(Vercel) 주소면 Neon HTTP 드라이버, 그 밖의 Postgres(사내 배포서버 등)는 일반 연결(pg)로 붙는다.
 * DB_DRIVER=neon|pg 로 강제할 수 있다.
 */
export function usesNeon(url: string): boolean {
  const forced = process.env.DB_DRIVER;
  if (forced === "neon") return true;
  if (forced === "pg") return false;
  try {
    return new URL(url).hostname.endsWith(".neon.tech");
  } catch {
    return false;
  }
}

async function create(): Promise<DB> {
  const url = process.env.DATABASE_URL;
  if (url && usesNeon(url)) {
    return drizzleNeon(neon(url), { schema });
  }
  if (url) {
    // 사내 배포서버: 서버에 설치된 PostgreSQL 에 일반 연결(연결 풀)로 붙는다
    const { Pool } = await import("pg");
    const { drizzle } = await import("drizzle-orm/node-postgres");
    const pool = new Pool({ connectionString: url, max: 10 });
    return drizzle(pool, { schema }) as unknown as DB;
  }
  // 로컬 개발: 내장 Postgres(PGlite) — .data/pglite 에 저장
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  const client = new PGlite(".data/pglite");
  const db = drizzle(client, { schema });
  await migrate(db, { migrationsFolder: "drizzle" });
  return db as unknown as DB;
}

export function getDb(): Promise<DB> {
  if (!g.__db) g.__db = create();
  return g.__db;
}

export { schema };
