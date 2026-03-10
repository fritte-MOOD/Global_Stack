"use client";

import { MessageSquare } from "lucide-react";
import type { DemoData, DemoGroup } from "../../../../_actions/load-demo-data";

type Props = {
  data: DemoData;
  groupIds: string[];
  allGroups: (DemoGroup & { depth: number })[];
};

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  active:    { bg: "bg-green-100", text: "text-green-700", label: "Active" },
  draft:     { bg: "bg-yellow-100", text: "text-yellow-700", label: "Draft" },
  completed: { bg: "bg-blue-100", text: "text-blue-700", label: "Completed" },
  archived:  { bg: "bg-brand-100", text: "text-brand-600", label: "Archived" },
};

export default function DebateApp({ data, groupIds, allGroups }: Props) {
  const processes = data.processes.filter((p) => groupIds.includes(p.groupId));

  if (processes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[200px]">
        <span className="text-xs text-brand-500">No processes in this group.</span>
      </div>
    );
  }

  const active = processes.filter((p) => p.status === "active");
  const draft = processes.filter((p) => p.status === "draft");
  const rest = processes.filter((p) => p.status !== "active" && p.status !== "draft");

  const sections = [
    { label: "Active", items: active },
    { label: "Drafts", items: draft },
    { label: "Other", items: rest },
  ].filter((s) => s.items.length > 0);

  return (
    <div className="p-4 space-y-4">
      {sections.map((section) => (
        <div key={section.label}>
          <div className="text-xs font-semibold text-brand-700 mb-2 px-1">{section.label} ({section.items.length})</div>
          <div className="space-y-2">
            {section.items.map((proc) => {
              const group = allGroups.find((g) => g.id === proc.groupId);
              const style = STATUS_STYLES[proc.status] ?? STATUS_STYLES.archived;
              return (
                <div key={proc.id} className="px-3 py-3 rounded-lg border border-brand-200 bg-brand-50">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="size-3.5 text-brand-500" />
                    <span className="text-xs font-semibold text-brand-950">{proc.title}</span>
                    <span className={`ml-auto px-1.5 py-0.5 rounded text-[10px] font-medium ${style.bg} ${style.text}`}>
                      {style.label}
                    </span>
                  </div>
                  {proc.description && <p className="text-[11px] text-brand-600 mb-1.5 ml-5">{proc.description}</p>}
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
