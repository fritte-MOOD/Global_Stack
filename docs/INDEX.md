# Global Stack — Documentation Index

> **Stand: 10. März 2026**  
> **Aktuelle Phase:** Desktop Redesign & App Integration ✅ abgeschlossen

---

## Quick Reference

| Bereich | Status | Nächste Schritte |
|---------|--------|------------------|
| **Landing Page** | ✅ Fertig | Window Manager optimieren |
| **OpenOS Client Demo** | ✅ Fertig | Server View implementieren |
| **Demo Apps** | ✅ Fertig | Tablet/Mobile Screens |
| **Auth System** | ✅ Fertig | - |
| **Desktop Redesign** | ✅ **NEU** | Feinschliff, weitere Apps |
| **Database & Persistence** | ✅ Fertig | Hosted DB (Turso) |
| **MOOD Deliberation** | ⬜ Offen | Domain Model & UI |

---

## 🗂️ Document Map

```
docs/
├── INDEX.md                    ← Du bist hier
├── PROJECT_RULES.md            ← Regeln, Tech Stack, Präferenzen
│
├── architecture/
│   ├── ARCHITECTURE.md         ← Technische Architektur (How)
│   └── VISION.md               ← Produkt-Vision (What/Why)
│
├── product/
│   └── ALPHA.md                ← Alpha-Scope & UX-Entscheidungen
│
├── research/
│   └── THESIS_SUMMARY.md       ← Forschungshintergrund
│
└── roadmap/
    └── ROADMAP.md              ← Milestones & Fortschritt
```

---

## Current Focus: Desktop Redesign & App Integration

**Was zuletzt implementiert wurde:**

### Auth System
- **Custom Auth**: bcrypt + Session Cookie + Middleware
- **Login/Register**: `/workspace/login`, `/workspace/register`
- **Demo-User**: 3 vorkonfigurierte Accounts, Login per Button-Klick

### Shared Desktop Component
- **Einheitliche Komponente** für Demo + Workspace
- **OS-like Footer**: Ring-Menü, App-Menü, Gruppenswitcher
- **Portal-Overlays**: Menüs via `createPortal` garantiert über Fenstern
- **Dark Mode Toggle + Fullscreen** in Settings
- **GroupFilterContext**: Globaler Gruppenfilter für alle App-Fenster

### Persistente Events
- **Server Actions**: `loadEvents()`, `createEvent()`, `deleteEvent()`
- **Create Event Fenster**: Eigenes zentriertes Fenster mit hierarchischem Gruppen-Dropdown
- **Gruppenfilter**: Alle Apps filtern nach ausgewählten Gruppen

---

## Next Steps

### Milestone 5 — OpenOS Server View
- Admin-Dashboard für Server-Verwaltung
- User-Erstellung und Gruppenverwaltung
- Installations-Wizard (OS-Setup Simulation)
- Bridge zu MOOD Deliberation

### Milestone 6 — Client-View Tablet/Mobile
- Tablet-Screens für OpenOS Demo
- Mobile-Screens für OpenOS Demo
- Responsive App-Navigation

---

## Essential Reading

**Für neue Entwickler:**
1. `PROJECT_RULES.md` — Arbeitsweise, Tech Stack, Präferenzen
2. `architecture/ARCHITECTURE.md` — Wie das System gebaut ist
3. `roadmap/ROADMAP.md` — Wo wir stehen, was als nächstes kommt

**Für Produkt-Entscheidungen:**
1. `architecture/VISION.md` — Was wir bauen und warum
2. `product/ALPHA.md` — Alpha-Scope und UX-Prinzipien

**Für Forschungskontext:**
1. `research/THESIS_SUMMARY.md` — Theoretischer Hintergrund

---

## Development Quick Start

```bash
# In /aktuell arbeiten
cd aktuell/

# Development Server
npm run dev

# Database Operations
npx prisma studio          # GUI für DB-Exploration
npx tsx prisma/seed.ts     # Demo-Daten laden
npx prisma db push         # Schema-Änderungen anwenden

# Build & Deploy
npm run build              # Production Build
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Global Stack Alpha                       │
├─────────────────────────────────────────────────────────────┤
│  Landing Page    │  OpenOS Demo     │  Workspace (Persistent) │
│  (Window Mgmt)   │  (Session-only)  │  (Database-backed)      │
│                  │                  │                         │
│  ✅ Fertig       │  ✅ Client View  │  ✅ Communities         │
│                  │  ⬜ Server View  │  ✅ Templates           │
│                  │  ⬜ Tablet/Mobile│  ✅ Auth System         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Shared Data Layer                        │
│  ✅ Prisma ORM  │  ✅ SQLite (dev)  │  ⬜ PostgreSQL (prod)  │
│  ✅ 9 Tables    │  ✅ Hierarchie    │  ✅ Templates          │
│  ✅ Auth/Session │  ✅ Gruppenfilter │  ✅ Server Actions     │
└─────────────────────────────────────────────────────────────┘
```

---

**Letzte Aktualisierung:** 10. März 2026  
**Nächster Meilenstein:** M5 — OpenOS Server View & Admin  
**Letzter Meilenstein:** M4b — Desktop Redesign & App Integration