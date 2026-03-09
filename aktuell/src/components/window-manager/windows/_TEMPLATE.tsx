/*
 * _TEMPLATE.tsx — Kopiervorlage für neue Fenster-Components.
 *
 * So geht's:
 *   1. Diese Datei kopieren und umbenennen (z.B. UserWindow.tsx)
 *   2. "Template" überall durch deinen Namen ersetzen (z.B. "User")
 *   3. TemplateData anpassen: welche Felder brauchst du?
 *   4. entries befüllen: Daten für jeden Eintrag
 *   5. TemplateContent anpassen: wie soll der Inhalt aussehen?
 *   6. id-Prefix in <Tag> anpassen (z.B. "user-" statt "template-")
 *
 * Nutzung auf Seiten:
 *   import TemplateWindow from "@/components/window-manager/windows/TemplateWindow";
 *   <p>Klick auf <TemplateWindow name="Beispiel" /> um mehr zu sehen.</p>
 *
 * WICHTIG: On-hover und on-click zeigen den GLEICHEN Inhalt.
 * Der Tooltip sieht exakt aus wie das Fenster — gleiche Breite, gleiche
 * Stelle, mit Titelleiste. Beim Klick wird es draggable + hat X zum Schließen.
 */

import Tag from "../logic/Tag";
import type { WindowContent } from "../logic/WindowManager";

/* ─────────────────────────────────────────────
 * 1. DATEN — Felder anpassen, Einträge hinzufügen
 * ───────────────────────────────────────────── */

type TemplateData = {
  description: string;       // Passe diese Felder an deine Bedürfnisse an
  windowWidth: number;       // Breite für Tooltip UND Fenster (immer gleich!)
  // windowHeight?: number;  // optional: feste Höhe
  resizable: boolean;        // Fenster resizebar?
};

const entries: Record<string, TemplateData> = {
  Beispiel: {
    description: "Hier steht die Beschreibung für diesen Eintrag.",
    windowWidth: 320,
    resizable: false,
  },
  // Weitere Einträge hier:
  // "Noch Eins": {
  //   description: "...",
  //   windowWidth: 320,
  //   resizable: false,
  // },
};

/* ─────────────────────────────────────────────
 * 2. INHALT — wird IDENTISCH für Tooltip UND Fenster verwendet
 *
 *    ┌─────────────────────────────┐
 *    │  Titelleiste  (automatisch) │ ← Tag.tsx / DraggableWindow
 *    ├─────────────────────────────┤
 *    │                             │
 *    │  TemplateContent            │ ← DAS HIER definierst DU
 *    │  (on-hover = on-click)      │
 *    │                             │
 *    └─────────────────────────────┘
 *
 *    Alles was du hier reinschreibst, erscheint sowohl im
 *    Hover-Tooltip als auch im geklickten Fenster.
 * ───────────────────────────────────────────── */

function TemplateContent({ name, data }: { name: string; data: TemplateData }) {
  return (
    <div className="p-4 flex flex-col items-center gap-2 text-center">
      <h4 className="font-heading text-lg font-semibold text-brand-900">{name}</h4>
      <p className="text-sm text-brand-950 leading-relaxed">{data.description}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * 3. HAUPT-COMPONENT — auf Seiten benutzen als:
 *    <TemplateWindow name="Beispiel" />
 *
 *    Verbindet Daten + Inhalt + Tag:
 *
 *    ┌──────────────────────────────────────┐
 *    │  Tag (logic/Tag.tsx)                 │
 *    │  ├─ label:        "Beispiel"         │  ← im Fließtext sichtbar
 *    │  ├─ tooltip:      <TemplateContent>  │  ← on-hover (Tooltip)
 *    │  ├─ window.body:  <TemplateContent>  │  ← on-click (Fenster)
 *    │  └─ tooltipWidth: 320                │  ← gleiche Breite wie Fenster
 *    └──────────────────────────────────────┘
 * ───────────────────────────────────────────── */

export default function TemplateWindow({ name }: { name: string }) {
  const data = entries[name];
  if (!data) return <span>{name}</span>;

  /* Gleicher Inhalt für Tooltip und Fenster */
  const content = <TemplateContent name={name} data={data} />;

  const windowContent: WindowContent = {
    title: name,
    body: content,              // ← on-click: Fenster-Inhalt
    width: data.windowWidth,    // ← Fensterbreite
    // height: data.windowHeight,
    resizable: data.resizable,
  };

  return (
    <Tag
      id={`template-${name.toLowerCase()}`}    /* ← Prefix anpassen! */
      label={name}
      tooltip={content}           /* ← on-hover: Tooltip-Inhalt (= gleich!) */
      window={windowContent}
      tooltipWidth={data.windowWidth}  /* ← gleiche Breite wie Fenster! */
      className="font-semibold underline decoration-brand-300 underline-offset-2 transition-colors text-brand-900"
      activeClassName="text-brand-700"
    />
  );
}
