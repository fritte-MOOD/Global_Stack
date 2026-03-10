# Project Rules & Guidelines

Diese Dokumentation enthält wichtige Regeln für die Entwicklung des Global Stack Projekts.

---

## Arbeitsverzeichnisse

**WICHTIG:** Es wird NUR in folgenden Verzeichnissen gearbeitet:

- `/aktuell` — Die aktive Next.js Anwendung (ehemals `/app`)
- `/docs` — Projektdokumentation

**NIEMALS ändern:**
- `/legacy/prototype_1` — Original MOOD Referenz-Design
- `/legacy/prototype_2` — Vorherige App-Version (archiviert)

---

## Dokumentations-Pflicht

Diese Dokumentation muss **kontinuierlich aktualisiert** werden, wenn:
- Neue Projektregeln gelernt werden
- Design-Entscheidungen getroffen werden
- Technische Konventionen festgelegt werden
- Feedback vom Nutzer kommt

---

## Tech Stack (aktuell)

| Layer | Technologie | Version |
|-------|-------------|---------|
| **Framework** | Next.js (App Router) | 16.1 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **State** | React Context (WindowManager) | — |
| **Icons** | Lucide React | 0.577 |
| **ORM** | Prisma | 7.4 |
| **Datenbank** | SQLite (lokal via better-sqlite3) | — |
| **Deploy** | Vercel (geplant) | — |

---

## Projektstruktur (`/aktuell`)

```
aktuell/
├── prisma/
│   ├── schema.prisma          Datenmodell (8 Tabellen, Hierarchie + Templates)
│   ├── seed.ts                Demo-Daten (3 Server, 7 Untergruppen, 3 Templates)
│   └── prisma.config.ts       CLI-Konfiguration
├── src/
│   ├── app/
│   │   ├── (site)/            Route Group: Öffentliche Seiten mit Navbar
│   │   │   ├── (landing)/     Landing Page
│   │   │   └── open-os/       OpenOS Demo
│   │   │       ├── client/    Client View (Laptop/Tablet/Mobile)
│   │   │       │   └── screens/laptop/
│   │   │       │       ├── Desktop.tsx      App-Shell mit Navigation
│   │   │       │       ├── LoginScreen.tsx  Server-Auswahl
│   │   │       │       └── apps/            5 funktionale Apps
│   │   │       │           ├── MessagesApp.tsx
│   │   │       │           ├── CalendarApp.tsx
│   │   │       │           ├── TasksApp.tsx
│   │   │       │           ├── DocumentsApp.tsx
│   │   │       │           └── DebateApp.tsx
│   │   │       ├── server/    Server View (Coming Soon)
│   │   │       └── _actions/  Server Actions für Demo-Daten
│   │   │           └── load-demo-data.ts
│   │   ├── workspace/         Route Group: Persistente App (fullscreen)
│   │   │   ├── page.tsx       Dashboard: Communities + Templates
│   │   │   ├── [slug]/        Dynamische Community-Seiten
│   │   │   └── _actions/      Server Actions
│   │   │       └── clone-template.ts
│   │   ├── layout.tsx         Root Layout (ohne Navbar)
│   │   └── globals.css        Tailwind + CSS Variablen
│   ├── components/
│   │   ├── ui/                UI-Komponenten (DeviceSwitcher, etc.)
│   │   └── window-manager/    Fenster-System für Landing Page
│   └── lib/
│       └── db.ts              Prisma Client Singleton
├── dev.db                     SQLite Datenbank (lokal, .gitignore)
├── package.json               Dependencies
└── next.config.ts             Next.js Konfiguration
```

---

## Datenbank

### Prinzipien

1. **Daten gehören Gruppen, nicht Usern** — User greifen via Memberships zu
2. **Hierarchie**: Server (parentId=null) → Untergruppen (parentId gesetzt), beliebig tief
3. **Templates**: Kopierbare Vorlagen mit `isTemplate=true`
4. **Zwei Modi**: Demo (session-only) vs. Workspace (persistent)

### Schema (vereinfacht)

```prisma
model User {
  id, email, name, nickname, avatarUrl, description
  memberships[], messages[], tasks[], documents[], processes[]
}

model Group {
  id, slug, name, subtitle, color, icon
  parentId (self-referencing für Hierarchie)
  visibility ("public" | "private" | "hidden")
  isTemplate, templateDescription
  memberships[], messages[], events[], tasks[], documents[], processes[]
}

model Membership { userId, groupId, role }
model Message { content, authorId, groupId }
model Event { title, description, startsAt, endsAt, groupId }
model Task { title, description, done, dueAt, groupId, assigneeId, creatorId }
model Document { title, content, groupId, authorId }
model Process { title, description, status, groupId, authorId }
```

