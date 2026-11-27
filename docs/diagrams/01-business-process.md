# 01 — Business process (As-Is / To-Be)

content-artblog-web คือเว็บบล็อกศิลปะและการออกแบบแบบอ่านอย่างเดียว (Next.js + MDX, artblog.bookchaowalit.com) สำหรับผู้เริ่มเรียนรู้งานสร้างสรรค์: โพสต์ MDX ในรีโปถูก build เป็นหน้า static และไม่มีบัญชี ฐานข้อมูล หรือ API ที่เขียนข้อมูล

Last reviewed: 2026-11-28 · commit `d3f9711`

## As-Is (จากโค้ดวันนี้)

```mermaid
flowchart LR
  AUTHOR["owner/AI แก้ content/posts/*.mdx"] --> PR["push / PR"]
  PR --> CI["CI: lint, tsc, tests, build, security scan"]
  CI --> VAL{"frontmatter ครบ และ date จริง? (lib/mdx.ts)"}
  VAL -->|no| FAIL["build ล้ม ไม่ deploy"]
  VAL -->|yes| BUILD["build หน้า static: home, posts, arts, categories, about"]
  BUILD --> DEPLOY["Vercel production (CLI หรือ Git) [ต้องยืนยัน]"]
  DEPLOY --> SMOKE["deploy-smoke: GET home, /about/, /api/health เทียบ commit"]
  READER["ผู้อ่าน"] --> SITE["หน้า static + Reader shell"]
  DEPLOY --> SITE
  SITE --> TAG["?tag= ถูก rewrite เป็นหน้า pre-render /posts/topic/slug"]
  SITE --> POST["/posts/slug อ่านโพสต์"]
  SITE --> ARTS["/arts/category เนื้อหาจากสตริงในโค้ด (ไม่ผ่าน MDX)"]
  SITE -->|error| SENTRY["Sentry (ถ้ามี DSN, ตัด query/user/path)"]
  CALLER["devhub Playground (cross-origin)"] --> MCP["POST /api/mcp (edge, CORS *)"]
  MCP --> STUB["tools คืนรายการว่าง + ข้อความ implement here"]
```

Sources: `lib/mdx.ts`, `lib/tag-routes.ts`, `next.config.ts`, `app/api/mcp/route.ts`, `app/api/health/route.ts`, `app/arts/[category]/page.tsx`, `lib/sentry.ts`, `.github/workflows/ci.yml`, `.github/workflows/deploy-smoke.yml`, `scripts/deploy-smoke.sh`, `README.md`, `PRODUCT.md`

หมายเหตุจากโค้ด/เอกสาร:

- `/api/mcp` เป็น stub: `tools/call` ทั้งสามตัวคืนผลว่าง ไม่อ่านโพสต์จริง
- README/PRODUCT (2026-10-23) ระบุว่า push เข้า main ไม่ deploy (Vercel ผูกชื่อรีโปเก่า) แต่ workflow deploy-smoke สมมติว่า Vercel deploy main ผ่าน Git: สถานะจริงตอนนี้ [ต้องยืนยัน]
- ไม่มีการส่ง analytics event; Vercel Analytics/Speed Insights ถูก mount แต่ไม่มี custom event

## To-Be (docs/measurement/KPI-PLAN.md, status approved)

```mermaid
flowchart LR
  SITE["หน้า static + Reader shell"] --> EVT["events: home_viewed, subject_viewed, post_viewed, post_read_complete"]
  EVT --> PH["PostHog (planned, ยังไม่มี account/key)"]
  PH --> KPI["KPI-O-01 read-through, KPI-L-01/02 click-through"]
  SITE -->|error| SENTRY["Sentry (live)"]
  SENTRY --> G["KPI-G-01 client error rate"]
```

Sources: `docs/measurement/KPI-PLAN.md`

## Gap

| ID | As-Is → To-Be | Status | Owner | Evidence |
|---|---|---|---|---|
| G1 | ไม่มี analytics event → ส่ง post_viewed / post_read_complete ฯลฯ ไป PostHog ตามแผน KPI | blocked | owner | `docs/measurement/KPI-PLAN.md` (ยังไม่มี PostHog account/project key, consent ยังไม่ตัดสิน) |
| G2 | `/api/mcp` เป็น stub คืนผลว่าง → ไม่มี To-Be เขียนไว้ว่าจะทำจริงหรือเอาออก | decide | owner | `app/api/mcp/route.ts`; `PRODUCT.md` §What does not work |
| G3 | หน้า `/arts/<category>` แสดง Markdown ดิบจากสตริงในโค้ด → ไม่มี To-Be เขียนไว้ | decide | owner | `app/arts/[category]/page.tsx`; `PRODUCT.md` |
| G4 | สถานะ deploy ไม่ตรงกันระหว่างเอกสาร (CLI เท่านั้น) กับ workflow (Git deploy) → owner ยืนยันและผูก Vercel Git | decide | owner | `README.md` §Deployment; `.github/workflows/deploy-smoke.yml`; `PRODUCT.md` (D9) |

## Open questions

- Vercel project ผูก Git แล้วหรือยัง และ production ตอนนี้รัน commit ไหน (เปิด `/api/health` เพื่อดู)
- ผู้เขียนโพสต์ยังเป็น placeholder และ cover image ชี้ไฟล์ที่ไม่มี (`PRODUCT.md`): ไม่มี To-Be ที่เขียนไว้ว่าจะแก้
