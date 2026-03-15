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
import { createPortal } from "react-dom";

export type ContextMenuItem =
  | { type: "action"; label: string; icon?: ReactNode; onClick: () => void; danger?: boolean }
  | { type: "separator" }
  | { type: "label"; text: string };

type MenuState = {
  x: number;
  y: number;
  items: ContextMenuItem[];
} | null;

type ContextMenuCtx = {
  showMenu: (x: number, y: number, items: ContextMenuItem[]) => void;
  hideMenu: () => void;
};

const Ctx = createContext<ContextMenuCtx>({
  showMenu: () => {},
  hideMenu: () => {},
});

export function useContextMenu() {
  return useContext(Ctx);
}

/**
 * Hook to attach a context menu to an element.
 * Returns a props object to spread onto the target element.
 */
export function useContextMenuTrigger(items: ContextMenuItem[] | (() => ContextMenuItem[])) {
  const { showMenu } = useContextMenu();

  const onContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const resolved = typeof items === "function" ? items() : items;
      if (resolved.length > 0) showMenu(e.clientX, e.clientY, resolved);
    },
    [items, showMenu],
  );

  return { onContextMenu };
}

export function ContextMenuProvider({
  children,
  defaultItems,
}: {
  children: ReactNode;
  defaultItems?: () => ContextMenuItem[];
}) {
  const [menu, setMenu] = useState<MenuState>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const showMenu = useCallback((x: number, y: number, items: ContextMenuItem[]) => {
    setMenu({ x, y, items });
  }, []);

  const hideMenu = useCallback(() => setMenu(null), []);

  // Suppress native context menu and show default items on the wrapper
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (defaultItems) {
      showMenu(e.clientX, e.clientY, defaultItems());
    }
  }, [defaultItems, showMenu]);

  // Clamp menu position to viewport after render
  useEffect(() => {
    if (!menu || !menuRef.current) return;
    const el = menuRef.current;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let { x, y } = menu;
    if (x + rect.width > vw - 8) x = vw - rect.width - 8;
    if (y + rect.height > vh - 8) y = vh - rect.height - 8;
    if (x < 8) x = 8;
    if (y < 8) y = 8;

    if (x !== menu.x || y !== menu.y) {
      setMenu({ ...menu, x, y });
    }
  }, [menu]);

  // Close on click outside or Escape
  useEffect(() => {
    if (!menu) return;
    const handleClick = () => hideMenu();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hideMenu();
    };
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKey);
    };
  }, [menu, hideMenu]);

  return (
    <Ctx.Provider value={{ showMenu, hideMenu }}>
      <div className="contents" onContextMenu={handleContextMenu}>
      {children}
      </div>
      {mounted && menu && createPortal(
        <div
          ref={menuRef}
          className="fixed z-[20000] min-w-[180px] bg-brand-0 border border-brand-150 rounded-lg shadow-xl py-1 select-none"
          style={{ left: menu.x, top: menu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          {menu.items.map((item, i) => {
            if (item.type === "separator") {
              return <div key={i} className="my-1 border-t border-brand-100" />;
            }
            if (item.type === "label") {
              return (
                <div key={i} className="px-3 py-1.5 text-[10px] font-semibold text-brand-950 uppercase tracking-wider">
                  {item.text}
                </div>
              );
            }
            return (
              <button
                key={i}
                onClick={() => {
                  hideMenu();
                  item.onClick();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs transition-colors cursor-pointer ${
                  item.danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-brand-950 hover:bg-brand-50"
                }`}
              >
                {item.icon && <span className="size-3.5 shrink-0 flex items-center justify-center">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>,
        document.body,
      )}
    </Ctx.Provider>
  );
}
