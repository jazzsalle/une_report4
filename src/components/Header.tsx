"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { BookOpen, ChevronDown, FileCode2, FileSearch, LogOut, UserRound } from "lucide-react";
import { AppIcon } from "./BrandMark";
import { logout } from "@/app/actions/auth";
import type { SessionUser } from "@/lib/types";
import { LocationChip } from "./LocationChip";
import { recordPath } from "./BackButton";
import { MeDialog } from "./MeDialog";

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
  const [me, setMe] = useState(false);
  useEffect(() => recordPath(path), [path]);
  const nav = [
    { href: "/", label: "홈" },
    { href: "/docs", label: "상황일지 관리" },
    { href: "/contacts", label: "연락망" },
    { href: "/trash", label: "휴지통" },
    // 운영관리자만: 계정관리 (매뉴얼 분석은 사용자 메뉴 대응설명서 아래)
    ...(user.role === "admin" ? [{ href: "/admin", label: "계정관리" }] : []),
  ];
  const active = (h: string) =>
    h === "/" ? path === "/" || path.startsWith("/s/") || path === "/new" : h === "/admin" ? path === "/admin" : path.startsWith(h);

  return (
    <header className="bg-white">
      <div className="flex h-8 items-center gap-2 bg-utility px-6 text-[15px] text-ink">
        <AppIcon size={24} />
        재난상황일지 생성도구
        <span className="ml-auto">{orgName}</span>
      </div>
      <div className="flex h-[76px] items-center border-b border-line-weak px-6">
        <Link href="/" className="flex items-center" aria-label="홈">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mois-logo.svg" alt="행정안전부" width={177} height={48} />
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
              <button
                onClick={() => (setOpen(false), setMe(true))}
                className="flex w-full items-center gap-2 px-4 py-3 text-left text-[16px] hover:bg-canvas"
              >
                <UserRound size={18} /> 내 정보
              </button>
              {/* 개발 자료 (U-06) — 운영관리자·T3Q 담당자만, 운영 시 제거 대상 */}
              {(user.role === "admin" || user.role === "t3q") && (
                <div className="mt-1 border-t border-line-weak px-4 pb-1 pt-3 text-[15px] font-semibold text-sub">개발 자료</div>
              )}
              {(user.role === "admin" || user.role === "t3q") && (
                <a
                  href="/api-docs"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-3 text-[16px] hover:bg-canvas"
                >
                  <FileCode2 size={18} /> API 문서
                </a>
              )}
              {(user.role === "admin" || user.role === "t3q") && (
                <a
                  href="/api-docs/mapping.html"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-3 text-[16px] hover:bg-canvas"
                >
                  <BookOpen size={18} /> 대응설명서
                </a>
              )}
              {user.role === "admin" && (
                <a
                  href="/admin/manuals"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-3 text-[16px] hover:bg-canvas"
                >
                  <FileSearch size={18} /> 매뉴얼 분석
                </a>
              )}
              <form action={logout} className="mt-1 border-t border-line-weak pt-1">
                <button className="flex w-full items-center gap-2 px-4 py-3 text-left text-[16px] hover:bg-canvas">
                  <LogOut size={18} /> 로그아웃
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      {me && <MeDialog name={user.name} dept={user.dept} loginId={user.loginId} onClose={() => setMe(false)} />}
    </header>
  );
}
