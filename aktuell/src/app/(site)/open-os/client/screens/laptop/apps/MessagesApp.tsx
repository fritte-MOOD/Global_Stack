"use client";

import type { DemoData, DemoGroup } from "../../../../_actions/load-demo-data";

type Props = {
  data: DemoData;
  groupIds: string[];
  allGroups: (DemoGroup & { depth: number })[];
};

export default function MessagesApp({ data, groupIds, allGroups }: Props) {
  const messages = data.messages.filter((m) => m.groupId && groupIds.includes(m.groupId));

  if (messages.length === 0) {
    return <Empty label="No messages in this group." />;
  }

  const grouped = groupByGroup(messages, "groupId", allGroups);

  return (
    <div className="p-4 space-y-4">
      {grouped.map(({ group, items }) => (
        <div key={group.id}>
          <GroupHeader group={group} />
          <div className="space-y-1.5 mt-2">
            {items.map((msg) => (
              <div key={msg.id} className="flex gap-3 px-3 py-2 rounded-lg hover:bg-brand-50 transition-colors">
                <div className="w-7 h-7 rounded-full bg-brand-200 flex items-center justify-center shrink-0 text-[10px] font-semibold text-brand-950">
                  {msg.author.nickname?.[0]?.toUpperCase() ?? msg.author.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-semibold text-brand-950">{msg.author.name}</span>
                    <span className="text-[10px] text-brand-950">
                      {new Date(msg.createdAt).toLocaleString("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-xs text-brand-950 mt-0.5">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GroupHeader({ group }: { group: { name: string; color: string } }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: group.color }} />
      <span className="text-xs font-semibold text-brand-950">{group.name}</span>
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-full min-h-[200px]">
      <span className="text-xs text-brand-950">{label}</span>
    </div>
  );
}

function groupByGroup<T extends { groupId: string | null }>(
  items: T[],
  _key: string,
  allGroups: (DemoGroup & { depth: number })[],
): { group: { id: string; name: string; color: string }; items: T[] }[] {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const gid = item.groupId ?? "unknown";
    const arr = map.get(gid) ?? [];
    arr.push(item);
    map.set(gid, arr);
  }
  return Array.from(map.entries()).map(([gid, gItems]) => {
    const g = allGroups.find((x) => x.id === gid);
    return { group: { id: gid, name: g?.name ?? "Unknown", color: g?.color ?? "#888" }, items: gItems };
  });
}
