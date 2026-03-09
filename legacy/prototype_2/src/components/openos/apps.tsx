"use client";

import type { ReactNode } from "react";

/* ═══════════════════════════════════════════
   App type definition
   ═══════════════════════════════════════════ */

export type AppDef = {
  id: string;
  label: string;
  icon: ReactNode;
  accentClass: string;
  content: () => ReactNode;
  windowWidth: number;
  windowHeight: number;
};

/* ═══════════════════════════════════════════
   App content components
   ═══════════════════════════════════════════ */

export function FilesApp() {
  const folders = [
    { name: "Documents", items: 12 },
    { name: "Photos", items: 247 },
    { name: "Projects", items: 8 },
    { name: "Shared", items: 34 },
  ];
  return (
    <div className="h-full flex flex-col text-xs">
      <div className="flex items-center gap-2 px-3 py-2 bg-brand-100 border-b border-brand-200">
        <span className="text-brand-600 font-medium">Home</span>
        <span className="text-brand-400">/</span>
        <span className="text-brand-900 font-medium">Files</span>
      </div>
      <div className="flex-1 overflow-auto">
        {folders.map(f => (
          <div key={f.name} className="flex items-center gap-3 px-3 py-2.5 hover:bg-brand-100 transition-colors cursor-pointer border-b border-brand-100">
            <svg className="w-4 h-4 text-brand-600 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
            <span className="text-brand-900 flex-1">{f.name}</span>
            <span className="text-brand-500">{f.items} items</span>
          </div>
        ))}
        <div className="px-3 py-6 text-center text-brand-500">
          4 folders, 301 items total
        </div>
      </div>
    </div>
  );
}

