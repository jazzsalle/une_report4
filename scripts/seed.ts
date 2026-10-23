/**
 * DB 마이그레이션 + 기본 데이터 + 테스트 계정 생성.
 *   로컬(PGlite):  npm run db:seed          (개발 서버를 끈 상태에서)
 *   운영(Neon):    DATABASE_URL=... npm run db:seed
 * 새로 만든 계정의 비밀번호는 accounts/계정목록_<시각>.csv 로 저장된다(깃 제외 폴더).
 * SEED_PASSWORD 를 주면 모든 계정을 같은 비밀번호로 만든다 (시험 기간용).
 */
import "dotenv/config";
import { config } from "dotenv";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import * as schema from "../src/lib/db/schema";
import { ORGS, orgContactsSeed } from "../src/lib/db/seed-data";
import tutorialSeed from "../src/data/tutorial-busan.json";

config({ path: ".env.local" });

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
  fs.mkdirSync(".data", { recursive: true });
  const db = drizzle(new PGlite(".data/pglite"), { schema });
  await migrate(db, { migrationsFolder: "drizzle" });
  return db as unknown as Awaited<ReturnType<typeof import("drizzle-orm/neon-http").drizzle>>;
}

function password() {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[crypto.randomInt(chars.length)];
  return `${s}!${crypto.randomInt(10, 99)}`;
}

/** 기본 계정: 운영관리자 1 · 부산 2 · 경북 2 · T3Q 1. 그 밖의 계정은 운영관리자가 계정관리에서 직접 발급 */
const ACCOUNTS: { loginId: string; name: string; dept: string; orgId: string; role: string }[] = [
  { loginId: "admin", name: "운영관리자", dept: "운영", orgId: "une", role: "admin" },
  { loginId: "busan-admin", name: "부산 관리자", dept: "자연재난과", orgId: "busan", role: "manager" },
  { loginId: "busan01", name: "부산 사용자", dept: "자연재난과", orgId: "busan", role: "user" },
  { loginId: "gb-admin", name: "경북 관리자", dept: "자연재난과", orgId: "gyeongbuk", role: "manager" },
  { loginId: "gb01", name: "경북 사용자", dept: "자연재난과", orgId: "gyeongbuk", role: "user" },
  { loginId: "t3q", name: "T3Q 담당자", dept: "T3Q", orgId: "t3q", role: "t3q" },
];

async function main() {
  const db = await getDb();

  for (const o of ORGS) {
    await db.insert(schema.orgs).values(o).onConflictDoNothing();
  }

  // 연락망: 기관별로 비어 있을 때만 채운다
  for (const orgId of ["busan", "gyeongbuk"] as const) {
    const exist = await db.select().from(schema.orgUnits).where(eq(schema.orgUnits.orgId, orgId)).limit(1);
    if (exist.length) continue;
    const { units, people, groups } = orgContactsSeed(orgId);
    await db.insert(schema.orgUnits).values(units);
    await db.insert(schema.contacts).values(people);
    await db.insert(schema.contactGroups).values(groups);
    console.log(`연락망 ${orgId}: 조직 ${units.length}, 담당자 ${people.length}, 그룹 ${groups.length}`);
  }

  // 따라하기 시드 (잠금 표 — 넣기만, 이미 있으면 그대로)
  await db
    .insert(schema.tutorialSeeds)
    .values({ id: tutorialSeed.id, name: tutorialSeed.name, data: tutorialSeed as unknown as Record<string, unknown> })
    .onConflictDoNothing();

  const created: string[][] = [];
  for (const a of ACCOUNTS) {
    const exist = await db.select().from(schema.users).where(eq(schema.users.loginId, a.loginId)).limit(1);
    if (exist.length) continue;
    const pw = process.env.SEED_PASSWORD || password();
    await db.insert(schema.users).values({
      id: crypto.randomUUID(),
      ...a,
      passwordHash: await bcrypt.hash(pw, 10),
    });
    const orgName = ORGS.find((o) => o.id === a.orgId)?.name ?? "";
    created.push([orgName, a.loginId, pw, ({ admin: "운영관리", manager: "기관관리", user: "일반", t3q: "T3Q" } as Record<string, string>)[a.role] ?? a.role]);
  }
  if (created.length) {
    fs.mkdirSync("accounts", { recursive: true });
    const target = process.env.DATABASE_URL ? "운영" : "로컬";
    const file = path.join("accounts", `계정목록_${target}_${new Date().toISOString().slice(0, 16).replace(/[:T]/g, "")}.csv`);
    const csv = "﻿기관,아이디,비밀번호,권한\n" + created.map((r) => r.join(",")).join("\n");
    fs.writeFileSync(file, csv);
    console.log(`계정 ${created.length}개 생성 → ${file}`);
  } else {
    console.log("새로 만든 계정 없음");
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
