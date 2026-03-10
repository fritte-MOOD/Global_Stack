"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from "lucide-react";
import type { DemoData, DemoGroup } from "../../../../_actions/load-demo-data";

type Props = {
  data: DemoData;
  groupIds: string[];
  allGroups: (DemoGroup & { depth: number })[];
};

type ViewMode = "month" | "week" | "day";

// Demo-Events für den Kalender (zusätzlich zu den DB-Events)
const demoCalendarEvents = [
  { id: "cal-1", title: "Global Stack Demo", date: new Date(2026, 2, 10, 14, 0), type: "presentation", groupId: null },
  { id: "cal-2", title: "Community Sync", date: new Date(2026, 2, 12, 10, 0), type: "meeting", groupId: null },
  { id: "cal-3", title: "Feature Planning", date: new Date(2026, 2, 15, 16, 0), type: "workshop", groupId: null },
  { id: "cal-4", title: "Code Review Session", date: new Date(2026, 2, 18, 11, 0), type: "review", groupId: null },
];

export default function CalendarApp({ data, groupIds, allGroups }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 10)); // 10. März 2026
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  // Kombiniere DB-Events mit Demo-Calendar-Events
  const dbEvents = data.events
    .filter((e) => groupIds.includes(e.groupId))
    .map(e => ({
      id: e.id,
      title: e.title,
      date: new Date(e.startsAt),
      type: "event" as const,
      groupId: e.groupId,
      group: allGroups.find(g => g.id === e.groupId),
    }));

  const calendarEvents = [
    ...dbEvents,
    ...demoCalendarEvents.map(e => ({ ...e, group: null }))
  ];

  // Navigation
  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1));
    } else if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  // Events für aktuelles Datum filtern
  const getEventsForDate = (date: Date) => {
    return calendarEvents.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  // Event-Farbe basierend auf Typ oder Gruppe
  const getEventColor = (event: typeof calendarEvents[0]) => {
    if (event.type === "presentation") return "bg-purple-500";
    if (event.type === "meeting") return "bg-blue-500";
    if (event.type === "workshop") return "bg-green-500";
    if (event.type === "review") return "bg-orange-500";
    if (event.group) return `bg-[${event.group.color}]`;
    return "bg-brand-500";
  };

  // Monatsansicht
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDateObj = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dayEvents = getEventsForDate(currentDateObj);
      const isCurrentMonth = currentDateObj.getMonth() === month;
      const isToday = currentDateObj.toDateString() === new Date(2026, 2, 10).toDateString(); // Demo "heute"

      days.push(
        <div
          key={i}
          className={`min-h-[70px] p-1.5 border-r border-b border-brand-100 ${
            isCurrentMonth ? "bg-brand-0" : "bg-brand-25"
          } ${isToday ? "bg-brand-50 ring-1 ring-brand-300" : ""}`}
        >
          <div className={`text-xs font-medium mb-1 ${
            isCurrentMonth ? "text-brand-900" : "text-brand-400"
          }`}>
            {currentDateObj.getDate()}
          </div>
          <div className="space-y-0.5">
            {dayEvents.slice(0, 3).map(event => (
              <div
                key={event.id}
                className={`text-[10px] px-1 py-0.5 rounded text-white truncate ${getEventColor(event)}`}
                title={`${event.title}${event.group ? ` (${event.group.name})` : ""}`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-[9px] text-brand-500">+{dayEvents.length - 3} more</div>
            )}
          </div>
        </div>
      );
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    return (
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-7 bg-brand-100 border-b border-brand-200">
          {["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"].map(day => (
            <div key={day} className="p-2 text-xs font-semibold text-brand-700 text-center border-r border-brand-200 last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-1 border-l border-brand-200">
          {days}
        </div>
      </div>
    );
  };

  // Wochenansicht
  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }

    return (
      <div className="flex-1 flex flex-col">
        <div className="grid grid-cols-7 bg-brand-100 border-b border-brand-200">
          {weekDays.map((day, i) => (
            <div key={i} className="p-2 text-center border-r border-brand-200 last:border-r-0">
              <div className="text-xs font-semibold text-brand-700">
                {day.toLocaleDateString("de-DE", { weekday: "short" })}
              </div>
              <div className={`text-sm font-medium mt-1 ${
                day.toDateString() === new Date(2026, 2, 10).toDateString()
                  ? "text-brand-900 bg-brand-200 rounded-full w-6 h-6 flex items-center justify-center mx-auto"
                  : "text-brand-800"
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
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className={`text-xs p-1.5 rounded text-white ${getEventColor(event)}`}
                    title={event.group ? event.group.name : undefined}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="text-[10px] opacity-90">
                      {event.date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    {event.group && (
                      <div className="text-[9px] opacity-75 truncate">{event.group.name}</div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Tagesansicht
  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="flex-1 flex flex-col">
        <div className="bg-brand-100 border-b border-brand-200 p-3 text-center">
          <div className="text-sm font-semibold text-brand-900">
            {currentDate.toLocaleDateString("de-DE", { 
              weekday: "long", 
              day: "numeric", 
              month: "long", 
              year: "numeric" 
            })}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-px">
            {hours.map(hour => (
              <div key={hour} className="flex border-b border-brand-100">
                <div className="w-16 p-2 text-xs text-brand-500 bg-brand-25 border-r border-brand-100">
                  {hour.toString().padStart(2, "0")}:00
                </div>
                <div className="flex-1 p-2 min-h-[50px] relative">
                  {dayEvents
                    .filter(event => event.date.getHours() === hour)
                    .map(event => (
                      <div
                        key={event.id}
                        className={`absolute left-2 right-2 p-2 rounded text-white text-xs ${getEventColor(event)}`}
                        style={{ top: `${(event.date.getMinutes() / 60) * 50}px` }}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-[10px] opacity-90">
                          {event.date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        {event.group && (
                          <div className="text-[10px] opacity-75">{event.group.name}</div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const formatTitle = () => {
    if (viewMode === "month") {
      return currentDate.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
    } else if (viewMode === "week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return `${startOfWeek.getDate()}.${startOfWeek.getMonth() + 1} - ${endOfWeek.getDate()}.${endOfWeek.getMonth() + 1}.${endOfWeek.getFullYear()}`;
    } else {
      return currentDate.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
    }
  };

  if (calendarEvents.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <div className="text-center">
          <CalendarIcon className="size-12 text-brand-300 mx-auto mb-3" />
          <span className="text-sm text-brand-500">No events found.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-brand-200 bg-brand-50 shrink-0">
        <div className="flex items-center gap-2">
          <CalendarIcon className="size-4 text-brand-700" />
          <span className="font-heading text-sm font-semibold text-brand-900">Calendar</span>
          <span className="text-xs text-brand-500">({calendarEvents.length} events)</span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex rounded-md border border-brand-200 bg-brand-0 p-0.5">
            {(["month", "week", "day"] as ViewMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-2 py-1 text-xs rounded transition-colors cursor-pointer ${
                  viewMode === mode
                    ? "bg-brand-200 text-brand-900 font-medium"
                    : "text-brand-700 hover:text-brand-900 hover:bg-brand-100"
                }`}
              >
                {mode === "month" ? "Monat" : mode === "week" ? "Woche" : "Tag"}
              </button>
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigateDate("prev")}
              className="p-1 rounded hover:bg-brand-100 transition-colors cursor-pointer"
            >
              <ChevronLeft className="size-4 text-brand-700" />
            </button>
            <div className="px-2 py-1 text-xs font-medium text-brand-900 min-w-[140px] text-center">
              {formatTitle()}
            </div>
            <button
              onClick={() => navigateDate("next")}
              className="p-1 rounded hover:bg-brand-100 transition-colors cursor-pointer"
            >
              <ChevronRight className="size-4 text-brand-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="flex-1 min-h-0">
        {viewMode === "month" && renderMonthView()}
        {viewMode === "week" && renderWeekView()}
        {viewMode === "day" && renderDayView()}
      </div>
    </div>
  );
}