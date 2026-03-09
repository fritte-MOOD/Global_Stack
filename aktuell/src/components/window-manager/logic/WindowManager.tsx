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
  title: string;         // Titelleiste
  body: ReactNode;       // Fenster-Inhalt (ein React-Component)
  width?: number;        // Breite in px, default 320
  height?: number;       // Höhe in px, default auto (passt sich an Inhalt an)
  resizable?: boolean;   // Resize-Handle unten rechts, default false
};

type OpenWindow = {
  id: string;
  content: WindowContent;
  position: { x: number; y: number };
  zIndex: number;
};

type WindowManagerCtx = {
  openWindow: (id: string, content: WindowContent, position?: { x: number; y: number }) => void;
  closeWindow: (id: string) => void;
  closeAllWindows: () => void;
  isWindowOpen: (id: string) => boolean;
  toggleWindow: (id: string, content: WindowContent, position?: { x: number; y: number }) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  setContainer: (el: HTMLDivElement | null) => void;
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
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setContainer = useCallback((el: HTMLDivElement | null) => {
    containerRef.current = el;
  }, []);

  const closeAllWindows = useCallback(() => setWindows([]), []);

  /* ESC schließt alle Fenster */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && windows.length > 0) closeAllWindows();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [windows.length, closeAllWindows]);

  const openWindow = useCallback((
    id: string,
    content: WindowContent,
    position?: { x: number; y: number },
  ) => {
    setWindows(prev => {
      if (prev.find(w => w.id === id)) return prev;

      const pos = position ?? {
        x: 60 + (cascadeCount.current % 8) * CASCADE_OFFSET,
        y: 40 + (cascadeCount.current % 8) * CASCADE_OFFSET,
      };
      cascadeCount.current += 1;

      const newZ = nextZ + 1;
      setNextZ(newZ);

      return [...prev, { id, content, position: pos, zIndex: newZ }];
    });
  }, [nextZ]);

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
      openWindow, closeWindow, closeAllWindows,
      isWindowOpen, toggleWindow,
      containerRef, setContainer,
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
          zIndex={w.zIndex}
          container={containerRef.current}
        >
          {w.content.body}
        </DraggableWindow>
      ))}
    </Ctx.Provider>
  );
}
