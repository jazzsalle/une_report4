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
