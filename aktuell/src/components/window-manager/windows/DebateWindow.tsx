"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MessageSquare } from "lucide-react";
import Tag from "../logic/Tag";
import type { WindowContent } from "../logic/WindowManager";
import { loadDemoData, type DemoData } from "@/app/(site)/open-os/_actions/load-demo-data";
import { useGroupFilter } from "@/components/desktop/GroupFilterContext";

const SERVER_SLUGS = ["park-club", "marin-quarter", "rochefort"];

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  active:    { bg: "bg-green-100", text: "text-green-700", label: "Active" },
  draft:     { bg: "bg-yellow-100", text: "text-yellow-700", label: "Draft" },
  completed: { bg: "bg-blue-100", text: "text-blue-700", label: "Completed" },
  archived:  { bg: "bg-brand-100", text: "text-brand-600", label: "Archived" },
};

function DebateContent() {
  const { selectedGroupIds } = useGroupFilter();
  const [data, setData] = useState<DemoData | null>(null);

  useEffect(() => {
    loadDemoData(SERVER_SLUGS).then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <span className="text-xs text-brand-500">Loading...</span>
      </div>
    );
  }

  const processes = data.processes;
  const filteredProcesses = selectedGroupIds.size > 0 ? processes.filter((p) => selectedGroupIds.has(p.groupId)) : processes;
  const allGroups = data.groups.flatMap((g) => [
    { ...g, depth: 0 },
    ...g.children.map((c) => ({ ...c, depth: 1 as const, parentId: g.id, children: [] as typeof g.children })),
  ]);

  if (filteredProcesses.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <span className="text-xs text-brand-500">No processes.</span>
      </div>
    );
  }

  const active = filteredProcesses.filter((p) => p.status === "active");
  const draft = filteredProcesses.filter((p) => p.status === "draft");
  const rest = filteredProcesses.filter((p) => p.status !== "active" && p.status !== "draft");

  const sections = [
    { label: "Active", items: active },
    { label: "Drafts", items: draft },
    { label: "Other", items: rest },
  ].filter((s) => s.items.length > 0);

  return (
    <div className="h-full overflow-y-auto p-3 space-y-3">
      {sections.map((section) => (
        <div key={section.label}>
          <div className="text-xs font-semibold text-brand-700 mb-1.5 px-1">{section.label} ({section.items.length})</div>
          <div className="space-y-1.5">
            {section.items.map((proc) => {
              const group = allGroups.find((g) => g.id === proc.groupId);
              const style = STATUS_STYLES[proc.status] ?? STATUS_STYLES.archived;
              return (
                <div key={proc.id} className="px-2.5 py-2.5 rounded-lg border border-brand-200 bg-brand-50">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="size-3 text-brand-500" />
                    <span className="text-xs font-semibold text-brand-950 flex-1 min-w-0 truncate">{proc.title}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 ${style.bg} ${style.text}`}>
                      {style.label}
                    </span>
                  </div>
                  {proc.description && <p className="text-[11px] text-brand-600 mb-1 ml-5">{proc.description}</p>}
                  <div className="flex items-center gap-2 ml-5">
                    {group && (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                        <span className="text-[10px] text-brand-500">{group.name}</span>
                      </span>
                    )}
                    <span className="text-[10px] text-brand-500">by {proc.author.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function DebateTooltip() {
  return (
    <div className="p-3 flex flex-col items-center gap-2 text-center">
      <MessageSquare className="size-6 text-brand-700" />
      <span className="text-sm font-medium text-brand-900">Debate</span>
      <span className="text-xs text-brand-600">Click to open processes</span>
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
      className={children ? "" : "font-semibold underline decoration-brand-300 underline-offset-2 transition-colors text-brand-900"}
      activeClassName={children ? "" : "text-brand-700"}
    >
      {children ?? "Debate"}
    </Tag>
  );
}
