"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useWindowManager, type WindowContent } from "@/components/WindowManager";
import { apps, type AppDef } from "./apps";

type DesktopViewProps = {
  onlineUsers?: number;
};

export default function DesktopView({ onlineUsers = 3 }: DesktopViewProps) {
  const { openWindow, getMinimizedWindows, restoreWindow, setContainer } = useWindowManager();
  const desktopRef = useRef<HTMLDivElement>(null);
  const [clock, setClock] = useState("");

  useEffect(() => {
    if (desktopRef.current) setContainer(desktopRef.current);
  }, [setContainer]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const launchApp = useCallback((app: AppDef) => {
    const Content = app.content;
    const content: WindowContent = {
      title: app.label,
      body: <Content />,
      width: app.windowWidth,
      height: app.windowHeight,
    };
    openWindow(app.id, content);
  }, [openWindow]);

  const minimized = getMinimizedWindows();

  return (
    <div className="h-full flex flex-col bg-brand-900 overflow-hidden">
      {/* Menu bar */}
      <div className="h-7 bg-brand-800/90 backdrop-blur-sm flex items-center justify-between px-4 shrink-0 z-50 border-b border-brand-700/50">
        <span className="text-xs font-semibold text-brand-50 tracking-wide">OpenOS</span>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-brand-400">{onlineUsers} users online</span>
          <span className="text-[10px] text-brand-300 font-medium">{clock}</span>
        </div>
      </div>

      {/* Desktop area */}
      <div ref={desktopRef} className="flex-1 relative overflow-hidden">
        {/* Wallpaper pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, var(--brand-50) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
      </div>

      {/* Dock */}
      <div className="h-16 bg-brand-800/80 backdrop-blur-md flex items-center justify-center gap-2 px-4 shrink-0 border-t border-brand-700/50">
        {apps.map(app => (
          <button
            key={app.id}
            onClick={() => launchApp(app)}
            className="group flex flex-col items-center gap-0.5"
            title={app.label}
          >
            <div className={`
              w-10 h-10 rounded-xl ${app.accentClass} flex items-center justify-center
              transition-transform duration-150 group-hover:scale-110 group-hover:-translate-y-1
              shadow-lg
            `}>
              {app.icon}
            </div>
            <span className="text-[9px] text-brand-400 group-hover:text-brand-200 transition-colors">
              {app.label}
            </span>
          </button>
        ))}

        {/* Separator + minimized windows */}
        {minimized.length > 0 && (
          <>
            <div className="w-px h-8 bg-brand-700 mx-2" />
            {minimized.map(w => (
              <button
                key={w.id}
                onClick={() => restoreWindow(w.id)}
                className="group flex flex-col items-center gap-0.5"
                title={`Restore ${w.content.title}`}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center transition-transform duration-150 group-hover:scale-110 group-hover:-translate-y-1 opacity-60 group-hover:opacity-100">
                  <span className="text-[10px] text-brand-300 font-medium">{w.content.title.slice(0, 2)}</span>
                </div>
                <span className="text-[9px] text-brand-500">{w.content.title}</span>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
