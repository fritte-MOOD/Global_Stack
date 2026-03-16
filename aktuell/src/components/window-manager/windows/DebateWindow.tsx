"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MessageSquare, Search } from "lucide-react";
import Tag from "../logic/Tag";
import { useWindowManager, type WindowContent } from "../logic/WindowManager";
import { loadDemoData, type DemoData } from "@/app/(site)/open-os/_actions/load-demo-data";
import { useGroupFilter } from "@/components/desktop/GroupFilterContext";
import { searchWindowContent } from "./SearchWindow";

const SERVER_SLUGS = ["sportclub", "marin-quarter", "rochefort"];

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  active:    { bg: "bg-brand-100", text: "text-brand-950", label: "Active" },
  draft:     { bg: "bg-brand-50", text: "text-brand-950", label: "Draft" },
  completed: { bg: "bg-brand-200", text: "text-brand-950", label: "Completed" },
  archived:  { bg: "bg-brand-50", text: "text-brand-950", label: "Archived" },
};

export function DebateContent() {
  const { selectedGroupIds } = useGroupFilter();
  const { openNewInstance } = useWindowManager();
  const [data, setData] = useState<DemoData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadDemoData(SERVER_SLUGS).then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <span className="text-xs text-brand-950">Loading...</span>
      </div>
    );
  }

  const processes = data.processes;
  const groupFiltered = processes.filter((p) => selectedGroupIds.has(p.groupId));
  const allGroups = data.groups.flatMap((g) => [
    { ...g, depth: 0 },
    ...g.children.map((c) => ({ ...c, depth: 1 as const, parentId: g.id, children: [] as typeof g.children })),
  ]);

  if (groupFiltered.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <span className="text-xs text-brand-950">No processes.</span>
      </div>
    );
  }

  const q = searchQuery.toLowerCase();
  const filteredProcesses = q
    ? groupFiltered.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.author.name.toLowerCase().includes(q)
      )
    : groupFiltered;

  const active = filteredProcesses.filter((p) => p.status === "active");
  const draft = filteredProcesses.filter((p) => p.status === "draft");
  const rest = filteredProcesses.filter((p) => p.status !== "active" && p.status !== "draft");

  const sections = [
    { label: "Active", items: active },
    { label: "Drafts", items: draft },
    { label: "Other", items: rest },
  ].filter((s) => s.items.length > 0);

  return (
    <div className="h-full flex flex-col">
      {/* Search bar */}
      <div className="px-3 pt-3 pb-2 border-b border-brand-100 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-brand-200 bg-brand-0 flex-1">
            <Search className="size-3.5 text-brand-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search processes..."
              className="flex-1 text-xs bg-transparent text-brand-950 outline-none placeholder:text-brand-400"
            />
          </div>
          <button
            onClick={() => openNewInstance("search", searchWindowContent("process"))}
            className="p-1.5 rounded-md hover:bg-brand-100 transition-colors cursor-pointer shrink-0"
            title="Global search (processes)"
          >
            <Search className="size-3.5 text-brand-950" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
      {sections.map((section) => (
        <div key={section.label}>
          <div className="text-xs font-semibold text-brand-950 mb-1.5 px-1">{section.label} ({section.items.length})</div>
          <div className="space-y-1.5">
            {section.items.map((proc) => {
              const group = allGroups.find((g) => g.id === proc.groupId);
              const style = STATUS_STYLES[proc.status] ?? STATUS_STYLES.archived;
              return (
                <div key={proc.id} className="px-2.5 py-2.5 rounded-lg border border-brand-200 bg-brand-50">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="size-3 text-brand-950" />
                    <span className="text-xs font-semibold text-brand-950 flex-1 min-w-0 truncate">{proc.title}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 ${style.bg} ${style.text}`}>
                      {style.label}
                    </span>
                  </div>
                  {proc.description && <p className="text-[11px] text-brand-950 mb-1 ml-5">{proc.description}</p>}
                  <div className="flex items-center gap-2 ml-5">
                    {group && (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                        <span className="text-[10px] text-brand-950">{group.name}</span>
                      </span>
                    )}
                    <span className="text-[10px] text-brand-950">by {proc.author.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

function DebateTooltip() {
  return (
    <div className="p-3 flex flex-col items-center gap-2 text-center">
      <MessageSquare className="size-6 text-brand-950" />
      <span className="text-sm font-medium text-brand-950">Debate</span>
      <span className="text-xs text-brand-950">Click to open processes</span>
    </div>
  );
}

export default function DebateWindow({ children }: { children?: ReactNode }) {
  const windowContent: WindowContent = {
    title: "Debate",
    body: <DebateContent />,
    width: 460,
    height: 420,
    resizable: true,
  };

  return (
    <Tag
      id="app-debate"
      tooltip={children ? undefined : <DebateTooltip />}
      window={windowContent}
      tooltipWidth={200}
      className={children ? "" : "font-semibold underline decoration-brand-200 underline-offset-2 transition-colors text-brand-950"}
      activeClassName={children ? "" : "text-brand-950"}
    >
      {children ?? "Debate"}
    </Tag>
  );
}
