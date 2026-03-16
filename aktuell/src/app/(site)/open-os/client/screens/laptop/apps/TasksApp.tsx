"use client";

import { Circle, CheckCircle2 } from "lucide-react";
import type { DemoData, DemoGroup } from "../../../../_actions/load-demo-data";

type Props = {
  data: DemoData;
  groupIds: string[];
  allGroups: (DemoGroup & { depth: number })[];
};

export default function TasksApp({ data, groupIds, allGroups }: Props) {
  const tasks = data.tasks.filter((t) => groupIds.includes(t.groupId));

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[200px]">
        <span className="text-xs text-brand-950">No tasks in this group.</span>
      </div>
    );
  }

  const open = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);

  return (
    <div className="p-4 space-y-4">
      {open.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-brand-950 mb-2 px-1">Open ({open.length})</div>
          <div className="space-y-1">
            {open.map((task) => (
              <TaskRow key={task.id} task={task} allGroups={allGroups} />
            ))}
          </div>
        </div>
      )}
      {done.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-brand-950 mb-2 px-1">Done ({done.length})</div>
          <div className="space-y-1 opacity-60">
            {done.map((task) => (
              <TaskRow key={task.id} task={task} allGroups={allGroups} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TaskRow({ task, allGroups }: { task: DemoData["tasks"][number]; allGroups: (DemoGroup & { depth: number })[] }) {
  const group = allGroups.find((g) => g.id === task.groupId);
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50 transition-colors">
      {task.done ? (
        <CheckCircle2 className="size-4 text-brand-400 shrink-0" />
      ) : (
        <Circle className="size-4 text-brand-400 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`text-xs ${task.done ? "line-through text-brand-950" : "text-brand-950"}`}>{task.title}</span>
        </div>
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
          {new Date(task.dueAt).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit" })}
        </span>
      )}
    </div>
  );
}
