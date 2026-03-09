"use client";

import Navigation from "@/components/Navigation";
import { WindowManagerProvider } from "@/components/WindowManager";
import { HoverMenuProvider, useHoverMenu, type HoverMenuItem } from "@/components/HoverMenu";
import Link from "next/link";

/* ── Window content for each section ── */

function MissionWindow() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-lg border border-brand-200 bg-brand-25">
          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-brand-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-brand-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div className="text-xs font-medium text-brand-900">Sovereign</div>
        </div>
        <div className="p-3 rounded-lg border border-brand-200 bg-brand-25">
          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-brand-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-brand-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div className="text-xs font-medium text-brand-900">Encrypted</div>
        </div>
        <div className="p-3 rounded-lg border border-brand-200 bg-brand-25">
          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-brand-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-brand-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <div className="text-xs font-medium text-brand-900">Open</div>
        </div>
      </div>
      <p className="text-xs text-brand-700 leading-relaxed">
        Digital infrastructure owned and controlled by the communities that use it.
      </p>
    </div>
  );
}

function ArchitectureWindow() {
  return (
    <div className="space-y-3">
      {/* Layer diagram */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-8 bg-brand-300 rounded flex items-center px-3">
            <span className="text-xs font-semibold text-brand-900">Clients</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <svg className="w-4 h-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-8 bg-brand-600 rounded flex items-center px-3">
            <span className="text-xs font-semibold text-brand-50">MOOD + AI + Apps</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <svg className="w-4 h-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-8 bg-brand-900 rounded flex items-center px-3">
            <span className="text-xs font-semibold text-brand-50">OpenOS / NixOS</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <svg className="w-4 h-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-8 border-2 border-dashed border-brand-400 rounded flex items-center px-3">
            <span className="text-xs font-medium text-brand-700">Community Hardware</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OpenOSWindow() {
  return (
    <div className="space-y-3">
      {/* Terminal mockup */}
      <div className="bg-brand-900 rounded-lg p-3 font-mono text-[10px] leading-relaxed">
        <div className="flex gap-1 mb-2">
          <div className="w-2 h-2 rounded-full bg-brand-700" />
          <div className="w-2 h-2 rounded-full bg-brand-700" />
          <div className="w-2 h-2 rounded-full bg-brand-700" />
        </div>
        <div className="text-brand-300">$ nixos-rebuild switch</div>
        <div className="text-brand-200">building configuration...</div>
        <div className="text-brand-200">activating 12 services</div>
        <div className="text-brand-400">system ready</div>
      </div>
      {/* Feature chips */}
      <div className="flex flex-wrap gap-1.5">
        {["Reproducible", "Declarative", "Multi-User", "Encrypted"].map(f => (
          <span key={f} className="px-2 py-0.5 text-[10px] font-medium bg-brand-100 text-brand-700 rounded-full border border-brand-200">
            {f}
          </span>
        ))}
      </div>
      <Link href="/open-os" className="block text-xs text-brand-600 hover:text-brand-700 font-medium">
        Explore OpenOS →
      </Link>
    </div>
  );
}

function MoodWindow() {
  return (
    <div className="space-y-3">
      {/* Deliberation visual */}
      <div className="p-3 rounded-lg border border-brand-200 bg-brand-25">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold text-brand-900">Active Proposal</span>
          <span className="text-[9px] px-1.5 py-0.5 bg-brand-300 text-brand-900 rounded font-medium">Voting</span>
        </div>
        <div className="text-[10px] text-brand-700 mb-2">Community Budget Allocation Q2</div>
        <div className="space-y-1.5">
          <div>
            <div className="flex justify-between text-[9px] text-brand-600 mb-0.5">
              <span>Education</span><span>62%</span>
            </div>
            <div className="h-1.5 bg-brand-100 rounded-full">
              <div className="h-full bg-brand-300 rounded-full" style={{ width: "62%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[9px] text-brand-600 mb-0.5">
              <span>Infrastructure</span><span>28%</span>
            </div>
            <div className="h-1.5 bg-brand-100 rounded-full">
              <div className="h-full bg-brand-600 rounded-full" style={{ width: "28%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[9px] text-brand-600 mb-0.5">
              <span>Events</span><span>10%</span>
            </div>
            <div className="h-1.5 bg-brand-100 rounded-full">
              <div className="h-full bg-brand-600 rounded-full" style={{ width: "10%" }} />
            </div>
          </div>
        </div>
      </div>
      <Link href="/mood" className="block text-xs text-brand-600 hover:text-brand-700 font-medium">
        Explore MOOD →
      </Link>
    </div>
  );
}

function WikiWindow() {
  return (
    <div className="space-y-3">
      {/* Wiki page mockup */}
      <div className="p-3 rounded-lg border border-brand-200 bg-brand-25">
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-brand-200">
          <svg className="w-3.5 h-3.5 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span className="text-[10px] font-semibold text-brand-900">Getting Started</span>
          <span className="text-[9px] text-brand-600 ml-auto">Last edited 2h ago</span>
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 bg-brand-200 rounded-full w-full" />
          <div className="h-1.5 bg-brand-200 rounded-full w-4/5" />
          <div className="h-1.5 bg-brand-200 rounded-full w-full" />
          <div className="h-1.5 bg-brand-200 rounded-full w-3/5" />
        </div>
        <div className="mt-2 pt-2 border-t border-brand-200 flex gap-2">
          {["Setup", "Config", "FAQ"].map(t => (
            <span key={t} className="text-[9px] text-brand-600 underline">{t}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["Collaborative", "Versioned", "Linked"].map(f => (
          <span key={f} className="px-2 py-0.5 text-[10px] font-medium bg-brand-100 text-brand-700 rounded-full border border-brand-200">
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Section card ── */

function SectionCard({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
  const { bind, isHovered, isPinned } = useHoverMenu();
  const handlers = bind(id);
  const active = isHovered(id) || isPinned(id);

  return (
    <div
      {...handlers}
      className={`
        relative bg-brand-50 border rounded-xl p-6 cursor-pointer
        transition-all duration-200
        ${active
          ? "border-brand-300 shadow-lg"
          : "border-brand-200 hover:border-brand-300 hover:shadow-md"
        }
        ${isPinned(id) ? "ring-2 ring-brand-300/50" : ""}
      `}
    >
      <h3 className="text-xl font-semibold text-brand-900 mb-1">{title}</h3>
      <p className="text-sm text-brand-700">{subtitle}</p>

      <div className={`
        absolute bottom-3 right-3 w-2 h-2 rounded-full transition-colors duration-200
        ${isPinned(id) ? "bg-brand-300" : active ? "bg-brand-400" : "bg-brand-200"}
      `} />
    </div>
  );
}

/* ── Page content (inside providers) ── */

const hoverItems: Record<string, HoverMenuItem> = {
  mission: {
    title: "Mission",
    body: <MissionWindow />,
    windowWidth: 320,
  },
  architecture: {
    title: "Architecture",
    body: <ArchitectureWindow />,
    windowWidth: 300,
  },
  openos: {
    title: "OpenOS",
    body: <OpenOSWindow />,
    windowWidth: 300,
  },
  mood: {
    title: "MOOD",
    body: <MoodWindow />,
    windowWidth: 300,
  },
  wiki: {
    title: "Wiki",
    body: <WikiWindow />,
    windowWidth: 280,
  },
};

function PageContent() {
  return (
    <HoverMenuProvider items={hoverItems} tooltipWidth={300}>
      <main className="min-h-screen bg-brand-25">
        {/* Hero */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-brand-900 text-pretty mb-4">
              Global Stack
            </h1>
            <p className="text-lg sm:text-xl text-brand-700 max-w-2xl mx-auto leading-relaxed">
              Sovereign digital infrastructure for communities
            </p>
          </div>
        </section>

        {/* Foundation row */}
        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SectionCard id="mission" title="Mission" subtitle="Why we build this" />
              <SectionCard id="architecture" title="Architecture" subtitle="How the pieces fit together" />
            </div>
          </div>
        </section>

        {/* Modules row */}
        <section className="pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-sm font-medium text-brand-600 uppercase tracking-wider mb-4 px-1">
              Modules
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SectionCard id="openos" title="OpenOS" subtitle="NixOS-based community server" />
              <SectionCard id="mood" title="MOOD" subtitle="Deliberation and decisions" />
              <SectionCard id="wiki" title="Wiki" subtitle="Shared knowledge base" />
            </div>
          </div>
        </section>

        <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-brand-200">
          <div className="max-w-5xl mx-auto text-center text-sm text-brand-700">
            Global Stack — Open Infrastructure for a Decentralized World
          </div>
        </footer>
      </main>
    </HoverMenuProvider>
  );
}

/* ── Export ── */

export default function InteractiveDesign() {
  return (
    <WindowManagerProvider>
      <Navigation />
      <PageContent />
    </WindowManagerProvider>
  );
}
