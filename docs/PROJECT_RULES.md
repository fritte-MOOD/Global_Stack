# Project Rules & Guidelines

Documentation and conventions for the Global Stack project.

---

## Working Directories

**Active development ONLY in:**

- `/aktuell` — The active Next.js application
- `/docs` — Project documentation

**NEVER modify:**
- `/legacy/prototype_1` — Original MOOD reference design
- `/legacy/prototype_2` — Previous app version (archived)

---

## Documentation

This file must be kept up-to-date when:
- New project rules are established
- Design decisions are made
- Technical conventions change
- User feedback is incorporated

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Framework** | Next.js (App Router) | 16.1 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **State** | React Context (WindowManager, GroupFilter, ContextMenu) | — |
| **Icons** | Lucide React | 0.577 |
| **ORM** | Prisma | 7.4 |
| **Database** | SQLite (local via better-sqlite3) / Turso (remote) | — |
| **Auth** | Custom (bcryptjs + Session Cookie) | — |
| **Deploy** | Vercel (Dublin region) + Turso | — |
| **License** | AGPL-3.0 | — |

---

## Project Structure (`/aktuell`)

```
aktuell/
├── prisma/
│   ├── schema.prisma          Data model (15 tables)
│   ├── seed.ts                Demo data (3 servers, 9 subgroups, 8 users, chats, events, tasks, docs)
│   └── prisma.config.ts       CLI config
├── src/
│   ├── app/
│   │   ├── _actions/          Global Server Actions
│   │   │   ├── events.ts      loadEvents, createEvent, loadEventDetails, updateRSVP, addComment, toggleReaction
│   │   │   ├── groups.ts      loadGroups, loadGroupsWithMembers (with parentId)
│   │   │   ├── chats.ts       loadChats, loadChatMessages, sendChatMessage, createChat, deleteChat, loadAvailableUsers
│   │   │   ├── tasks.ts       loadTaskDetails, createTask, toggleTaskDone, updateTask
│   │   │   ├── members.ts     loadGroupTree, loadGroupDetail, loadGroupMembers, loadMemberProfile, loadAllMembers
│   │   │   ├── search.ts      globalSearch (parallel queries across all content types)
│   │   │   └── messages.ts    (Legacy, replaced by chats.ts)
│   │   ├── api/               API Routes (demo-users, cron/cleanup)
│   │   ├── (site)/            Route Group: Public pages with navbar
│   │   │   ├── (landing)/     Landing Page (with "Try Workspace" link)
│   │   │   └── open-os/       OpenOS Demo
│   │   │       ├── client/    Client View (Laptop/Tablet/Mobile)
│   │   │       ├── server/    Server View (Coming Soon)
│   │   │       └── _actions/  Server Actions for demo data
│   │   ├── workspace/         Route Group: Persistent app (fullscreen)
│   │   │   ├── page.tsx       Desktop (Shared Desktop Component)
│   │   │   ├── login/         Login page (Username/Password + Demo Users)
│   │   │   ├── register/      Registration page
│   │   │   ├── [slug]/        Dynamic community pages
│   │   │   └── _actions/      Server Actions (auth, clone-template, load-user-data)
│   │   ├── layout.tsx         Root Layout
│   │   └── globals.css        Tailwind + CSS Variables (Light/Dark)
│   ├── components/
│   │   ├── desktop/           Shared Desktop component
│   │   │   ├── Desktop.tsx    Main component (Footer, Menus, WindowManager, DarkMode, Search)
│   │   │   ├── GroupFilterContext.tsx  Global group filter (tri-state checkboxes, all selected by default)
│   │   │   ├── ContextMenu.tsx        Custom right-click menu
│   │   │   └── index.ts
│   │   ├── ui/                UI components (DeviceSwitcher, DarkModeToggle)
│   │   └── window-manager/    Window system
│   │       ├── logic/         WindowManager, DraggableWindow, Tag
│   │       └── windows/       App windows (10 window components)
│   ├── lib/
│   │   ├── db.ts              Prisma Client Singleton (auto-detects SQLite vs Turso)
│   │   └── auth.ts            Auth helpers (getSession, getUserFromCookie)
│   └── middleware.ts          Route Protection (/workspace/*)
├── dev.db                     SQLite database (local, .gitignore)
├── package.json               Dependencies
├── vercel.json                Region config (dub1 for Turso proximity)
└── next.config.ts             Next.js config (serverExternalPackages, ignoreBuildErrors)
```

