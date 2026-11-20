import type { NextConfig } from "next";
import { tagRewrites } from "./lib/tag-routes";

// /api/mcp is called cross-origin from bookchaowalit-devhub-frontend's Playground. Without the CORS headers the
// browser blocks reading the response even though the route itself works (see devhub's PRODUCT.md).
const cors = [
  { key: "Access-Control-Allow-Origin", value: "*" },
  { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
  { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
];

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  trailingSlash: true,
  images: { unoptimized: true },
  async redirects() {
    // The old per-app portfolio list now lives on the main site (permanent: Next answers 308).
    return [{ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true }];
  },
  async rewrites() {
    // ?tag= links are served from pre-rendered pages (lib/tag-routes.ts), so no page reads searchParams.
    return { beforeFiles: await tagRewrites(), afterFiles: [], fallback: [] };
  },
  async headers() {
    // trailingSlash: true means requests normalize to /api/mcp/; match both so the header applies regardless.
    return [
      { source: "/api/mcp", headers: cors },
      { source: "/api/mcp/", headers: cors },
    ];
  },
};

export default nextConfig;
