/**
 * 사내 배포서버 시작 파일 — LaunchDaemon 시작 래퍼가 `node server.js` 로 실행한다(Vercel 에서는 쓰지 않음).
 *  - 작업 폴더를 이 파일 위치로 옮긴다(.env·.next 를 찾기 위해. 래퍼에서는 cd 하지 않는다).
 *  - 127.0.0.1:PORT 에서만 대기한다(외부 접속은 Caddy 가 받아서 넘겨 준다).
 *  - Vercel 크론 대신 매일 03:00(한국시각)에 휴지통 정리(/api/cron/purge-trash)를 부른다.
 */
process.chdir(__dirname);
process.env.NODE_ENV = process.env.NODE_ENV || "production";

const { loadEnvConfig } = require("@next/env");
loadEnvConfig(__dirname, false);

const http = require("node:http");
const next = require("next");

const HOST = "127.0.0.1";
const PORT = Number.parseInt(process.env.PORT || "4200", 10);

const log = (...a) => console.log(new Date().toISOString(), ...a);

/** 다음 휴지통 정리 시각(한국시각 PURGE_AT_KST, 기본 03:00)까지 남은 ms */
function msUntilNextPurge() {
  const [h, m] = (process.env.PURGE_AT_KST || "03:00").split(":").map(Number);
  const KST = 9 * 3600e3;
  const now = Date.now();
  const k = new Date(now + KST); // UTC 필드로 한국 날짜를 읽는다
  let target = Date.UTC(k.getUTCFullYear(), k.getUTCMonth(), k.getUTCDate(), h, m) - KST;
  if (target <= now + 1000) target += 24 * 3600e3;
  return target - now;
}

function purgeTrash() {
  const headers = process.env.CRON_SECRET ? { authorization: `Bearer ${process.env.CRON_SECRET}` } : {};
  const req = http.request(
    { host: HOST, port: PORT, path: "/api/cron/purge-trash", method: "GET", headers, timeout: 120e3 },
    (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (c) => (body += c));
      res.on("end", () => log(`휴지통 정리 ${res.statusCode} ${body.slice(0, 300)}`));
    },
  );
  req.on("timeout", () => req.destroy(new Error("시간 초과")));
  req.on("error", (e) => log("휴지통 정리 실패:", e.message));
  req.end();
}

function schedulePurge() {
  const ms = msUntilNextPurge();
  log(`다음 휴지통 정리까지 ${Math.round(ms / 60000)}분`);
  setTimeout(() => {
    purgeTrash();
    schedulePurge();
  }, ms);
}

const app = next({ dev: false, dir: __dirname, hostname: HOST, port: PORT });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = http.createServer((req, res) => handle(req, res));
    server.listen(PORT, HOST, () => {
      log(`재난상황일지 생성도구 시작 — http://${HOST}:${PORT}`);
      schedulePurge();
    });
    const stop = (sig) => {
      log(`${sig} 받음 — 종료`);
      server.close(() => process.exit(0));
      setTimeout(() => process.exit(0), 10e3).unref();
    };
    process.on("SIGTERM", () => stop("SIGTERM"));
    process.on("SIGINT", () => stop("SIGINT"));
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
