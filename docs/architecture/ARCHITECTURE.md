# Global Stack — Technical Architecture

This document describes **how the system is built**, organized by technical layer.

**Related docs:**
- Global Stack vision & narrative → `docs/architecture/VISION.md`
- Alpha product scope & UX decisions → `docs/product/ALPHA.md`
- Research / thesis background → `docs/research/THESIS_SUMMARY.md`
- Project rules & conventions → `docs/PROJECT_RULES.md`

---

## 1. Tech Stack

| Layer | Technology | Status |
|-------|-----------|--------|
| **Framework** | Next.js 16 (App Router) | aktiv |
| **Language** | TypeScript | aktiv |
| **Styling** | Tailwind CSS 4 | aktiv |
| **State** | React Context (WindowManager) | aktiv |
| **Icons** | Lucide React | aktiv |
| **ORM** | Prisma 7 | aktiv |
| **Datenbank (lokal)** | SQLite via better-sqlite3 | aktiv |
| **Datenbank (Demo)** | Turso (gehostetes SQLite) | geplant |
| **Datenbank (Prod)** | PostgreSQL (VPS / Supabase) | geplant |
| **Auth** | noch offen (NextAuth / custom) | geplant |
| **Deploy** | Vercel | geplant |

---

## 2. Frontend

### 2.1 Route Structure

```
src/app/
├── layout.tsx              ← Root-Layout (Fonts, ThemeSync, WindowManagerProvider)
├── globals.css             ← Tailwind + CSS-Variablen (Light/Dark)
│
├── (site)/                 ← Route-Group: öffentliche Seiten MIT Navbar
│   ├── layout.tsx          ← Site-Layout (enthält Navbar_landing)
│   ├── (landing)/
│   │   ├── layout.tsx
│   │   └── page.tsx        ← Startseite ("We Support Free, Sovereign Communities!")
│   └── open-os/            ← OpenOS Demo (Session-only Mockup-Daten)
│       ├── page.tsx        ← Auswahl: Client View / Server View + Workspace-CTA
│       ├── client/
│       │   ├── page.tsx    ← Geräte-Mockups (Laptop, Tablet, Mobile)
│       │   └── screens/
│       │       ├── laptop/
│       │       │   ├── index.tsx       ← Screen-Controller (Login → Desktop)
│       │       │   ├── LoginScreen.tsx ← Server-Auswahl + Verbindungsanimation
│       │       │   ├── Desktop.tsx     ← App-Shell mit Navigation + Gruppen-Filter
│       │       │   └── apps/           ← 5 funktionale Apps
│       │       │       ├── MessagesApp.tsx    ← Nachrichten nach Gruppe
│       │       │       ├── CalendarApp.tsx    ← Events nach Datum
│       │       │       ├── TasksApp.tsx       ← Open/Done Tasks
│       │       │       ├── DocumentsApp.tsx   ← Docs mit Inline-Reader
│       │       │       └── DebateApp.tsx      ← Processes nach Status
│       │       ├── tablet/             ← Coming Soon
│       │       └── mobile/             ← Coming Soon
│       ├── server/         ← Coming Soon
│       └── _actions/
│           └── load-demo-data.ts       ← Server Action: Demo-Daten laden
│
└── workspace/              ← Route-Group: persistente App OHNE Navbar
    ├── layout.tsx          ← Workspace-Layout (fullscreen)
    ├── page.tsx            ← Dashboard: Communities + Templates
    ├── [slug]/
    │   └── page.tsx        ← Community-Detail-Seite
    └── _actions/
        └── clone-template.ts           ← Server Action: Template kopieren
```

### 2.2 Two User Flows

**Demo-Pfad** (`/open-os/client/`):
1. Geräte-Auswahl (Laptop/Tablet/Mobile)
2. Server-Auswahl (ParkClub, MarinQuarter, Rochefort)
3. Verbindungsanimation
4. Desktop mit App-Grid
5. Apps mit Live-Demo-Daten (session-only)

**Persistent-Pfad** (`/workspace/`):
1. Dashboard: eigene Communities + verfügbare Templates
2. Template laden → Deep-Copy in User-Space
3. Community-Detail-Seiten mit echten DB-Daten
4. Vollständige CRUD-Operationen (geplant)

