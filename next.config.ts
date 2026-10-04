import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@electric-sql/pglite"],
  // 서버 액션 요청 크기 (기본 1MB) — 그림이 든 한글 저장본·기상특보 그림. Vercel 요청 한도 4.5MB 안쪽
  experimental: {
    serverActions: { bodySizeLimit: "4mb" },
  },
  // 한글 편집기(rhwp-studio, MIT) 자체 호스팅 — public/rhwp-studio
  async rewrites() {
    return [
      { source: "/rhwp-studio", destination: "/rhwp-studio/index.html" },
      { source: "/rhwp-studio/", destination: "/rhwp-studio/index.html" },
      // API 문서 (Swagger UI) — public/api-docs
      { source: "/api-docs", destination: "/api-docs/index.html" },
    ];
  },
};

export default nextConfig;
