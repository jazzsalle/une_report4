#!/usr/bin/env node
/**
 * 사내 배포서버 점검 — 설정 파일 항목과 바깥 연결(기상청 기상특보, T3Q SOP)을 확인한다.
 * 키·주소 같은 값은 화면에 내보내지 않는다(결과를 그대로 공유해도 되게).
 *
 *   cd /Volumes/UNES2/apps/disaster-report
 *   node scripts/check-links.mjs                  (기본: /usr/local/etc/unes-svc/env/disaster-report.env)
 *   node scripts/check-links.mjs <설정 파일 경로>
 *
 * 앱과 같은 방식으로 붙는다: 기상청은 앱과 같은 요청(getWthrInfo, 오늘 발표분),
 * T3Q 는 src/lib/t3q/https.ts 와 같은 신뢰 방식(T3Q_SOP_CA → T3Q_SOP_CERT_SHA256 지문 → 일반 검증).
 */
import fs from "node:fs";
import tls from "node:tls";

const FILE = process.argv[2] || "/usr/local/etc/unes-svc/env/disaster-report.env";
const NEED = ["DATABASE_URL", "SESSION_SECRET", "CRON_SECRET", "KMA_SERVICE_KEY", "T3Q_SOP_MODE", "T3Q_SOP_URL"];

const hidden = [];
const hide = (s) => hidden.reduce((acc, x) => (x && x.length > 3 ? acc.split(x).join("***") : acc), String(s));
const why = (e) => hide(e?.cause?.code || e?.cause?.message || e?.code || e?.message || e);
const norm = (fp) => String(fp).replace(/[^0-9a-f]/gi, "").toUpperCase();

/** KEY=값 줄을 읽는다(server.js 처럼 바깥 따옴표는 벗긴다) */
function readEnv(file) {
  const env = {};
  const twice = [];
  for (const raw of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = raw.trim().replace(/^export\s+/, "");
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i < 1) continue;
    const k = line.slice(0, i).trim();
    const m = /^(["'])([\s\S]*)\1$/.exec(line.slice(i + 1).trim());
    if (k in env) twice.push(k);
    env[k] = m ? m[2] : line.slice(i + 1).trim();
  }
  return { env, twice };
}

const ymdKst = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit" })
    .format(new Date())
    .replace(/-/g, "");

async function checkKma(key) {
  if (!key) return "설정 없음";
  const today = ymdKst();
  const qs = new URLSearchParams({ pageNo: "1", numOfRows: "1", dataType: "JSON", stnId: "108", fromTmFc: today, toTmFc: today });
  try {
    const res = await fetch(`https://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrInfo?serviceKey=${key}&${qs}`, {
      signal: AbortSignal.timeout(15000),
    });
    const body = await res.text();
    let header;
    try {
      header = JSON.parse(body)?.response?.header;
    } catch {}
    const code = String(header?.resultCode ?? "");
    if (code === "00" || code === "03") return "OK";
    if (code) return `확인 필요 (${hide(code)} ${hide(header.resultMsg ?? "")})`.trim();
    const auth = /returnAuthMsg>([^<]+)/.exec(body)?.[1];
    if (auth || res.status === 401 || res.status === 403) return `인증키 오류 (${hide(auth ?? `HTTP ${res.status}`)})`;
    return `확인 필요 (HTTP ${res.status})`;
  } catch (e) {
    return `연결 안 됨 (${why(e)})`;
  }
}

function expiry(cert) {
  const d = new Date(cert?.valid_to ?? "");
  if (Number.isNaN(d.getTime())) return "";
  const days = Math.floor((d.getTime() - Date.now()) / 86400e3);
  const date = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(d);
  return days <= 30 ? `인증서 만료 ${date}, ${days}일 남음 — 만료 뒤에는 새 지문으로 바꿔야 함` : `인증서 만료 ${date}`;
}

function checkT3q(env) {
  if (env.T3Q_SOP_MODE !== "live") return Promise.resolve("T3Q_SOP_MODE 가 live 가 아님 (예시 데이터로 동작)");
  let u;
  try {
    u = new URL(env.T3Q_SOP_URL);
  } catch {
    return Promise.resolve("T3Q_SOP_URL 주소 형식 오류");
  }
  hidden.push(u.href, u.host, u.hostname);
  const ca = env.T3Q_SOP_CA?.replace(/\\n/g, "\n");
  const pins = (env.T3Q_SOP_CERT_SHA256 ?? "").split(",").map(norm).filter(Boolean);
  const port = Number(u.port) || 443;
  const how = ca ? "CA" : pins.length ? "pin" : "public";

  return new Promise((resolve) => {
    const s = tls.connect({
      host: u.hostname,
      port,
      servername: u.hostname,
      ...(how === "CA" ? { ca } : how === "pin" ? { rejectUnauthorized: false } : {}),
    });
    const done = (msg) => {
      s.destroy();
      resolve(msg);
    };
    s.setTimeout(15000, () => done("연결 안 됨 (시간 초과)"));
    s.once("error", (e) => done(`연결 안 됨 (${why(e)})`));
    s.once("secureConnect", () => {
      const cert = s.getPeerCertificate();
      if (how === "pin") {
        const fp = cert?.fingerprint256 ? norm(cert.fingerprint256) : "";
        const nameErr = cert?.subjectaltname ? tls.checkServerIdentity(u.hostname, cert) : undefined;
        if (!fp || !pins.includes(fp) || nameErr) {
          return done(`인증서 지문 불일치 — 서버가 받은 지문 ${cert?.fingerprint256 ?? "없음"}${cert?.valid_to ? `, ${expiry(cert)}` : ""}`);
        }
        return done(`OK (인증서 지문 일치, ${expiry(cert)})`);
      }
      done(`OK (${how === "CA" ? "T3Q 루트 인증서로 확인" : "일반 인증서 확인"}, ${expiry(cert)})`);
    });
  });
}

async function main() {
  let parsed;
  try {
    parsed = readEnv(FILE);
  } catch (e) {
    console.error(`설정 파일을 읽지 못했습니다: ${FILE} (${e.code ?? e.message})`);
    process.exit(1);
  }
  const { env, twice } = parsed;
  for (const k of ["KMA_SERVICE_KEY", "SESSION_SECRET", "CRON_SECRET", "DATABASE_URL", "T3Q_SOP_CA"]) if (env[k]) hidden.push(env[k]);

  const names = Object.keys(env);
  console.log(`설정 항목 ${names.length}개: ${names.join(", ")}`);
  const missing = NEED.filter((k) => !env[k]);
  if (!env.T3Q_SOP_CERT_SHA256 && !env.T3Q_SOP_CA) missing.push("T3Q_SOP_CERT_SHA256");
  if (missing.length) console.log(`  빠진 항목: ${missing.join(", ")}`);
  if (twice.length) console.log(`  두 번 들어간 항목: ${twice.join(", ")} (아래쪽 값이 쓰임)`);
  if (/neon\.tech/.test(env.DATABASE_URL ?? "")) console.log("  DATABASE_URL 이 Neon 주소입니다 — 서버 DB 주소여야 합니다");

  const [kma, t3q] = await Promise.all([checkKma(env.KMA_SERVICE_KEY), checkT3q(env)]);
  console.log(`기상청 기상특보: ${kma}`);
  console.log(`T3Q SOP: ${t3q}`);
}

main();
