const TZ = "Asia/Seoul";

function parts(d: Date | string) {
  const p = new Intl.DateTimeFormat("ko-KR", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  }).formatToParts(new Date(d));
  return Object.fromEntries(p.map((x) => [x.type, x.value])) as Record<string, string>;
}

/** 10.04. 18:30 */
export function fmtTime(d: Date | string) {
  const p = parts(d);
  return `${Number(p.month)}.${Number(p.day)}. ${p.hour}:${p.minute}`;
}

/** 2026.10.04.(일) 18:30 */
export function fmtDateTime(d: Date | string) {
  const p = parts(d);
  return `${p.year}.${p.month}.${p.day}.(${p.weekday}) ${p.hour}:${p.minute}`;
}

export function fmtDate(d: Date | string) {
  const p = parts(d);
  return `${p.year}.${p.month}.${p.day}.`;
}

export function fmtPeriod(start: Date | string, end: Date | string | null) {
  return `${fmtDateTime(start)} ~ ${end ? fmtDateTime(end) : "상황 종료 시"}`;
}

/** datetime-local 입력값(KST) ↔ ISO */
export function toLocalInput(d: Date | string) {
  const p = parts(d);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

export function fromLocalInput(v: string) {
  return new Date(`${v}:00+09:00`).toISOString();
}

/** 휴지통 남은 보관일 (7일) */
export function daysLeft(deletedAt: Date | string, keepDays = 7) {
  const DAY = 24 * 3600 * 1000;
  return Math.max(0, Math.ceil((new Date(deletedAt).getTime() + keepDays * DAY - Date.now()) / DAY));
}
