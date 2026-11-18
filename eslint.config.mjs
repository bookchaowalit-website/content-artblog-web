import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**",
    // Legacy Azure Static Web Apps custom handler (CommonJS), not part of the Next app.
    "next_function.js",
    "coverage/**",
    // Legacy Azure Static Web Apps custom handler (CommonJS), not part of the Next app.
    "next_function.js",
  ]),
]);

export default eslintConfig;
