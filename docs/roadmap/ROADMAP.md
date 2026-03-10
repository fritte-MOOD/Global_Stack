# Global Stack — Roadmap

> Execution plan for the Global Stack alpha.
> The product is one web application with three areas: **Vorstellungsseite → Open OS → MOOD**.
> Each milestone is a shippable increment. Dependencies flow top-down.

**Related docs:**
- Architecture (target state) → `docs/architecture/ARCHITECTURE.md`
- Vision & narrative → `docs/architecture/VISION.md`
- Alpha product scope → `docs/product/ALPHA.md`
- Research background → `docs/research/THESIS_SUMMARY.md`

---

## User flow (big picture)

```
┌─────────────────────────────────┐
│     Vorstellungsseite           │   Global Stack intro
│     (Mission / Video / CTA)     │   "Was ist Global Stack?"
└──────┬─────────────┬────────────┘
       │             │
       ▼             ▼
┌─────────────┐ ┌──────────────┐
│   Open OS   │ │    MOOD      │   (auch direkt erreichbar)
│   Demo      │ │  Deliberation│
└──────┬──────┘ └──────────────┘
       │                 ▲
       │  erstellt User  │
       │  & Gruppe ──────┘
       │  → leitet weiter
       │    zu MOOD
       └─────────────────
```

**Kernidee:** Open OS kommt zuerst. Der Admin richtet dort das System ein (Features, Ressourcen, Festplatten, Benutzer). Die erstellten Benutzer + Gruppe werden dann in MOOD übernommen — die Gruppe kann sofort gemeinsam deliberieren.

---

## Fortschritt (Stand: 10. März 2026)

```
✅ = abgeschlossen    🔧 = in Arbeit    ⬜ = offen

Phase A — Foundation
  ✅ M0   Project Bootstrap
  ✅ M1   Vorstellungsseite (Startseite mit Window Manager)

Phase B — Open OS
  ✅ M2   Client-View Demo (Laptop Login + Desktop fertig)
  ✅ M3   Demo Apps Implementation (Messages, Calendar, Tasks, Documents, Debate)
  ✅ M4   Auth & Persistence (DB + Schema + Workspace + Templates fertig, Auth offen)
  ⬜ M5   Admin & User-Erstellung (Server View)
  ⬜ M6   Client-View Tablet/Mobile

Phase C — MOOD
  ⬜ M7–M11

Phase D — Integration
  ⬜ M10–M11
```

---

## Phase A — Foundation

### Milestone 0 — Project Bootstrap ✅

**Goal:** Lauffähiges Next.js-Projekt mit vollständiger Toolchain.

| # | Deliverable | Status |
|---|-------------|--------|
| 0.1 | Next.js 16 (App Router) + TypeScript | ✅ |
| 0.2 | Tailwind CSS 4 | ✅ |
| 0.3 | Lucide React | ✅ |
| 0.4 | Ordnerstruktur | ✅ |
| 0.5 | ESLint | ✅ |
| 0.6 | Vercel deploy smoke test | ⬜ |

---

### Milestone 1 — Vorstellungsseite ✅

**Goal:** Erste Seite, auf der jeder Besucher landet.

| # | Deliverable | Status |
|---|-------------|--------|
| 1.1 | Hero Section mit Claim | ✅ |
| 1.2 | Video-Embed (Platzhalter) | ⬜ |
| 1.3 | CTAs zu Open OS / MOOD | ✅ (via ProjectWindows) |
| 1.4 | Window Manager System | ✅ (Hover-Tooltip + Click-Fenster) |
| 1.5 | Navigation (Navbar) | ✅ (mit Portal-Slot) |
| 1.6 | Responsive & Dark Mode | ✅ |

---

## Phase B — Open OS Demo

### Milestone 2 — Open OS: Client-View Demo 🔧

**Goal:** Interaktive Demo, die zeigt, wie OpenOS als Nutzer aussieht.

| # | Deliverable | Status |
|---|-------------|--------|
| 2.1 | OpenOS Auswahl-Seite (Client/Server) | ✅ |
| 2.2 | Geräte-Mockups (Laptop, Tablet, Mobile) | ✅ (Rahmen + Screens) |
| 2.3 | Device Switcher in Navbar | ✅ |
| 2.4 | Fullscreen-API für Demos | ✅ |
| 2.5 | **Laptop: Login-Screen** | ✅ (Server-Auswahl, Verbindungsanimation, Continue) |
| 2.6 | **Laptop: Desktop** | ✅ (Uhrzeit, App-Grid mit 9 Apps) |
---

