import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@electric-sql/pglite"],
  // 한글 편집기(rhwp-studio, MIT) 자체 호스팅 — public/rhwp-studio
  async rewrites() {
    return [
      { source: "/rhwp-studio", destination: "/rhwp-studio/index.html" },
      { source: "/rhwp-studio/", destination: "/rhwp-studio/index.html" },
    ];
  },
};

export default nextConfig;
