# Docs Index

This file is the entry point into the documentation. It exists so we can quickly re-load the relevant context without re-reading the entire repo.

## Where to start
- **Vision / narrative** (Global Stack, Connect, Open OS, MOOD): `docs/architecture/VISION.md`
- **Technical architecture** (Frontend, Data, Backend, Deploy): `docs/architecture/ARCHITECTURE.md`
- **Alpha product scope** (UX, modes, persistence, starter kit): `docs/product/ALPHA.md`
- **Research / thesis framing**: `docs/research/THESIS_SUMMARY.md`

## Folder meanings
### `docs/architecture/`
- **Purpose:** describe the target system structure (Soll-Zustand).
- **Contains:** domain model, system boundaries, deployment model, key invariants.
- **Changes when:** architectural decisions change.

### `docs/research/`
- **Purpose:** capture sources, rationale, and conceptual background.
- **Contains:** thesis summaries, excerpts, definitions, related work notes.
- **Changes when:** new research/excerpts are added or interpretation evolves.

### `docs/product/`
- **Purpose:** define what we are building for users.
- **Contains:** MVP/alpha scope, UX flows, roles/permissions policy defaults, feature decisions.
- **Changes when:** product scope or UX decisions change.

### `docs/roadmap/`
- **Purpose:** execution plan.
- **Contains:** milestones, deliverables, sequencing, risks, release readiness checklists.
- **Changes when:** priorities/timelines/implementation strategy changes.

## Document map (current)

- `docs/architecture/VISION.md`
  - Global Stack motivation + program framing
  - Connect concept (decentralized connectivity)
  - Open OS concept (sovereign infrastructure)
  - MOOD's role in the vision

- `docs/architecture/ARCHITECTURE.md`
  - Tech stack overview
  - Frontend: route groups, pages, components, state management
  - Data layer: domain model, seed/mock data structure
  - Backend: planned stack (Prisma/Neon/Hono/Redis)
  - Deployment: Vercel vs Cloudflare status
  - Open technical questions

- `docs/product/ALPHA.md`
  - Alpha stance (capabilities first)
  - Two entry points (curated demo + sandbox)
  - Group modes A/B/C
  - Persistence & save behavior
  - Starter kit
  - UI principles
  - Open product questions

- `docs/research/THESIS_SUMMARY.md`
  - Thesis-derived motivation
  - Core framework entities (groups/subgroups/processes/modules/components)
  - Design implications (layouts, moderation, OSS)
  - Implications for the current prototype

## How we keep docs consistent (rules of thumb)
- Avoid duplicating the same decision in many files.
  - Put the decision in **one** place and link to it.
- `architecture` answers **how the system is shaped**.
- `product` answers **what users can do and what we ship first**.
- `roadmap` answers **what happens next**.
- `research` answers **why we believe this direction makes sense**.