export function MoodApp() {
  const proposals = [
    { title: "Community Budget Q2", status: "Voting", statusColor: "bg-brand-300 text-brand-900", votes: 18 },
    { title: "New Server Location", status: "Discussion", statusColor: "bg-brand-200 text-brand-700", votes: 7 },
    { title: "Privacy Policy Update", status: "Decided", statusColor: "bg-green-200 text-green-800", votes: 24 },
  ];
  return (
    <div className="h-full flex flex-col text-xs">
      <div className="flex items-center justify-between px-3 py-2 bg-brand-100 border-b border-brand-200">
        <span className="text-brand-900 font-medium">Active Proposals</span>
        <button className="px-2 py-0.5 bg-brand-300 text-brand-900 rounded text-[10px] font-medium hover:bg-brand-400 transition-colors">
          + New
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        {proposals.map(p => (
          <div key={p.title} className="px-3 py-3 border-b border-brand-100 hover:bg-brand-50 cursor-pointer transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-brand-900 font-medium">{p.title}</span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${p.statusColor}`}>{p.status}</span>
            </div>
            <div className="flex items-center gap-2 text-brand-500">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span>{p.votes} participants</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AiApp() {
  const messages = [
    { role: "user" as const, text: "How do I add a new user to OpenOS?" },
    { role: "ai" as const, text: "You can add a new user via the Settings app or by editing your NixOS configuration:\n\nusers.users.newuser = {\n  isNormalUser = true;\n  extraGroups = [\"community\"];\n};" },
  ];
  return (
    <div className="h-full flex flex-col text-xs">
      <div className="flex items-center gap-2 px-3 py-2 bg-brand-100 border-b border-brand-200">
        <span className="text-brand-900 font-medium">AI Assistant</span>
        <span className="text-brand-500">Local Model</span>
      </div>
      <div className="flex-1 overflow-auto p-3 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-lg px-3 py-2 ${
              m.role === "user"
                ? "bg-brand-600 text-brand-50"
                : "bg-brand-100 text-brand-900"
            }`}>
              <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed">{m.text}</pre>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 border-t border-brand-200">
        <div className="flex gap-2">
          <div className="flex-1 bg-brand-100 rounded px-3 py-1.5 text-brand-500">
            Ask anything...
          </div>
          <button className="px-3 py-1.5 bg-brand-600 text-brand-50 rounded font-medium hover:bg-brand-700 transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export function SettingsApp() {
  const sections = [
    { label: "Users", desc: "3 active accounts", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
    { label: "Network", desc: "Connected via WireGuard", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" },
    { label: "Storage", desc: "420 GB / 2 TB used", icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
    { label: "Security", desc: "E2E encryption enabled", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  ];
  return (
    <div className="h-full flex flex-col text-xs">
      <div className="px-3 py-2 bg-brand-100 border-b border-brand-200">
        <span className="text-brand-900 font-medium">System Settings</span>
      </div>
      <div className="flex-1 overflow-auto">
        {sections.map(s => (
          <div key={s.label} className="flex items-center gap-3 px-3 py-3 border-b border-brand-100 hover:bg-brand-50 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-brand-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={s.icon}/></svg>
            </div>
            <div className="flex-1">
              <div className="text-brand-900 font-medium">{s.label}</div>
              <div className="text-brand-500 text-[10px]">{s.desc}</div>
            </div>
            <svg className="w-3 h-3 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TerminalApp() {
  const lines = [
    { prompt: true, text: "neofetch" },
    { prompt: false, text: "  OpenOS v0.1 (NixOS 24.11)" },
    { prompt: false, text: "  Kernel: 6.6.32-lts" },
    { prompt: false, text: "  Uptime: 14 days, 3 hours" },
    { prompt: false, text: "  Users: 3 active" },
    { prompt: false, text: "  CPU: 12% (4 cores)" },
    { prompt: false, text: "  RAM: 6.2 / 16 GB" },
    { prompt: false, text: "" },
    { prompt: true, text: "systemctl status openos" },
    { prompt: false, text: "  openos.service - OpenOS Community Server" },
    { prompt: false, text: "  Active: active (running)" },
    { prompt: false, text: "" },
  ];
  return (
    <div className="h-full bg-brand-900 font-mono text-[11px] leading-relaxed p-3 overflow-auto">
      {lines.map((l, i) => (
        <div key={i} className={l.prompt ? "text-brand-300" : "text-brand-200"}>
          {l.prompt && <span className="text-brand-400">user@openos $ </span>}
          {l.text}
        </div>
      ))}
      <div className="text-brand-300">
        <span className="text-brand-400">user@openos $ </span>
        <span className="inline-block w-1.5 h-3 bg-brand-300 animate-pulse" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   App registry
   ═══════════════════════════════════════════ */

export const apps: AppDef[] = [
  {
    id: "files",
    label: "Files",
    accentClass: "bg-brand-600",
    icon: (
      <svg className="w-5 h-5 text-brand-50" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
      </svg>
    ),
    content: FilesApp,
    windowWidth: 340,
    windowHeight: 360,
  },
  {
    id: "mood",
    label: "MOOD",
    accentClass: "bg-brand-300",
    icon: (
      <svg className="w-5 h-5 text-brand-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18M3 12h18M3 6h18M3 18h18"/>
        <circle cx="8" cy="9" r="1" fill="currentColor"/>
        <circle cx="16" cy="15" r="1" fill="currentColor"/>
      </svg>
    ),
    content: MoodApp,
    windowWidth: 360,
    windowHeight: 380,
  },
  {
    id: "ai",
    label: "AI",
    accentClass: "bg-brand-600",
    icon: (
      <svg className="w-5 h-5 text-brand-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
        <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
        <path d="M9 15c.83.67 2 1 3 1s2.17-.33 3-1"/>
      </svg>
    ),
    content: AiApp,
    windowWidth: 380,
    windowHeight: 400,
  },
  {
    id: "settings",
    label: "Settings",
    accentClass: "bg-brand-700",
    icon: (
      <svg className="w-5 h-5 text-brand-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    ),
    content: SettingsApp,
    windowWidth: 320,
    windowHeight: 340,
  },
  {
    id: "terminal",
    label: "Terminal",
    accentClass: "bg-brand-900",
    icon: (
      <svg className="w-5 h-5 text-brand-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
      </svg>
    ),
    content: TerminalApp,
    windowWidth: 440,
    windowHeight: 320,
  },
];