### Milestone 3 — Demo Apps Implementation ✅

**Goal:** Funktionale Apps für OpenOS Laptop Demo mit echten Daten aus der Datenbank.

| # | Deliverable | Status |
|---|-------------|--------|
| 3.1 | **Server Action: Demo-Daten laden** | ✅ (load-demo-data.ts) |
| 3.2 | **Desktop als App-Shell** | ✅ (Navigation, Gruppen-Filter, Home-Button) |
| 3.3 | **MessagesApp** | ✅ (Nachrichten nach Gruppe, Avatare, Zeitstempel) |
| 3.4 | **CalendarApp** | ✅ (Events nach Datum, farbige Gruppen-Streifen) |
| 3.5 | **TasksApp** | ✅ (Open/Done Listen, Assignee, Gruppen-Zuordnung) |
| 3.6 | **DocumentsApp** | ✅ (Dokumentenliste mit Inline-Reader) |
| 3.7 | **DebateApp** | ✅ (Processes nach Status mit Badges) |
| 3.8 | **GroupsApp** | ✅ (Server-Hierarchie mit Untergruppen-Navigation) |
| 3.9 | **Gruppen-Filter System** | ✅ (Dropdown: All groups / spezifische Gruppe) |

**Implementiert:** 5/9 Apps funktional (Messages, Calendar, Tasks, Documents, Debate)  
**Noch offen:** Wiki, Analytics, Settings

---

### Milestone 4 — Auth & Persistence (Shared Layer) ✅

**Goal:** Datenbank und Auth-System, das Open OS und MOOD gemeinsam nutzen.

| # | Deliverable | Status |
|---|-------------|--------|
| 4.1 | **Prisma Schema** (8 Tabellen, Hierarchie, Sichtbarkeit, Templates) | ✅ |
| 4.2 | **SQLite-Datenbank** (lokal, dev.db) | ✅ |
| 4.3 | **Prisma Client Singleton** (src/lib/db.ts) | ✅ |
| 4.4 | **Seed-Daten** (3 Server, 7 Untergruppen, 3 Templates, 3 User) | ✅ |
| 4.5 | **Adapter-Architektur** (wechselbar: SQLite → Turso → PostgreSQL) | ✅ |
| 4.6 | **Workspace-Route** (/workspace/ mit Vollbild-Layout, Community-Ansicht) | ✅ |
| 4.7 | **Template-Copy-Logik** (Deep-Copy via Server Action) | ✅ |
| 4.8 | **Demo/Persistent Split** (Session-only vs. DB-backed) | ✅ |
| 4.9 | **Auth-System** | ⬜ (NextAuth vs. custom, noch offen) |

---

### Milestone 5 — Open OS: Server-View & Admin ⬜

**Goal:** Admin-Dashboard für Server-Verwaltung und User-Erstellung.

| # | Deliverable | Status |
|---|-------------|--------|
| 5.1 | Server-Dashboard UI | ⬜ |
| 5.2 | Installations-Wizard (OS-Setup Simulation) | ⬜ |
| 5.3 | Feature-Verwaltung (On/Off) | ⬜ |
| 5.4 | Benutzer hinzufügen | ⬜ |
| 5.5 | Benutzerliste | ⬜ |
| 5.6 | Gruppe erstellen | ⬜ |
| 5.7 | Weiterleitung zu MOOD | ⬜ |

---

### Milestone 6 — Client-View Tablet/Mobile ⬜

**Goal:** OpenOS Demo für Tablet und Mobile Geräte.

| # | Deliverable | Status |
|---|-------------|--------|
| 6.1 | **Tablet: Screen-Layout** | ⬜ (Coming soon) |
| 6.2 | **Tablet: Apps angepasst** | ⬜ |
| 6.3 | **Mobile: Screen-Layout** | ⬜ (Coming soon) |
| 6.4 | **Mobile: Apps angepasst** | ⬜ |
| 6.5 | **Responsive Navigation** | ⬜ |

