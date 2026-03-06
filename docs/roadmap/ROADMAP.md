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

## Phase A — Foundation

### Milestone 0 — Project Bootstrap

**Goal:** Leeres, lauffähiges Next.js-Projekt mit vollständiger Toolchain.

| # | Deliverable | Details |
|---|-------------|---------|
| 0.1 | **Init Next.js (App Router) + TypeScript** | `create-next-app` mit App Router, TS, ESLint |
| 0.2 | **Tailwind CSS** | `tailwind.config.ts`, `globals.css` |
| 0.3 | **Lucide React** | Icon-Bibliothek |
| 0.4 | **Ordnerstruktur** | `src/app/`, `src/components/`, `src/data/`, `src/context/`, `src/lib/` |
| 0.5 | **Linting & Formatting** | ESLint + Prettier |
| 0.6 | **Vercel deploy smoke test** | Leere App deployt erfolgreich |

**Exit:** `npm run dev` liefert eine leere Seite; Deploy-Pipeline grün.

---

### Milestone 1 — Vorstellungsseite (Global Stack Landing)

**Goal:** Erste Seite, auf der jeder Besucher landet. Erklärt die Mission und bietet zwei Wege an.

| # | Deliverable | Details |
|---|-------------|---------|
| 1.1 | **Hero Section** | Titel, Claim, kurze Beschreibung von Global Stack |
| 1.2 | **Video-Embed (Platzhalter)** | Bereich für Motivations-/Missionsvideo (Inhalt kommt später) |
| 1.3 | **Zwei CTAs** | "Open OS ausprobieren" + "Direkt zu MOOD" |
| 1.4 | **Kurzvorstellung der drei Module** | Connect, Open OS, MOOD — je ein Absatz/Card |
| 1.5 | **Navigation** | Minimale Top-Nav: Logo, Links zu Open OS / MOOD / About |
| 1.6 | **Responsive & Dark Mode** | Mobile-first, Theme-Toggle |

**Exit:** Besucher versteht in 30 Sekunden, worum es geht, und kann zu Open OS oder MOOD navigieren.

---

## Phase B — Open OS Demo

### Milestone 2 — Open OS: Installations-Simulation

**Goal:** Interaktive Demo, die zeigt, wie man Open OS (NixOS-basiert) zum ersten Mal installiert — aus Admin-Sicht.

| # | Deliverable | Details |
|---|-------------|---------|
| 2.1 | **OS-Setup Wizard UI** | Schritt-für-Schritt-Assistent (Wizard-Pattern) |
| 2.2 | **Schritt: Willkommen** | Erklärung, was Open OS ist und was jetzt passiert |
| 2.3 | **Schritt: Features konfigurieren** | On/Off-Schalter für OS-Features (z.B. VPN, TOR, Firewall, Malware-Schutz, Auto-Updates, Federated Auth) |
| 2.4 | **Schritt: Ressourcen verteilen** | CPU, RAM, Storage — Slider oder Eingabefelder, visuelle Anzeige |
| 2.5 | **Schritt: Festplatten auswählen** | Festplatten-Liste, Partitionierung (vereinfacht), Verschlüsselung on/off |
| 2.6 | **Schritt: Zusammenfassung** | Review aller Einstellungen vor "Installation" |
| 2.7 | **Installations-Animation** | Simulated install progress (NixOS-artig: Pakete werden "gebaut") |

**Exit:** Admin hat ein virtuelles Open OS "installiert" mit gewählter Konfiguration.

---

### Milestone 3 — Open OS: Admin-Dashboard & User-Erstellung

**Goal:** Nach der "Installation" landet der Admin in einem Dashboard und kann Benutzer anlegen. Diese Benutzer werden real erstellt (Auth-System).

| # | Deliverable | Details |
|---|-------------|---------|
| 3.1 | **Admin-Dashboard** | Übersicht: System-Status, aktive Features, Ressourcen-Auslastung |
| 3.2 | **Feature-Verwaltung** | On/Off-Schalter nachträglich ändern (gleiche wie im Wizard) |
| 3.3 | **Benutzer hinzufügen** | Formular: Name, Rolle (Admin/Member), Passwort |
| 3.4 | **Benutzerliste** | Übersicht aller erstellten Benutzer mit Status |
| 3.5 | **Gruppe erstellen** | Admin erstellt eine Gruppe für die Benutzer |
| 3.6 | **Auth-Backend** | Prisma + Neon DB: User-Tabelle, Gruppen-Tabelle, Session-Management |
| 3.7 | **Login-System** | Erstellte Benutzer können sich tatsächlich einloggen |
| 3.8 | **Weiterleitung zu MOOD** | CTA: "Gruppe in MOOD starten" → leitet zu MOOD mit Gruppe + Benutzern |

