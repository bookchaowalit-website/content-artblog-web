---
title: "SPEC-001 — Content tests, Sentry error reporting and the 375px subject index"
status: implemented
tags: [spec, sdd, tdd, ci, sentry, ui]
created: 2026-10-23
updated: 2026-10-23
description: "Validate every post's frontmatter, report errors to Sentry without personal data, require tests in the shared CI, and fix the subject index that broke words letter by letter at 375px."
---

# SPEC-001 — Content tests, Sentry error reporting and the 375px subject index

Standard: ADR-0004 (TDD + SDD). Plan: Big Loop, Tier B showcase wave (b-tier-b), roadmap tasks art-t2, art-t3, art-t4.

## Document control

| Field | Value |
|---|---|
| Spec ID / version | SPEC-001 / 1.0 |
| Status | implemented |
| Repository | bookchaowalit-website/content-artblog-web |
| Maker | Claude Code (b-tier-b session) |
| Approver | Owner (bookchaowalit) |

## 1. Problem and outcome

- **Problem:** no tests at all (the shared CI ran with `require-tests: false`); a post with missing or broken frontmatter
  would render "undefined" silently; no error reporting; at 375px the "Find a subject" grid squeezed each subject name
  between its number and note, so names wrapped one letter per line; the README claimed search and a `vercel.json`.
- **Outcome:** a broken post fails the build and the tests; errors reach Sentry without personal data; CI requires
  tests; the subject index reads cleanly at 375/768/1440; the README states what exists.

## 2. Acceptance criteria and tests

| AC | Given / When / Then | Test |
|---|---|---|
| AC-01 | A post missing title, summary, author, read time or cover image, with a non-calendar date (e.g. `2025-02-30`) or empty tags, is reported by name, and `getPostBySlug` throws | `tests/frontmatter.test.mjs` |
| AC-02 | All posts in `content/posts/` pass that check | `tests/frontmatter.test.mjs` (last case) |
| AC-03 | Slugs are unique, every listed post is readable by slug, the list is newest first, unknown or `../` slugs are rejected | `tests/posts.test.mjs` |
| AC-04 | Sentry is off without `NEXT_PUBLIC_SENTRY_DSN`; errors only (no tracing, trace headers, breadcrumbs); request, user, extra, frame locals, non-platform contexts (`nextjs.request_path`) and URL query strings in transaction, tags, exception messages, frame paths and debug images are removed | `tests/sentry.test.mjs` |
| AC-05 | The subject index shows whole words at 375, 768 and 1440 with no horizontal overflow | UI review (section 4) |
| AC-06 | CI runs lint, typecheck, `npm test` (required) and build, plus the shared security scan | `.github/workflows/ci.yml` |

## 3. Red-first evidence

| Commit | Red run | Green |
|---|---|---|
| 3e45bec | `tests/frontmatter.test.mjs` failed: `lib/mdx.ts` did not export `validatePostFrontmatter`. `tests/posts.test.mjs` passed from the start: it pins the loader's existing behaviour (characterisation), it is not a red-first test | 6/6 pass |
| c1e10e3 | `tests/sentry.test.mjs` failed: `lib/sentry.ts` did not exist | 4/4 pass |
| a262d4b | new case "drops the request path … and strips query strings" failed on the first scrubber (4 pass, 1 fail) | 5/5 pass |
| f369c57 | new case "strips query strings from URLs in the exception message, frames and debug images" failed (5 pass, 1 fail) | 6/6 pass |

CI: run 39907265442 (f369c57) succeeded — https://github.com/bookchaowalit-website/content-artblog-web/actions/runs/39907265442

## 4. UI review (375 / 768 / 1440)

Local production build (`next build && next start`), full-page screenshots of `/`, `/posts/2025-12-10-photography/`
and `/arts/illustration/` at 375, 768 and 1440 (`~/work/b-tier-b/shots/content-artblog-web-l3/`). Looked at every image:

- Home 375: subject names now sit on one line with the note under them (before: "Illustration" wrapped as
  "Ill/ust/rat/ion", "Graphic design" one letter per line). No horizontal overflow at any width.
- Home 1440: the arrow of each subject used to wrap under the number; it now stays on the row (4-column grid).
- Post page: renders as before. Subject page: renders, but its body shows raw Markdown (`#`, `**`); pre-existing, out of
  scope (section 5).
- Console: two 404s for `/_vercel/insights/script.js` and `/_vercel/speed-insights/script.js`, which only exist on
  Vercel; expected locally.

Sign-off: Claude Code (b-tier-b session), 2026-10-23.

## 5. Out of scope (follow-ups)

- Subject pages (`app/arts/[category]/page.tsx`) render inline Markdown strings as text; move them to MDX.
- `/api/mcp` tools are stubs that return empty results.
- Placeholder author "ชื่อผู้เขียน" and cover-image paths that do not exist (broken OpenGraph images).
- Accessibility pass with axe (art-t5) and the archived-vs-live portfolio status (art-t1).

## 6. Deploy state

The live site runs the Next.js patch build deployed by CLI on 2026-10-23 (D9a). This spec's changes are on `main` but
not live: the Vercel project `bookchaowalit-artblog-frontend` is linked to the old repository name, so pushes do not
deploy (owner action D9: reconnect Vercel Git). No deploy workflow is added on purpose.
