import "server-only";
import type {
  AuthVerifyResponse,
  ContactsRequest,
  ContactsResponse,
  SopActionsRequest,
  SopActionsResponse,
} from "./types";
import { mockContacts, mockSopActions } from "./mock";

/**
 * T3Q 연계 진입점 — 화면·서버 코드는 이 파일의 함수만 호출한다.
 * T3Q_MODE=live 이면 실제 API, 그 외(mock)는 매뉴얼 시드 응답.
 * 실제 호출이 실패하면 시드로 대체하지 않고 T3Q_FAILED 오류를 던진다 — 화면에 그대로 알린다.
 */
export function t3qMode(): "live" | "mock" {
  return process.env.T3Q_MODE === "live" && process.env.T3Q_BASE_URL ? "live" : "mock";
}

export const T3Q_FAILED = "T3Q 호출에 실패했습니다. 잠시 후 다시 시도하세요.";

async function post<T>(path: string, body: unknown, timeoutMs: number): Promise<T> {
  const base = process.env.T3Q_BASE_URL!.replace(/\/$/, "");
  const res = await fetch(`${base}/t3q/v1${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Request-Id": crypto.randomUUID(),
      ...(process.env.T3Q_TOKEN ? { Authorization: `Bearer ${process.env.T3Q_TOKEN}` } : {}),
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`T3Q ${path} ${res.status}`);
  return (await res.json()) as T;
}

export async function sopActions(
  req: SopActionsRequest,
  opts: { seedOnly?: boolean } = {},
): Promise<SopActionsResponse> {
  // 따라하기는 늘 같은 화면이 나오도록 매뉴얼 시드만 쓴다
  if (opts.seedOnly || t3qMode() !== "live") return mockSopActions(req);
  try {
    return await post<SopActionsResponse>("/sop/actions", req, 40000);
  } catch (e) {
    console.error("[t3q] sop actions failed", e);
    throw new Error(T3Q_FAILED);
  }
}

/** API-04 — 매뉴얼 연락망 */
export async function manualContacts(req: ContactsRequest): Promise<ContactsResponse> {
  if (t3qMode() !== "live") return mockContacts(req);
  try {
    return await post<ContactsResponse>("/contacts", req, 40000);
  } catch (e) {
    console.error("[t3q] contacts failed", e);
    throw new Error(T3Q_FAILED);
  }
}

/** API-03 — T3Q 링크 토큰 확인. 실제 연계(live)일 때만 동작하며 모의 응답은 없다. */
export async function verifyUserToken(token: string): Promise<AuthVerifyResponse> {
  if (t3qMode() !== "live") throw new Error("T3Q 연계가 설정되지 않았습니다.");
  return post<AuthVerifyResponse>("/auth/verify", { token }, 10000);
}
