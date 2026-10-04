"use client";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { ChevronDown, CloudRain, ExternalLink } from "lucide-react";
import type { WeatherSnapshot } from "@/lib/types";
import { fmtDateTime } from "@/lib/format";
import { shortSigungu } from "@/lib/regions";

const KMA_URL = "https://www.weather.go.kr/w/special-report/overall.do";

/** 상시 확인용 외부 사이트 (기상·태풍·산사태) */
const LINKS = [
  { label: "방재기상플랫폼", href: "https://dmdw.kma.go.kr" },
  { label: "태풍연구센터", href: "http://www.typhoon.or.kr" },
  { label: "산사태정보시스템", href: "https://sansatai.forest.go.kr/mhms_pub/mhms/main/mainPage.do" },
];

type Ticker = { name: string; area: string; kind: "warning" | "watch"; here: boolean };

export function WeatherBar({ weather, sigungu }: { weather: WeatherSnapshot; sigungu: string }) {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const warn = weather.active.some((a) => a.kind === "warning");
  const has = weather.active.length > 0;

  // 특보 × 세부 지역을 한 줄씩 번갈아 보여준다. 현재 위치 시군구가 포함된 항목을 먼저.
  const items = useMemo<Ticker[]>(() => {
    const key = sigungu ? shortSigungu(sigungu) : "";
    const list = weather.active.flatMap((a) =>
      (a.subs?.length ? a.subs : [a.areas]).map((area) => ({
        name: a.name,
        area,
        kind: a.kind === "warning" ? ("warning" as const) : ("watch" as const),
        here: !!key && area.includes(key),
      })),
    );
    return [...list.filter((x) => x.here), ...list.filter((x) => !x.here)];
  }, [weather.active, sigungu]);

  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 3500);
    return () => clearInterval(t);
  }, [items.length]);

  const cur = items.length ? items[i % items.length] : null;

  return (
    <div
      className={clsx(
        "border-b",
        warn ? "border-danger/20 bg-danger-weak" : has ? "border-warning/20 bg-warning-weak" : "border-primary-line/50 bg-primary-weak",
      )}
    >
      <div className="flex h-12 items-center pr-6">
        <a
          href={KMA_URL}
          target="_blank"
          rel="noreferrer"
          className="flex h-full min-w-0 flex-1 items-center gap-3 pl-6 pr-3 hover:underline"
        >
          <CloudRain size={20} className={warn ? "text-danger" : has ? "text-warning" : "text-primary"} />
          <span className="shrink-0 font-bold">기상특보</span>
          <span className="shrink-0 text-sub">{weather.stnName}</span>
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
            {cur ? (
              <span key={i} className="flex min-w-0 animate-[fadein_.4s_ease] items-center gap-2">
                <span
                  className={clsx(
                    "shrink-0 rounded px-2 py-0.5 text-[15px] font-bold text-white",
                    cur.kind === "warning" ? "bg-danger" : "bg-warning",
                  )}
                >
                  {cur.name}
                </span>
                <span className="truncate text-[16px] font-medium">{cur.area}</span>
                {cur.here && <span className="shrink-0 text-[15px] text-primary-strong">현재 위치</span>}
                {items.length > 1 && (
                  <span className="shrink-0 text-[15px] text-sub">
                    {(i % items.length) + 1}/{items.length}
                  </span>
                )}
              </span>
            ) : (
              <span className="truncate text-[16px]">
                발효 중인 특보 없음
                {weather.preliminary.length > 0 && <span className="text-sub"> · 예비특보 {weather.preliminary[0]}</span>}
              </span>
            )}
          </div>
        </a>
        {weather.announcedAt && (
          <span className="hidden shrink-0 pr-2 text-[15px] text-sub 2xl:inline">{fmtDateTime(weather.announcedAt)} 발표</span>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md hover:bg-black/5"
          aria-label="특보 자세히"
        >
          <ChevronDown size={20} className={clsx("transition", open && "rotate-180")} />
        </button>
        <div className="ml-2 flex shrink-0 items-center gap-2 border-l border-black/10 pl-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="hidden h-8 items-center gap-1 rounded-md border border-line bg-white px-3 text-[15px] font-medium text-ink hover:border-primary hover:text-primary lg:flex"
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
            <h3 className="mb-2 font-bold">발효 중 특보 · {weather.stnName}</h3>
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
            <h3 className="mb-2 font-bold">
              기상정보
              {weather.infoAt && <span className="ml-2 font-normal text-sub">{fmtDateTime(weather.infoAt)} 발표</span>}
            </h3>
            <p className="scroll-thin max-h-64 overflow-y-auto whitespace-pre-line leading-relaxed text-sub">
              {weather.infoText || "오늘 발표된 기상정보 없음"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
