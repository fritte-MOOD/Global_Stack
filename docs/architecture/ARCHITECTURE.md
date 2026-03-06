# MOOD — Technical Architecture

This document describes **how the system is built**, organized by technical layer.

**Related docs:**
- Global Stack vision & narrative → `docs/architecture/VISION.md`
- Alpha product scope & UX decisions → `docs/product/ALPHA.md`
- Research / thesis background → `docs/research/THESIS_SUMMARY.md`

---

## 1. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **State** | React Context (client-side) |
| **Icons** | Lucide React |
| **Data** | Static TypeScript files (mock/seed) |
| **Backend** | *none yet* (planned: Prisma + Neon DB, Hono, Upstash Redis) |
| **Deploy** | Vercel (primary) / wrangler.toml exists but target unclear |

---

## 2. Frontend

### 2.1 Route groups

The app uses Next.js **route groups** (parenthesized folders) for layout separation:

```
src/app/
├── layout.tsx              ← root layout (fonts, ContextProvider)
├── globals.css
├── (landing)/              ← public/entry pages (no sidebar)
│   ├── layout.tsx
│   ├── page.tsx            ← landing / name entry
│   ├── dashboard/page.tsx  ← group selection (3 demo groups)
│   └── discover/page.tsx
└── (sidebar)/              ← main app with sidebar navigation
    ├── layout.tsx          ← sidebar + navbar
    ├── about/page.tsx      ← group info, rules, members
    ├── calendar/page.tsx
    ├── debate/page.tsx     ← process list + module timeline
    ├── discussions/page.tsx
    ├── messages/page.tsx
    ├── profile/[id]/page.tsx
    ├── subgroups/page.tsx
    └── tasks/page.tsx
```

**User flow:** Landing → Name entry → Dashboard (group select) → Sidebar app

### 2.2 Components

#### Module renderers (`src/components/ModuleContent/`)
Each deliberation module type has its own UI component:

| File | Module type | Notes |
|------|-------------|-------|
| `moduleContent.tsx` | Router | Switches on `module.type`, renders correct section |
| `IdeationSection.tsx` | Ideation | Idea submission + display |
| `DebateSection.tsx` | Debate | Threaded discussion |
| `EstimateSection.tsx` | Estimate | Consequence estimation |
| `PrioritizeSection.tsx` | Prioritize | Option ranking |
| `VoteSection.tsx` | Vote | Option selection + local results (no persistence) |
| `ExternalDecisionSection.tsx` | ExternalDecision | Admin/board decision + statement |
| `AnnouncementSection.tsx` | Announcement | Read-only info from group leaders |

#### UI components (`src/components/ui/`)

| File | Purpose |
|------|---------|
| `navbar_sidebar.tsx` | Main navigation (sidebar layout) |
| `navbar_landing.tsx` | Landing page navigation |
| `GroupCheckboxes.tsx` | Group filter toggles |
| `ButtonLandingPage.tsx` | Styled CTA buttons |
| `SubmitButton.tsx` | Form submit button |
| `darkModeToggle.tsx` | Dark mode switch |
| `heading.tsx` | Reusable heading |
| `max-width-wrapper.tsx` | Layout constraint wrapper |

#### Modal system (`src/components/Modal/`)
- `modal.tsx` — main modal component
- `dialog.tsx` — dialog wrapper
- `button.tsx` — modal trigger button
- `use-media-query.ts` — responsive hook

#### Helpers (`src/components/functions/`)
- `CalculateDateTime.tsx` — relative time computation
- `FormattedDate.tsx` — date formatting
- `utils.ts` — general utilities

### 2.3 State management (`src/context/`)

All state is client-side via React Context, provided by `ContextProvider.tsx`:

| Context file | What it holds |
|-------------|---------------|
| `NameContext.tsx` | User's entered name |
| `GroupContext.tsx` | Currently selected group |
| `CheckboxesContext.tsx` | Group filter checkbox state |
| `MockupContext.tsx` | Access to mock data |
| `DarkModeContext.tsx` | Theme preference |
| `ChatContext.tsx` | Chat/message state |
| `DebateContext.tsx` | Current debate/process state |

**Important:** Currently there is no server state. All "data" lives in static TypeScript files and React context. Persistence is a future layer.

---

## 3. Data Layer

### 3.1 Domain model (`src/data/interfaces.ts`)

Core types:

```
Group
 ├── Subgroup[]
 ├── Process[]
 │    └── Module[]   (ordered sequence)
 ├── Member[]
 ├── Chat[]
 ├── Task[]
 └── Appointment[]
```

**Module** is a union type of 8 variants:

| Type | Key fields |
|------|-----------|
| `Ideation` | options[], comments[] |
| `Brainstorming` | options[], comments[] |
| `Estimate` | options[], comments[] |
| `Prioritize` | options[] with rank |
| `Vote` | options[] with supportedBy[], rank |
| `Debate` | comments[] (threaded) |
| `ExternalDecision` | content, comments[] |
| `Announcement` | content (read-only) |

**Invariants:**
- A `Process` belongs to exactly one scope: `groupId` or `subgroupId`.
- Module order within a process is stable.

### 3.2 Seed / mock data

```
src/data/
├── interfaces.ts       ← type definitions
├── mockup.ts           ← entry point: builds mockData proxy
├── groupStructure.ts   ← group/subgroup scaffolding + ID ranges
└── Groups/             ← 26 files with curated scenario data
    ├── parkclub.ts
    ├── marinquarter.ts
    └── ... (per group/subgroup)
```

**How it works:**
1. `groupStructure.ts` defines group skeletons (names, members, ID ranges).
2. `Groups/*.ts` files fill in processes, modules, comments, options etc.
3. `mockup.ts` calls `getGroupStructure()` and exposes it via `MockupContext`.

**For alpha:** Seed data = these static files. Instance data (user edits) = future layer on top (see `docs/product/ALPHA.md`).

---

## 4. Backend (planned, not yet implemented)

`package.json` includes dependencies for a future backend:
- **Prisma** + **Neon Database** (PostgreSQL) — structured persistence
- **Upstash Redis** — caching / sessions
- **Hono** — lightweight API framework

**Current gap:** `wrangler.toml` references `src/server/index.ts` which does not exist. This needs to be resolved (see open questions).

**Recommended alpha path:**
- Keep Next.js as the primary runtime (Vercel deploy).
- Add API routes (`src/app/api/...`) only when persistence is needed.
- Use Prisma + Neon for saved workspaces; keep seed data as static files.

---

## 5. Deployment

### 5.1 Current state
- **Primary:** Vercel (Next.js default) — works out of the box.
- **Stale config:** `wrangler.toml` → Cloudflare Workers setup, but entry point missing.

### 5.2 Recommended alpha setup
- Deploy via **Vercel** (zero-config for Next.js).
- If Cloudflare is desired later: create `src/server/index.ts` or remove `wrangler.toml`.

---

## 6. Open technical questions

| # | Question | Impact |
|---|----------|--------|
| 1 | Remove or fix `wrangler.toml`? (Missing `src/server/index.ts`) | Deploy clarity |
| 2 | When to introduce API routes for persistence? | Alpha scope |
| 3 | Session drafts: `localStorage` or in-memory only? | UX on reload |
| 4 | Auth approach for "simple login"? (NextAuth, custom, Clerk?) | Save flow |
| 5 | Database schema: start with Prisma + Neon or defer? | Backend timeline |