| # | Deliverable | Status |
|---|-------------|--------|
| 4.1 | **Prisma Schema** (8 Tabellen, Hierarchie, Sichtbarkeit, Templates) | ✅ |
| 4.2 | **SQLite-Datenbank** (lokal, dev.db) | ✅ |
| 4.3 | **Prisma Client Singleton** (src/lib/db.ts) | ✅ |
| 4.4 | **Seed-Daten** (3 Server, 7 Untergruppen, 3 Templates, 2 User) | ✅ |
| 4.5 | **Adapter-Architektur** (wechselbar: SQLite → Turso → PostgreSQL) | ✅ |
| 4.6 | **Workspace-Route** (/workspace/ mit Vollbild-Layout, Community-Ansicht) | ✅ |
| 4.7 | **Template-Kopier-Logik** (Server Action: Deep Copy von Templates) | ✅ |
| 4.8 | **Demo/Persistent-Split** (Demo = Session-only, Workspace = DB) | ✅ |
| 4.9 | Gehostete Datenbank (Turso oder Supabase) | ⬜ |
| 4.10 | Auth-Lösung (NextAuth oder custom) | ⬜ |
| 4.11 | Session-Management | ⬜ |
| 4.12 | Middleware (Route Protection) | ⬜ |

**Datenbank-Strategie:**
```
Lokal (jetzt)          → SQLite + better-sqlite3
Erste Demo (bald)      → Turso (gehostetes SQLite, kostenloser Tier)
Produktion (später)    → PostgreSQL auf VPS oder Supabase
```

---

## Phase C — MOOD (Deliberation)

### Milestone 5 — MOOD: Domain Model & Seed Data

**Goal:** Typsystem und Seed-Daten für die Deliberation.

| # | Deliverable | Status |
|---|-------------|--------|
| 5.1 | Domain-Typen: Process, Module (8 Varianten), Comment, Vote | ⬜ |
| 5.2 | Seed-Daten: Kuratierte Demo-Szenarien (≥ 3 Gruppen) | ⬜ |
| 5.3 | DB-Seeder erweitern | ⬜ |
| 5.4 | Daten-Split: Seed (Baseline) vs. Instanz-Daten | ⬜ |

---

### Milestone 6 — MOOD: Layout & Navigation

**Goal:** MOOD-Bereich mit Sidebar-Navigation und allen Routen.

| # | Deliverable | Status |
|---|-------------|--------|
| 6.1 | MOOD-Layout (Sidebar + Content) | ⬜ |
| 6.2 | Sidebar-Navigation (About, Debate, Discussions, Messages, Calendar, Tasks, Subgroups, Profile) | ⬜ |
| 6.3 | Group-Header (Gruppe, Mitglieder, Modus A/B/C) | ⬜ |
| 6.4 | Responsive Sidebar | ⬜ |

---

### Milestone 7 — MOOD: Deliberation Core (Module Renderers)

**Goal:** Alle 8 Modul-Typen rendern und sind interaktiv.

| # | Deliverable | Status |
|---|-------------|--------|
| 7.1 | Module-Router (moduleContent.tsx) | ⬜ |
| 7.2 | IdeationSection | ⬜ |
| 7.3 | DebateSection | ⬜ |
| 7.4 | EstimateSection | ⬜ |
| 7.5 | PrioritizeSection | ⬜ |
| 7.6 | VoteSection | ⬜ |
| 7.7 | ExternalDecisionSection | ⬜ |
| 7.8 | AnnouncementSection | ⬜ |
| 7.9 | Prozess-Timeline | ⬜ |

---

### Milestone 8 — MOOD: Alle Sidebar-Seiten

| # | Deliverable | Status |
|---|-------------|--------|
| 8.1 | About (Gruppen-Info, Regeln, Mitglieder) | ⬜ |
| 8.2 | Subgroups | ⬜ |
| 8.3 | Discussions | ⬜ |
| 8.4 | Messages | ⬜ |
| 8.5 | Calendar | ⬜ |
| 8.6 | Tasks | ⬜ |
| 8.7 | Profile (/profile/[id]) | ⬜ |

---

### Milestone 9 — MOOD: Interaktion & Persistenz

| # | Deliverable | Status |
|---|-------------|--------|
| 9.1 | Kommentare schreiben | ⬜ |
| 9.2 | Abstimmen | ⬜ |
| 9.3 | Ideen einreichen | ⬜ |
| 9.4 | Ranking | ⬜ |
| 9.5 | Prozesse erstellen | ⬜ |
| 9.6 | Gruppen-Modi (A/B/C) | ⬜ |

---

## Phase D — Integration & Release

### Milestone 10 — End-to-End Flow

| # | Deliverable | Status |
|---|-------------|--------|
| 10.1 | Flow-Testing (Vorstellungsseite → Open OS → MOOD) | ⬜ |
| 10.2 | Direkt-Einstieg MOOD | ⬜ |
| 10.3 | MOOD als Feature in Open OS | ⬜ |
| 10.4 | Collaborative Sandbox (Starter Kit) | ⬜ |

