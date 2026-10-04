"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function SituationTabs({ id, status }: { id: string; status: string }) {
  const path = usePathname();
  const tabs = [
    { href: `/s/${id}`, label: "① 상황·기상", on: path === `/s/${id}` },
    { href: `/s/${id}/sop`, label: "② SOP 실행", on: path.startsWith(`/s/${id}/sop`), dim: status === "setup" },
    { href: `/s/${id}/report`, label: "③ 상황일지", on: path.startsWith(`/s/${id}/report`) },
  ];
  return (
    <nav className="mt-4 flex gap-2">
      {tabs.map((t) => (
        <Link
          key={t.href}
          href={t.href}
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
