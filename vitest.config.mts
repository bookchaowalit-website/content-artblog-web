import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Vitest runs the mounted (happy-dom) tests for the Reader shell and the pages; the older node:test files
// (tests/*.test.mjs) still run first in `npm test`. The coverage gate covers what Vitest renders.
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./", import.meta.url)) } },
  test: {
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}"],
    coverage: { provider: "v8", include: ["app/**/page.tsx", "app/not-found.tsx", "app/sitemap.ts", "app/robots.ts", "components/**/*.tsx", "lib/render-mdx.tsx"], thresholds: { lines: 90 } },
  },
});
