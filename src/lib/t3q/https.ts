import "server-only";
import https from "node:https";
import tls from "node:tls";
import { Readable } from "node:stream";
import type { IncomingMessage } from "node:http";

/**
 * T3Q(API-SOP v2) 서버 전용 HTTPS 연결.
 * T3Q 서버 인증서는 사설 인증기관(*.t3q.ai) 발급이라 일반 검증이 실패한다(2026-10-20). 검증을 끄지 않고 둘 중 하나로 믿는다.
 * - T3Q_SOP_CA: T3Q 루트 인증서(PEM 본문) — 정상 검증, 인증서 갱신에도 그대로 (회사 서버 이전 시 권장. NODE_EXTRA_CA_CERTS 로 대신해도 됨)
 * - T3Q_SOP_CERT_SHA256: 서버 인증서 SHA-256 지문(쉼표로 여러 개) — 이 지문의 인증서일 때만 연결. 인증서가 갱신되면 새 지문으로 바꿔야 한다
 * 둘 다 없으면 일반 검증(공인 인증서로 바뀐 뒤).
 * 다른 연결(기상청 등)에는 영향이 없다.
 */

const norm = (fp: string) => fp.replace(/[^0-9a-f]/gi, "").toUpperCase();

function pins(): string[] {
  return (process.env.T3Q_SOP_CERT_SHA256 ?? "").split(",").map(norm).filter(Boolean);
}

/** 지문 고정: 핸드셰이크 뒤 지문을 확인하고서야 소켓을 넘긴다 — 확인 전에는 요청 내용을 보내지 않는다 */
function pinnedSocket(host: string, port: number, expected: string[], timeoutMs: number): Promise<tls.TLSSocket> {
  return new Promise((resolve, reject) => {
    const s = tls.connect({ host, port, servername: host, rejectUnauthorized: false });
    const fail = (e: Error) => {
      s.destroy();
      reject(e);
    };
    s.setTimeout(timeoutMs, () => fail(new Error("T3Q 연결 시간 초과")));
    s.once("error", fail);
    s.once("secureConnect", () => {
      const cert = s.getPeerCertificate();
      const fp = cert?.fingerprint256 ? norm(cert.fingerprint256) : "";
      // 이름도 확인 (지문이 같으면 사실상 같은 인증서지만 한 번 더)
      const nameErr = cert?.subjectaltname ? tls.checkServerIdentity(host, cert) : undefined;
      if (!fp || !expected.includes(fp) || nameErr) return fail(new Error(`T3Q 인증서 지문 불일치 (${cert?.fingerprint256 ?? "없음"})`));
      s.setTimeout(0);
      s.removeListener("error", fail);
      resolve(s);
    });
  });
}

export interface T3QResponse {
  status: number;
  headers: IncomingMessage["headers"];
  /** 본문 스트림 (PDF 중계용) */
  stream: ReadableStream<Uint8Array>;
  text(): Promise<string>;
}

/** T3Q 서버로 요청 — fetch 와 비슷하게 쓰되 위 신뢰 방식을 적용한다 */
export async function t3qRequest(
  url: string,
  init: { method?: string; headers?: Record<string, string>; body?: string; timeoutMs: number },
): Promise<T3QResponse> {
  const u = new URL(url);
  const port = Number(u.port) || 443;
  const expected = pins();
  const ca = process.env.T3Q_SOP_CA?.replace(/\\n/g, "\n");
  const socket = !ca && expected.length ? await pinnedSocket(u.hostname, port, expected, init.timeoutMs) : undefined;

  const res = await new Promise<IncomingMessage>((resolve, reject) => {
    const req = https.request(
      u,
      {
        method: init.method ?? "GET",
        headers: { ...init.headers, ...(init.body ? { "Content-Length": Buffer.byteLength(init.body) } : {}) },
        ...(socket ? { createConnection: () => socket } : ca ? { ca } : {}),
      },
      resolve,
    );
    req.setTimeout(init.timeoutMs, () => req.destroy(new Error("T3Q 응답 시간 초과")));
    req.once("error", reject);
    if (init.body) req.write(init.body);
    req.end();
  });

  let used = false;
  const take = () => {
    if (used) throw new Error("T3Q 응답 본문은 한 번만 읽을 수 있습니다.");
    used = true;
    return res;
  };
  return {
    status: res.statusCode ?? 0,
    headers: res.headers,
    get stream() {
      return Readable.toWeb(take()) as ReadableStream<Uint8Array>;
    },
    async text() {
      const chunks: Buffer[] = [];
      for await (const c of take()) chunks.push(c as Buffer);
      return Buffer.concat(chunks).toString("utf8");
    },
  };
}
