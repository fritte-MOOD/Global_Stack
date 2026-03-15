"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CheckSquare, Circle, CheckCircle2, Search } from "lucide-react";
import Tag from "../logic/Tag";
import { useWindowManager, type WindowContent } from "../logic/WindowManager";
import { loadDemoData, type DemoData } from "@/app/(site)/open-os/_actions/load-demo-data";
import { useGroupFilter } from "@/components/desktop/GroupFilterContext";
import { searchWindowContent } from "./SearchWindow";

const SERVER_SLUGS = ["park-club", "marin-quarter", "rochefort"];

export function TasksContent() {
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

  const tasks = data.tasks;
  const groupFiltered = tasks.filter((t) => selectedGroupIds.has(t.groupId));
  const allGroups = data.groups.flatMap((g) => [
    { ...g, depth: 0 },
    ...g.children.map((c) => ({ ...c, depth: 1 as const, parentId: g.id, children: [] as typeof g.children })),
  ]);

  const q = searchQuery.toLowerCase();
  const filteredTasks = q
    ? groupFiltered.filter((t) =>
        t.title.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.assignee?.name.toLowerCase().includes(q)
      )
    : groupFiltered;

  if (groupFiltered.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <span className="text-xs text-brand-950">No tasks.</span>
      </div>
    );
  }

  const open = filteredTasks.filter((t) => !t.done);
  const done = filteredTasks.filter((t) => t.done);

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
              placeholder="Aufgaben durchsuchen..."
              className="flex-1 text-xs bg-transparent text-brand-950 outline-none placeholder:text-brand-400"
            />
          </div>
          <button
            onClick={() => openNewInstance("search", searchWindowContent("task"))}
            className="p-1.5 rounded-md hover:bg-brand-100 transition-colors cursor-pointer shrink-0"
            title="Globale Suche (Aufgaben)"
          >
            <Search className="size-3.5 text-brand-950" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
      {open.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-brand-950 mb-1.5 px-1">Open ({open.length})</div>
          <div className="space-y-0.5">
            {open.map((task) => {
              const group = allGroups.find((g) => g.id === task.groupId);
              return (
                <div key={task.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-brand-50 transition-colors">
                  <Circle className="size-3.5 text-brand-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-brand-950">{task.title}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      {group && (
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                          <span className="text-[10px] text-brand-950">{group.name}</span>
                        </span>
                      )}
                      {task.assignee && <span className="text-[10px] text-brand-950">&rarr; {task.assignee.name}</span>}
                    </div>
                  </div>
                  {task.dueAt && (
                    <span className="text-[10px] text-brand-950 shrink-0">
                      {new Date(task.dueAt).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {done.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-brand-950 mb-1.5 px-1">Done ({done.length})</div>
          <div className="space-y-0.5 opacity-60">
            {done.map((task) => {
              const group = allGroups.find((g) => g.id === task.groupId);
              return (
                <div key={task.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-brand-50 transition-colors">
                  <CheckCircle2 className="size-3.5 text-brand-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs line-through text-brand-950">{task.title}</span>
                    {group && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                        <span className="text-[10px] text-brand-950">{group.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

function TasksTooltip() {
  return (
    <div className="p-3 flex flex-col items-center gap-2 text-center">
      <CheckSquare className="size-6 text-brand-950" />
      <span className="text-sm font-medium text-brand-950">Tasks</span>
      <span className="text-xs text-brand-950">Click to open tasks</span>
    </div>
  );
}

export default function TasksWindow({ children }: { children?: ReactNode }) {
  const windowContent: WindowContent = {
    title: "Tasks",
    body: <TasksContent />,
    width: 420,
    height: 400,
    resizable: true,
  };

  return (
    <Tag
      id="app-tasks"
      tooltip={children ? undefined : <TasksTooltip />}
      window={windowContent}
      tooltipWidth={200}
      className={children ? "" : "font-semibold underline decoration-brand-200 underline-offset-2 transition-colors text-brand-950"}
      activeClassName={children ? "" : "text-brand-950"}
    >
      {children ?? "Tasks"}
    </Tag>
  );
}
