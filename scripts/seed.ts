/**
 * DB 마이그레이션 + 기본 데이터 + 테스트 계정 생성.
 *   로컬(PGlite):  npm run db:seed          (개발 서버를 끈 상태에서)
 *   운영(Neon):    DATABASE_URL=... npm run db:seed
 * 새로 만든 계정의 비밀번호는 accounts/계정목록_<시각>.csv 로 저장된다(깃 제외 폴더).
 */
import "dotenv/config";
import { config } from "dotenv";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import * as schema from "../src/lib/db/schema";
import { ORGS, BUSAN_TREE, GB_TREE, flattenTree, GROUP_RULES } from "../src/lib/db/seed-data";

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

const ACCOUNTS: { loginId: string; name: string; dept: string; orgId: string; role: string }[] = [
  { loginId: "admin", name: "운영관리자", dept: "운영", orgId: "une", role: "admin" },
  { loginId: "busan-admin", name: "부산 관리자", dept: "자연재난과", orgId: "busan", role: "manager" },
  { loginId: "gb-admin", name: "경북 관리자", dept: "자연재난과", orgId: "gyeongbuk", role: "manager" },
  ...Array.from({ length: 20 }, (_, i) => ({
    loginId: `busan${String(i + 1).padStart(2, "0")}`,
    name: `부산 사용자${i + 1}`,
    dept: "자연재난과",
    orgId: "busan",
    role: "user",
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    loginId: `gb${String(i + 1).padStart(2, "0")}`,
    name: `경북 사용자${i + 1}`,
    dept: "자연재난과",
    orgId: "gyeongbuk",
    role: "user",
  })),
];

async function main() {
  const db = await getDb();

  for (const o of ORGS) {
    await db.insert(schema.orgs).values(o).onConflictDoNothing();
  }

  // 연락망: 기관별로 비어 있을 때만 채운다
  for (const [orgId, tree] of [
    ["busan", BUSAN_TREE],
    ["gyeongbuk", GB_TREE],
  ] as const) {
    const exist = await db.select().from(schema.orgUnits).where(eq(schema.orgUnits.orgId, orgId)).limit(1);
    if (exist.length) continue;
    const { units, people } = flattenTree(orgId, tree);
    await db.insert(schema.orgUnits).values(units);
    await db.insert(schema.contacts).values(people);
    const unitName = new Map(units.map((u) => [u.id, u]));
    const pathOf = (unitId: string) => {
      const names: string[] = [];
      let u = unitName.get(unitId);
      while (u) {
        names.push(u.name);
        u = u.parentId ? unitName.get(u.parentId) : undefined;
      }
      return names;
    };
    const groups = GROUP_RULES[orgId].map((g, i) => ({
      id: `${orgId}-g${i + 1}`,
      orgId,
      name: g.name,
      sort: i,
      memberIds: people
        .filter((p) => {
          const names = pathOf(p.unitId);
          // 지휘부 그룹은 본부 직속 인원만
          if (g.match[0].includes("대책본부")) return names[0].includes("대책본부");
          return g.match.some((m) => names[0].includes(m));
        })
        .map((p) => p.id),
    }));
    await db.insert(schema.contactGroups).values(groups);
    console.log(`연락망 ${orgId}: 조직 ${units.length}, 담당자 ${people.length}, 그룹 ${groups.length}`);
  }

  const created: string[][] = [];
  for (const a of ACCOUNTS) {
    const exist = await db.select().from(schema.users).where(eq(schema.users.loginId, a.loginId)).limit(1);
    if (exist.length) continue;
    const pw = password();
    await db.insert(schema.users).values({
      id: crypto.randomUUID(),
      ...a,
      passwordHash: await bcrypt.hash(pw, 10),
    });
    const orgName = ORGS.find((o) => o.id === a.orgId)?.name ?? "";
    created.push([orgName, a.loginId, pw, a.role === "admin" ? "전체관리" : a.role === "manager" ? "기관관리" : "일반"]);
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
