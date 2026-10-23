# Creative Arts Knowledge — Product brief

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Repository evidence suggests people learning about art, design, photography,
and creative practice, including beginners and working creatives.

## Product Purpose

Make creative-arts knowledge easier to browse from a category overview into
long-form posts. Success means a reader can find a subject, understand its
context, and continue into a focused article.

## Positioning

The product combines a broad art-category index with authored, date-stamped
MDX guides covering practical creative techniques.

## Operating Context

Readers browse categories such as illustration, graphic design, photography,
painting, digital art, typography, and animation, then read posts with cover
images, summaries, tags, and article metadata.

## Capabilities and Constraints

- Category pages and a blog index are part of the current app.
- Five MDX posts are present under `content/posts/`.
- Post detail routes and the existing MDX data layer must remain usable.
- No invented experts, testimonials, or industry claims should be added.

## Brand Commitments

The existing product name is Creative Arts Knowledge; the portfolio context is
Bookchaowalit. The content can remain bilingual where the repository already
uses Thai and English.

## Evidence on Hand

- `content/posts/` contains five authored MDX posts.
- `app/page.tsx` and `app/categories/page.tsx` define the category taxonomy.
- `lib/mdx.ts` and the post routes provide the reading data path.

## Product Principles

- Lead readers from orientation to a useful next read.
- Prefer concrete technique and context over vague inspiration.
- Keep content discoverable without hiding the article itself.

## Accessibility & Inclusion

Use semantic headings, meaningful image alternatives, keyboard-accessible
navigation, readable line lengths, and language metadata that matches content.

## Current state (2026-10-23)

What it is: a small, public, read-only art and design notebook. Five Thai/English MDX posts in `content/posts/`
(illustration, colour palettes, composition, graphic design, photography) with tags and read time, a post index
(`/posts/`), post pages (`/posts/<slug>/`), and eight subject pages (`/arts/<category>/`). For people learning the
basics of a creative field. No accounts, no comments, no search.

What works today:

- Home, reading room, post pages and subject pages render statically.
- Every post's frontmatter is checked (title, summary, author, read time, cover image, real `YYYY-MM-DD` date,
  non-empty tags); a broken post fails the build (`lib/mdx.ts`, `tests/frontmatter.test.mjs`).
- Errors are reported to Sentry (project `content-artblog-web`) when `NEXT_PUBLIC_SENTRY_DSN` is set, errors only and
  with request, user, query strings and request paths stripped (`lib/sentry.ts`).
- CI on every push: lint, typecheck, tests, build and the shared security scan.

What does not work or is not true yet:

- There is no search UI (the earlier README claimed one).
- `/api/mcp` is a stub: its tools answer with empty results and a "implement … here" message.
- Subject pages render their body as raw Markdown text (`#`, `**` visible) from inline strings in
  `app/arts/[category]/page.tsx`, not through the MDX pipeline.
- Post author is the placeholder "ชื่อผู้เขียน" and cover image paths point to files that do not exist (the page
  draws its own artwork instead).
- No product analytics: Vercel Web Analytics and Speed Insights components are mounted, but no custom events exist and
  no KPI baseline has been captured (see `docs/measurement/KPI-PLAN.md`).

Live and deploy state: https://artblog.bookchaowalit.com (Vercel project `bookchaowalit-artblog-frontend`). The Next.js
security patch build was deployed by CLI on 2026-10-23 (D9a). The Vercel project is still linked to the old repository
name, so pushes to `main` do not deploy; later changes (tests, Sentry, the 375px subject-index fix) reach the live site
only after the owner reconnects Vercel Git (D9) or approves another CLI deploy.
