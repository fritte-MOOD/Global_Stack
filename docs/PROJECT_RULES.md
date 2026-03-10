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
| **State** | React Context (WindowManager, GroupFilter) | — |
| **Icons** | Lucide React | 0.577 |
| **ORM** | Prisma | 7.4 |
| **Datenbank** | SQLite (lokal via better-sqlite3) | — |
| **Auth** | Custom (bcrypt + Session Cookie) | — |
| **Deploy** | Vercel (geplant) | — |

---

## Projektstruktur (`/aktuell`)

```
aktuell/
├── prisma/
│   ├── schema.prisma          Datenmodell (9 Tabellen inkl. Session)
│   ├── seed.ts                Demo-Daten (3 Server, 7 Untergruppen, 3 User)
│   └── prisma.config.ts       CLI-Konfiguration
├── src/
│   ├── app/
│   │   ├── _actions/          Globale Server Actions
│   │   │   ├── events.ts      loadEvents, createEvent, deleteEvent
│   │   │   └── groups.ts      loadGroups
│   │   ├── api/               API Routes (falls vorhanden)
│   │   ├── (site)/            Route Group: Öffentliche Seiten mit Navbar
│   │   │   ├── (landing)/     Landing Page
│   │   │   └── open-os/       OpenOS Demo
│   │   │       ├── client/    Client View (Laptop/Tablet/Mobile)
│   │   │       │   └── screens/laptop/
│   │   │       │       ├── Desktop.tsx      App-Shell mit Navigation
│   │   │       │       ├── LoginScreen.tsx  Server-Auswahl
│   │   │       │       └── apps/            5 funktionale Apps
│   │   │       ├── server/    Server View (Coming Soon)
│   │   │       └── _actions/  Server Actions für Demo-Daten
│   │   │           └── load-demo-data.ts
│   │   ├── workspace/         Route Group: Persistente App (fullscreen)
│   │   │   ├── page.tsx       Desktop (Shared Desktop Component)
│   │   │   ├── login/         Login-Seite (Username/Password + Demo-User)
│   │   │   ├── register/      Registrierungs-Seite
│   │   │   ├── [slug]/        Dynamische Community-Seiten
│   │   │   └── _actions/      Server Actions
│   │   │       ├── auth.ts    Login, Register, Logout
│   │   │       ├── clone-template.ts
│   │   │       └── load-user-data.ts
│   │   ├── layout.tsx         Root Layout
│   │   └── globals.css        Tailwind + CSS Variablen (Light/Dark)
│   ├── components/
│   │   ├── desktop/           Shared Desktop-Komponente
│   │   │   ├── Desktop.tsx    Hauptkomponente (Footer, Menüs, WindowManager)
│   │   │   ├── GroupFilterContext.tsx  Globaler Gruppenfilter
│   │   │   └── index.ts
│   │   ├── ui/                UI-Komponenten (DeviceSwitcher, etc.)
│   │   └── window-manager/    Fenster-System
│   │       ├── logic/         WindowManager, DraggableWindow, Tag
│   │       └── windows/       App-Fenster (Calendar, Messages, Tasks, ...)
│   ├── lib/
│   │   ├── db.ts              Prisma Client Singleton
│   │   └── auth.ts            Auth-Hilfsfunktionen (getSession, getUserFromCookie)
│   └── middleware.ts          Route Protection (/workspace/*)
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
  id, email, name, nickname, avatarUrl, description, passwordHash, isDemo
  memberships[], messages[], tasks[], documents[], processes[], sessions[]
}

model Session {
  id, token, userId, expiresAt
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

### Seed-Daten (aktuell)

- **3 Top-Level Server**: ParkClub (Sport), MarinQuarter (Wohnen), Rochefort (Stadt)
- **7 Untergruppen**: Jugendabteilung, Vorstand, Haus A, Gartenpflege, Stadtrat, Feuerwehr, Jugendparlament
- **3 Templates**: Sportverein, Wohngemeinschaft, Gemeinde (jeweils mit Untergruppen)
- **3 Demo-User**: Alex Demo, Maria Beispiel, Léon Dupont
- **Content**: Messages, Events, Tasks, Documents, Processes für alle Gruppen

---

## Desktop & Apps

### Shared Desktop Component (`components/desktop/Desktop.tsx`)
- **Genutzt von**: Demo (`/open-os/client`) und Workspace (`/workspace`)
- **Mode-Prop**: `"demo"` vs. `"workspace"` für kontextspezifische Anpassungen
- **Footer/Taskbar**: Ring-Menü (User/Settings/Server), App-Button (3x3 Grid), Gruppenswitcher
- **Portal-Overlays**: Alle Menüs via `createPortal` → `document.body` (z-index garantiert)
- **GroupFilterContext**: Verteilt ausgewählte Gruppen an alle App-Fenster
- **Settings**: Dark Mode Toggle + Fullscreen (über Menü + App-Menü erreichbar)

### Window-Apps (als DraggableWindow)
1. **Calendar** — Events + persistente Event-Erstellung via eigenes zentriertes Fenster
2. **Messages** — Nachrichten, gefiltert nach Gruppen
3. **Tasks** — Open/Done Listen, gefiltert nach Gruppen
4. **Documents** — Dokumentenliste mit Inline-Reader, gefiltert nach Gruppen
5. **Debate** — Processes nach Status, gefiltert nach Gruppen

### Demo-Apps (innerhalb OpenOS Laptop Screen)
- Eigenständige App-Komponenten in `screens/laptop/apps/`
- Laden Demo-Daten via `loadDemoData()` Server Action
- Filtern nach spezifischen Gruppen via Dropdown

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
- **M3**: ✅ Demo Apps Implementation (Messages, Calendar, Tasks, Documents, Debate)
- **M4**: ✅ Auth & Persistence (Prisma, SQLite, Auth, Session, Middleware, Templates)
- **M4b**: ✅ **Desktop Redesign** (Shared Desktop, Footer-Menüs, Settings, Gruppenfilter)

**Nächste Schritte**: Server View (M5), Tablet/Mobile Screens (M6)