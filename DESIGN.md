# Design

Since 2026-11-19 Creative Arts Knowledge uses the shared Reader shell (see `READER.md`): the `--rs-*`
tokens in `app/reader-shell.css` (light and dark, WCAG 2.2 AA), 44px targets, one h1 per page and a
forced-colors fallback. The earlier field-notebook look (Playfair Display + Space Mono with no Thai
glyphs, 10–11px uppercase labels, 16px nav targets, a full-screen hero artwork on phones) is retired.

- **Language:** the content is Thai, so the site is Thai-first: `<html lang="th">`, Thai headings and
  labels, and the shell's Thai line height. Geist sets Latin text and IBM Plex Sans Thai (both via
  `next/font`) sets Thai; `app/globals.css` puts the Thai face right after Geist in `--rs-font`.
- `/` — eyebrow, h1 and lede, then the three newest posts and the eight subjects as cards; empty states
  for both, and no fixed counts.
- `/posts/` — every post, newest first, with tag chips (`?tag=`) and a result count.
- `/posts/<slug>/` and `/arts/<id>/` — article header, the MDX body in `Prose` (a leading `# Title` is
  dropped, later h1s become h2s, tables scroll in `TableScroll`), previous / next.
- `/categories/` and `/about/` — the subject cards, and an about page with real contact routes only.
