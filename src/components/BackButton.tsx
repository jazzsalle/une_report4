"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui";

/**
 * 뒤로가기 — 브라우저 기록(history.back)을 쓰지 않고, 이 화면에 오기 직전의 「다른 화면」으로 보낸다.
 *  - 상황을 만든 뒤 「새 상황정보 등록」 폼으로 되돌아가 중복 생성하는 일을 막는다 (/new 는 건너뜀)
 *  - 같은 상황의 탭(SOP / 상황일지) 사이를 오가지 않는다 (skip 으로 묶음)
 *  - 기록이 없으면(새 창·첫 접속) fallback 으로
 */
const KEY = "r4_nav";
const NEVER = ["/new", "/login"];

/** 화면 이동 기록 (Header 에서 경로가 바뀔 때마다 호출) */
export function recordPath(path: string) {
  try {
    const list: string[] = JSON.parse(sessionStorage.getItem(KEY) ?? "[]");
    if (list[list.length - 1] === path) return;
    list.push(path);
    sessionStorage.setItem(KEY, JSON.stringify(list.slice(-30)));
  } catch {}
}

function previous(skip: string[]): string | null {
  try {
    const list: string[] = JSON.parse(sessionStorage.getItem(KEY) ?? "[]");
    for (let i = list.length - 1; i >= 0; i--) {
      const p = list[i];
      if (skip.some((s) => p === s || p.startsWith(`${s}/`))) continue;
      if (NEVER.some((s) => p === s || p.startsWith(`${s}/`))) continue;
      return p;
    }
  } catch {}
  return null;
}

export function BackButton({
  fallback,
  skip,
  before,
}: {
  /** 기록이 없을 때 갈 곳 */
  fallback: string;
  /** 「지금 화면」으로 보고 건너뛸 경로 (하위 경로 포함). 기본은 현재 경로 */
  skip?: string[];
  /** 떠나기 전에 할 일 (예: 저장 대기 중인 내용 저장) */
  before?: () => Promise<void>;
}) {
  const router = useRouter();
  return (
    <Button
      size="sm"
      variant="ghost"
      className="-ml-2"
      onClick={async () => {
        await before?.();
        router.push(previous(skip ?? [window.location.pathname]) ?? fallback);
      }}
    >
      <ArrowLeft size={20} /> 뒤로
    </Button>
  );
}