### 2.3 Window Management System

**Nur für Landing Page aktiv** — nicht in OpenOS Demo oder Workspace.

```
components/window-manager/
├── logic/
│   ├── WindowManagerProvider.tsx    ← React Context für offene Fenster
│   ├── DraggableWindow.tsx          ← Drag, Resize, Close Logik
│   └── Tag.tsx                      ← Hover-Tooltip + Click-to-Window
└── windows/
    ├── ProjectWindow.tsx            ← Projekt-Fenster (OpenOS, Mood)
    └── _TEMPLATE.tsx                ← Vorlage für neue Fenster
```

**Verwendung:**
```tsx
<ProjectWindow name="OpenOS" />  // Hover-Tooltip + Click-Window
```

### 2.4 Device Mockups

**Nur für OpenOS Client Demo** — zeigt Laptop/Tablet/Mobile Frames.

```
components/ui/
├── DeviceSwitcher.tsx               ← Geräte-Tabs (via Portal in Navbar)
├── device-frames/
│   ├── LaptopFrame.tsx              ← Laptop-Gehäuse + Screen
│   ├── TabletFrame.tsx              ← Tablet-Gehäuse + Screen
│   └── MobileFrame.tsx              ← Mobile-Gehäuse + Screen
```

**Features:**
- CSS-Variablen für Light/Dark Mode Rahmen-Farben
- Fullscreen-Button (native Browser Fullscreen API)
- Responsive Screen-Größen

---

## 3. Data Layer

### 3.1 Prisma Schema

```
User ←→ Membership ←→ Group
 ↓                      ↓
Message              Message
Task                 Event
Document             Task
Process              Document
                     Process
```

**Hierarchie:**
```
Group (parentId: null)     ← Server/Community
└── Group (parentId: set)  ← Untergruppe
    └── Group              ← Sub-Untergruppe (beliebig tief)
```

**Visibility-System:**
- `public`: Sichtbar für alle Parent-Group Mitglieder
- `private`: Nur für direkte Mitglieder sichtbar
- `hidden`: Unsichtbar in Listen (nur direkter Zugriff)

**Template-System:**
- `isTemplate: true` markiert kopierbare Vorlagen
- Templates haben `templateDescription` für UI
- Deep-Copy via Server Action: Gruppe + Untergruppen + Content

### 3.2 Prisma Client

```typescript
// src/lib/db.ts
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
```

**Singleton-Pattern** verhindert mehrere Verbindungen bei Next.js Hot-Reload.

### 3.3 Server Actions

**Demo-Daten laden** (`load-demo-data.ts`):
```typescript
export async function loadDemoData(serverSlugs: string[]): Promise<DemoData>
```
- Lädt alle Gruppen + Content für gewählte Server
- Serialisiert Dates zu ISO-Strings für Client
- Wird von OpenOS Desktop beim Start aufgerufen

**Template klonen** (`clone-template.ts`):
```typescript
export async function cloneTemplate(templateId: string)
```
- Deep-Copy: Template-Gruppe + Untergruppen + Content
- Generiert unique Slugs
- Erstellt Membership für User
- Redirect zu neuer Community

### 3.4 Seed Data

**3 Top-Level Server:**
- **ParkClub** (Sport) → Jugendabteilung, Vorstand
- **MarinQuarter** (Wohnen) → Haus A, Gartenpflege  
- **Rochefort** (Stadt) → Stadtrat, Feuerwehr, Jugendparlament

**3 Templates:**
- **Sportverein** → Jugend, Vorstand
- **Wohngemeinschaft** → Haus A, Garten
- **Gemeinde** → Stadtrat, Feuerwehr

**Content:** Messages, Events, Tasks, Documents, Processes für alle Gruppen.

---

## 4. OpenOS Apps (neu implementiert)

### 4.1 App Architecture

**Desktop als App-Shell:**
- Home-Screen: Uhrzeit + 9-Punkt App-Grid
- App-Modus: Top-Bar mit Navigation + Gruppen-Filter
- Daten-Loading: Server Action beim Start
- State: `activeApp`, `selectedGroupId`, `data`

