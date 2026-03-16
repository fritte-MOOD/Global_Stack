"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  CheckSquare,
  Circle,
  CheckCircle2,
  Search,
  Plus,
  Calendar,
  User,
  Clock,
  ChevronLeft,
  X,
} from "lucide-react";
import Tag from "../logic/Tag";
import { useWindowManager, type WindowContent } from "../logic/WindowManager";
import {
  loadDemoData,
  type DemoData,
  type DemoTask,
} from "@/app/(site)/open-os/_actions/load-demo-data";
import { useGroupFilter } from "@/components/desktop/GroupFilterContext";
import { searchWindowContent } from "./SearchWindow";
import {
  loadTaskDetails,
  createTask,
  toggleTaskDone,
  type TaskDetail,
} from "@/app/_actions/tasks";
import { loadAvailableUsers } from "@/app/_actions/chats";
import { ParticipantPicker } from "./ParticipantPicker";

const SERVER_SLUGS = ["sportclub", "marin-quarter", "rochefort"];

function formatDueDate(dueAt: string): string {
  const d = new Date(dueAt);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const due = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round(
    (due.getTime() - today.getTime()) / 86400000
  );

  if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays <= 7) return `in ${diffDays}d`;
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "2-digit" });
}

function getDueDateColor(dueAt: string, done: boolean): string {
  if (done) return "text-brand-950 opacity-60";
  const d = new Date(dueAt);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const due = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round(
    (due.getTime() - today.getTime()) / 86400000
  );
  if (diffDays < 0) return "text-red-600 font-medium";
  if (diffDays === 0) return "text-orange-600 font-medium";
  if (diffDays <= 2) return "text-orange-500";
  return "text-brand-950";
}

function sortByDueDate(tasks: DemoTask[]): DemoTask[] {
  return [...tasks].sort((a, b) => {
    if (!a.dueAt && !b.dueAt) return 0;
    if (!a.dueAt) return 1;
    if (!b.dueAt) return -1;
    return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime();
  });
}

// ─── Task Detail ────────────────────────────────────────────────

