"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Mail } from "lucide-react";
import Tag from "../logic/Tag";
import type { WindowContent } from "../logic/WindowManager";
import { loadDemoData, type DemoData } from "@/app/(site)/open-os/_actions/load-demo-data";
import { useGroupFilter } from "@/components/desktop/GroupFilterContext";

const SERVER_SLUGS = ["park-club", "marin-quarter", "rochefort"];

function MessagesContent() {
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

  const messages = data.messages;
  const filteredMessages = selectedGroupIds.size > 0 ? messages.filter((msg) => selectedGroupIds.has(msg.groupId)) : messages;
  const allGroups = data.groups.flatMap((g) => [
    { ...g, depth: 0 },
    ...g.children.map((c) => ({ ...c, depth: 1 as const, parentId: g.id, children: [] as typeof g.children })),
  ]);

  if (filteredMessages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <span className="text-xs text-brand-500">No messages.</span>
      </div>
    );
  }

  const grouped = new Map<string, typeof messages>();
  for (const msg of filteredMessages) {
    const arr = grouped.get(msg.groupId) ?? [];
    arr.push(msg);
    grouped.set(msg.groupId, arr);
  }

  return (
    <div className="h-full overflow-y-auto p-3 space-y-3">
      {Array.from(grouped.entries()).map(([gid, items]) => {
        const group = allGroups.find((g) => g.id === gid);
        return (
          <div key={gid}>
            <div className="flex items-center gap-2 px-1 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: group?.color ?? "#888" }} />
              <span className="text-xs font-semibold text-brand-700">{group?.name ?? "Unknown"}</span>
            </div>
            <div className="space-y-1">
              {items.map((msg) => (
                <div key={msg.id} className="flex gap-2.5 px-2 py-1.5 rounded-lg hover:bg-brand-50 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-brand-200 flex items-center justify-center shrink-0 text-[10px] font-semibold text-brand-700">
                    {msg.author.nickname?.[0]?.toUpperCase() ?? msg.author.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold text-brand-950">{msg.author.name}</span>
                      <span className="text-[10px] text-brand-500">
                        {new Date(msg.createdAt).toLocaleString("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-xs text-brand-800 mt-0.5">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MessagesTooltip() {
  return (
    <div className="p-3 flex flex-col items-center gap-2 text-center">
      <Mail className="size-6 text-brand-700" />
      <span className="text-sm font-medium text-brand-900">Messages</span>
      <span className="text-xs text-brand-600">Click to open messages</span>
    </div>
  );
}

export default function MessagesWindow({ children }: { children?: ReactNode }) {
  const windowContent: WindowContent = {
    title: "Messages",
    body: <MessagesContent />,
    width: 480,
    height: 420,
    resizable: true,
  };

  return (
    <Tag
      id="app-messages"
      tooltip={children ? undefined : <MessagesTooltip />}
      window={windowContent}
      tooltipWidth={200}
      className={children ? "" : "font-semibold underline decoration-brand-300 underline-offset-2 transition-colors text-brand-900"}
      activeClassName={children ? "" : "text-brand-700"}
    >
      {children ?? "Messages"}
    </Tag>
  );
}
