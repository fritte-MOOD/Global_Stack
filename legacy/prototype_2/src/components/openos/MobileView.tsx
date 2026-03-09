"use client";

import { useState } from "react";
import { apps, FilesApp, MoodApp, AiApp, SettingsApp, TerminalApp } from "./apps";

const appComponents: Record<string, () => React.ReactNode> = {
  files: FilesApp,
  mood: MoodApp,
  ai: AiApp,
  settings: SettingsApp,
  terminal: TerminalApp,
};

export default function MobileView() {
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [clock] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  });

  const ActiveComponent = activeApp ? appComponents[activeApp] : null;

  return (
    <div className="h-full flex flex-col bg-brand-900 overflow-hidden">
      {/* Status bar */}
      <div className="h-10 bg-brand-900 flex items-center justify-between px-4 shrink-0">
        <span className="text-xs text-brand-300 font-medium">{clock}</span>
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-brand-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
          <svg className="w-3.5 h-3.5 text-brand-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
          </svg>
        </div>
      </div>

      {/* Notch */}
      <div className="flex justify-center -mt-1 mb-2">
        <div className="w-20 h-1 bg-brand-700 rounded-full" />
      </div>

      {activeApp ? (
        /* App view */
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* App header */}
          <div className="h-12 bg-brand-800 flex items-center px-4 shrink-0">
            <button
              onClick={() => setActiveApp(null)}
              className="text-brand-300 hover:text-brand-50 transition-colors mr-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <span className="text-sm font-medium text-brand-50">
              {apps.find(a => a.id === activeApp)?.label}
            </span>
          </div>
          
          {/* App content */}
          <div className="flex-1 bg-brand-50 overflow-auto">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      ) : (
        /* Home screen */
        <>
          <div className="px-4 mb-4">
            <span className="text-lg font-semibold text-brand-50">OpenOS</span>
          </div>

          {/* App list */}
          <div className="flex-1 overflow-auto px-4 space-y-2">
            {apps.map(app => (
              <button
                key={app.id}
                onClick={() => setActiveApp(app.id)}
                className="w-full flex items-center gap-3 p-3 bg-brand-800/50 hover:bg-brand-800 rounded-xl transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl ${app.accentClass} flex items-center justify-center shadow-lg`}>
                  {app.icon}
                </div>
                <span className="text-sm font-medium text-brand-50">{app.label}</span>
                <svg className="w-4 h-4 text-brand-500 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            ))}
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-2 shrink-0">
            <div className="w-32 h-1 bg-brand-700 rounded-full" />
          </div>
        </>
      )}
    </div>
  );
}
