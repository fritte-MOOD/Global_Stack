"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import type { DemoData, DemoGroup } from "../../../../_actions/load-demo-data";

type Props = {
  data: DemoData;
  groupIds: string[];
  allGroups: (DemoGroup & { depth: number })[];
};

export default function CalendarApp({ data, groupIds, allGroups }: Props) {
  const events = data.events.filter((e) => groupIds.includes(e.groupId));

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[200px]">
        <span className="text-xs text-brand-500">No events in this group.</span>
      </div>
    );
  }

  const byDate = new Map<string, typeof events>();
  for (const ev of events) {
    const key = new Date(ev.startsAt).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const arr = byDate.get(key) ?? [];
    arr.push(ev);
    byDate.set(key, arr);
  }

  return (
    <div className="p-4 space-y-5">
      {Array.from(byDate.entries()).map(([dateLabel, dayEvents]) => (
        <div key={dateLabel}>
          <div className="flex items-center gap-2 mb-2 px-1">
            <CalendarIcon className="size-3.5 text-brand-500" />
            <span className="text-xs font-semibold text-brand-700">{dateLabel}</span>
          </div>
          <div className="space-y-2">
            {dayEvents.map((ev) => {
              const group = allGroups.find((g) => g.id === ev.groupId);
              return (
                <div key={ev.id} className="flex items-start gap-3 px-3 py-2.5 rounded-lg border border-brand-200 bg-brand-50">
                  <div className="w-1 h-full min-h-[2rem] rounded-full shrink-0" style={{ backgroundColor: group?.color ?? "#888" }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-brand-950">{ev.title}</span>
                      <span className="text-[10px] text-brand-500">
                        {new Date(ev.startsAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    {ev.description && <p className="text-[11px] text-brand-600 mt-0.5">{ev.description}</p>}
                    <span className="text-[10px] text-brand-500 mt-1 inline-block">{group?.name}</span>
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
