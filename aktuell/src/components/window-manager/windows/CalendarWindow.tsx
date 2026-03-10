"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from "lucide-react";
import Tag from "../logic/Tag";
import { useWindowManager, type WindowContent } from "../logic/WindowManager";
import { loadEvents, createEvent, type CalendarEvent } from "@/app/_actions/events";
import { loadGroups, type GroupOption } from "@/app/_actions/groups";
import { useGroupFilter } from "@/components/desktop/GroupFilterContext";

type ViewMode = "month" | "week" | "day";

type HierarchicalGroup = GroupOption & { depth: number };

function GroupSelect({
  groups,
  value,
  onChange,
}: {
  groups: HierarchicalGroup[];
  value: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = groups.find((g) => g.id === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 cursor-pointer text-left"
      >
        {selected && (
          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: selected.color }} />
        )}
        <span className="flex-1 truncate">{selected?.name ?? "Select group..."}</span>
        <ChevronLeft className="size-3 text-brand-500 -rotate-90" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 top-full mt-1 bg-brand-0 border border-brand-150 rounded-lg shadow-lg py-1 z-20 max-h-48 overflow-y-auto">
            {groups.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => { onChange(g.id); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-brand-50 transition-colors cursor-pointer ${
                  g.id === value ? "bg-brand-50" : ""
                }`}
                style={{ paddingLeft: g.depth === 1 ? "2rem" : "0.75rem" }}
              >
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: g.color }} />
                <span className="truncate text-brand-950">{g.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CreateEventForm({
  hierarchicalGroups,
  onCreated,
}: {
  hierarchicalGroups: HierarchicalGroup[];
  onCreated: (ev: CalendarEvent) => void;
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [groupId, setGroupId] = useState(hierarchicalGroups[0]?.id ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date || !groupId) return;
    setSaving(true);
    setError("");
    const startsAt = new Date(`${date}T${time}`).toISOString();
    const result = await createEvent({ title, startsAt, groupId });
    if (result.success && result.event) {
      onCreated(result.event);
      setTitle("");
      setDate("");
      setTime("12:00");
    } else {
      setError(result.error ?? "Failed");
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <input
        type="text"
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-950"
        autoFocus
        required
      />
      <div className="flex gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 px-3 py-2 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-950"
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-28 px-3 py-2 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-950"
        />
      </div>

      <GroupSelect groups={hierarchicalGroups} value={groupId} onChange={setGroupId} />

      {error && <div className="text-xs text-red-600">{error}</div>}
      <button
        type="submit"
        disabled={saving || !title.trim() || !date}
        className="w-full py-2 text-sm font-medium rounded-lg bg-brand-950 text-brand-0 hover:opacity-80 transition-opacity disabled:opacity-40 cursor-pointer"
      >
        {saving ? "Saving..." : "Create Event"}
      </button>
    </form>
  );
}

function CalendarContent() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [dbGroups, setDbGroups] = useState<GroupOption[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleWindow, closeWindow } = useWindowManager();
  const { selectedGroupIds, allGroups: filterGroups } = useGroupFilter();

  const reload = useCallback(async () => {
    const [evts, grps] = await Promise.all([loadEvents(), loadGroups()]);
    setAllEvents(evts);
    setDbGroups(grps);
    setLoading(false);
  }, []);

  useEffect(() => { reload(); }, [reload]);

  const events = selectedGroupIds.size === 0
    ? allEvents
    : allEvents.filter((e) => selectedGroupIds.has(e.groupId));

  const hierarchicalGroups: HierarchicalGroup[] = filterGroups.map((fg) => {
    const dbg = dbGroups.find((g) => g.id === fg.id);
    return {
      id: fg.id,
      name: fg.name,
      color: fg.color,
      depth: fg.depth,
    };
  });

  const openCreateWindow = () => {
    toggleWindow("create-event", {
      title: "New Event",
      body: (
        <CreateEventForm
          hierarchicalGroups={hierarchicalGroups.length > 0 ? hierarchicalGroups : dbGroups.map((g) => ({ ...g, depth: 0 }))}
          onCreated={(ev) => {
            setAllEvents((prev) => [...prev, ev].sort((a, b) => a.startsAt.localeCompare(b.startsAt)));
            closeWindow("create-event");
          }}
        />
      ),
      width: 360,
      height: 320,
      resizable: false,
      centered: true,
    });
  };

  const navigateDate = (direction: "prev" | "next") => {
    const d = new Date(currentDate);
    if (viewMode === "month") d.setMonth(d.getMonth() + (direction === "next" ? 1 : -1));
    else if (viewMode === "week") d.setDate(d.getDate() + (direction === "next" ? 7 : -7));
    else d.setDate(d.getDate() + (direction === "next" ? 1 : -1));
    setCurrentDate(d);
  };

  const getEventsForDate = (date: Date) =>
    events.filter((e) => new Date(e.startsAt).toDateString() === date.toDateString());

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    const days = [];
    const cur = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dayEvents = getEventsForDate(cur);
      const isCurrentMonth = cur.getMonth() === month;
      const isToday = cur.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={i}
          className={`min-h-[60px] p-1 border-r border-b border-brand-100 ${
            isCurrentMonth ? "bg-brand-0" : "bg-brand-25"
          } ${isToday ? "ring-1 ring-brand-950 ring-inset" : ""}`}
        >
          <div className={`text-xs font-medium mb-1 ${isCurrentMonth ? "text-brand-950" : "text-brand-400"}`}>
            {cur.getDate()}
          </div>
          <div className="space-y-0.5">
            {dayEvents.slice(0, 2).map((ev) => (
              <div
                key={ev.id}
                className="text-[10px] px-1 py-0.5 rounded text-white truncate"
                style={{ backgroundColor: ev.groupColor }}
                title={`${ev.title} (${ev.groupName})`}
              >
                {ev.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-[9px] text-brand-500">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>,
      );
      cur.setDate(cur.getDate() + 1);
    }

    return (
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-7 bg-brand-50 border-b border-brand-200">
          {["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"].map((d) => (
            <div key={d} className="p-2 text-xs font-semibold text-brand-950 text-center border-r border-brand-200 last:border-r-0">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-1 border-l border-brand-200">{days}</div>
      </div>
    );
  };

  const renderWeekView = () => {
    const sow = new Date(currentDate);
    sow.setDate(currentDate.getDate() - currentDate.getDay());
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(sow);
      d.setDate(sow.getDate() + i);
      return d;
    });

    return (
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-7 bg-brand-50 border-b border-brand-200">
          {weekDays.map((day, i) => (
            <div key={i} className="p-2 text-center border-r border-brand-200 last:border-r-0">
              <div className="text-xs font-semibold text-brand-950">
                {day.toLocaleDateString("de-DE", { weekday: "short" })}
              </div>
              <div className={`text-sm font-medium mt-1 ${
                day.toDateString() === new Date().toDateString()
                  ? "text-brand-0 bg-brand-950 rounded-full w-6 h-6 flex items-center justify-center mx-auto"
                  : "text-brand-950"
              }`}>
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-1 border-l border-brand-200">
          {weekDays.map((day, i) => {
            const dayEvents = getEventsForDate(day);
            return (
              <div key={i} className="p-2 border-r border-brand-200 last:border-r-0 space-y-1">
                {dayEvents.map((ev) => (
                  <div key={ev.id} className="text-xs p-1.5 rounded text-white" style={{ backgroundColor: ev.groupColor }}>
                    <div className="font-medium truncate">{ev.title}</div>
                    <div className="text-[10px] opacity-90">
                      {new Date(ev.startsAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="flex-1 flex flex-col">
        <div className="bg-brand-50 border-b border-brand-200 p-3 text-center">
          <div className="text-sm font-semibold text-brand-950">
            {currentDate.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {hours.map((hour) => (
            <div key={hour} className="flex border-b border-brand-100">
              <div className="w-16 p-2 text-xs text-brand-500 bg-brand-25 border-r border-brand-100">
                {hour.toString().padStart(2, "0")}:00
              </div>
              <div className="flex-1 p-2 min-h-[40px] relative">
                {dayEvents
                  .filter((ev) => new Date(ev.startsAt).getHours() === hour)
                  .map((ev) => (
                    <div
                      key={ev.id}
                      className="absolute left-2 right-2 p-1.5 rounded text-white text-xs"
                      style={{
                        backgroundColor: ev.groupColor,
                        top: `${(new Date(ev.startsAt).getMinutes() / 60) * 40}px`,
                      }}
                    >
                      <div className="font-medium">{ev.title}</div>
                      <div className="text-[10px] opacity-90">
                        {new Date(ev.startsAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const formatTitle = () => {
    if (viewMode === "month") return currentDate.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
    if (viewMode === "week") {
      const sow = new Date(currentDate);
      sow.setDate(currentDate.getDate() - currentDate.getDay());
      const eow = new Date(sow);
      eow.setDate(sow.getDate() + 6);
      return `${sow.getDate()}.${sow.getMonth() + 1} – ${eow.getDate()}.${eow.getMonth() + 1}.${eow.getFullYear()}`;
    }
    return currentDate.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-xs text-brand-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-brand-200 bg-brand-50 shrink-0">
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-4 text-brand-950" />
          <span className="font-heading text-sm font-semibold text-brand-950">Calendar</span>
          <span className="text-xs text-brand-500">({events.length})</span>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={openCreateWindow} className="p-1 rounded hover:bg-brand-50 transition-colors cursor-pointer" title="New Event">
            <Plus className="size-4 text-brand-950" />
          </button>

          <div className="flex rounded-md border border-brand-200 bg-brand-0 p-0.5">
            {(["month", "week", "day"] as ViewMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`px-2 py-1 text-xs rounded transition-colors cursor-pointer ${
                  viewMode === m ? "bg-brand-950 text-brand-0 font-medium" : "text-brand-950 hover:bg-brand-50"
                }`}
              >
                {m === "month" ? "Monat" : m === "week" ? "Woche" : "Tag"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 ml-2">
            <button onClick={() => navigateDate("prev")} className="p-1 rounded hover:bg-brand-50 transition-colors cursor-pointer">
              <ChevronLeft className="size-4 text-brand-950" />
            </button>
            <div className="px-2 py-1 text-xs font-medium text-brand-950 min-w-[120px] text-center">
              {formatTitle()}
            </div>
            <button onClick={() => navigateDate("next")} className="p-1 rounded hover:bg-brand-50 transition-colors cursor-pointer">
              <ChevronRight className="size-4 text-brand-950" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        {viewMode === "month" && renderMonthView()}
        {viewMode === "week" && renderWeekView()}
        {viewMode === "day" && renderDayView()}
      </div>
    </div>
  );
}

function CalendarTooltip() {
  return (
    <div className="p-3 flex flex-col items-center gap-2 text-center">
      <CalendarIcon className="size-6 text-brand-950" />
      <span className="text-sm font-medium text-brand-950">Calendar</span>
      <span className="text-xs text-brand-500">Click to open</span>
    </div>
  );
}

export default function CalendarWindow({ name, children }: { name: string; children?: React.ReactNode }) {
  const windowContent: WindowContent = {
    title: name,
    body: <CalendarContent />,
    width: 700,
    height: 520,
    resizable: true,
  };

  return (
    <Tag
      id={`calendar-${name.toLowerCase()}`}
      tooltip={children ? undefined : <CalendarTooltip />}
      window={windowContent}
      tooltipWidth={200}
      className={children ? "" : "font-semibold underline decoration-brand-300 underline-offset-2 transition-colors text-brand-900"}
      activeClassName={children ? "" : "text-brand-700"}
    >
      {children ?? name}
    </Tag>
  );
}
