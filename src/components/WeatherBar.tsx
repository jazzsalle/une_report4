"use client";
import { useState } from "react";
import clsx from "clsx";
import { ChevronDown, CloudRain, ExternalLink } from "lucide-react";
import type { WeatherSnapshot } from "@/lib/types";
import { fmtDateTime } from "@/lib/format";

/** 상시 확인용 외부 기상 사이트 (부산 풍수해 매뉴얼 1-1 기상정보 모니터링) */
const LINKS = [
  { label: "태풍연구센터", href: "http://www.typhoon.or.kr" },
  { label: "방재기상플랫폼", href: "https://dmdw.kma.go.kr" },
];

export function WeatherBar({ weather }: { weather: WeatherSnapshot }) {
  const [open, setOpen] = useState(false);
  const has = weather.active.length > 0;
  const warn = weather.active.some((a) => a.kind === "warning");
  return (
    <div
      className={clsx(
        "border-b",
        warn
          ? "border-danger/20 bg-danger-weak"
          : has
            ? "border-warning/20 bg-warning-weak"
            : "border-primary-line/50 bg-primary-weak",
      )}
    >
      <div className="flex h-12 items-center pr-6">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-full min-w-0 flex-1 items-center gap-3 pl-6 pr-3 text-left"
        >
          <CloudRain
            size={20}
            className={
              warn ? "text-danger" : has ? "text-warning" : "text-primary"
            }
          />
          <span className="font-bold">기상특보</span>
          <span className="text-sub">{weather.stnName}</span>
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
            {has ? (
              weather.active.map((a) => (
                <span
                  key={a.name}
                  className={clsx(
                    "whitespace-nowrap rounded px-2 py-0.5 text-[15px] font-bold text-white",
                    a.kind === "warning" ? "bg-danger" : "bg-warning",
                  )}
                >
                  {a.name}
                </span>
              ))
            ) : (
              <span className="truncate text-[16px]">발효 중인 특보 없음</span>
            )}
            {weather.preliminary.length > 0 && (
              <span className="truncate text-[16px] text-sub">
                · 예비특보 {weather.preliminary[0]}
              </span>
            )}
          </div>
          {weather.announcedAt && (
            <span className="hidden text-[15px] text-sub md:inline">
              {fmtDateTime(weather.announcedAt)} 발표
            </span>
          )}
          <ChevronDown
            size={20}
            className={clsx("transition", open && "rotate-180")}
          />
        </button>
        <div className="flex shrink-0 items-center gap-2 border-l border-black/10 pl-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 items-center gap-1 rounded-md border border-line bg-white px-3 text-[15px] font-medium text-ink hover:border-primary hover:text-primary"
            >
              {l.label}
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      </div>
      {open && (
        <div className="grid gap-6 border-t border-black/5 bg-white px-6 py-5 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-bold">발효 중 특보</h3>
            {has ? (
              <ul className="space-y-2">
                {weather.active.map((a) => (
                  <li key={a.name}>
                    <b>{a.name}</b> <span className="text-sub">{a.areas}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sub">없음</p>
            )}
            {weather.preliminary.length > 0 && (
              <>
                <h3 className="mb-2 mt-4 font-bold">예비특보</h3>
                <ul className="space-y-1 text-sub">
                  {weather.preliminary.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div>
            <h3 className="mb-2 font-bold">기상정보</h3>
            <p className="scroll-thin max-h-64 overflow-y-auto whitespace-pre-line leading-relaxed text-sub">
              {weather.infoText || "기상정보 없음"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
