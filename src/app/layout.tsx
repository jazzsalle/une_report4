import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "재난상황일지 생성도구",
  description: "재난 대응·복구 상황일지 작성",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full">
      <head>
        {/* Pretendard GOV (OFL) — 외부 CDN 없이 자체 제공, 필요한 글자 묶음만 내려받음 */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/fonts/pretendard-gov/pretendardvariable-gov-dynamic-subset.css" />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
