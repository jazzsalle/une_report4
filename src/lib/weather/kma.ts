import "server-only";
import type { WeatherAlertItem, WeatherSnapshot } from "@/lib/types";

const BASE = "https://apis.data.go.kr/1360000/WthrWrnInfoService";

export const STATIONS: Record<string, { name: string; keywords: string[] }> = {
  "159": { name: "부산", keywords: ["부산"] },
  "143": { name: "대구·경북", keywords: ["경상북도", "경북", "대구", "울릉도"] },
  "108": { name: "전국", keywords: [] },
};

type Item = Record<string, string | number | undefined>;

async function call(op: string, params: Record<string, string>): Promise<Item[]> {
  const key = process.env.KMA_SERVICE_KEY;
  if (!key) return [];
  // 인증키는 이미 URL 인코딩된 값이므로 그대로 붙인다
  const qs = new URLSearchParams({ pageNo: "1", numOfRows: "10", dataType: "JSON", ...params });
  const url = `${BASE}/${op}?serviceKey=${key}&${qs.toString()}`;
  try {
    const res = await fetch(url, { next: { revalidate: 600 }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const json = await res.json();
    const items = json?.response?.body?.items?.item;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  } catch {
    return [];
  }
}

/** "202610041830" → ISO(KST) */
export function kmaTimeToIso(t: string | number | undefined): string | null {
  if (!t) return null;
  const s = String(t);
  if (s.length < 12) return null;
  return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}T${s.slice(8, 10)}:${s.slice(10, 12)}:00+09:00`;
}

/** 괄호 바깥의 쉼표로 지역 목록 분리 */
function splitAreas(text: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of text) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      out.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/** 특보현황 t6 원문에서 해당 지역 특보만 추출 */
export function parseActive(t6: string, keywords: string[]): WeatherAlertItem[] {
  const result: WeatherAlertItem[] = [];
  for (const raw of t6.split(/\r?\n/)) {
    const m = raw.match(/^\s*o\s*([^:]+?)\s*:\s*(.+)$/);
    if (!m) continue;
    const name = m[1].trim();
    if (name === "없음") continue;
    const areas = splitAreas(m[2]);
    const hit = keywords.length ? areas.filter((a) => keywords.some((k) => a.includes(k))) : areas;
    if (!hit.length) continue;
    result.push({
      name,
      areas: hit.join(", "),
      kind: name.endsWith("경보") ? "warning" : "watch",
    });
  }
  return result;
}

function parsePreliminary(text: string, keywords: string[]): string[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const out: string[] = [];
  let head = "";
  for (const l of lines) {
    if (/^\(\d+\)/.test(l)) {
      head = l.replace(/^\(\d+\)\s*/, "");
      continue;
    }
    const body = l.replace(/^o\s*/, "");
    if (!keywords.length || keywords.some((k) => body.includes(k))) {
      out.push(head ? `${head} · ${body}` : body);
    }
  }
  return out;
}

export async function getWeatherSnapshot(stnId: string): Promise<WeatherSnapshot> {
  const st = STATIONS[stnId] ?? STATIONS["108"];
  const [status, info, pwn] = await Promise.all([
    call("getPwnStatus", {}),
    call("getWthrInfo", { stnId }),
    call("getWthrPwn", { stnId }),
  ]);
  const s = status[0] ?? {};
  const t6 = String(s.t6 ?? "");
  const t7 = String(s.t7 ?? "");
  const latestInfo = [...info].sort((a, b) => Number(b.tmFc) - Number(a.tmFc))[0];
  const latestPwn = [...pwn].sort((a, b) => Number(b.tmFc) - Number(a.tmFc))[0];

  const preliminary = [
    ...parsePreliminary(t7, st.keywords),
    ...(latestPwn?.pwn ? parsePreliminary(String(latestPwn.pwn), []) : []),
  ];

  return {
    stnId,
    stnName: st.name,
    announcedAt: kmaTimeToIso(s.tmFc),
    retrievedAt: new Date().toISOString(),
    active: parseActive(t6, st.keywords),
    preliminary: Array.from(new Set(preliminary)),
    infoText: String(latestInfo?.t1 ?? "")
      .replace(/\\n/g, "\n")
      .replace(/※[^\n]*날씨알리미[^\n]*/g, "")
      .trim(),
    nationwideText: t6.trim(),
  };
}
