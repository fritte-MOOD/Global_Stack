/*
 * WindowManager.tsx — Zentrale Verwaltung aller offenen Fenster.
 *
 * Wird einmal im Root-Layout als <WindowManagerProvider> eingebunden.
 * Alle Fenster-Components (Tag, etc.) nutzen useWindowManager() um
 * Fenster zu öffnen, schließen oder zu toggeln.
 *
 * REIN:  children (die gesamte App)
 * RAUS:  Context mit openWindow, closeWindow, toggleWindow, isWindowOpen, etc.
 *        + rendert automatisch alle offenen DraggableWindows
 *
 * Datenfluss:
 *   Tag/Button → toggleWindow(id, content, position)
 *     → WindowManager speichert in windows-Array
 *       → DraggableWindow wird gerendert (via createPortal in document.body)
 */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import DraggableWindow from "./DraggableWindow";

/* Was ein Fenster inhaltlich braucht */
export type WindowContent = {
  title: string;
  body: ReactNode;
  width?: number;
  height?: number;
  resizable?: boolean;
  centered?: boolean;
  noScale?: boolean;
};

type OpenWindow = {
  id: string;
  content: WindowContent;
  position: { x: number; y: number };
  zIndex: number;
};

type WindowManagerCtx = {
  openWindow: (id: string, content: WindowContent, position?: { x: number; y: number }) => void;
  /** Opens a new instance even if one with the same prefix already exists */
  openNewInstance: (idPrefix: string, content: WindowContent, position?: { x: number; y: number }) => void;
  closeWindow: (id: string) => void;
  closeAllWindows: () => void;
  isWindowOpen: (id: string) => boolean;
  toggleWindow: (id: string, content: WindowContent, position?: { x: number; y: number }) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  setContainer: (el: HTMLDivElement | null) => void;
  setBottomInset: (px: number) => void;
};

const Ctx = createContext<WindowManagerCtx | null>(null);

export function useWindowManager() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWindowManager must be inside WindowManagerProvider");
  return ctx;
}

const CASCADE_OFFSET = 30;

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [nextZ, setNextZ] = useState(100);
  const cascadeCount = useRef(0);
  const instanceCounter = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomInsetRef = useRef(0);

  const setContainer = useCallback((el: HTMLDivElement | null) => {
    containerRef.current = el;
  }, []);

  const setBottomInset = useCallback((px: number) => {
    bottomInsetRef.current = px;
  }, []);

  const closeAllWindows = useCallback(() => setWindows([]), []);

  const closeTopWindow = useCallback(() => {
    setWindows(prev => {
      if (prev.length === 0) return prev;
      const top = prev.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
      return prev.filter(w => w.id !== top.id);
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (windows.length === 0) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeAllWindows();
      } else if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        closeTopWindow();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [windows.length, closeTopWindow, closeAllWindows]);

  const clampToContainer = useCallback((
    pos: { x: number; y: number },
    content: WindowContent,
  ): { x: number; y: number } => {
    const container = containerRef.current;
    if (!container) return pos;

    const gap = 12;
    const w = content.width ?? 320;
    const h = content.height ?? 300;
    const cw = container.clientWidth;
    const ch = container.clientHeight - bottomInsetRef.current;

    return {
      x: Math.max(gap, Math.min(pos.x, cw - w - gap)),
      y: Math.max(gap, Math.min(pos.y, ch - h - gap)),
    };
  }, []);

  const openWindow = useCallback((
    id: string,
    content: WindowContent,
    position?: { x: number; y: number },
  ) => {
    setWindows(prev => {
      if (prev.find(w => w.id === id)) return prev;

      let raw: { x: number; y: number };
      if (content.centered && containerRef.current) {
        const cw = containerRef.current.clientWidth;
        const ch = containerRef.current.clientHeight - bottomInsetRef.current;
        const w = content.width ?? 320;
        const h = content.height ?? 300;
        raw = { x: Math.max(0, (cw - w) / 2), y: Math.max(0, (ch - h) / 2) };
      } else {
        raw = position ?? {
          x: 60 + (cascadeCount.current % 8) * CASCADE_OFFSET,
          y: 40 + (cascadeCount.current % 8) * CASCADE_OFFSET,
        };
      }
      const pos = clampToContainer(raw, content);
      cascadeCount.current += 1;

      const newZ = nextZ + 1;
      setNextZ(newZ);

      return [...prev, { id, content, position: pos, zIndex: newZ }];
    });
  }, [nextZ, clampToContainer]);

  const openNewInstance = useCallback((
    idPrefix: string,
    content: WindowContent,
    position?: { x: number; y: number },
  ) => {
    instanceCounter.current += 1;
    const uniqueId = `${idPrefix}__${instanceCounter.current}`;
    openWindow(uniqueId, content, position);
  }, [openWindow]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const isWindowOpen = useCallback(
    (id: string) => windows.some(w => w.id === id),
    [windows],
  );

  /* Click auf offenes Fenster schließt es, auf geschlossenes öffnet es */
  const toggleWindow = useCallback((
    id: string,
    content: WindowContent,
    position?: { x: number; y: number },
  ) => {
    if (isWindowOpen(id)) closeWindow(id);
    else openWindow(id, content, position);
  }, [isWindowOpen, closeWindow, openWindow]);

  const bringToFront = useCallback((id: string) => {
    setNextZ(z => {
      const newZ = z + 1;
      setWindows(prev => prev.map(w => (w.id === id ? { ...w, zIndex: newZ } : w)));
      return newZ;
    });
  }, []);

  return (
    <Ctx.Provider value={{
      openWindow, openNewInstance, closeWindow, closeAllWindows,
      isWindowOpen, toggleWindow,
      containerRef, setContainer, setBottomInset,
    }}>
      {children}

      {/* Alle offenen Fenster rendern */}
      {windows.map(w => (
        <DraggableWindow
          key={w.id}
          id={w.id}
          title={w.content.title}
          initialPosition={w.position}
          onClose={() => closeWindow(w.id)}
          onFocus={() => bringToFront(w.id)}
          width={w.content.width}
          height={w.content.height}
          resizable={w.content.resizable}
          noScale={w.content.noScale}
          zIndex={w.zIndex}
          container={containerRef.current}
          bottomInset={bottomInsetRef.current}
        >
          {w.content.body}
        </DraggableWindow>
      ))}
    </Ctx.Provider>
  );
}