**Exit:** Admin hat Benutzer erstellt, die sich einloggen können. Die Gruppe existiert im Backend und ist bereit für MOOD.

---

### Milestone 4 — Auth & Persistence (Shared Layer)

**Goal:** Das Auth- und Daten-System, das Open OS und MOOD gemeinsam nutzen.

| # | Deliverable | Details |
|---|-------------|---------|
| 4.1 | **Prisma Schema** | User, Group, Membership, Session + MOOD-Entities (Process, Module, etc.) |
| 4.2 | **Neon DB** | PostgreSQL-Instanz provisioniert |
| 4.3 | **Auth-Lösung** | NextAuth oder custom (Credentials Provider) — Benutzer aus Open OS können sich überall einloggen |
| 4.4 | **Session-Management** | Server-side Sessions (Upstash Redis oder DB-backed) |
| 4.5 | **API-Grundstruktur** | `src/app/api/` — Auth-Endpunkte, User-CRUD, Group-CRUD |
| 4.6 | **Middleware** | Route protection: Open OS Admin-Bereich nur für Admins, MOOD nur für Gruppenmitglieder |

**Exit:** Ein in Open OS erstellter Benutzer kann sich einloggen und wird in MOOD als Gruppenmitglied erkannt.

---

## Phase C — MOOD (Deliberation)

### Milestone 5 — MOOD: Domain Model & Seed Data

**Goal:** Typsystem und Seed-Daten für die Deliberation, aufbauend auf der bestehenden Auth/Gruppen-Schicht.

| # | Deliverable | Details |
|---|-------------|---------|
| 5.1 | **Domain-Typen** | `Process`, `Module` (8 Varianten), `Comment`, `Vote`, `Task`, `Appointment`, `Chat` |
| 5.2 | **Seed-Daten** | Kuratierte Demo-Szenarien (≥ 3 Gruppen mit Prozessen) |
| 5.3 | **DB-Seeder** | Script das Seed-Daten in die DB schreibt |
| 5.4 | **Daten-Split** | Seed (Baseline, read-only) vs. Instanz-Daten (User-Änderungen) |

**Exit:** Seed-Daten in der DB; API kann Prozesse/Module für eine Gruppe abfragen.

---

### Milestone 6 — MOOD: Layout & Navigation

**Goal:** MOOD-Bereich mit Sidebar-Navigation und allen Routen.

| # | Deliverable | Details |
|---|-------------|---------|
| 6.1 | **MOOD-Layout** | Sidebar + Content-Bereich, eingeloggt als Gruppen-Mitglied |
| 6.2 | **Sidebar-Navigation** | About, Debate, Discussions, Messages, Calendar, Tasks, Subgroups, Profile |
| 6.3 | **Group-Header** | Zeigt aktuelle Gruppe, Mitglieder-Anzahl, Modus (A/B/C) |
| 6.4 | **Responsive** | Sidebar klappt auf Mobile ein |

**Exit:** Eingeloggter Benutzer sieht die MOOD-Navigation mit seiner Gruppe.

---

### Milestone 7 — MOOD: Deliberation Core (Module Renderers)

**Goal:** Alle 8 Modul-Typen rendern und sind interaktiv. Herzstück von MOOD.

| # | Deliverable | Details |
|---|-------------|---------|
| 7.1 | **Module-Router** | `moduleContent.tsx` — rendert je nach `module.type` |
| 7.2 | **IdeationSection** | Ideen einreichen + anzeigen |
| 7.3 | **DebateSection** | Threaded Discussion |
| 7.4 | **EstimateSection** | Konsequenzen-Abschätzung |
| 7.5 | **PrioritizeSection** | Ranking-UI |
| 7.6 | **VoteSection** | Abstimmung + Ergebnisse |
| 7.7 | **ExternalDecisionSection** | Admin-Entscheidung + Statement |
| 7.8 | **AnnouncementSection** | Read-only Ankündigung |
| 7.9 | **Prozess-Timeline** | Visualisierung: welche Module, wo steht man |

**Exit:** Benutzer kann einen Prozess öffnen, durch Module steppen und interagieren.

---

### Milestone 8 — MOOD: Alle Sidebar-Seiten

**Goal:** Alle restlichen Seiten mit echten Daten.

| # | Deliverable | Details |
|---|-------------|---------|
| 8.1 | **About** | Gruppen-Info, Regeln, Mitgliederliste |
| 8.2 | **Subgroups** | Untergruppen anzeigen + navigieren |
| 8.3 | **Discussions** | Diskussions-Threads (außerhalb von Prozessen) |
| 8.4 | **Messages** | Direkt- / Gruppennachrichten |
| 8.5 | **Calendar** | Termine |
| 8.6 | **Tasks** | Aufgabenliste |
| 8.7 | **Profile** | Mitglieder-Profil (`/profile/[id]`) |

