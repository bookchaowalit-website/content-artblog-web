# Creative Arts Blog

A Next.js blog exploring knowledge of various art styles, design techniques, and creative fields, built with MDX and hosted on Vercel.

## Features

- **Next.js App Router** with TypeScript
- **MDX** for writing posts with rich content
- **Tailwind CSS** for styling
- **Responsive images** and SEO optimization
- **Tags** on each post (no search UI)
- **Vercel deployment** ready

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/app
  /posts/[slug]/page.tsx    # Individual post pages
  /page.tsx                 # Home page
/content
  /posts                    # MDX blog posts
/public
  /images                   # Static images
/lib
  mdx.ts                    # MDX utilities
/components
  PostLayout.tsx            # Post layout component
  Meta.tsx                  # SEO meta component
```

## Writing Posts

Create new `.mdx` files in `/content/posts` with frontmatter:

```yaml
---
title: "Post Title"
date: "2025-12-06"
tags: ["tag1", "tag2"]
coverImage: "/images/covers/cover.jpg"
author: "Author Name"
readTime: "5 min"
summary: "Post summary"
---
```

## Deployment

Live at https://artblog.bookchaowalit.com (Vercel project `bookchaowalit-artblog-frontend`, deployed by the Vercel CLI; there is no `vercel.json`). `swa-cli.config.json` and `next_function.js` are Azure Static Web Apps config that the Vercel deployment does not use. Pushes to `main` run CI only and do not deploy.

## Checks

`npm run lint`, `npx tsc --noEmit`, `npm test` (frontmatter validation, post loader, Sentry scrubbing) and `npm run build`; CI runs the same on every push.

## Technologies

- Next.js 15, React 19
- MDX
- Tailwind CSS
- TypeScript
- Vercel

## Notes from a recent audit pass

**Headline finding**: the `/posts/[slug]` route this README already describes
never actually existed. The site had two entirely separate content systems —
5 real, well-written MDX posts under `content/posts/` with a fully working
data layer (`lib/mdx.ts`'s `getAllPosts`/`getPostBySlug`), a purpose-built
`PostLayout` component, and an `mdx-components.tsx` stub, versus what the
homepage actually linked to: a handful of hardcoded Thai-language "category"
pages (`/arts/[category]`) with content stored as inline template-literal
strings, rendered via `dangerouslySetInnerHTML` and a crude `\n` → `<br>`
replace — not even using the `compileMDX` import that file already had.
The 5 real posts were completely unreachable and unlinked from anywhere in
the app. Built the missing `/posts` (index) and `/posts/[slug]` routes using
the data layer and layout that were already there, added `Meta` as a
resolvable component so the `<Meta ... />` JSX already inline in each post's
MDX source compiles, and added a "Blog" link to the header nav so it's
actually discoverable. Verified live: all 5 posts render with real title,
real MDX body content, and correct per-post metadata; a non-existent slug
still 404s.

Also found while wiring this up:
- Building the new MDX route surfaced a real error on `next build`: `next-mdx-remote`'s `compileMDX` (React Server Component rendering) failed with `A React Element from an older version of React was rendered` under React 18 + Next 15.5. Bumped `react`/`react-dom` `^18` → `^19` (the same pairing already working for `compileMDX` in sibling repos this session) — resolved it, verified with all 21 pages building and prerendering cleanly.
- `eslint-config-next` was pinned to `13.0.6` against `next@15.5.9`/`^15.5.22`, and no ESLint config existed at all — `next lint` dropped into its first-run setup wizard. Adding a config surfaced two of `eslint-config-next`'s own rules (`no-html-link-for-pages`, `no-img-element`) crashing outright under the old, exact-pinned `eslint@8.29.0` — a real incompatibility, not a config mistake. Bumped `eslint` to the latest 8.x and `eslint-config-next`/`typescript`/`@types/*` to match `next`'s actual version; both rules then ran correctly and caught one genuine `<a>`-vs-`<Link>` error, fixed.
- `remark-gfm@^3`/`rehype-highlight@^6` were behind the modern `@mdx-js`/`unified` ecosystem versions the rest of the toolchain expects, contributing to dependency-tree skew. Bumped to `^4.0.1`/`^7.0.2`.
- Missing `metadataBase` (relative OG/Twitter images were resolving against `localhost` in production) — fixed.
- The same dead `categories` object pattern in `more-projects/page.tsx` found across several sibling repos this session.
- Cleared 8 of 11 `npm audit` findings via the dependency bumps above; the remaining 3 need Next 16, not attempted here.

## Related

- **Mobile App:** [bookchaowalit-artblog-mobile](https://github.com/bookchaowalit-mobile/bookchaowalit-artblog-mobile)
- **Portfolio:** [bookchaowalit.com](https://bookchaowalit.com)