---

## Database

### Principles

1. **Data belongs to groups, not users** — Users access via memberships
2. **Hierarchy**: Server (parentId=null) → Subgroups (parentId set), any depth
3. **Templates**: Copyable structures with `isTemplate=true`
4. **Two modes**: Demo (session-only) vs. Workspace (persistent)

### Schema (15 Models)

```prisma
model User {
  id, email, name, nickname, avatarUrl, description, passwordHash, isDemo
  memberships[], messages[], tasks[], documents[], processes[], sessions[]
  chatParticipants[]
}

model Session { id, token, userId, expiresAt }

model Group {
  id, slug, name, subtitle, color, icon
  parentId (self-referencing hierarchy)
  visibility ("public" | "private" | "hidden")
  isTemplate, templateDescription
  memberships[], messages[], events[], tasks[], documents[], processes[], chats[]
}

model Membership { userId, groupId, role }
model Chat { id, type ("group" | "direct"), subject?, groupId?, participants[], messages[] }
model ChatParticipant { chatId, userId }
model Message { content, authorId, groupId?, chatId? }
model Event { title, description?, location?, startsAt, endsAt, allDay, groupId, creatorId, invitations[], comments[], reactions[] }
model EventInvitation { eventId, userId, status ("pending" | "accepted" | "declined") }
model Comment { content, eventId, authorId, parentId (threaded replies) }
model Reaction { emoji, eventId, authorId }
model Task { title, description, done, dueAt, groupId, assigneeId, creatorId }
model Document { title, content, groupId, authorId }
model Process { title, description, status, groupId, authorId }
```

### Seed Data

- **3 Top-Level Servers**: Marin Quarter (housing co-op, Berlin), Sportclub (multi-sport, Hamburg), Rochefort (town, France)
- **9 Subgroups**: Board & Management, Community Garden, Events & Social, Basketball, Youth Program, Sportclub Board, Town Council, Volunteer Fire Dept., Youth Parliament
- **3 Templates**: Sports Club, Housing Cooperative, Municipality (each with subgroups)
- **8 Demo Users**: Alex Rivera, Sam Chen, Robin Moreau, Nina Petrova, Max Berger, Leila Dubois, Jonas Kim, Emma Larsson — all with first-person profile bios
- **Content**: Events (14), Tasks (15 with due dates), Documents (8 with group rules/guidelines), Processes (6), Chats (6 with realistic conversations)

---

## Desktop & Apps

### Shared Desktop Component (`components/desktop/Desktop.tsx`)
- **Used by**: Demo (`/open-os/client`) and Workspace (`/workspace`)
- **Mode prop**: `"demo"` vs. `"workspace"` for context-specific adjustments
- **Footer/Taskbar**: Ring menu (User/Settings/Servers), App button (3x3 grid), Search button, Group switcher, Dark Mode toggle
- **Portal Overlays**: All menus via `createPortal` → `document.body`
- **GroupFilterContext**: Global group filter with hierarchical display, tri-state checkboxes, all groups selected by default
- **ContextMenuProvider**: Custom right-click menu on the desktop
- **Keyboard Shortcuts**: `Ctrl/Cmd+K` for global search
- **Clock**: 24h format (international)

### Window System (`window-manager/`)

**DraggableWindow** — Core component:
- Drag & Drop via title bar (bounded: title bar cannot leave screen top/bottom)
- Resize from all 8 edges/corners
- Fullscreen mode (respects footer height via `bottomInset`)
- Snap-to-edge multitasking (halves, quarters, fullscreen) with visual preview
- No content scaling — larger windows show more content
- Multi-instance support (`openNewInstance`)

**WindowManager** — Context Provider:
- Manages all open windows (position, z-index, focus)
- `openWindow`, `closeWindow`, `toggleWindow`, `openNewInstance`

### Window Apps (10 Components)

1. **Calendar** — Month/Week/Day/List views, event creation, event details (RSVP, comments, reactions), inline search + global search, **focus group filter**
2. **Messages** — Messenger with group chats & direct chats, **resizable split-view** (draggable divider), chat creation/deletion, inline search + global search
3. **Tasks** — Open/Done lists sorted by due date, task detail window, task creation form, "Done" button + circle click, inline search + global search, **focus group filter**
4. **Documents** — Document list with inline reader, inline search + global search, **focus group filter**
5. **Debate** — Processes by status, inline search + global search
6. **Groups** — Two views (list + visual tree diagram), group detail with clickable stats → opens Members/Calendar/Tasks/Documents for that group
7. **Members** — All-member listing with search, group filter chips (main groups + subgroups), member profile with shared groups/events/chats/tasks, quick-create buttons
8. **Search** — Global search across all content types, multi-select type filter, time range filter, group filter
9. **Settings** — Unified settings window
10. **_TEMPLATE** — Template for new window components

