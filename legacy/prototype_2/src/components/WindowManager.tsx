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

/* ── Types ── */

export type WindowContent = {
  title: string;
  body: ReactNode;
  width?: number;
  height?: number;
};

type OpenWindow = {
  id: string;
  content: WindowContent;
  position: { x: number; y: number };
  zIndex: number;
  minimized: boolean;
};

type WindowManagerCtx = {
  openWindow: (id: string, content: WindowContent, position?: { x: number; y: number }) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  closeAllWindows: () => void;
  isWindowOpen: (id: string) => boolean;
  toggleWindow: (id: string, content: WindowContent, position?: { x: number; y: number }) => void;
  getMinimizedWindows: () => OpenWindow[];
  /** Optional container ref for confined desktop mode */
  containerRef: React.RefObject<HTMLDivElement | null>;
  setContainer: (el: HTMLDivElement | null) => void;
};

const Ctx = createContext<WindowManagerCtx | null>(null);

export function useWindowManager() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWindowManager must be inside WindowManagerProvider");
  return ctx;
}

/* ── Provider ── */

const CASCADE_OFFSET = 30;

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [nextZ, setNextZ] = useState(100);
  const cascadeCount = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setContainer = useCallback((el: HTMLDivElement | null) => {
    containerRef.current = el;
  }, []);

  const closeAllWindows = useCallback(() => {
    setWindows([]);
  }, []);

  // ESC key handler to close all windows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && windows.length > 0) {
        closeAllWindows();
      }
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
      const existing = prev.find(w => w.id === id);
      if (existing) {
        // Window exists, just restore it
        return prev.map(w => w.id === id ? { ...w, minimized: false } : w);
      }
      
      // New window - calculate position and z-index
      const pos = position ?? {
        x: 60 + (cascadeCount.current % 8) * CASCADE_OFFSET,
        y: 40 + (cascadeCount.current % 8) * CASCADE_OFFSET,
      };
      cascadeCount.current += 1;
      
      const newZ = nextZ + 1;
      setNextZ(newZ);
      
      return [...prev, { id, content, position: pos, zIndex: newZ, minimized: false }];
    });
  }, [nextZ]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: false } : w));
    // Bring to front when restoring
    setNextZ(z => {
      setWindows(prev => prev.map(w => (w.id === id ? { ...w, zIndex: z + 1 } : w)));
      return z + 1;
    });
  }, []);

  const isWindowOpen = useCallback(
    (id: string) => windows.some(w => w.id === id),
    [windows],
  );

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

  const getMinimizedWindows = useCallback(
    () => windows.filter(w => w.minimized),
    [windows],
  );

  return (
    <Ctx.Provider value={{
      openWindow, closeWindow, minimizeWindow, restoreWindow, closeAllWindows,
      isWindowOpen, toggleWindow, getMinimizedWindows,
      containerRef, setContainer,
    }}>
      {children}

      {windows.filter(w => !w.minimized).map(w => (
        <DraggableWindow
          key={w.id}
          id={w.id}
          title={w.content.title}
          initialPosition={w.position}
          onClose={() => closeWindow(w.id)}
          onMinimize={() => minimizeWindow(w.id)}
          onFocus={() => bringToFront(w.id)}
          width={w.content.width}
          height={w.content.height}
          zIndex={w.zIndex}
          container={containerRef.current}
        >
          {w.content.body}
        </DraggableWindow>
      ))}
    </Ctx.Provider>
  );
}
