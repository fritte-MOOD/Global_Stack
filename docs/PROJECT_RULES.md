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
| **State** | React Context (WindowManager, GroupFilter, ContextMenu) | — |
| **Icons** | Lucide React | 0.577 |
| **ORM** | Prisma | 7.4 |
| **Datenbank** | SQLite (lokal via better-sqlite3) / Turso (Remote) | — |
| **Auth** | Custom (bcrypt + Session Cookie) | — |
| **Deploy** | Vercel + Turso | — |

---

## Projektstruktur (`/aktuell`)

```
aktuell/
├── prisma/
│   ├── schema.prisma          Datenmodell (15 Tabellen)
│   ├── seed.ts                Demo-Daten (3 Server, 7 Untergruppen, 3 User, Chats)
│   └── prisma.config.ts       CLI-Konfiguration
├── src/
│   ├── app/
│   │   ├── _actions/          Globale Server Actions
│   │   │   ├── events.ts      loadEvents, createEvent, loadEventDetails, updateRSVP, addComment, toggleReaction
│   │   │   ├── groups.ts      loadGroups
│   │   │   ├── chats.ts       loadChats, loadChatMessages, sendChatMessage, createChat, deleteChat, loadAvailableUsers
│   │   │   ├── search.ts      globalSearch (parallel queries über alle Content-Typen)
│   │   │   └── messages.ts    (Legacy, ersetzt durch chats.ts)
│   │   ├── api/               API Routes
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
│   │   │   ├── Desktop.tsx    Hauptkomponente (Footer, Menüs, WindowManager, DarkMode, Search)
│   │   │   ├── GroupFilterContext.tsx  Globaler Gruppenfilter (mit tri-state Checkboxen)
│   │   │   ├── ContextMenu.tsx        Custom Rechtsklick-Menü
│   │   │   └── index.ts
│   │   ├── ui/                UI-Komponenten (DeviceSwitcher, DarkModeToggle)
│   │   └── window-manager/    Fenster-System
│   │       ├── logic/         WindowManager, DraggableWindow, Tag
│   │       └── windows/       App-Fenster (8 Fenster-Komponenten)
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

### Schema (15 Modelle)

```prisma
model User {
  id, email, name, nickname, avatarUrl, description, passwordHash, isDemo
  memberships[], messages[], tasks[], documents[], processes[], sessions[]
  chatParticipants[]
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
  chats[]
}

model Membership { userId, groupId, role }

model Chat {
  id, type ("group" | "direct"), subject?, groupId?
  participants[], messages[]
  createdAt, updatedAt
}

model ChatParticipant { chatId, userId }

model Message { content, authorId, groupId?, chatId? }

model Event {
  title, description?, location?, startsAt, endsAt, allDay, groupId, creatorId
  invitations[], comments[], reactions[]
}

model EventInvitation { eventId, userId, status ("pending" | "accepted" | "declined") }
model Comment { content, eventId, authorId, parentId (threaded replies) }
model Reaction { emoji, eventId, authorId }

