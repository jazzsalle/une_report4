import type { ReportContent, ReportSection, WeatherImages, WeatherSnapshot } from "@/lib/types";
import { IMAGE_MARK } from "@/lib/export/blocks";

/**
 * 기상특보 보고 (부산 매뉴얼 붙임 8-1-① 대처상황 보고 형식에서 피해·통제·조치 현황을 뺀 것)
 *   □ 기상특보 : 10.5.(월) 09:00 호우주의보 발효
 *   [기상특보 현황] [레이더 영상] [위성영상]
 *   □ 강수 현황과 전망
 *   □ 예비특보
 */

/** 기상특보 그림 3칸 — 부산 상황보고 양식 순서. hint = 그림을 찾는 곳 (방재기상정보시스템 메뉴) */
export const WEATHER_SLOTS = [
  { key: "alert", label: "기상특보 현황", hint: "방재기상정보시스템 › 위험기상감시 › 특·정보" },
  { key: "radar", label: "레이더 영상", hint: "방재기상정보시스템 › 위험기상감시 › 태풍·호우 › 레이더/낙뢰 › SITE영상" },
  { key: "satellite", label: "위성영상", hint: "방재기상정보시스템 › 위험기상감시 › 태풍·호우 › 위성" },
] as const;
export type WeatherSlot = (typeof WEATHER_SLOTS)[number]["key"];

const TZ = "Asia/Seoul";
function parts(d: string) {
  return Object.fromEntries(
    new Intl.DateTimeFormat("ko-KR", {
      timeZone: TZ,
      month: "numeric",
      day: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date(d))
      .map((x) => [x.type, x.value]),
  ) as Record<string, string>;
}
/** 10.5.(월) 09:00 */
export function shortStamp(d: string) {
  const p = parts(d);
  return `${p.month}.${p.day}.(${p.weekday}) ${p.hour}:${p.minute}`;
}
/** 10.5. 09시 현재 */
export function captionStamp(d: string) {
  const p = parts(d);
  return `${p.month}.${p.day}. ${p.hour}시 현재`;
}

/** 기상정보 본문에서 (현황)·(전망) 문장 */
function infoSentences(info: string) {
  return info
    .split(/\n/)
    .map((l) => l.replace(/^[○o]\s*/, "").trim())
    .filter((l) => /^\((현황|전망)\)/.test(l))
    .map((l) => l.replace(/\s+/g, " "));
}

export interface WeatherReportInput {
  weather: WeatherSnapshot | null;
  weatherImages: WeatherImages | null;
}

/** 보고 제목: "10.5. 호우주의보 기상상황 보고" / 특보 없으면 "10.5. 기상상황 보고" */
export function weatherReportTitle(w: WeatherSnapshot | null) {
  const at = w?.announcedAt ?? w?.retrievedAt ?? new Date().toISOString();
  const p = parts(at);
  const names = Array.from(new Set((w?.active ?? []).map((a) => a.name)));
  return `${p.month}.${p.day}. ${names.length ? names.join("·") + " " : ""}기상상황 보고`;
}

/** 그림 설명: "레이더 영상(10.5. 09:00)" */
export function weatherCaption(label: string, at?: string) {
  return `${label}(${captionStamp(at ?? new Date().toISOString())})`;
}

/** 기상특보 보고 본문 — 상황일지 「기상특보」 장과 단독 문서가 함께 쓴다 */
export function weatherSection(s: WeatherReportInput, id = "weather"): ReportSection {
  const w = s.weather;
  const lines: string[] = [];
  const at = w?.announcedAt ?? w?.retrievedAt;
  if (w && w.active.length) {
    lines.push(`□ **기상특보** : ${at ? shortStamp(at) : ""} ${Array.from(new Set(w.active.map((a) => a.name))).join(", ")} 발효`);
    w.active.forEach((a) => lines.push(`○ ${a.name}: ${a.areas}`));
  } else {
    lines.push(`□ **기상특보** : ${at ? shortStamp(at) + " 기준 " : ""}발효 중인 특보 없음`);
  }

  lines.push(IMAGE_MARK);

  const info = infoSentences(w?.infoText ?? "");
  if (info.length) {
    lines.push(`□ **강수 현황과 전망**${w?.infoAt ? ` (${shortStamp(w.infoAt)} 기상청 발표)` : ""}`);
    info.forEach((l) => lines.push(`○ ${l}`));
  }
  if (w?.preliminary.length) {
    lines.push("□ **예비특보**");
    w.preliminary.slice(0, 4).forEach((p) => lines.push(`○ ${p}`));
  }

  const img = s.weatherImages ?? {};
  const items = WEATHER_SLOTS.map(({ key, label }) => {
    const it = img[key];
    return { src: it?.src ?? "", caption: weatherCaption(label, it?.at ?? at), width: it?.width ?? 0, height: it?.height ?? 0 };
  });
  // 넣은 그림만 칸으로 (그림이 하나도 없으면 3칸 빈 틀을 남겨 한글에서 붙여 넣게)
  const filled = items.filter((x) => x.src);
  return {
    id,
    title: "기상특보",
    body: lines.join("\n"),
    images: filled.length ? filled : items,
  };
}

/** 단독 기상특보 보고 문서 (HWPX/DOCX 내려받기용) */
export function weatherReportContent(s: WeatherReportInput, reporter: string, dept: string): ReportContent {
  const sec = weatherSection(s);
  return {
    title: weatherReportTitle(s.weather),
    reporter,
    dept,
    reportedAt: new Date().toISOString(),
    sections: [
      { ...sec, title: "기상 상황" },
      { id: "plan", title: "향후 계획", body: "○ 기상특보 해제 시까지 지속 기상상황 모니터링" },
    ],
  };
}