### Focus Group Filter
When opening Calendar, Tasks, or Documents from a group detail view, the app opens with a temporary filter showing only that group's content (including subgroups). A dismissible banner ("Filtered: Group Name — Show all") lets the user clear the filter and see everything.

### Participant Picker
Group-first selection flow:
1. Parent form selects a group → all members (including subgroups) are auto-included
2. Subgroup toggles allow deselecting entire subgroups
3. Individual chips with X to deselect specific people
4. "Add from other groups" — collapsible search to add external people
5. Direct chats use a simplified single-person picker

---

## Search

### Global Search (`_actions/search.ts`)
- **Server-side**: Parallel Prisma queries via `Promise.all` across Messages, Events, Tasks, Documents, Processes
- **Filters**: Content type (multi-select), time range (presets), group filter (inherits global selection)
- **Access**: Desktop footer button, `Ctrl/Cmd+K`, right-click menu, magnifying glass in each app

### In-App Search
- Every app has a local search field (client-side filtering) + magnifying glass for global search (with app-specific pre-filter)

---

## Chat System

- **Group chats**: Optional group assignment, subject required
- **Direct chats**: No group context, subject optional, multiple chats with same person possible
- **Resizable split-view**: Above ≥520px width, draggable divider between chat list and chat detail
- **List toolbar**: Search row, then a second row with global search + **New chat** (`+`) aligned to the right
- **In-pane header (split view)**: Only a slim clickable **chat title** (opens participants); main chrome is the window title bar
- **Messages**: Bubble layout (bordered); **own messages right-aligned**, others left; author name opens member profile
- **Participants**: Click chat title → list + search to **add** people (`addChatParticipants` upsert)
- **Group filter**: Same rule as other apps — pick groups in the workspace bar; **direct chats** stay visible when any group is selected; **group chats** must match `groupId ∈ selectedGroupIds`
- **Creation**: "+" → dropdown (Group chat / Direct chat)
- **Deletion**: Three-dot menu on a chat row

---

## General Design Guidelines

These rules keep the workspace coherent as new apps (especially **Debate**) are added:

1. **Typography**: Window titles use the **same sans stack as body text** (`text-xs font-normal`, centered in the title bar). No separate “heading font” in window chrome.
2. **Window chrome**: **One** primary header per window (the draggable title bar). Avoid duplicating app titles inside the content area when the window is split or embedded.
3. **People & names**: Any visible **person name** that refers to a user should be **clickable** and open **`MemberProfileContent`** via `useOpenMemberProfile()` (Messages, Tasks, Calendar event detail, etc.).
4. **Neutral UI**: Prefer `text-brand-950`, `border-brand-200`, `bg-brand-0/50`; avoid blue/orange brand accents except documented `accent-*` tokens for semantics (e.g. due dates).
5. **Group filter**: Global group picker is authoritative. Per-app “focus filters” (e.g. from group detail) are **temporary** and dismissible.
6. **Density & lists**: Long multi-select lists (e.g. event participants) switch to a **searchable manager** when count ≥ **30**; below that, inline chips are OK.
7. **Forms**: Order fields from **general → specific**; put **group** selection where it matches the mental model (e.g. event: people first, then hosting **group**).
8. **Future Debate app**: Plan for **threaded or motion-based** content tied to **groups**, with neutral chrome, reusable **participant picker**, and the same **profile** and **notification** patterns as Messages/Calendar.

---

## Color System & Design Rules

### Palette
The entire application uses exclusively the `brand-*` color scale (defined in `globals.css`):

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `brand-0` | `#ffffff` | `#1a1a1a` | Surfaces (menus, popovers) |
| `brand-25` | `#fefeff` | `#131415` | Page background |
| `brand-50` | `#ffffff` | `#101010` | Card background |
| `brand-100` | `#e1ebf5` | `#2a2a2a` | Hover background |
| `brand-150` | `#d4dce4` | `#333333` | Subtle borders |
| `brand-200` | `#e6e6e6` | `#0e0e0e` | Default borders, focus rings |
| `brand-400` | `#9ca3af` | `#6b7280` | Muted text, placeholder |
| `brand-950` | `#3f3f46` | `#d8d8dc` | **Body text** (default color) |

