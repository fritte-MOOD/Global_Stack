"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import DraggableWindow from "./DraggableWindow";

/* ── Types ── */

export type WindowContent = {
  title: string;
  body: ReactNode;
  width?: number;
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
  isWindowOpen: (id: string) => boolean;
  toggleWindow: (id: string, content: WindowContent, position?: { x: number; y: number }) => void;
};

const Ctx = createContext<WindowManagerCtx | null>(null);

export function useWindowManager() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWindowManager must be inside WindowManagerProvider");
  return ctx;
}

/* ── Provider ── */

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [nextZ, setNextZ] = useState(100);

  const openWindow = useCallback((
    id: string,
    content: WindowContent,
    position?: { x: number; y: number },
  ) => {
    const pos = position ?? {
      x: Math.random() * 300 + 100,
      y: window.scrollY + Math.random() * 200 + 100,
    };

    setWindows(prev => {
      if (prev.some(w => w.id === id)) return prev;
      setNextZ(z => z + 1);
      return [...prev, { id, content, position: pos, zIndex: nextZ }];
    });
  }, [nextZ]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
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
      setWindows(prev => prev.map(w => (w.id === id ? { ...w, zIndex: z + 1 } : w)));
      return z + 1;
    });
  }, []);

  return (
    <Ctx.Provider value={{ openWindow, closeWindow, isWindowOpen, toggleWindow }}>
      {children}

      {windows.map(w => (
        <DraggableWindow
          key={w.id}
          id={w.id}
          title={w.content.title}
          initialPosition={w.position}
          onClose={() => closeWindow(w.id)}
          onFocus={() => bringToFront(w.id)}
          width={w.content.width}
          zIndex={w.zIndex}
        >
          {w.content.body}
        </DraggableWindow>
      ))}
    </Ctx.Provider>
  );
}
