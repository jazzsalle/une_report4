#!/usr/bin/env node
/**
 * Vercel(Neon) DB → 사내 배포서버 DB 로 데이터를 옮긴다.
 * Neon 은 PostgreSQL 18 이라 서버의 pg_dump 17 로는 덤프할 수 없어서(버전 불일치), 표 단위로 직접 복사한다.
 *
 *   cd /Volumes/UNES2/apps/disaster-report
 *   node scripts/copy-from-neon.mjs "postgresql://<사용자>@<Neon 주소>/<DB>?sslmode=verify-full"
 *     → 「Neon 비밀번호:」 가 나오면 비밀번호를 붙여 넣고 Enter (화면에 안 보임)
 *
 * 하는 일
 *  1. 서버 DB(기본: 소켓 /tmp, DB disaster_report)에 스키마를 최신으로 만든다(drizzle 마이그레이션).
 *  2. Neon 의 public 표를 읽어 같은 이름의 표에 넣는다(양쪽에 있는 열만). 값은 글자 그대로 옮긴다.
 *  3. 표마다 건수를 비교해 보여 준다.
 * 서버 DB 에 이미 데이터가 있으면 멈춘다. 다시 옮길 때(최종 이전)는 --replace 를 붙이면 비우고 옮긴다.
 *
 * 옵션: --replace  --db <이름>(기본 disaster_report)  --socket <폴더>(기본 /tmp)  --target <접속 주소>
 */
import readline from "node:readline";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RAW = { getTypeParser: () => (v) => v }; // 모든 값을 글자 그대로(시각·JSON 이 바뀌지 않게)

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const sourceArg = process.argv.slice(2).find((a, i, all) => !a.startsWith("--") && !(i > 0 && ["--db", "--socket", "--target"].includes(all[i - 1])));
const REPLACE = process.argv.includes("--replace");
const DB = arg("--db", "disaster_report");
const SOCKET = arg("--socket", "/tmp");
const TARGET = arg("--target", "");

function askHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: !!process.stdin.isTTY });
    process.stdout.write(question);
    rl._writeToOutput = () => {};
    rl.question("", (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer.trim().replace(/^"+|"+$/g, ""));
    });
  });
}

const q = (name) => `"${name.replace(/"/g, '""')}"`;

async function tables(client) {
  const r = await client.query(
    `select table_name from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE' order by table_name`,
  );
  return r.rows.map((x) => x.table_name);
}
async function columns(client, table) {
  const r = await client.query(
    `select column_name from information_schema.columns where table_schema = 'public' and table_name = $1 order by ordinal_position`,
    [table],
  );
  return r.rows.map((x) => x.column_name);
}
async function count(client, table) {
  const r = await client.query(`select count(*)::text as n from ${q(table)}`);
  return Number(r.rows[0].n);
}

async function main() {
  if (!sourceArg) {
    console.error('사용법: node scripts/copy-from-neon.mjs "postgresql://<사용자>@<Neon 주소>/<DB>?sslmode=verify-full"');
    process.exit(2);
  }
  const src = new URL(sourceArg);
  if (!src.password) src.password = await askHidden("Neon 비밀번호: ");
  if (!src.password) throw new Error("비밀번호가 비어 있습니다.");

  const targetConfig = TARGET ? { connectionString: TARGET } : { host: SOCKET, database: DB };

  // 1. 서버 DB 스키마
  const pool = new pg.Pool({ ...targetConfig, max: 1 });
  await migrate(drizzle(pool), { migrationsFolder: path.join(ROOT, "drizzle") });
  await pool.end();
  console.log("① 서버 DB 스키마 준비 완료");

  const source = new pg.Client({ connectionString: src.toString(), types: RAW });
  const target = new pg.Client({ ...targetConfig, types: RAW });
  await source.connect();
  await target.connect();
  const sv = (await source.query("show server_version")).rows[0].server_version;
  const who = (await target.query("select current_user, current_database()")).rows[0];
  console.log(`② 연결: Neon(PostgreSQL ${sv.split(" ")[0]}) → 서버 DB ${who.current_database} (사용자 ${who.current_user})`);

  const srcTables = await tables(source);
  const dstTables = await tables(target);
  const common = dstTables.filter((t) => srcTables.includes(t));
  const onlySrc = srcTables.filter((t) => !dstTables.includes(t));

  // 서버 DB 에 이미 데이터가 있으면 멈춘다(--replace 면 비운다)
  let existing = 0;
  for (const t of common) existing += await count(target, t);
  if (existing > 0 && !REPLACE) {
    throw new Error(`서버 DB 에 이미 데이터가 ${existing}건 있습니다. 다시 옮기려면 명령 끝에 --replace 를 붙이세요(서버 DB 내용을 지우고 다시 옮김).`);
  }

  await target.query("begin");
  try {
    await target.query("select set_config('app.tutorial_unlock', 'approve', true)");
    if (REPLACE && common.length) await target.query(`truncate ${common.map(q).join(", ")}`);

    const report = [];
    for (const t of common) {
      const srcCols = await columns(source, t);
      const dstCols = await columns(target, t);
      const cols = dstCols.filter((c) => srcCols.includes(c));
      const { rows } = await source.query(`select ${cols.map(q).join(", ")} from ${q(t)}`);
      // 한 번에 너무 크지 않게 나눠 넣는다(행 100개 또는 약 8MB)
      let batch = [];
      let bytes = 0;
      const flush = async () => {
        if (!batch.length) return;
        const params = [];
        const values = batch.map((row) => `(${cols.map((c) => { params.push(row[c]); return `$${params.length}`; }).join(", ")})`);
        await target.query(`insert into ${q(t)} (${cols.map(q).join(", ")}) values ${values.join(", ")}`, params);
        batch = [];
        bytes = 0;
      };
      for (const row of rows) {
        batch.push(row);
        for (const c of cols) bytes += row[c] ? String(row[c]).length : 0;
        if (batch.length >= 100 || bytes > 8e6) await flush();
      }
      await flush();
      report.push({ t, from: rows.length, skipped: srcCols.filter((c) => !dstCols.includes(c)) });
    }
    await target.query("commit");

    console.log("③ 옮긴 결과 (Neon 건수 → 서버 DB 건수)");
    let ok = true;
    for (const r of report) {
      const n = await count(target, r.t);
      const mark = n === r.from ? "OK" : "확인 필요";
      if (n !== r.from) ok = false;
      console.log(`   ${r.t.padEnd(16)} ${String(r.from).padStart(5)} → ${String(n).padStart(5)}  ${mark}${r.skipped.length ? `  (서버에 없는 열 건너뜀: ${r.skipped.join(", ")})` : ""}`);
    }
    if (onlySrc.length) console.log(`   (서버 DB 에 없는 표라 건너뜀: ${onlySrc.join(", ")})`);
    console.log(ok ? "완료: 모든 표의 건수가 같습니다." : "건수가 다른 표가 있습니다. 결과를 확인하세요.");
  } catch (e) {
    await target.query("rollback").catch(() => {});
    throw e;
  } finally {
    await source.end().catch(() => {});
    await target.end().catch(() => {});
  }
}

main().catch((e) => {
  console.error("오류:", e.message);
  process.exit(1);
});
