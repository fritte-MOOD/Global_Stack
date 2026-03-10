/*
 * ProjectWindow.tsx — Fenster-Component für Projekte.
 *
 * Nutzung auf Seiten:
 *   <ProjectWindow name="OpenOS" />
 *   <ProjectWindow name="Mood" />
 *
 * REIN:  name (string) — der Name des Projekts
 * RAUS:  ein <Tag> im Fließtext, der on-hover und on-click den Inhalt zeigt
 *
 * Aufbau:
 *   1. projects        → Daten-Objekt: definiert alle Projekte nach Name
 *   2. ProjectContent   → der angezeigte Inhalt (IDENTISCH für Tooltip UND Fenster)
 *   3. ProjectWindow    → Haupt-Component, verbindet alles über <Tag>
 *
 * On-hover und on-click zeigen exakt den gleichen Inhalt.
 * Der Tooltip sieht aus wie das Fenster (gleiche Breite, gleiche Position,
 * mit Titelleiste). Beim Klick wird es zum echten Fenster (draggable + X).
 */

import { Monitor, Music, MessageSquare, BarChart3 } from "lucide-react";
import type { ReactNode } from "react";
import Tag from "../logic/Tag";
import type { WindowContent } from "../logic/WindowManager";

/* ─────────────────────────────────────────────
 * 1. DATEN — Hier neue Projekte hinzufügen
 * ───────────────────────────────────────────── */

type ProjectData = {
  icon: ReactNode;           // Symbol neben dem Namen
  description: string;       // Beschreibungstext
  buttonLabel: string;       // Button-Text
  buttonHref: string;        // Button-Link
  windowWidth: number;       // Breite für Tooltip UND Fenster (gleich!)
  resizable: boolean;        // Fenster resizebar?
};

const projects: Record<string, ProjectData> = {
  OpenOS: {
    icon: <Monitor className="size-8 text-brand-600" />,
    description:
      "A browser-based operating system you can self-host. Runs on any device, no installation needed.",
    buttonLabel: "Open Demo",
    buttonHref: "/open-os",
    windowWidth: 340,
    resizable: false,
  },
  Mood: {
    icon: <Music className="size-8 text-brand-600" />,
    description:
      "Democratic decision-making for groups. Organize discussions, vote on proposals and track decisions.",
    buttonLabel: "Try Mood",
    buttonHref: "/mood",
    windowWidth: 340,
    resizable: false,
  },
  Forum: {
    icon: <MessageSquare className="size-8 text-brand-600" />,
    description:
      "A self-hosted community forum. Threaded discussions, markdown support, and full-text search. Resize this window to test!",
    buttonLabel: "Open Forum",
    buttonHref: "/forum",
    windowWidth: 380,
    resizable: true,
  },
  Analytics: {
    icon: <BarChart3 className="size-8 text-brand-600" />,
    description:
      "Privacy-friendly web analytics. No cookies, no tracking, fully GDPR-compliant. Resize this window to test!",
    buttonLabel: "View Dashboard",
    buttonHref: "/analytics",
    windowWidth: 400,
    resizable: true,
  },
};

/* ─────────────────────────────────────────────
 * 2. INHALT — EINE Funktion für Tooltip UND Fenster
 *
 *    Das hier ist was der Nutzer sieht, sowohl beim
 *    Hovern als auch nach dem Klick. Identisch.
 * ───────────────────────────────────────────── */

function ProjectContent({ name, data }: { name: string; data: ProjectData }) {
  return (
    <div className="p-4 flex flex-col items-center gap-3 text-center">
      {/* Icon + Name */}
      <div className="flex items-center gap-3">
        {data.icon}
        <h4 className="font-heading text-lg font-semibold text-brand-900">{name}</h4>
      </div>

      {/* Beschreibung */}
      <p className="text-sm text-brand-950 leading-relaxed">{data.description}</p>

      {/* Button */}
      <a
        href={data.buttonHref}
        className="mt-1 inline-flex items-center justify-center rounded-md border border-brand-800 bg-brand-0 px-4 py-2 text-sm font-medium text-brand-900 shadow-sm shadow-brand-200 transition-all hover:shadow-md hover:ring-2 hover:ring-brand-300 hover:ring-offset-2 hover:ring-offset-brand-25 hover:border-transparent"
      >
        {data.buttonLabel}
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * 3. HAUPT-COMPONENT — das was auf Seiten benutzt wird
 *
 *    <ProjectWindow name="OpenOS" />
 *
 *    Erzeugt einen <Tag> der:
 *      - on-hover: Tooltip mit ProjectContent zeigt
 *      - on-click: Fenster mit ProjectContent öffnet
 *    Breite ist für beide gleich (windowWidth).
 * ───────────────────────────────────────────── */

export default function ProjectWindow({ name }: { name: string }) {
  const data = projects[name];
  if (!data) return <span>{name}</span>;

  /* Gleicher Inhalt für Tooltip und Fenster */
  const content = <ProjectContent name={name} data={data} />;

  const windowContent: WindowContent = {
    title: name,
    body: content,              // ← on-click Fenster-Inhalt
    width: data.windowWidth,    // ← Fensterbreite (= Tooltip-Breite)
    resizable: data.resizable,
  };

  return (
    <Tag
      id={`project-${name.toLowerCase()}`}
      tooltip={content}
      window={windowContent}
      tooltipWidth={data.windowWidth}
      className="font-semibold underline decoration-brand-300 underline-offset-2 transition-colors text-brand-900"
      activeClassName="text-brand-700"
    >
      {name}
    </Tag>
  );
}