### Alternative Accent Colors (Due Date Palette)
Reserved for semantic status indicators (e.g. task due dates):

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `accent-urgent` | `#dc2626` (red-600) | `#ef4444` (red-500) | Overdue / critical |
| `accent-warning` | `#ea580c` (orange-600) | `#f97316` (orange-500) | Due today |
| `accent-soon` | `#f97316` (orange-500) | `#fb923c` (orange-400) | Due in 1-2 days |

### Rule: No Accent Colors (General)
- **ALL text, icons, buttons** use `text-brand-950` (normal text color)
- **No** `text-brand-500/600/700/800/900` in code
- **Focus rings**: `ring-brand-200` (neutral)
- **Window buttons** (close, fullscreen) in `text-brand-950`
- The `accent-*` tokens above are the **only** exception, used strictly for semantic urgency
- General accent colors will be introduced later in a dedicated design phase

---

## UI Language

All user-facing text is in **English**. Date/time formatting uses `en-US` locale with `hour12: false` (24h clock).

---

## Deployment

- **Hosting**: Vercel (Dublin region `dub1` for Turso proximity)
- **Database**: Turso (libSQL, Ireland region)
- **Build**: `prisma generate` runs as `postinstall` hook
- **Config**: `typescript.ignoreBuildErrors: true` in `next.config.ts`
- **Auth**: `bcryptjs` (pure JS, no native modules)
- **Cleanup**: Vercel cron job deletes users inactive for 30 days

---

## Learned Preferences

1. **Window system**: Tooltips and opened windows must be identically positioned and styled
2. **Consistent fonts**: Tailwind v4 `@theme inline` with explicit `font-family` definitions
3. **Dark mode**: Accent colors removed first, to be reintroduced later
4. **Device frames**: Different colors for Light/Dark mode (CSS variables)
5. **Build optimization**: `devIndicators: false` in next.config.ts
6. **Data belongs to groups**: Content organized primarily by group, not by user
7. **Session-only demo**: OpenOS Client shows live data without persistence
8. **Fullscreen workspace**: Persistent app runs without device mockups or global navbar
9. **Copyable templates**: Users can load predefined structures into their space
10. **Group filter 0 = empty**: When no group selected, no content shown (not all)
11. **Multi-instance**: Same app can be opened multiple times
12. **No content scaling**: All windows show more content when enlarged, never scale
13. **Event details complete**: Invitations, RSVP, comments (threaded), reactions, group path
14. **24h time format**: International time display across all components
15. **First-person bios**: User profile descriptions written in first person, expandable on click
16. **Focus group filter**: Apps opened from group detail show temporary filter, dismissible with "Show all"
17. **Resizable chat columns**: Messages split-view divider is user-draggable
18. **Calendar agenda view**: Month grid with day rows, **Monday** week separator (thick top border), columns Morning / Midday / Evening, rotated month label
19. **Messages bubbles & filter**: WhatsApp-style bubbles; group filter respects workspace selection
20. **Participant bulk UI**: ≥30 selected → “Manage…” modal with search instead of chip wall

---

## Roadmap

- **M1**: ✅ Landing Page (Next.js 16, Tailwind 4, Window Manager)
- **M2**: ✅ OpenOS Demo Structure (Device Switcher, Login Flow)
- **M3**: ✅ Demo Apps Implementation (Messages, Calendar, Tasks, Documents, Debate)
- **M4**: ✅ Auth & Persistence (Prisma, SQLite, Auth, Session, Middleware, Templates)
- **M4b**: ✅ Desktop Redesign (Shared Desktop, Footer menus, Settings, Group filter)
- **M5**: ✅ Enhanced Apps (Chat system, Global search, Calendar views, Event details, Window resize, Context menu, Accent color cleanup)
- **M6**: ✅ Groups & Members (Groups list/hierarchy, Members app, Member profiles, Focus group filter, Participant picker redesign)
- **M6b**: ✅ Polish (i18n to English, seed data overhaul with 8 users, snap-to-edge, resizable chat columns, 24h time, expandable bios)

**Next steps**: **Debate** (structured threads/motions, group-scoped, design per General Design Guidelines), Server View (M7), Tablet/Mobile Screens (M8), Accent Color System (M9), Notifications (M10)
