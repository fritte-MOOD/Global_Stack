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
 *
 *   Als Inline-Text:
 *     <TemplateWindow name="Beispiel" />
 *
 *   Mit beliebigem Trigger-Element (Kachel, Bild, Box...):
 *     <TemplateWindow name="Beispiel">
 *       <div className="p-4 border rounded-lg">Klick mich!</div>
 *     </TemplateWindow>
 *
 * On-hover und on-click zeigen den GLEICHEN Inhalt.
 * Der Tooltip sieht exakt aus wie das Fenster — gleiche Breite, gleiche
 * Stelle, mit Titelleiste. Beim Klick wird es draggable + hat X zum Schließen.
 */

import type { ReactNode } from "react";
import Tag from "../logic/Tag";
import type { WindowContent } from "../logic/WindowManager";

/* ─────────────────────────────────────────────
 * 1. DATEN — Felder anpassen, Einträge hinzufügen
 * ───────────────────────────────────────────── */

type TemplateData = {
  description: string;
  windowWidth: number;
  // windowHeight?: number;
  resizable: boolean;
};

const entries: Record<string, TemplateData> = {
  Beispiel: {
    description: "Hier steht die Beschreibung für diesen Eintrag.",
    windowWidth: 320,
    resizable: false,
  },
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
 * ───────────────────────────────────────────── */

function TemplateContent({ name, data }: { name: string; data: TemplateData }) {
  return (
    <div className="p-4 flex flex-col items-center gap-2 text-center">
      <h4 className="font-heading text-lg font-semibold text-brand-950">{name}</h4>
      <p className="text-sm text-brand-950 leading-relaxed">{data.description}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * 3. HAUPT-COMPONENT
 *
 *    Als Text:    <TemplateWindow name="Beispiel" />
 *    Als Kachel:  <TemplateWindow name="Beispiel"><MyTile /></TemplateWindow>
 *
 *    Ohne children → rendert den Namen als unterstrichenen Text.
 *    Mit children  → rendert children als Trigger (Kachel, Box, Bild, ...).
 * ───────────────────────────────────────────── */

export default function TemplateWindow({ name, children }: { name: string; children?: ReactNode }) {
  const data = entries[name];
  if (!data) return <span>{name}</span>;

  const content = <TemplateContent name={name} data={data} />;

  const windowContent: WindowContent = {
    title: name,
    body: content,
    width: data.windowWidth,
    resizable: data.resizable,
  };

  return (
    <Tag
      id={`template-${name.toLowerCase()}`}    /* ← Prefix anpassen! */
      tooltip={content}
      window={windowContent}
      tooltipWidth={data.windowWidth}
      className={children ? "" : "font-semibold underline decoration-brand-200 underline-offset-2 transition-colors text-brand-950"}
      activeClassName={children ? "" : "text-brand-950"}
    >
      {children ?? name}
    </Tag>
  );
}