**App-Komponenten:**
```typescript
type AppProps = {
  data: DemoData;                    // Alle geladenen Demo-Daten
  groupIds: string[];                // Gefilterte Gruppen-IDs
  allGroups: (DemoGroup & {depth})[];// Hierarchie für UI
};
```

### 4.2 Implementierte Apps (5/9)

**1. MessagesApp**
- Nachrichten gruppiert nach Community
- Avatar-Initialen, Autor, Zeitstempel
- Hover-Effekte, responsive Layout

**2. CalendarApp**
- Events sortiert nach Datum (Wochentag, Tag, Monat)
- Farbige Seitenstreifen pro Gruppe
- Uhrzeit, Beschreibung, Gruppen-Name

**3. TasksApp**
- Aufgeteilt in "Open" und "Done" Sektionen
- Checkbox-Icons, Assignee-Info
- Fälligkeitsdatum, Gruppen-Zuordnung

**4. DocumentsApp**
- Dokumentenliste mit Klick-zum-Öffnen
- Inline-Reader mit Zurück-Navigation
- Autor, Update-Datum, Gruppen-Info

**5. DebateApp (Processes)**
- Gruppiert nach Status: Active, Draft, Other
- Status-Badges mit Farb-Kodierung
- Beschreibung, Autor, Gruppen-Name

### 4.3 Gruppen-Filter System

**Dropdown in Top-Bar:**
- "All groups" (default)
- Server-Gruppen (depth: 0)
- Untergruppen (depth: 1, eingerückt)
- Farbige Punkte für visuelle Zuordnung

**Filter-Logik:**
```typescript
const selectedGroupIds = selectedGroupId
  ? [selectedGroupId, ...children] // Gruppe + ihre Kinder
  : allGroups.map(g => g.id);       // Alle Gruppen
```

---

## 5. Styling & Theming

### 5.1 Tailwind CSS 4

```css
@import "tailwindcss";

@theme inline {
  --font-heading: "Inter Variable", sans-serif;
  --font-sans: "Inter Variable", sans-serif;
  
  --color-brand-0: #ffffff;
  --color-brand-25: #fefefe;
  /* ... weitere Brand-Farben ... */
  
  --color-group-park-club: #16a34a;
  --color-group-marin-quarter: #2563eb;
  --color-group-rochefort: #9333ea;
}
```

### 5.2 Dark Mode

**Aktivierung:** `html.dark` Klasse via `ThemeSync` Component.

**Präferenzen:**
- Nur orange Akzente (#fba762), kein Blau
- Navbar-Slash in Light-Mode orange
- Device-Frames: unterschiedliche Farben für Light/Dark

### 5.3 CSS-Variablen

**Device-Frames:**
```css
--color-device-frame: #e5e7eb;        /* Light */
--color-device-trackpad: #d1d5db;     /* Light */

html.dark {
  --color-device-frame: #6b7280;      /* Dark */
  --color-device-trackpad: #4b5563;   /* Dark */
}
```

---

## 6. Development Workflow

### 6.1 Database Operations

```bash
# Schema ändern
npx prisma db push --force-reset

# Prisma Client neu generieren
npx prisma generate

# Demo-Daten laden
npx tsx prisma/seed.ts

# DB Explorer (GUI)
npx prisma studio
```

### 6.2 Build & Deploy

```bash
# Development
npm run dev

# Production Build
npm run build

# Type Check
npx tsc --noEmit
```

### 6.3 File Watching

**Hot Reload funktioniert für:**
- React Components
- Tailwind Classes
- TypeScript Files

**Requires Restart:**
- Prisma Schema Änderungen
- next.config.ts Änderungen
- Environment Variables

---

## 7. Next Steps

### 7.1 Immediate (M6)
- **Server View** für OpenOS implementieren
- **Tablet/Mobile Screens** für Client View
- **Auth System** (NextAuth vs. custom)

### 7.2 Medium-term
- **Real-time Updates** (WebSockets / Server-Sent Events)
- **File Uploads** (Avatars, Dokument-Attachments)
- **Advanced Processes** (Deliberation Module)

### 7.3 Production
- **Database Migration** (SQLite → PostgreSQL)
- **Hosting Setup** (Vercel + VPS/Supabase)
- **Performance Optimization** (Caching, CDN)