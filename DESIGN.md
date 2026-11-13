# Creative Arts Knowledge — Design direction

## Direction

Assigned read-mode direction translated into a field-notes editorial index:
the home is a working notebook, subjects are an index, and posts are the
reading room.

## Visual system

- Warm paper, black ink, graphite rules, and one signal red used like a print
  correction mark.
- Playfair Display carries article titles; Space Mono carries dates, indexes,
  and navigation labels.
- Editorial spreads, ledger rows, image plates, and quiet negative space replace
  gradient heroes and generic content cards.

## Interaction contract

The category index, featured note, latest notes, reading-room cards, and post
metadata remain linked to the existing MDX content. Images keep meaningful
alt handling without inventing captions or claims.

## Responsive behavior

The split editorial hero becomes a single reading column; subject rows become a
two-column index and post metadata collapses without hiding the title or action.


---

## Storybook

Storybook 10 (`@storybook/nextjs-vite`) shows this design system with the app's real CSS, tokens and fonts.

```bash
npm run storybook        # http://localhost:6006
npm run build-storybook  # static build in storybook-static/ (CI: .github/workflows/storybook.yml)
```

- **Foundations/Tokens** reads every CSS custom property the app defines at runtime, so it never drifts from the code.
- **Design/DESIGN.md** renders this file.
- **Components/**, **Sections/** and **Pages/** show the UI with mock data only (no network, analytics off).
- Toolbar: locale, theme (light / dark, when the app has a dark theme), viewports 320 / 375 / 768 / 1440. The a11y panel runs axe (WCAG 2.2 AA).
- Rule: a new shared component or page section ships with a story in `stories/`.