**Exit:** Alle Seiten zeigen echte Daten. Die kuratierte Demo ist komplett begehbar.

---

### Milestone 9 — MOOD: Interaktion & Persistenz

**Goal:** Alles, was Benutzer schreiben/voten/ändern, wird gespeichert.

| # | Deliverable | Details |
|---|-------------|---------|
| 9.1 | **Kommentare schreiben** | In Debates, Discussions, Messages |
| 9.2 | **Abstimmen** | Votes in VoteSection → DB |
| 9.3 | **Ideen einreichen** | IdeationSection → DB |
| 9.4 | **Ranking** | PrioritizeSection → DB |
| 9.5 | **Prozesse erstellen** | Neuen Prozess anlegen, Module wählen |
| 9.6 | **Gruppen-Modi (A/B/C)** | Berechtigungsmodell je Gruppe |

**Exit:** Mehrere Benutzer können gleichzeitig in einer Gruppe deliberieren; Änderungen sind persistent.

---

## Phase D — Integration & Release

### Milestone 10 — End-to-End Flow

**Goal:** Der gesamte Pfad funktioniert durchgängig: Vorstellungsseite → Open OS Setup → User erstellen → MOOD nutzen.

| # | Deliverable | Details |
|---|-------------|---------|
| 10.1 | **Flow-Testing** | Kompletter Durchlauf als neuer Besucher |
| 10.2 | **Direkt-Einstieg MOOD** | Alternativer Pfad: Vorstellungsseite → MOOD (mit eigenem Login/Registrierung) |
| 10.3 | **MOOD als Teil von Open OS** | In der Open OS Admin-Ansicht: MOOD als aktivierbares Feature |
| 10.4 | **Collaborative Sandbox** | Gruppe startet mit Starter Kit (1 Gruppe + 1 Beispiel-Prozess) |

**Exit:** Beide Wege (Open OS → MOOD und direkt MOOD) funktionieren end-to-end.

---

### Milestone 11 — Polish & Alpha Release

**Goal:** Produktionsreife Alpha.

| # | Deliverable | Details |
|---|-------------|---------|
| 11.1 | **UI Polish** | Konsistentes Design, Animationen, Ladezustände, Fehlerbehandlung |
| 11.2 | **Accessibility** | Keyboard-Navigation, Screenreader, Kontrast |
| 11.3 | **E2E Tests** | Kritische Flows: Open OS Setup → User erstellen → MOOD Deliberation → Vote |
| 11.4 | **Performance** | Lighthouse, Bundle-Optimierung |
| 11.5 | **Dokumentation** | README, Setup-Guide, Contribution-Guide |
| 11.6 | **Vercel Production Deploy** | Custom Domain, Env-Variablen, Monitoring |
| 11.7 | **Video für Vorstellungsseite** | Missions-/Motivationsvideo einbetten |

**Exit:** Ein neuer Besucher versteht das Konzept in Minuten und kann eine Deliberation end-to-end durchspielen.

---

## Risk register

| Risk | Mitigation |
|------|-----------|
| Open OS Demo wird zu komplex | Nur simuliert, kein echtes NixOS — reine Web-UI |
| Auth-Komplexität | Einfachste Lösung zuerst (NextAuth Credentials); später erweiterbar |
| Scope Creep bei Modul-Typen | Alpha = 8 Kerntypen; Erweiterbarkeit ist architektonisch, nicht Feature-shipped |
| Zwei Einstiegswege = doppelte Arbeit | Shared Auth/DB-Layer (M4) verhindert Dopplung |
| NixOS-Bezug unklar für Nicht-Techniker | Wizard erklärt jeden Schritt; Fachbegriffe werden übersetzt |

---

## Sequencing summary

```
Phase A — Foundation
  M0   Project Bootstrap          ─┐
  M1   Vorstellungsseite           │  Basis
                                  ─┘
Phase B — Open OS
  M2   Installations-Simulation   ─┐
  M3   Admin & User-Erstellung     │  Open OS Demo
  M4   Auth & Persistence (Shared)─┘
Phase C — MOOD
  M5   Domain Model & Seed Data   ─┐
  M6   Layout & Navigation         │
  M7   Deliberation Core           │  MOOD
  M8   Sidebar Pages               │
  M9   Interaktion & Persistenz   ─┘
Phase D — Integration
  M10  End-to-End Flow            ─┐
  M11  Polish & Alpha Release     ─┘  Ship
```
