import type { ReportContent, ReportSection, WeatherImages, WeatherSnapshot, WeatherSummary } from "@/lib/types";
import { IMAGE_MARK } from "@/lib/export/blocks";

/**
 * 기상특보 보고 (부산 매뉴얼 붙임 8-1-① 대처상황 보고 형식에서 피해·통제·조치 현황을 뺀 것)
 *   □ 기상특보 : 10.5.(월) 09:00 호우주의보 발효
 *   [특보발표현황] [레이더 영상]
 *   □ 강수 현황과 전망
 *   □ 예비특보
 */

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
  weatherSummary: WeatherSummary | null;
  weatherImages: WeatherImages | null;
}

/** 보고 제목: "10.5. 호우주의보 기상상황 보고" / 특보 없으면 "10.5. 기상상황 보고" */
export function weatherReportTitle(w: WeatherSnapshot | null) {
  const at = w?.announcedAt ?? w?.retrievedAt ?? new Date().toISOString();
  const p = parts(at);
  const names = Array.from(new Set((w?.active ?? []).map((a) => a.name)));
  return `${p.month}.${p.day}. ${names.length ? names.join("·") + " " : ""}기상상황 보고`;
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
    lines.push("□ **강수 현황과 전망**");
    info.forEach((l) => lines.push(`○ ${l}`));
  }
  // T3Q 기상요약(실제 연계 결과)만 반영
  if (s.weatherSummary && s.weatherSummary.source === "t3q") {
    const extra = s.weatherSummary.keyPoints.filter(
      (k) => !k.startsWith("예비특보") && !/^\((현황|전망)\)/.test(k) && !(w?.active ?? []).some((a) => k.startsWith(a.name)),
    );
    if (extra.length) {
      lines.push("□ **기상 요약**");
      extra.forEach((k) => lines.push(`○ ${k}`));
    }
  }
  if (w?.preliminary.length) {
    lines.push("□ **예비특보**");
    w.preliminary.slice(0, 4).forEach((p) => lines.push(`○ ${p}`));
  }

  const img = s.weatherImages ?? {};
  const cap = (label: string, t?: string) => `${label}(${captionStamp(t ?? at ?? new Date().toISOString())})`;
  return {
    id,
    title: "기상특보",
    body: lines.join("\n"),
    images: [
      { src: img.alert?.src ?? "", caption: cap("특보발표현황", img.alert?.at), width: img.alert?.width ?? 0, height: img.alert?.height ?? 0 },
      { src: img.radar?.src ?? "", caption: cap("레이더 영상", img.radar?.at), width: img.radar?.width ?? 0, height: img.radar?.height ?? 0 },
    ],
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