### Neue Felder (seit heute)

- **Group.parentId**: Ermöglicht Server → Untergruppen Hierarchie
- **Group.visibility**: `public`, `private`, `hidden` für Untergruppen-Sichtbarkeit
- **Group.isTemplate**: Markiert kopierbare Vorlagen
- **Group.templateDescription**: Beschreibung für Templates
- **User.nickname, avatarUrl, description**: Erweiterte Profil-Felder

### Seed-Daten (aktuell)

- **3 Top-Level Server**: ParkClub (Sport), MarinQuarter (Wohnen), Rochefort (Stadt)
- **7 Untergruppen**: Jugendabteilung, Vorstand, Haus A, Gartenpflege, Stadtrat, Feuerwehr, Jugendparlament
- **3 Templates**: Sportverein, Wohngemeinschaft, Gemeinde (jeweils mit Untergruppen)
- **3 Demo-User**: Alex Demo, Maria Beispiel, Léon Dupont
- **Content**: Messages, Events, Tasks, Documents, Processes für alle Gruppen

---

## OpenOS Client Apps (neu implementiert)

### App-Shell (`Desktop.tsx`)
- **Home-Screen**: Uhrzeit + App-Launcher (9-Punkt-Grid)
- **App-Modus**: Top-Bar mit Home-Button, App-Name, Gruppen-Filter
- **Daten-Loading**: Server Action lädt alle Demo-Daten beim Start
- **Navigation**: Zurück-zum-Desktop, Gruppen-Switcher

### Implementierte Apps (5/9)

1. **Messages** — Nachrichten gruppiert nach Community, mit Avataren
2. **Calendar** — Events sortiert nach Datum, farbige Gruppen-Streifen  
3. **Tasks** — Open/Done Listen, Assignee-Info, Gruppen-Zuordnung
4. **Documents** — Dokumentenliste mit Inline-Reader
5. **Debate** — Processes nach Status (Active/Draft/Other) mit Badges

**Noch nicht implementiert**: Groups (teilweise), Wiki, Analytics, Settings

### Demo-Daten Flow
1. **LoginScreen**: User wählt Server (ParkClub, MarinQuarter, Rochefort)
2. **Desktop**: Lädt via `loadDemoData()` alle Inhalte der gewählten Server
3. **Apps**: Filtern Daten nach `groupIds` (alle oder spezifische Gruppe)

---

## Gelernte Präferenzen

1. **Fenster-System**: Tooltips und geöffnete Fenster müssen identisch positioniert und gestylt sein
2. **Konsistente Schriftarten**: Tailwind v4 `@theme inline` mit expliziten `font-family` Definitionen
3. **Darkmode**: Nur orange Akzente, kein Blau. Navbar-Slash in Light-Mode orange (#fba762)
4. **Device-Frames**: Unterschiedliche Farben für Light/Dark Mode (CSS Variablen)
5. **Build-Optimierung**: `devIndicators: false` in next.config.ts
6. **Daten gehören Gruppen**: Content wird primär nach Gruppe organisiert, nicht nach User
7. **Session-only Demo**: OpenOS Client zeigt Live-Daten, aber ohne Persistierung
8. **Fullscreen Workspace**: Persistente App läuft ohne Device-Mockups oder globale Navbar
9. **Kopierbare Templates**: User können vordefinierte Strukturen in ihren Space laden
10. **Gruppen-Filter in Apps**: Jede App kann nach spezifischen Communities gefiltert werden

---

## Roadmap-Status

- **M1**: ✅ Landing Page (Next.js 16, Tailwind 4, Window Manager)
- **M2**: ✅ OpenOS Demo Structure (Device Switcher, Login Flow)
- **M3**: ✅ Client View Laptop (Desktop, Apps Grid, Fullscreen)
- **M4**: ✅ Database & Persistence (Prisma, SQLite, Schema, Seed, Workspace Routes, Templates)
- **M5**: ✅ **Demo Apps Implementation** (Messages, Calendar, Tasks, Documents, Debate)

**Nächste Schritte**: Server View, Auth System, Tablet/Mobile Screens