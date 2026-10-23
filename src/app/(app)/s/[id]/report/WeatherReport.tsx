"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Download, RefreshCw } from "lucide-react";
import { Button, Card, CardHead } from "@/components/ui";
import { refreshWeather, saveWeatherImage } from "@/app/actions/situation";
import type { WeatherImages, WeatherSnapshot } from "@/lib/types";
import { WEATHER_SLOTS, weatherCaption, weatherReportContent, weatherSection } from "@/lib/report/weather";
import { DocBlocks } from "@/components/DocView";
import { ImageDrop } from "@/components/ImageDrop";
import { exportHwpx } from "@/lib/export/client";
import { safeFilename } from "@/lib/export/blocks";
import { fmtDateTime } from "@/lib/format";

/** 상황일지 탭 왼쪽 「보고 자료 · 기상특보」 (C-06) — 상황일지 「2. 기상특보」에 들어가는 자료 */
export function WeatherReport({
  id,
  editable,
  sido,
  weather,
  images,
  me,
}: {
  id: string;
  editable: boolean;
  sido: string;
  weather: WeatherSnapshot | null;
  images: WeatherImages | null;
  me: { name: string; dept: string };
}) {
  const router = useRouter();
  const [busy, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const section = weatherSection({ weather, weatherImages: images });
  const report = weatherReportContent({ weather, weatherImages: images }, me.name, me.dept);
  const stamp = fmtDateTime(weather?.announcedAt ?? weather?.retrievedAt ?? new Date().toISOString());

  return (
    <Card tour="weather">
      <CardHead
        title={
          <>
            보고 자료 · 기상특보
            <span className="ml-3 text-[16px] font-medium text-sub">상황일지 「2. 기상특보」에 들어갑니다</span>
          </>
        }
        right={
          <>
            {error && <span className="text-[16px] text-danger">{error}</span>}
            {editable && (
              <Button
                variant="ghost"
                size="sm"
                disabled={busy}
                onClick={() => {
                  setError(null);
                  start(async () => {
                    try {
                      await refreshWeather(id);
                      router.refresh();
                    } catch (e) {
                      setError(e instanceof Error ? e.message : "특보를 받지 못했습니다.");
                    }
                  });
                }}
              >
                <RefreshCw size={17} className={busy ? "animate-spin" : ""} /> {sido} 특보 갱신
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => exportHwpx(report, safeFilename(report.title))}>
              <Download size={17} /> 한글
            </Button>
          </>
        }
      />
      <div className="px-8 py-6 font-[serif]">
        {/* 머리 (붙임 8-1-① 형식) */}
        <div className="mb-5 flex items-stretch border-2 border-ink">
          <div className="flex-1 px-4 py-3 text-center">
            <div className="text-[22px] font-bold" style={{ fontFamily: "'HY견고딕', 'Pretendard GOV Variable', sans-serif" }}>
              {report.title}
            </div>
            <div className="mt-1 text-[16px]">- {stamp} 기준 -</div>
          </div>
          <div className="flex w-[180px] shrink-0 flex-col items-center justify-center border-l-2 border-ink px-3 text-center text-[15px] font-bold leading-snug">
            <span>{sido}</span>
            <span>재난안전대책본부</span>
          </div>
        </div>
        <DocBlocks
          s={section}
          imageSlot={() => (
            <div className="grid grid-cols-3 gap-0 font-sans">
              {WEATHER_SLOTS.map((slot) => (
                <ImageDrop
                  key={slot.key}
                  value={images?.[slot.key]}
                  caption={weatherCaption(slot.label, images?.[slot.key]?.at ?? weather?.announcedAt ?? weather?.retrievedAt)}
                  hint={slot.hint}
                  editable={editable}
                  onChange={async (img) => {
                    await saveWeatherImage(id, slot.key, img);
                    router.refresh();
                  }}
                />
              ))}
            </div>
          )}
        />
      </div>
    </Card>
  );
}