---

### Milestone 11 — Polish & Alpha Release

| # | Deliverable | Status |
|---|-------------|--------|
| 11.1 | UI Polish | ⬜ |
| 11.2 | Accessibility | ⬜ |
| 11.3 | E2E Tests | ⬜ |
| 11.4 | Performance | ⬜ |
| 11.5 | Dokumentation | ⬜ |
| 11.6 | Vercel Production Deploy | ⬜ |
| 11.7 | Video für Vorstellungsseite | ⬜ |

---

## Risk Register

| Risk | Mitigation |
|------|-----------|
| Open OS Demo wird zu komplex | Nur simuliert, kein echtes NixOS — reine Web-UI |
| Auth-Komplexität | Einfachste Lösung zuerst; später erweiterbar |
| Scope Creep bei Modul-Typen | Alpha = 8 Kerntypen; Erweiterbarkeit ist architektonisch |
| Zwei Einstiegswege = doppelte Arbeit | Shared Auth/DB-Layer (M4) verhindert Dopplung |
| SQLite reicht nicht für Produktion | Prisma-Adapter-Architektur erlaubt Wechsel in 2–4h |
| Datenbank-Migration bei Skalierung | Prisma ORM abstrahiert; Schema bleibt gleich |

---

## Sequencing Summary

```
Phase A — Foundation
  ✅ M0   Project Bootstrap
  ✅ M1   Vorstellungsseite

Phase B — Open OS
  ✅ M2   Client-View Demo
  ✅ M3   Demo Apps Implementation    ← 5 funktionale Apps mit DB-Daten
  ✅ M4   Auth & Persistence         ← DB + Workspace + Templates fertig, Auth offen
  ⬜ M5   Server-View & Admin
  ⬜ M6   Client-View Tablet/Mobile

Phase C — MOOD
  ⬜ M7   Domain Model & Seed Data
  ⬜ M8   Layout & Navigation
  ⬜ M9   Deliberation Core
  ⬜ M10  Sidebar Pages
  ⬜ M11  Interaktion & Persistenz

Phase D — Integration
  ⬜ M12  End-to-End Flow
  ⬜ M13  Polish & Alpha Release
```

---

## UI/UX Design Guidelines

### OpenOS Client Interface Specifications

**Goal:** Consistent, OS-like experience across all devices that feels native and professional.

#### Device Layout Standards

**Laptop/Desktop:**
```
┌─────────────────────────────────────┐
│ ○  OpenOS Desktop                   │ ← Camera dot
├─────────────────────────────────────┤
│                                     │
│         14:32                       │ ← Time/Date
│   Montag, 9. März                   │
│                                     │
│         [⊞]                         │ ← App launcher button
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Debate  Calendar  Messages  │    │ ← App grid (3x3)
│  │ Tasks   Documents Groups    │    │   opens on click
│  │ Wiki    Analytics Settings  │    │
│  └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│          ═══════                    │ ← Laptop base with trackpad
└─────────────────────────────────────┘
```

**Tablet (Querformat):**
```
┌──────────────────────────────────┐
│ ○                                │
│                                  │
│          Coming soon             │
│                                  │
│              ───                 │
└──────────────────────────────────┘
```

**Mobile:**
```
┌─────────────────┐
│    ────────     │ ← Notch
│                 │
│   Coming soon   │
│                 │
│     ──────      │ ← Home indicator
└─────────────────┘
```

#### Core Apps (9 Stück)

| App | Icon | Funktion |
|-----|------|----------|
| Debate | MessageSquare | Deliberation & Abstimmungen |
| Calendar | Calendar | Termine & Events |
| Messages | Mail | Direkt-/Gruppennachrichten |
| Tasks | CheckSquare | Aufgabenverwaltung |
| Documents | FileText | Dokumente & Wiki |
| Groups | Users | Untergruppen verwalten |
| Wiki | BookOpen | Wissensdatenbank |
| Analytics | BarChart3 | Statistiken & Auswertungen |
| Settings | Settings | Systemeinstellungen |

#### Visual Design Principles

1. **OS-like Authenticity** — Fühlt sich an wie ein echtes Betriebssystem
2. **Clean & Minimal** — Professionelle Abstände und Typografie
3. **Consistent across Devices** — Gleiche Apps, angepasstes Layout
4. **No orange accents on OpenOS pages** — Neutral halten (brand-950)

---

*Letzte Aktualisierung: 9. März 2026*
