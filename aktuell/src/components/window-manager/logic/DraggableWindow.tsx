/*
 * DraggableWindow.tsx — Das visuelle Fenster-Element.
 *
 * Wird NICHT direkt benutzt — WindowManager rendert es automatisch.
 *
 * REIN (Props vom WindowManager):
 *   - title:           Text in der Titelleiste
 *   - children:        Fenster-Inhalt (body aus WindowContent)
 *   - initialPosition: { x, y } Startposition auf der Seite
 *   - width/height:    Größe (height optional → auto)
 *   - resizable:       zeigt Resize-Handle unten rechts
 *   - zIndex:          Stapelreihenfolge
 *   - onClose:         X-Button Callback → WindowManager.closeWindow
 *   - onFocus:         Klick aufs Fenster → WindowManager.bringToFront
 *
 * RAUS: Rendert ein Portal in document.body (oder container)
 *
 * Features:
 *   - Drag an der Titelleiste
 *   - X-Button oben rechts zum Schließen
 *   - Optionaler Resize-Handle unten rechts
 */

"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type DraggableWindowProps = {
  id: string;
  title: string;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  onClose?: () => void;
  onFocus?: () => void;
  className?: string;
  width?: number;
  height?: number;
  resizable?: boolean;
  zIndex?: number;
  container?: HTMLElement | null;
};

export default function DraggableWindow({
  title,
  children,
  initialPosition = { x: 100, y: 100 },
  onClose,
  onFocus,
  className = "",
  width: initialWidth = 320,
  height: initialHeight,
  resizable = false,
  zIndex = 50,
  container,
}: DraggableWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ offsetX: number; offsetY: number } | null>(null);
  const resizeState = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null);
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({ w: initialWidth, h: initialHeight });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /* Globale Maus-Events für Drag und Resize */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (resizeState.current) {
        const dx = e.clientX - resizeState.current.startX;
        const dy = e.clientY - resizeState.current.startY;
        setSize({
          w: Math.max(200, resizeState.current.startW + dx),
          h: Math.max(120, resizeState.current.startH + dy),
        });
        return;
      }

      if (!dragState.current) return;

      if (container) {
        const rect = container.getBoundingClientRect();
        setPosition({
          x: e.clientX - dragState.current.offsetX - rect.left,
          y: e.clientY - dragState.current.offsetY - rect.top,
        });
      } else {
        setPosition({
          x: e.clientX - dragState.current.offsetX + window.scrollX,
          y: e.clientY - dragState.current.offsetY + window.scrollY,
        });
      }
    };

    const onUp = () => {
      if (dragState.current || resizeState.current) {
        dragState.current = null;
        resizeState.current = null;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [container]);

  const startDrag = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    onFocus?.();

    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;

    dragState.current = {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  };

  const startResize = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus?.();

    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;

    resizeState.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: rect.width,
      startH: rect.height,
    };
    document.body.style.cursor = "nwse-resize";
    document.body.style.userSelect = "none";
  };

  if (!mounted) return null;

  const style: React.CSSProperties = {
    position: "absolute",
    left: position.x,
    top: position.y,
    width: size.w,
    ...(size.h ? { height: size.h } : {}),
    zIndex,
  };

  const el = (
    <div
      ref={windowRef}
      className={`flex flex-col rounded-lg border border-brand-200 bg-brand-50 shadow-lg shadow-brand-200/60 box-border ${className}`}
      style={style}
      onMouseDown={onFocus}
    >
      {/* ── Titelleiste (drag hier) ── */}
      <div
        className="flex items-center px-3 h-8 border-b border-brand-200 select-none shrink-0 cursor-grab active:cursor-grabbing"
        onMouseDown={startDrag}
      >
        <h3 className="font-heading text-xs font-medium text-brand-700 flex-1">
          {title}
        </h3>

        {onClose && (
          <button
            onClick={onClose}
            className="rounded hover:bg-brand-100 transition-colors text-brand-700 hover:text-brand-900"
            aria-label="Close"
          >
            <X className="size-3" />
          </button>
        )}
      </div>

      {/* ── Fenster-Inhalt ── */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

      {/* ── Resize-Handle (nur wenn resizable) ── */}
      {resizable && (
        <div
          onMouseDown={startResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          aria-label="Resize"
        >
          <svg viewBox="0 0 16 16" className="w-full h-full text-brand-800/50">
            <path d="M14 14L8 14M14 14L14 8M14 14L6 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      )}
    </div>
  );

  return createPortal(el, container ?? document.body);
}
