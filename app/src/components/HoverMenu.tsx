"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useWindowManager, type WindowContent } from "./WindowManager";

/* ── Types ── */

export type HoverMenuItem = {
  title: string;
  body: ReactNode;
};

type Pos = { x: number; y: number };

type HoverMenuCtx = {
  bind: (id: string) => {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: (e: React.MouseEvent) => void;
  };
  isHovered: (id: string) => boolean;
  isPinned: (id: string) => boolean;
};

const Ctx = createContext<HoverMenuCtx | null>(null);

export function useHoverMenu() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useHoverMenu must be inside HoverMenuProvider");
  return ctx;
}

/* ── Provider ── */

export function HoverMenuProvider({
  items,
  children,
}: {
  items: Record<string, HoverMenuItem>;
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { toggleWindow, isWindowOpen } = useWindowManager();

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<Pos>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }, []);

  const bind = useCallback(
    (id: string) => ({
      onMouseEnter: () => setHoveredId(id),
      onMouseLeave: () => setHoveredId(null),
      onClick: (e: React.MouseEvent) => {
        const item = items[id];
        if (!item) return;

        // clientX/Y = viewport coords, + scroll = document coords
        const pos = {
          x: e.clientX + window.scrollX + 16,
          y: e.clientY + window.scrollY + 12,
        };

        const content: WindowContent = {
          title: item.title,
          body: (
            <div className="text-xs text-brand-950 leading-relaxed">
              {item.body}
            </div>
          ),
          width: 280,
        };

        toggleWindow(id, content, pos);
        setHoveredId(null);
      },
    }),
    [items, toggleWindow],
  );

  const isHovered = useCallback((id: string) => hoveredId === id, [hoveredId]);
  const isPinned = useCallback((id: string) => isWindowOpen(id), [isWindowOpen]);

  const hoveredItem = hoveredId ? items[hoveredId] : null;
  const wrapWidth = wrapRef.current?.offsetWidth ?? 900;
  const flipX = mousePos.x > wrapWidth * 0.55;

  return (
    <Ctx.Provider value={{ bind, isHovered, isPinned }}>
      <div ref={wrapRef} className="relative" onMouseMove={handleMouseMove}>
        {children}

        {hoveredItem && !isPinned(hoveredId!) && (
          <div
            className="absolute z-40 w-64 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 shadow-lg shadow-brand-200/60 pointer-events-none"
            style={{
              left: flipX ? mousePos.x - 16 : mousePos.x + 16,
              top: mousePos.y + 12,
              transform: flipX ? "translateX(-100%)" : "none",
            }}
          >
            <h3 className="font-heading text-sm font-semibold text-brand-900">
              {hoveredItem.title}
            </h3>
            <div className="mt-1 text-xs text-brand-950 leading-relaxed">
              {hoveredItem.body}
            </div>
          </div>
        )}
      </div>
    </Ctx.Provider>
  );
}
