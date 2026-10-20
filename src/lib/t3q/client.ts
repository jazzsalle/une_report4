import "server-only";
import type {
  AuthVerifyResponse,
  ContactsRequest,
  ContactsResponse,
  SopActionsRequest,
  SopActionsResponse,
  T3QErrorBody,
} from "./types";
import { mockContacts, mockSopActions } from "./mock";

/**
 * T3Q 연계 진입점 — 화면·서버 코드는 이 파일의 함수만 호출한다.
 * API마다 따로 켠다: SOP(API-02)는 T3Q_SOP_MODE=live + T3Q_SOP_URL(납품 v2),
 * 연락망(API-04)·링크 로그인(API-03)은 T3Q_MODE=live + T3Q_BASE_URL(요청안 — 아직 T3Q 미제공).
 * 그 외(mock)는 매뉴얼 시드 응답. 실제 호출이 실패하면 시드로 대체하지 않고 오류를 화면에 그대로 알린다.
 */
export function t3qMode(): "live" | "mock" {
  return process.env.T3Q_MODE === "live" && process.env.T3Q_BASE_URL ? "live" : "mock";
}

export function sopMode(): "live" | "mock" {
  return process.env.T3Q_SOP_MODE === "live" && process.env.T3Q_SOP_URL ? "live" : "mock";
}

export const T3Q_FAILED = "T3Q 호출에 실패했습니다. 잠시 후 다시 시도하세요.";

/** 화면에 그대로 보여도 되는 T3Q 오류 문구 */
export class T3QUserError extends Error {}

/** T3Q 오류 응답 → 사용자 문구 (요청 추적 번호는 로그에만) */
function sopErrorMessage(status: number, body: T3QErrorBody | null): string {
  const code = body?.error.code;
  if (status === 404 || code === "NOT_FOUND") return "이 재난유형·발생지역에 맞는 매뉴얼을 T3Q에서 찾지 못했습니다.";
  if (status === 422 && code === "INVALID_REQUEST") return "T3Q가 상황정보를 받지 못했습니다. 상황정보를 확인하세요.";
  if (status === 429 || code === "RATE_LIMIT") return `T3Q 요청이 많습니다. ${body?.error.retryAfter ?? 5}초 뒤 다시 시도하세요.`;
  return T3Q_FAILED;
}

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

/** API-02 — SOP 콘텐츠 (T3Q API-SOP v2). 응답의 source 는 호출부가 sopMode() 로 정한다 */
export async function sopActions(
  req: SopActionsRequest,
  opts: { seedOnly?: boolean } = {},
): Promise<SopActionsResponse> {
  // 따라하기는 늘 같은 화면이 나오도록 매뉴얼 시드만 쓴다
  if (opts.seedOnly || sopMode() !== "live") return mockSopActions(req);
  const base = process.env.T3Q_SOP_URL!.replace(/\/$/, "");
  const requestId = crypto.randomUUID();
  let res: Response;
  try {
    res = await fetch(`${base}/reports/sop/actions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", "X-Request-ID": requestId },
      body: JSON.stringify(req),
      signal: AbortSignal.timeout(40000),
      cache: "no-store",
    });
  } catch (e) {
    console.error("[t3q] sop actions unreachable", requestId, e);
    throw new T3QUserError(T3Q_FAILED);
  }
  if (!res.ok) {
    // 게이트웨이 오류는 JSON이 아닐 수 있다 — 상태 코드로 판단
    const body = (await res.json().catch(() => null)) as T3QErrorBody | null;
    console.error("[t3q] sop actions failed", res.status, requestId, body?.error);
    throw new T3QUserError(sopErrorMessage(res.status, body));
  }
  const data = (await res.json()) as SopActionsResponse;
  if (data.warnings?.length) console.warn("[t3q] sop warnings", requestId, data.warnings.map((w) => `${w.code}: ${w.message}`));
  return data;
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
