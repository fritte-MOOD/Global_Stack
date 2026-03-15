/*
 * Tag.tsx — Macht ein beliebiges Element hover- und klickbar für Fenster.
 *
 * Hover → zeigt Tooltip (sieht exakt aus wie das spätere Fenster, gleiche
 *         Position, gleiche Breite, mit Titelleiste)
 * Click → öffnet/schließt ein DraggableWindow an der gleichen Stelle
 *
 * REIN (Props):
 *   - id:              eindeutige ID für den WindowManager
 *   - children:        beliebiges React-Element als Trigger (Text, Kachel, Bild, Box...)
 *   - tooltip:         ReactNode, on-hover im Tooltip-Body angezeigt
 *   - window:          WindowContent, on-click als Fenster geöffnet
 *   - tooltipWidth:    Breite des Tooltips in px (= Fensterbreite, default 320)
 *   - className:       Basis-CSS-Klassen für den Trigger-Wrapper
 *   - activeClassName: zusätzliche Klassen wenn hovered oder Fenster offen
 *
 * RAUS: ein Wrapper um children + Fenster-Vorschau bei Hover
 *
 * Nutzung:
 *   <Tag id="cal" tooltip={...} window={...}>Calendar</Tag>           ← Text
 *   <Tag id="cal" tooltip={...} window={...}><MyTile /></Tag>         ← Kachel
 *   <Tag id="cal" tooltip={...} window={...}><img src="..." /></Tag>  ← Bild
 */

"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useWindowManager, type WindowContent } from "./WindowManager";

type TagProps = {
  id: string;
  children: ReactNode;
  tooltip?: ReactNode;
  window: WindowContent;
  tooltipWidth?: number;
  className?: string;
  activeClassName?: string;
};

export default function Tag({
  id,
  children,
  tooltip,
  window: windowContent,
  tooltipWidth = 320,
  className = "",
  activeClassName = "",
}: TagProps) {
  const { toggleWindow, isWindowOpen, containerRef } = useWindowManager();
  const tagRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [tooltipAnchor, setTooltipAnchor] = useState({ x: 0, y: 0 });

  const pinned = isWindowOpen(id);

  const computeAnchor = useCallback(() => {
    const rect = tagRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    const container = containerRef.current;
    if (container) {
      const cr = container.getBoundingClientRect();
      return {
        x: rect.left - cr.left,
        y: rect.bottom - cr.top + 6,
      };
    }
    return {
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY + 6,
    };
  }, [containerRef]);

  const handleMouseEnter = useCallback(() => {
    setTooltipAnchor(computeAnchor());
    setHovered(true);
  }, [computeAnchor]);

  const handleClick = useCallback(() => {
    const pos = computeAnchor();
    toggleWindow(id, windowContent, pos);
  }, [id, windowContent, toggleWindow, computeAnchor]);

  const tooltipEl = tooltip && hovered && !pinned ? (
    <div
      className="absolute z-40 flex flex-col rounded-lg border border-brand-200 bg-brand-50 shadow-lg shadow-brand-200/60 box-border pointer-events-none"
      style={{
        width: tooltipWidth,
        left: tooltipAnchor.x,
        top: tooltipAnchor.y,
      }}
    >
      <div className="flex items-center px-3 h-8 border-b border-brand-200 shrink-0">
        <span className="font-heading text-xs font-medium text-brand-950 flex-1 text-left">
          {windowContent.title}
        </span>
      </div>

      <div className="flex-1 overflow-hidden font-normal">
        {tooltip}
      </div>
    </div>
  ) : null;

  const portalTarget = containerRef.current;

  return (
    <div
      ref={tagRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      className={`cursor-pointer inline-block ${className} ${hovered || pinned ? activeClassName : ""}`}
    >
      {children}
      {tooltipEl && portalTarget
        ? createPortal(tooltipEl, portalTarget)
        : tooltipEl}
    </div>
  );
}
