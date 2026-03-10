# Global Stack — Documentation Index

> **Stand: 10. März 2026**  
> **Aktuelle Phase:** OpenOS Demo Apps Implementation ✅ abgeschlossen

---

## 📋 Quick Reference

| Bereich | Status | Nächste Schritte |
|---------|--------|------------------|
| **Landing Page** | ✅ Fertig | Window Manager optimieren |
| **OpenOS Client Demo** | ✅ Fertig | Server View implementieren |
| **Demo Apps** | ✅ **NEU** | Tablet/Mobile Screens |
| **Database & Persistence** | ✅ Fertig | Auth System hinzufügen |
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

## 🎯 Current Focus: OpenOS Demo Apps

**Was heute implementiert wurde:**

### 5 funktionale Apps für OpenOS Laptop Demo
1. **MessagesApp** — Nachrichten gruppiert nach Community
2. **CalendarApp** — Events sortiert nach Datum mit farbigen Gruppen-Streifen
3. **TasksApp** — Open/Done Listen mit Assignee-Info
4. **DocumentsApp** — Dokumentenliste mit Inline-Reader
5. **DebateApp** — Processes nach Status mit Badges

### App-Shell Features
- **Navigation**: Home-Button, App-Name in Top-Bar
- **Gruppen-Filter**: Dropdown um nach spezifischen Communities zu filtern
- **Daten-Loading**: Server Action lädt alle Demo-Daten beim Start
- **Groups-Navigation**: Hierarchie-Ansicht mit direkter Navigation

### Database Integration
- **Server Action**: `load-demo-data.ts` lädt alle Inhalte der gewählten Server
- **Demo-Daten**: 3 Server (ParkClub, MarinQuarter, Rochefort) mit 7 Untergruppen
- **Content**: Messages, Events, Tasks, Documents, Processes für alle Gruppen
- **Filter-System**: Apps können nach "All groups" oder spezifischen Gruppen filtern

---

## 🚀 Next Steps (Milestone 5)

### OpenOS Server View
- Admin-Dashboard für Server-Verwaltung
- User-Erstellung und Gruppenverwaltung
- Installations-Wizard (OS-Setup Simulation)
- Bridge zu MOOD Deliberation

### Client-View Erweiterung (M6)
- Tablet-Screens für OpenOS Demo
- Mobile-Screens für OpenOS Demo
- Responsive App-Navigation

---

## 📖 Essential Reading

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

## 🔧 Development Quick Start

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

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Global Stack Alpha                       │
├─────────────────────────────────────────────────────────────┤
│  Landing Page    │  OpenOS Demo     │  Workspace (Persistent) │
│  (Window Mgmt)   │  (Session-only)  │  (Database-backed)      │
│                  │                  │                         │
│  ✅ Fertig       │  ✅ Client View  │  ✅ Communities         │
│                  │  ⬜ Server View  │  ✅ Templates           │
│                  │  ⬜ Tablet/Mobile│  ⬜ Auth System         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Shared Data Layer                        │
│  ✅ Prisma ORM  │  ✅ SQLite (dev)  │  ⬜ PostgreSQL (prod)  │
│  ✅ 8 Tables    │  ✅ Hierarchie    │  ✅ Templates          │
└─────────────────────────────────────────────────────────────┘
```

---

**Letzte Aktualisierung:** 10. März 2026  
**Nächster Meilenstein:** M5 — OpenOS Server View & Admin