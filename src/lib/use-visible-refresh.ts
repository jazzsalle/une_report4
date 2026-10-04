"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * 화면이 보일 때만 주기적으로 서버 값을 다시 받아온다.
 * 뒤에 숨은 탭·최소화한 창은 받지 않고, 다시 보이면 즉시 한 번 받아온다 (서버 요청·요금 절약).
 */
export function useVisibleRefresh(ms: number, enabled = true) {
  const router = useRouter();
  useEffect(() => {
    if (!enabled) return;
    let t: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (!t) t = setInterval(() => router.refresh(), ms);
    };
    const stop = () => {
      if (t) clearInterval(t);
      t = null;
    };
    const onChange = () => {
      if (document.visibilityState === "visible") {
        router.refresh();
        start();
      } else stop();
    };
    if (document.visibilityState === "visible") start();
    document.addEventListener("visibilitychange", onChange);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onChange);
    };
  }, [ms, enabled, router]);
}