function TaskDetailContent({ taskId }: { taskId: string }) {
  const [task, setTask] = useState<TaskDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    const t = await loadTaskDetails(taskId);
    setTask(t);
    setLoading(false);
  }, [taskId]);

  useEffect(() => {
    reload();
  }, [reload]);

  const handleToggle = async () => {
    if (!task) return;
    const newDone = await toggleTaskDone(task.id);
    setTask((prev) => (prev ? { ...prev, done: newDone } : prev));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <span className="text-xs text-brand-950">Loading...</span>
      </div>
    );
  }
  if (!task) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <span className="text-xs text-brand-950">Task not found</span>
      </div>
    );
  }

  const createdDate = new Date(task.createdAt);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 bg-brand-50 border-b border-brand-150">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="w-3.5 h-3.5 rounded-full shrink-0"
            style={{ backgroundColor: task.groupColor }}
          />
          <span className="text-xs font-medium text-brand-950">
            {task.groupPath}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggle}
            className="mt-1 shrink-0 cursor-pointer"
          >
            {task.done ? (
              <CheckCircle2 className="size-5 text-brand-400" />
            ) : (
              <Circle className="size-5 text-brand-950" />
            )}
          </button>
          <h3
            className={`text-lg font-bold leading-tight ${
              task.done
                ? "line-through text-brand-400"
                : "text-brand-950"
            }`}
          >
            {task.title}
          </h3>
        </div>
        {task.description && (
          <p className="text-sm text-brand-950 mt-3 whitespace-pre-wrap leading-relaxed pl-8">
            {task.description}
          </p>
        )}
      </div>

      {/* Details Grid */}
      <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-3">
        {task.dueAt && (
          <div className="flex items-start gap-2.5">
            <Calendar className="size-4 text-brand-950 mt-0.5 shrink-0" />
            <div>
              <div className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-0.5">
                Due
              </div>
              <div
                className={`text-sm ${getDueDateColor(task.dueAt, task.done)}`}
              >
                {new Date(task.dueAt).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "long",
                })}
              </div>
            </div>
          </div>
        )}
        {task.assignee && (
          <div className="flex items-start gap-2.5">
            <User className="size-4 text-brand-950 mt-0.5 shrink-0" />
            <div>
              <div className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-0.5">
                Assigned
              </div>
              <div className="text-sm text-brand-950">
                {task.assignee.name}
              </div>
            </div>
          </div>
        )}
        <div className="flex items-start gap-2.5">
          <User className="size-4 text-brand-950 mt-0.5 shrink-0" />
          <div>
            <div className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-0.5">
              Created by
            </div>
            <div className="text-sm text-brand-950">{task.creator.name}</div>
            <div className="text-[11px] text-brand-950">
              {createdDate.toLocaleDateString("en-US")}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Clock className="size-4 text-brand-950 mt-0.5 shrink-0" />
          <div>
            <div className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-0.5">
              Status
            </div>
            <div className="text-sm text-brand-950">
              {task.done ? "Done" : "Open"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Create Task Form ───────────────────────────────────────────

function CreateTaskForm({
  hierarchicalGroups,
  currentUserId,
  onCreated,
}: {
  hierarchicalGroups: {
    id: string;
    name: string;
    color: string;
    depth: number;
  }[];
  currentUserId: string;
  onCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [groupId, setGroupId] = useState(hierarchicalGroups[0]?.id ?? "");
  const [assigneeIds, setAssigneeIds] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inputCls =
    "w-full px-3 py-2 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-200";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !groupId) return;
    setSaving(true);
    setError("");
    const result = await createTask({
      title: title.trim(),
      description: description.trim() || undefined,
      dueAt: dueDate ? new Date(dueDate).toISOString() : undefined,
      groupId,
      assigneeId: assigneeIds.size > 0 ? [...assigneeIds][0] : undefined,
      creatorId: currentUserId,
    });
    if (result.success) {
      onCreated();
    } else {
      setError(result.error ?? "Error");
    }
    setSaving(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-full overflow-y-auto"
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4 bg-brand-50 border-b border-brand-150">
        {/* Group select */}
        <div className="mb-3">
          <select
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className={inputCls}
          >
            {hierarchicalGroups.map((g) => (
              <option key={g.id} value={g.id}>
                {"  ".repeat(g.depth)}
                {g.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-lg font-bold text-brand-950 bg-transparent border-b border-brand-200 focus:border-brand-400 outline-none pb-1 placeholder:text-brand-400 placeholder:font-normal"
          autoFocus
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full mt-3 text-sm text-brand-950 bg-transparent border border-brand-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-200 resize-none placeholder:text-brand-400 leading-relaxed"
        />
      </div>

      {/* Details */}
      <div className="px-5 py-4 space-y-4 border-b border-brand-150">
        <div className="flex items-start gap-2.5">
          <Calendar className="size-4 text-brand-950 mt-2.5 shrink-0" />
          <div className="flex-1">
            <div className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-1">
              Due date
            </div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <ParticipantPicker
          selectedIds={assigneeIds}
          onChange={setAssigneeIds}
          currentUserId={currentUserId}
          singleSelect
        />
      </div>

      {/* Footer */}
      <div className="px-5 py-4 mt-auto">
        {error && <div className="text-xs text-red-600 mb-3">{error}</div>}
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className="w-full py-2.5 text-sm font-medium rounded-lg bg-brand-950 text-brand-0 hover:opacity-80 transition-opacity disabled:opacity-40 cursor-pointer"
        >
          {saving ? "Creating..." : "Create task"}
        </button>
      </div>
    </form>
  );
}

// ─── Tasks Content ──────────────────────────────────────────────

export function TasksContent({ focusGroupId }: { focusGroupId?: string } = {}) {
  const { selectedGroupIds, allGroups, currentUserId } = useGroupFilter();
  const { openNewInstance, toggleWindow, closeWindow } = useWindowManager();
  const [data, setData] = useState<DemoData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [localToggles, setLocalToggles] = useState<Record<string, boolean>>({});
  const [tempGroupFilter, setTempGroupFilter] = useState<string | null>(focusGroupId ?? null);

  const reload = useCallback(() => {
    loadDemoData(SERVER_SLUGS).then((d) => {
      setData(d);
      setLocalToggles({});
    });
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <span className="text-xs text-brand-950">Loading...</span>
      </div>
    );
  }

  const tasks = data.tasks.map((t) =>
    t.id in localToggles ? { ...t, done: localToggles[t.id] } : t
  );
  const effectiveGroupIds = (() => {
    if (tempGroupFilter) {
      const ids = new Set<string>();
      ids.add(tempGroupFilter);
      allGroups.filter((g) => g.parentId === tempGroupFilter).forEach((g) => ids.add(g.id));
      return ids;
    }
    return selectedGroupIds;
  })();
  const groupFiltered = tasks.filter((t) => effectiveGroupIds.has(t.groupId));
  const tempGroupName = tempGroupFilter ? allGroups.find((g) => g.id === tempGroupFilter)?.name : null;
  const hierarchicalGroups = allGroups.map((g) => ({
    ...g,
    depth: g.depth,
  }));

  const flatGroups = data.groups.flatMap((g) => [
    { ...g, depth: 0 },
    ...g.children.map((c) => ({
      ...c,
      depth: 1 as const,
      parentId: g.id,
      children: [] as typeof g.children,
    })),
  ]);

  const q = searchQuery.toLowerCase();
  const filteredTasks = q
    ? groupFiltered.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.assignee?.name.toLowerCase().includes(q)
      )
    : groupFiltered;

  const handleToggleDone = async (task: DemoTask) => {
    const newDone = !task.done;
    setLocalToggles((prev) => ({ ...prev, [task.id]: newDone }));
    await toggleTaskDone(task.id);
  };

  const openTaskDetail = (task: DemoTask) => {
    openNewInstance("task-detail", {
      title: task.title,
      body: <TaskDetailContent taskId={task.id} />,
      width: 420,
      height: 480,
      resizable: true,
      centered: true,
    });
  };

  const openCreateTask = () => {
    toggleWindow("create-task", {
      title: "New task",
      body: (
        <CreateTaskForm
          hierarchicalGroups={
            hierarchicalGroups.length > 0 ? hierarchicalGroups : []
          }
          currentUserId={currentUserId}
          onCreated={() => {
            closeWindow("create-task");
            reload();
          }}
        />
      ),
      width: 420,
      height: 520,
      resizable: true,
      centered: true,
    });
  };

  const focusBanner = tempGroupFilter && tempGroupName && (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-100 border-b border-brand-150 shrink-0">
      <span className="text-[10px] text-brand-950">Filtered: <strong>{tempGroupName}</strong></span>
      <button
        onClick={() => setTempGroupFilter(null)}
        className="ml-auto flex items-center gap-1 px-2 py-0.5 text-[10px] rounded border border-brand-200 text-brand-950 hover:bg-brand-200 transition-colors cursor-pointer"
      >
        <X className="size-2.5" /> Show all
      </button>
    </div>
  );

  if (groupFiltered.length === 0) {
    return (
      <div className="h-full flex flex-col">
        {focusBanner}
        {/* Search + Create bar */}
        <div className="px-3 pt-3 pb-2 border-b border-brand-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-brand-200 bg-brand-0 flex-1">
              <Search className="size-3.5 text-brand-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="flex-1 text-xs bg-transparent text-brand-950 outline-none placeholder:text-brand-400"
              />
            </div>
            <button
              onClick={() =>
                openNewInstance("search", searchWindowContent("task"))
              }
              className="p-1.5 rounded-md hover:bg-brand-100 transition-colors cursor-pointer shrink-0"
              title="Global search (tasks)"
            >
              <Search className="size-3.5 text-brand-950" />
            </button>
            <button
              onClick={openCreateTask}
              className="p-1.5 rounded-md hover:bg-brand-100 transition-colors cursor-pointer shrink-0"
              title="New task"
            >
              <Plus className="size-3.5 text-brand-950" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-1 p-8">
          <span className="text-xs text-brand-950">No tasks.</span>
        </div>
      </div>
    );
  }

  const open = sortByDueDate(filteredTasks.filter((t) => !t.done));
  const done = sortByDueDate(filteredTasks.filter((t) => t.done));

  return (
    <div className="h-full flex flex-col">
      {focusBanner}
      {/* Search + Create bar */}
      <div className="px-3 pt-3 pb-2 border-b border-brand-100 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-brand-200 bg-brand-0 flex-1">
            <Search className="size-3.5 text-brand-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="flex-1 text-xs bg-transparent text-brand-950 outline-none placeholder:text-brand-400"
            />
          </div>
          <button
            onClick={() =>
              openNewInstance("search", searchWindowContent("task"))
            }
            className="p-1.5 rounded-md hover:bg-brand-100 transition-colors cursor-pointer shrink-0"
            title="Global search (tasks)"
          >
            <Search className="size-3.5 text-brand-950" />
          </button>
          <button
            onClick={openCreateTask}
            className="p-1.5 rounded-md hover:bg-brand-100 transition-colors cursor-pointer shrink-0"
            title="New task"
          >
            <Plus className="size-3.5 text-brand-950" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
        {open.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-brand-950 mb-1.5 px-1">
              Open ({open.length})
            </div>
            <div className="space-y-1">
              {open.map((task) => {
                const group = flatGroups.find((g) => g.id === task.groupId);
                return (
                  <div
                    key={task.id}
                    onClick={() => openTaskDetail(task)}
                    className="flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-brand-50 transition-colors cursor-pointer"
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); handleToggleDone(task); }}
                      className="shrink-0 cursor-pointer hover:scale-110 transition-transform mt-0.5"
                    >
                      <Circle className="size-3.5 text-brand-400" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium text-brand-950">
                        {task.title}
                      </span>
                      {task.description && (
                        <p className="text-[10px] text-brand-950 opacity-60 mt-0.5 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        {group && (
                          <span className="flex items-center gap-1">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: group.color }}
                            />
                            <span className="text-[10px] text-brand-950">
                              {group.name}
                            </span>
                          </span>
                        )}
                        {task.assignee && (
                          <span className="text-[10px] text-brand-950">
                            &rarr; {task.assignee.name}
                          </span>
                        )}
                        {task.dueAt && (
                          <span
                            className={`text-[10px] ${getDueDateColor(task.dueAt, false)}`}
                          >
                            {formatDueDate(task.dueAt)}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleToggleDone(task); }}
                      className="shrink-0 px-2 py-0.5 text-[10px] rounded border border-brand-200 text-brand-950 hover:bg-brand-100 transition-colors cursor-pointer mt-0.5"
                    >
                      Done
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {done.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-brand-950 mb-1.5 px-1">
              Done ({done.length})
            </div>
            <div className="space-y-1 opacity-60">
              {done.map((task) => {
                const group = flatGroups.find((g) => g.id === task.groupId);
                return (
                  <div
                    key={task.id}
                    onClick={() => openTaskDetail(task)}
                    className="flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-brand-50 transition-colors cursor-pointer"
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); handleToggleDone(task); }}
                      className="shrink-0 cursor-pointer hover:scale-110 transition-transform mt-0.5"
                    >
                      <CheckCircle2 className="size-3.5 text-brand-400" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs line-through text-brand-950">
                        {task.title}
                      </span>
                      {group && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: group.color }}
                          />
                          <span className="text-[10px] text-brand-950">
                            {group.name}
                          </span>
                        </div>
                      )}
                    </div>
                    {task.dueAt && (
                      <span className="text-[10px] text-brand-950 shrink-0">
                        {new Date(task.dueAt).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </span>
                    )}
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

export default function TasksWindow({
  children,
}: {
  children?: ReactNode;
}) {
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
      className={
        children
          ? ""
          : "font-semibold underline decoration-brand-200 underline-offset-2 transition-colors text-brand-950"
      }
      activeClassName={children ? "" : "text-brand-950"}
    >
      {children ?? "Tasks"}
    </Tag>
  );
}