model Task { title, description, done, dueAt, groupId, assigneeId, creatorId }
model Document { title, content, groupId, authorId }
model Process { title, description, status, groupId, authorId }
```

### Seed-Daten (aktuell)

- **3 Top-Level Server**: ParkClub (Sport), MarinQuarter (Wohnen), Rochefort (Stadt)
- **7 Untergruppen**: Jugendabteilung, Vorstand, Haus A, Gartenpflege, Stadtrat, Feuerwehr, Jugendparlament
- **3 Templates**: Sportverein, Wohngemeinschaft, Gemeinde (jeweils mit Untergruppen)
- **3 Demo-User**: Alex Demo, Maria Beispiel, Léon Dupont
- **Content**: Messages, Events (mit Einladungen), Tasks, Documents, Processes, Chats (Gruppe + Direkt)

---

## Desktop & Apps

### Shared Desktop Component (`components/desktop/Desktop.tsx`)
- **Genutzt von**: Demo (`/open-os/client`) und Workspace (`/workspace`)
- **Mode-Prop**: `"demo"` vs. `"workspace"` für kontextspezifische Anpassungen
- **Footer/Taskbar**: Ring-Menü (User/Settings/Server), App-Button (3x3 Grid), Search-Button, Gruppenswitcher, Dark Mode Toggle (rechts)
- **Portal-Overlays**: Alle Menüs via `createPortal` → `document.body` (z-index garantiert)
- **GroupFilterContext**: Globaler Gruppenfilter mit hierarchischer Darstellung und tri-state Checkboxen
- **ContextMenuProvider**: Custom Rechtsklick-Menü auf dem Desktop
- **Keyboard Shortcuts**: `Ctrl/Cmd+K` für globale Suche

### Fenster-System (`window-manager/`)

**DraggableWindow** — Kernkomponente für alle Fenster:
- Drag & Drop via Titelleiste
- Resize an allen 8 Kanten/Ecken
- Fullscreen-Modus (respektiert Footer-Höhe via `bottomInset`)
- Optionale Content-Skalierung (`noScale` deaktiviert für z.B. Messages)
- Multi-Instanzen möglich (`openNewInstance`)

**WindowManager** — Context Provider:
- Verwaltet alle offenen Fenster (Position, z-Index, Fokus)
- `openWindow`, `closeWindow`, `toggleWindow`, `openNewInstance`

### Window-Apps (8 Fenster-Komponenten)

1. **Calendar** — Monats-/Wochen-/Tages-/Listenansicht, Event-Erstellung, Event-Details (mit RSVP, Kommentaren, Reaktionen)
2. **Messages** — Messenger mit Gruppenchats & Einzelchats, Split-View (responsive), Chat-Erstellung, Chat-Löschen
3. **Tasks** — Open/Done Listen, lokale Suche + globale Suche
4. **Documents** — Dokumentenliste mit Inline-Reader, lokale Suche + globale Suche
5. **Debate** — Processes nach Status, lokale Suche + globale Suche
6. **Search** — Globale Suche über alle Content-Typen, Mehrfachauswahl-Filter, Zeitraum-Filter, Gruppenfilter
7. **Project** — Projekt-Übersicht
8. **_TEMPLATE** — Vorlage für neue Fenster-Komponenten

### Demo-Apps (innerhalb OpenOS Laptop Screen)
- Eigenständige App-Komponenten in `screens/laptop/apps/`
- Laden Demo-Daten via `loadDemoData()` Server Action
- Filtern nach spezifischen Gruppen via Dropdown

---

## Suche

### Globale Suche (`_actions/search.ts`)
- **Server-seitig**: Parallele Prisma-Queries via `Promise.all` über Messages, Events, Tasks, Documents, Processes
- **Filter**: Content-Typ (Mehrfachauswahl), Zeitraum (Presets), Gruppenfilter (übernimmt globale Auswahl)
- **Zugang**: Desktop Footer-Button, Keyboard Shortcut `Ctrl/Cmd+K`, Rechtsklick-Menü, Lupe in jeder App

### In-App Suche
- Jede App hat ein lokales Suchfeld (client-side Filterung) + Lupe für globale Suche (mit App-spezifischem Vorfilter)

---

## Chat-System

### Architektur
- **Gruppenchats**: Optionale Gruppenzuordnung, Betreff verpflichtend
- **Einzelchats**: Kein Gruppenkontext, Betreff optional, mehrere Chats mit gleicher Person möglich
- **Split-View**: Ab ≥520px Breite zeigt das Messages-Fenster Chat-Liste + aktives Chat-Fenster nebeneinander
- **Erstellung**: "+" Button mit Dropdown (Gruppenchat / Einzelchat)
- **Löschen**: Via 3-Punkt-Menü oder Rechtsklick auf Chat
- **No Scale**: Messages-Fenster skaliert Inhalt nicht bei Vergrößerung

---

## Farbsystem & Design-Regeln

### Farbpalette
Die gesamte Anwendung verwendet ausschließlich die `brand-*` Farbskala (definiert in `globals.css`):

| Token | Light | Dark | Verwendung |
|-------|-------|------|------------|
| `brand-0` | `#ffffff` | `#1a1a1a` | Oberflächen (Menüs, Popovers) |
| `brand-25` | `#fefeff` | `#131415` | Seitenhintergrund |
| `brand-50` | `#ffffff` | `#101010` | Karten-Hintergrund |
| `brand-100` | `#e1ebf5` | `#2a2a2a` | Hover-Hintergrund |
| `brand-150` | `#d4dce4` | `#333333` | Subtile Borders |
| `brand-200` | `#e6e6e6` | `#0e0e0e` | Default Borders, Focus-Ringe |
| `brand-400` | `#9ca3af` | `#6b7280` | Muted Text, Placeholder |
| `brand-950` | `#3f3f46` | `#d8d8dc` | **Body Text** (Standardfarbe) |

