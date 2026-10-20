"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function SituationTabs({ id, status }: { id: string; status: string }) {
  const path = usePathname();
  const tabs = [
    // 탭 번호 없이 SOP · 상황일지 (C-05·C-06). 상황 정보는 상황명 줄 「상황 정보」 창
    { href: `/s/${id}/sop`, label: "SOP 실행", on: path.startsWith(`/s/${id}/sop`), dim: status === "setup", tour: "tab-sop" },
    { href: `/s/${id}/report`, label: "상황일지", on: path.startsWith(`/s/${id}/report`), tour: "tab-report" },
  ];
  return (
    <nav className="mt-4 flex gap-2">
      {tabs.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          data-tour={t.tour}
          className={clsx(
            "-mb-px flex h-14 items-center border-b-[3px] px-4 text-[19px] font-bold transition",
            t.on ? "border-tab text-tab" : "border-transparent text-sub hover:text-ink",
            t.dim && !t.on && "text-placeholder",
          )}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
