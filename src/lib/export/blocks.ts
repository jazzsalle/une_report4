import type { ReportContent } from "@/lib/types";

export interface Inline {
  text: string;
  bold?: boolean;
}

export type Block =
  | { type: "chapter"; text: string }
  | { type: "item"; level: 1 | 2 | 3 | 4; prefix: string; inlines: Inline[] }
  | { type: "caption"; text: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "blank" };

const PREFIX: [string, 1 | 2 | 3 | 4][] = [
  ["□", 1],
  ["○", 2],
  ["-", 3],
  ["·", 4],
];

export function parseInline(s: string): Inline[] {
  const out: Inline[] = [];
  const re = /\*\*(.+?)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push({ text: s.slice(last, m.index) });
    out.push({ text: m[1], bold: true });
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push({ text: s.slice(last) });
  return out;
}

/** 본문 텍스트 한 줄 → 수준. 기호가 없으면 □ 수준으로 본다. */
export function parseLine(line: string): Block | null {
  const t = line.trim();
  if (!t) return null;
  if (/^<.+>$/.test(t)) return { type: "caption", text: t };
  for (const [sym, level] of PREFIX) {
    if (t.startsWith(sym + " ") || (t.startsWith(sym) && t.length > 1 && sym !== "-")) {
      return { type: "item", level, prefix: sym, inlines: parseInline(t.slice(sym.length).trim()) };
    }
  }
  return { type: "item", level: 1, prefix: "□", inlines: parseInline(t) };
}

export function contentToBlocks(c: ReportContent): Block[] {
  const out: Block[] = [];
  c.sections.forEach((s, i) => {
    if (i > 0) out.push({ type: "blank" });
    out.push({ type: "chapter", text: `${i + 1}. ${s.title}` });
    for (const line of s.body.split(/\r?\n/)) {
      const b = parseLine(line);
      if (b) out.push(b);
    }
    if (s.table && s.table.rows.length) {
      out.push({ type: "table", head: s.table.head, rows: s.table.rows });
    }
  });
  return out;
}

/** 행정문서 부제: "상황 보고 / 2026. 10. 4.(일) 18:00 / 자연재난과 홍길동" */
export function subtitleOf(c: ReportContent) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date(c.reportedAt))
      .map((x) => [x.type, x.value]),
  );
  const ds = `${p.year}. ${p.month}. ${p.day}.(${p.weekday}) ${p.hour}:${p.minute}`;
  return ["상황 보고", ds, [c.dept, c.reporter].filter(Boolean).join(" ")].filter(Boolean).join(" / ");
}

export function safeFilename(s: string) {
  return s.replace(/[\\/:*?"<>|]/g, "_").slice(0, 80);
}
