/*
 * Tag.tsx — Ein klickbares Inline-Element im Fließtext.
 *
 * Hover → zeigt Tooltip (sieht exakt aus wie das spätere Fenster, gleiche
 *         Position, gleiche Breite, mit leerem Titelleisten-Platzhalter)
 * Click → öffnet/schließt ein DraggableWindow an der gleichen Stelle
 *
 * REIN (Props):
 *   - id:              eindeutige ID für den WindowManager
 *   - label:           angezeigter Text im Fließtext (z.B. "OpenOS")
 *   - tooltip:         ReactNode, on-hover im Tooltip-Body angezeigt
 *   - window:          WindowContent, on-click als Fenster geöffnet
 *   - tooltipWidth:    Breite des Tooltips in px (= Fensterbreite, default 320)
 *   - className:       Basis-CSS-Klassen für den Text
 *   - activeClassName: zusätzliche Klassen wenn hovered oder Fenster offen
 *
 * RAUS: ein <span> im Fließtext + Fenster-Vorschau bei Hover
 *
 * Wird von den Window-Components in windows/ benutzt (z.B. ProjectWindow).
 * Nicht direkt auf Seiten verwenden — stattdessen fertige Components nutzen.
 */

"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { useWindowManager, type WindowContent } from "./WindowManager";

type TagProps = {
  id: string;
  label: string;
  tooltip: ReactNode;        // Inhalt im Tooltip-Body (= gleicher Content wie Fenster)
  window: WindowContent;     // wird beim Klick an den WindowManager übergeben
  tooltipWidth?: number;     // Tooltip-Breite in px (sollte = Fensterbreite sein)
  className?: string;
  activeClassName?: string;
};

export default function Tag({
  id,
  label,
  tooltip,
  window: windowContent,
  tooltipWidth = 320,
  className = "",
  activeClassName = "",
}: TagProps) {
  const { toggleWindow, isWindowOpen } = useWindowManager();
  const tagRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);
  const [tooltipAnchor, setTooltipAnchor] = useState({ x: 0, y: 0 });

  const pinned = isWindowOpen(id);

  /*
   * Berechnet die Position des Tooltips/Fensters:
   * direkt unter dem Tag-Wort, linksbündig mit dem Wort.
   * So sind Tooltip und Fenster an exakt der gleichen Stelle.
   */
  const computeAnchor = useCallback(() => {
    const rect = tagRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY + 6,
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    setTooltipAnchor(computeAnchor());
    setHovered(true);
  }, [computeAnchor]);

  /* Click öffnet/schließt das Fenster an der gleichen Position wie der Tooltip */
  const handleClick = useCallback(() => {
    const pos = computeAnchor();
    toggleWindow(id, windowContent, pos);
  }, [id, windowContent, toggleWindow, computeAnchor]);

  return (
    <span
      ref={tagRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      className={`cursor-pointer ${className} ${hovered || pinned ? activeClassName : ""}`}
    >
      {label}

      {/* ── Tooltip: sieht aus wie das Fenster, gleiche Stelle ── */}
      {hovered && !pinned && (
        <div
          className="fixed z-40 flex flex-col rounded-lg border border-brand-200 bg-brand-50 shadow-lg shadow-brand-200/60 box-border pointer-events-none"
          style={{
            width: tooltipWidth,
            left: tooltipAnchor.x,
            top: tooltipAnchor.y,
          }}
        >
          {/* Titelleiste (gleich wie DraggableWindow, nur ohne X-Button) */}
          <div className="flex items-center px-3 h-8 border-b border-brand-200 shrink-0">
            <span className="font-heading text-xs font-medium text-brand-700 flex-1 text-left">
              {windowContent.title}
            </span>
          </div>

          {/* Tooltip-Inhalt (= gleicher Content wie im Fenster) */}
          <div className="flex-1 overflow-hidden font-normal">
            {tooltip}
          </div>
        </div>
      )}
    </span>
  );
}
