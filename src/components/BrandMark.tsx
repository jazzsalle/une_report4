import { useId } from "react";

/** 앱 심볼 — 문서 위 경보 표시 */
export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect x="3" y="3" width="22" height="26" rx="4" fill="#256ef4" />
      <rect x="8" y="10" width="12" height="2.4" rx="1.2" fill="#fff" />
      <rect x="8" y="15" width="12" height="2.4" rx="1.2" fill="#fff" opacity=".8" />
      <rect x="8" y="20" width="8" height="2.4" rx="1.2" fill="#fff" opacity=".6" />
      <circle cx="25" cy="8" r="6" fill="#ff7a1a" stroke="#fff" strokeWidth="2" />
      <rect x="24" y="4.6" width="2" height="4.4" rx="1" fill="#fff" />
      <circle cx="25" cy="11" r="1.1" fill="#fff" />
    </svg>
  );
}

/** 앱 아이콘 — 겹친 사각형 3개 (Figma 「Icon/logo」) */
export function AppIcon({ size = 24 }: { size?: number }) {
  const id = useId();
  const sq = [
    { x: 3, op: 0.8, from: "#409cff", to: "#b8ddff" },
    { x: 6.27, op: 0.8, from: "#ff0dbc", to: "#ffabeb" },
    { x: 9.55, op: 1, from: "#ff0dbc", to: "#6300ff" },
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        {sq.map((s, i) => (
          <linearGradient key={i} id={`${id}-${i}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={s.from} />
            <stop offset="1" stopColor={s.to} />
          </linearGradient>
        ))}
      </defs>
      {sq.map((s, i) => (
        <rect key={i} x={s.x} y={s.x} width="11.45" height="11.45" rx="3" fill={`url(#${id}-${i})`} opacity={s.op} />
      ))}
    </svg>
  );
}