### Regel: Keine Akzentfarben
- **ALLE Texte, Icons, Buttons** verwenden `text-brand-950` (normale Textfarbe)
- **Keine** `text-brand-500`, `text-brand-600`, `text-brand-700`, `text-brand-800`, `text-brand-900` im Code
- **Focus-Ringe** verwenden `ring-brand-200` (neutral)
- **Unterstreichungen** verwenden `decoration-brand-200` (neutral)
- **Fenster-Buttons** (Schließen, Fullscreen) in `text-brand-950`
- Akzentfarben (`brand-300` orange, `brand-700` blau/orange) werden **später** eingeführt

---

## Gelernte Präferenzen

1. **Fenster-System**: Tooltips und geöffnete Fenster müssen identisch positioniert und gestylt sein
2. **Konsistente Schriftarten**: Tailwind v4 `@theme inline` mit expliziten `font-family` Definitionen
3. **Darkmode**: Akzentfarben werden zunächst komplett entfernt und später bewusst eingeführt
4. **Device-Frames**: Unterschiedliche Farben für Light/Dark Mode (CSS Variablen)
5. **Build-Optimierung**: `devIndicators: false` in next.config.ts
6. **Daten gehören Gruppen**: Content wird primär nach Gruppe organisiert, nicht nach User
7. **Session-only Demo**: OpenOS Client zeigt Live-Daten, aber ohne Persistierung
8. **Fullscreen Workspace**: Persistente App läuft ohne Device-Mockups oder globale Navbar
9. **Kopierbare Templates**: User können vordefinierte Strukturen in ihren Space laden
10. **Gruppen-Filter in Apps**: Jede App kann nach spezifischen Communities gefiltert werden
11. **Gruppenfilter 0 = leer**: Wenn keine Gruppe ausgewählt, wird kein Content angezeigt (nicht alle)
12. **Multi-Instanzen**: Gleiche App kann mehrfach geöffnet werden
13. **No Scaling für Chat**: Messages-Fenster zeigt bei Vergrößerung mehr Inhalt statt zu skalieren
14. **Event-Details vollständig**: Einladungen, RSVP, Kommentare (threaded), Reaktionen, Gruppenpfad

---

## Roadmap-Status

- **M1**: ✅ Landing Page (Next.js 16, Tailwind 4, Window Manager)
- **M2**: ✅ OpenOS Demo Structure (Device Switcher, Login Flow)
- **M3**: ✅ Demo Apps Implementation (Messages, Calendar, Tasks, Documents, Debate)
- **M4**: ✅ Auth & Persistence (Prisma, SQLite, Auth, Session, Middleware, Templates)
- **M4b**: ✅ Desktop Redesign (Shared Desktop, Footer-Menüs, Settings, Gruppenfilter)
- **M5**: ✅ Enhanced Apps (Chat-System, Globale Suche, Kalender-Ansichten, Event-Details, Fenster-Resize, Rechtsklick-Menü, Akzentfarben-Bereinigung)

**Nächste Schritte**: Server View (M6), Tablet/Mobile Screens (M7), Akzentfarben-System (M8)
