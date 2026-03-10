"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CheckSquare, Circle, CheckCircle2 } from "lucide-react";
import Tag from "../logic/Tag";
import type { WindowContent } from "../logic/WindowManager";
import { loadDemoData, type DemoData } from "@/app/(site)/open-os/_actions/load-demo-data";
import { useGroupFilter } from "@/components/desktop/GroupFilterContext";

const SERVER_SLUGS = ["park-club", "marin-quarter", "rochefort"];

function TasksContent() {
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

  const tasks = data.tasks;
  const filteredTasks = selectedGroupIds.size > 0 ? tasks.filter((t) => selectedGroupIds.has(t.groupId)) : tasks;
  const allGroups = data.groups.flatMap((g) => [
    { ...g, depth: 0 },
    ...g.children.map((c) => ({ ...c, depth: 1 as const, parentId: g.id, children: [] as typeof g.children })),
  ]);

  if (filteredTasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <span className="text-xs text-brand-500">No tasks.</span>
      </div>
    );
  }

  const open = filteredTasks.filter((t) => !t.done);
  const done = filteredTasks.filter((t) => t.done);

  return (
    <div className="h-full overflow-y-auto p-3 space-y-3">
      {open.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-brand-700 mb-1.5 px-1">Open ({open.length})</div>
          <div className="space-y-0.5">
            {open.map((task) => {
              const group = allGroups.find((g) => g.id === task.groupId);
              return (
                <div key={task.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-brand-50 transition-colors">
                  <Circle className="size-3.5 text-brand-300 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-brand-950">{task.title}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      {group && (
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                          <span className="text-[10px] text-brand-500">{group.name}</span>
                        </span>
                      )}
                      {task.assignee && <span className="text-[10px] text-brand-500">&rarr; {task.assignee.name}</span>}
                    </div>
                  </div>
                  {task.dueAt && (
                    <span className="text-[10px] text-brand-500 shrink-0">
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
          <div className="text-xs font-semibold text-brand-500 mb-1.5 px-1">Done ({done.length})</div>
          <div className="space-y-0.5 opacity-60">
            {done.map((task) => {
              const group = allGroups.find((g) => g.id === task.groupId);
              return (
                <div key={task.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-brand-50 transition-colors">
                  <CheckCircle2 className="size-3.5 text-brand-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs line-through text-brand-500">{task.title}</span>
                    {group && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                        <span className="text-[10px] text-brand-500">{group.name}</span>
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
  );
}

function TasksTooltip() {
  return (
    <div className="p-3 flex flex-col items-center gap-2 text-center">
      <CheckSquare className="size-6 text-brand-700" />
      <span className="text-sm font-medium text-brand-900">Tasks</span>
      <span className="text-xs text-brand-600">Click to open tasks</span>
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
      className={children ? "" : "font-semibold underline decoration-brand-300 underline-offset-2 transition-colors text-brand-900"}
      activeClassName={children ? "" : "text-brand-700"}
    >
      {children ?? "Tasks"}
    </Tag>
  );
}
