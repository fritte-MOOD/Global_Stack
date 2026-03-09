# Window Manager

## Ordnerstruktur

```
components/window-manager/
├── index.ts                    Barrel-Export
├── logic/
│   ├── DraggableWindow.tsx     Fenster-UI: Drag, Resize, X-Close
│   ├── WindowManager.tsx       Context-Provider: verwaltet offene Fenster
│   └── Tag.tsx                 Inline-Element: Hover=Tooltip, Click=Fenster
└── windows/
    └── ProjectWindow.tsx       Beispiel: <ProjectWindow name="OpenOS" />
```

## Nutzung auf Seiten

```tsx
import ProjectWindow from "@/components/window-manager/windows/ProjectWindow";

<p>
  Try <ProjectWindow name="OpenOS" /> or <ProjectWindow name="Mood" />.
</p>
```

Das ist alles. Der Component steuert Hover-Tooltip und Click-Fenster selbst.

## Wie ein Window-Component aufgebaut ist

Jeder Window-Component in `windows/` besteht aus:

1. **Daten-Objekt** - definiert alle Inhalte nach Name
2. **Tooltip-Component** - was on-hover angezeigt wird (kurz)
3. **Body-Component** - was im Fenster angezeigt wird (ausführlich)
4. **Haupt-Component** - verbindet alles über `<Tag />`

```tsx
// windows/MeinFenster.tsx

import Tag from "../logic/Tag";
import type { WindowContent } from "../logic/WindowManager";

const daten: Record<string, { kurz: string; lang: string }> = {
  "Beispiel": { kurz: "Kurzer Teaser", lang: "Ausführliche Beschreibung..." },
};

function MeinTooltip({ text }: { text: string }) {
  return <span className="text-xs text-brand-950">{text}</span>;
}

function MeinBody({ text }: { text: string }) {
  return <div className="p-4 text-sm text-brand-950">{text}</div>;
}

export default function MeinFenster({ name }: { name: string }) {
  const d = daten[name];
  if (!d) return <span>{name}</span>;

  const windowContent: WindowContent = {
    title: name,
    body: <MeinBody text={d.lang} />,
    width: 300,
    // height: 400,      ← optional, sonst auto
    // resizable: true,   ← optional, default false
  };

  return (
    <Tag
      id={`mein-${name}`}
      label={name}
      tooltip={<MeinTooltip text={d.kurz} />}
      window={windowContent}
      className="underline cursor-pointer text-brand-900"
      activeClassName="text-brand-700"
    />
  );
}
```

## Tag-Component API

```tsx
<Tag
  id="eindeutige-id"           // ID für den WindowManager
  label="Angezeigter Text"     // was im Fließtext steht
  tooltip={<>Hover-Inhalt</>}  // ReactNode, on-hover
  window={windowContent}       // WindowContent, on-click
  tooltipWidth={220}           // optional, default 256
  className="..."              // Basis-Styles
  activeClassName="..."        // zusätzlich wenn hovered oder Fenster offen
/>
```

## WindowContent Type

```tsx
type WindowContent = {
  title: string;        // Titelleiste
  body: ReactNode;      // Fenster-Inhalt
  width?: number;       // default 320
  height?: number;      // optional, sonst auto
  resizable?: boolean;  // default false
};
```

## Fenster-Interaktion

- **Hover** auf Tag → Tooltip am Cursor
- **Click** auf Tag → Fenster öffnet sich unter dem Tag
- **Nochmal Click** → Fenster schließt sich (Toggle)
- **X-Button** oben rechts → Fenster schließen
- **ESC** → alle Fenster schließen
- **Drag** an Titelleiste → Fenster verschieben
- **Resize-Handle** unten rechts (nur bei `resizable: true`)

## Provider

`WindowManagerProvider` ist im Root-Layout (`app/layout.tsx`) eingebunden.
Fenster funktionieren auf allen Seiten automatisch.

## Datenbank-Anbindung

Body-Components sind normale React-Komponenten. Sie können:
- `fetch()` / API-Routes aufrufen
- Server Actions nutzen
- React Query / SWR verwenden
- Suspense + Loading States haben
