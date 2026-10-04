import "server-only";
import type {
  AuthVerifyResponse,
  SopActionsRequest,
  SopActionsResponse,
  WeatherSummaryRequest,
  WeatherSummaryResponse,
} from "./types";
import { mockSopActions, mockWeatherSummary } from "./mock";

/**
 * T3Q 연계 진입점 — 화면·서버 코드는 이 두 함수만 호출한다.
 * T3Q_MODE=live 이면 실제 API, 그 외(mock)는 매뉴얼 시드 응답. 실제 호출 실패 시 시드로 대체한다.
 */
export function t3qMode(): "live" | "mock" {
  return process.env.T3Q_MODE === "live" && process.env.T3Q_BASE_URL ? "live" : "mock";
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

export async function weatherSummary(
  req: WeatherSummaryRequest,
): Promise<{ data: WeatherSummaryResponse; fallback: boolean }> {
  if (t3qMode() === "live") {
    try {
      return { data: await post<WeatherSummaryResponse>("/weather/summary", req, 15000), fallback: false };
    } catch (e) {
      console.error("[t3q] weather summary failed, using seed", e);
      return { data: await mockWeatherSummary(req), fallback: true };
    }
  }
  return { data: await mockWeatherSummary(req), fallback: false };
}

export async function sopActions(
  req: SopActionsRequest,
): Promise<{ data: SopActionsResponse; fallback: boolean }> {
  if (t3qMode() === "live") {
    try {
      return { data: await post<SopActionsResponse>("/sop/actions", req, 40000), fallback: false };
    } catch (e) {
      console.error("[t3q] sop actions failed, using seed", e);
      return { data: await mockSopActions(req), fallback: true };
    }
  }
  return { data: await mockSopActions(req), fallback: false };
}

/** API-03 — T3Q 링크 토큰 확인. 실제 연계(live)일 때만 동작하며 모의 응답은 없다. */
export async function verifyUserToken(token: string): Promise<AuthVerifyResponse> {
  if (t3qMode() !== "live") throw new Error("T3Q 연계가 설정되지 않았습니다.");
  return post<AuthVerifyResponse>("/auth/verify", { token }, 10000);
}
