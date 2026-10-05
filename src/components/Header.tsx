"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ChevronDown, FileCode2, LogOut, UserRound } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { logout } from "@/app/actions/auth";
import type { SessionUser } from "@/lib/types";
import { LocationChip } from "./LocationChip";
import { recordPath } from "./BackButton";

export function Header({
  user,
  orgName,
  location,
  fallbackSido,
}: {
  user: SessionUser;
  orgName: string;
  location: { sido: string; sigungu: string; src: "gps" | "manual" } | null;
  fallbackSido: string;
}) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => recordPath(path), [path]);
  const nav = [
    { href: "/", label: "홈" },
    { href: "/docs", label: "문서함" },
    { href: "/contacts", label: "연락망" },
    { href: "/trash", label: "휴지통" },
    ...(user.role !== "user" ? [{ href: "/admin", label: "계정관리" }] : []),
  ];
  const active = (h: string) => (h === "/" ? path === "/" || path.startsWith("/s/") || path === "/new" : path.startsWith(h));

  return (
    <header className="bg-white">
      <div className="flex h-8 items-center gap-2 bg-utility px-6 text-[14px] text-sub">
        <BrandMark size={16} />
        재난상황일지 생성도구
        <span className="ml-auto">{orgName}</span>
      </div>
      <div className="flex h-[76px] items-center border-b border-line-weak px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <BrandMark size={34} />
          <span className="text-[22px] font-bold tracking-tight">{orgName || "상황일지"}</span>
        </Link>
        <nav className="ml-12 flex h-full items-stretch gap-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={clsx(
                "flex items-center border-b-[3px] px-4 text-[17px] font-semibold transition",
                active(n.href) ? "border-primary text-primary" : "border-transparent text-ink hover:text-primary",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto mr-5">
          <LocationChip location={location} fallbackSido={fallbackSido} />
        </div>
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1 text-[17px] font-semibold"
          >
            <span className="text-primary">{user.name}</span>님 환영합니다
            <ChevronDown size={18} />
          </button>
          {open && (
            <div
              className="card absolute right-0 top-10 z-40 w-48 overflow-hidden border border-line-weak py-1"
              onMouseLeave={() => setOpen(false)}
            >
              <Link
                href="/me"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-[16px] hover:bg-canvas"
              >
                <UserRound size={18} /> 내 정보
              </Link>
              {user.role === "admin" && (
                <a
                  href="/api-docs"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-3 text-[16px] hover:bg-canvas"
                >
                  <FileCode2 size={18} /> API 문서
                </a>
              )}
              <form action={logout}>
                <button className="flex w-full items-center gap-2 px-4 py-3 text-left text-[16px] hover:bg-canvas">
                  <LogOut size={18} /> 로그아웃
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
