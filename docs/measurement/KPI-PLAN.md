---
title: "Creative Arts Knowledge (artblog) — KPI and Instrumentation Plan"
status: draft
created: 2026-10-23
updated: 2026-10-23
description: "How artblog's reading outcomes would be measured, which events are planned, and what is live today (Sentry errors only)."
template: architecture-docs templates/sdlc/kpi-and-instrumentation-plan.md
---

# Creative Arts Knowledge (artblog) — KPI and Instrumentation Plan

## Document control

| Field | Value |
|---|---|
| Product | bookchaowalit-website/content-artblog-web (https://artblog.bookchaowalit.com) |
| Version / status | 0.1 / **draft** — definitions only; no product analytics is live, no baseline captured |
| Metric owner | Owner (bookchaowalit) |
| AI maker | Claude Code (b-tier-b session, 2026-10-23) |
| AI reviewer | not yet reviewed |
| Analytics source of truth | planned: PostHog free tier (owner decision D4: chosen, but no account or project key yet). Live today: Sentry errors only (project `content-artblog-web`). Vercel Web Analytics/Speed Insights components are mounted in `app/layout.tsx`, but no custom events exist and whether Web Analytics is enabled on the Vercel project is not verified |
| Dashboard | none yet |
| Next review | 2026-11-15 (Big Loop milestone M1) |

## KPI tree

```text
OBJ-01 Readers who arrive at artblog go on to read a full note
  └─ KPI-O-01 Read-through rate: post_read_complete / post_viewed
       ├─ KPI-L-01 Home-to-post click-through: post_viewed (referrer home or /posts/) / home_viewed
       ├─ KPI-L-02 Subject-to-post click-through: post_viewed (referrer /arts/*) / subject_viewed
       └─ KPI-G-01 Client error rate: Sentry error events / page views (must not rise)
```

## KPI definitions

| KPI ID | Type | Name | Objective | Formula | Unit | Min volume for a rate | Segment | Data source and event(s) | Baseline | Target | Alert | Cadence | Owner |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| KPI-O-01 | outcome | Read-through rate | OBJ-01 | `post_read_complete` / `post_viewed` | % | ≥ 100 post views per period | all posts | PostHog (planned) | not yet measured | set after 4 weeks of baseline | — | monthly | Owner |
| KPI-L-01 | leading | Home-to-post click-through | OBJ-01 | `post_viewed` with `from=home|index` / `home_viewed` | % | ≥ 100 home views | web | PostHog (planned) | not yet measured | set after baseline | — | monthly | Owner |
| KPI-L-02 | leading | Subject-to-post click-through | OBJ-01 | `post_viewed` with `from=subject` / `subject_viewed` | % | ≥ 100 subject views | web | PostHog (planned) | not yet measured | set after baseline | — | monthly | Owner |
| KPI-G-01 | guardrail | Client error rate | OBJ-01 | Sentry error events / page views | % | ≥ 100 page views | web | Sentry (live) + page views (planned) | not yet measured | must not rise after a release | any new issue | weekly | Owner |

Rates below the minimum volume are reported as "not measurable". This is a five-post personal site; traffic is expected
to be low, so the counts may stay below the minimum for a long time.

## Event and data specification

| Event / field | Trigger | Properties | Personal data? | Emitted by | Requirement | Status |
|---|---|---|---|---|---|---|
| `home_viewed` | Home page rendered in the browser | none | no | frontend | KPI-L-01 | planned |
| `subject_viewed` | `/arts/<category>/` rendered | `category` | no | frontend | KPI-L-02 | planned |
| `post_viewed` | `/posts/<slug>/` rendered | `slug`, `from` (home, index, subject, external) | no | frontend | KPI-O-01 | planned |
| `post_read_complete` | Reader reaches the end of the article body | `slug` | no | frontend | KPI-O-01 | planned |
| Sentry error event | Uncaught error in browser, Node or Edge runtime | error type, message and stack with URL queries stripped; platform contexts only | no (request, user, breadcrumbs, extra, query strings, request path removed in `lib/sentry.ts`) | frontend/server | KPI-G-01 | implemented |

Privacy and data rules:

- No names, emails or free text in events. PostHog would use its anonymous ID, which under PDPA is still personal data:
  a privacy note and the consent decision are required before PostHog is turned on.
- Consent: not decided; no analytics event is sent today.
- Retention: Sentry default for the free plan; PostHog to be set when the project exists.
- Vendor / region: Sentry org `personal-yu0`; PostHog region to be chosen at setup (D4).

## Dashboards and alerts

| Dashboard / alert | KPIs | Location | Status |
|---|---|---|---|
| Sentry issues for `content-artblog-web` | KPI-G-01 (counts only) | Sentry | live (alerts at Sentry defaults) |
| Reading funnel | KPI-O-01, KPI-L-01, KPI-L-02 | PostHog | planned (D4) |

## Instrumentation verification (before G10)

| # | Check | Result |
|---|---|---|
| 1 | Every planned event fires once per action | not run: events not implemented |
| 2 | Counts reconcile with a system of record | not applicable yet |
| 3 | No PII in payloads | Sentry: covered by `tests/sentry.test.mjs`; PostHog: not run |
| 4 | Dashboard renders each KPI | not run |
| 5 | Alerts reach the channel | not run |
| 6 | Baselines captured | waived — dated action: capture 4 weeks of baseline after PostHog is set up (D4), target 2026-12-31 |
| 7 | Consent respected | not run: no consent decision yet |

## Change history of definitions

| Date | KPI ID | Change | Reason | Baseline restated? | Approved by |
|---|---|---|---|---|---|
| 2026-10-23 | all | First draft | Big Loop L3 | no | pending owner |
