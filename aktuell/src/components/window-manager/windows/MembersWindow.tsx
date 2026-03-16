"use client";

import { useCallback, useEffect, useState } from "react";
import { Users, Search, Calendar, CheckSquare, Mail, FileText } from "lucide-react";
import { useWindowManager } from "../logic/WindowManager";
import { useGroupFilter } from "@/components/desktop/GroupFilterContext";
import {
  loadAllMembers,
  loadMemberProfile,
  type MemberWithGroups,
  type MemberProfile,
} from "@/app/_actions/members";

// ─── Member Profile Content (reusable) ─────────────────────────

export function MemberProfileContent({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}) {
  const { currentUserId, allGroups } = useGroupFilter();
  const { openNewInstance } = useWindowManager();
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"groups" | "events" | "chats" | "tasks">("groups");
  const [bioExpanded, setBioExpanded] = useState(false);

  useEffect(() => {
    loadMemberProfile(userId, currentUserId).then((p) => {
      setProfile(p);
      setLoading(false);
    });
  }, [userId, currentUserId]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-xs text-brand-950">Loading...</span>
      </div>
    );
  if (!profile)
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-xs text-brand-950">Not found</span>
      </div>
    );

  const tabs = [
    { id: "groups" as const, label: "Groups", count: profile.commonGroups.length },
    { id: "events" as const, label: "Events", count: profile.commonEvents.length },
    { id: "chats" as const, label: "Chats", count: profile.commonChats.length },
    { id: "tasks" as const, label: "Tasks", count: profile.commonTasks.length },
  ];

  const openQuickCreate = (type: "chat" | "event" | "task") => {
    openNewInstance(`quick-${type}-${userId}`, {
      title: type === "chat" ? `New chat with ${profile.name}` : type === "event" ? `New event with ${profile.name}` : `New task for ${profile.name}`,
      body: <QuickCreatePanel type={type} targetUserId={userId} targetUserName={profile.name} />,
      width: 380,
      height: 280,
      resizable: true,
      centered: true,
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-5 pt-5 pb-4 bg-brand-50 border-b border-brand-150 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand-200 flex items-center justify-center text-lg font-bold text-brand-950 shrink-0">
            {profile.nickname?.[0]?.toUpperCase() ?? profile.name[0]}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-brand-950 truncate">{profile.name}</h3>
            <div className="text-xs text-brand-950 opacity-60">@{profile.username}</div>
            {profile.description && (
              <p
                onClick={() => setBioExpanded(!bioExpanded)}
                className={`text-xs text-brand-950 opacity-70 mt-1 cursor-pointer ${bioExpanded ? "" : "line-clamp-2"}`}
              >
                {profile.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <button onClick={() => openQuickCreate("chat")} className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] rounded-md border border-brand-200 text-brand-950 hover:bg-brand-100 transition-colors cursor-pointer">
            <Mail className="size-3" /> Chat
          </button>
          <button onClick={() => openQuickCreate("event")} className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] rounded-md border border-brand-200 text-brand-950 hover:bg-brand-100 transition-colors cursor-pointer">
            <Calendar className="size-3" /> Event
          </button>
          <button onClick={() => openQuickCreate("task")} className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] rounded-md border border-brand-200 text-brand-950 hover:bg-brand-100 transition-colors cursor-pointer">
            <CheckSquare className="size-3" /> Task
          </button>
        </div>
      </div>

      <div className="flex border-b border-brand-150 shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-[11px] font-medium text-center cursor-pointer transition-colors ${
              activeTab === tab.id
                ? "text-brand-950 border-b-2 border-brand-950"
                : "text-brand-950 opacity-50 hover:opacity-80"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {activeTab === "groups" && (
          <div className="p-3 space-y-1">
            {profile.commonGroups.map((g) => (
              <div key={g.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-brand-50">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: g.color }} />
                <span className="text-xs text-brand-950">{g.name}</span>
              </div>
            ))}
            {profile.commonGroups.length === 0 && (
              <div className="text-xs text-brand-950 opacity-50 py-4 text-center">No shared groups</div>
            )}
          </div>
        )}
        {activeTab === "events" && (
          <div className="p-3 space-y-1">
            {profile.commonEvents.map((e) => (
              <div key={e.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-brand-50">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: e.groupColor }} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-brand-950 truncate">{e.title}</div>
                  <div className="text-[10px] text-brand-950 opacity-50">
                    {new Date(e.startsAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" })} · {e.groupName}
                  </div>
                </div>
              </div>
            ))}
            {profile.commonEvents.length === 0 && (
              <div className="text-xs text-brand-950 opacity-50 py-4 text-center">No shared events</div>
            )}
          </div>
        )}
        {activeTab === "chats" && (
          <div className="p-3 space-y-1">
            {profile.commonChats.map((c) => (
              <div key={c.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-brand-50">
                <Mail className="size-3 text-brand-950 opacity-40 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-brand-950 truncate">
                    {c.subject ?? (c.type === "direct" ? "Direct message" : "Group chat")}
                  </div>
                  <div className="text-[10px] text-brand-950 opacity-50">{c.participantCount} Participants</div>
                </div>
              </div>
            ))}
            {profile.commonChats.length === 0 && (
              <div className="text-xs text-brand-950 opacity-50 py-4 text-center">No shared chats</div>
            )}
          </div>
        )}
        {activeTab === "tasks" && (
          <div className="p-3 space-y-1">
            {profile.commonTasks.map((t) => (
              <div key={t.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-brand-50">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: t.groupColor }} />
                <div className="flex-1 min-w-0">
                  <div className={`text-xs text-brand-950 truncate ${t.done ? "line-through opacity-60" : ""}`}>{t.title}</div>
                  <div className="text-[10px] text-brand-950 opacity-50">
                    {t.groupName}
                    {t.dueAt && ` · ${new Date(t.dueAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                  </div>
                </div>
              </div>
            ))}
            {profile.commonTasks.length === 0 && (
              <div className="text-xs text-brand-950 opacity-50 py-4 text-center">No shared tasks</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Quick Create Panel ─────────────────────────────────────────

function QuickCreatePanel({
  type,
  targetUserId,
  targetUserName,
}: {
  type: "chat" | "event" | "task";
  targetUserId: string;
  targetUserName: string;
}) {
  const { currentUserId, allGroups } = useGroupFilter();
  const [title, setTitle] = useState("");
  const [groupId, setGroupId] = useState(allGroups[0]?.id ?? "");
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const handleCreate = async () => {
    if (!title.trim() && type !== "chat") return;
    setSaving(true);
    try {
      if (type === "chat") {
        const { createChat } = await import("@/app/_actions/chats");
        await createChat({ type: "direct", subject: title.trim() || undefined, participantIds: [currentUserId, targetUserId] });
      } else if (type === "event") {
        const { createEvent } = await import("@/app/_actions/events");
        await createEvent({ title: title.trim(), startsAt: date ? new Date(date).toISOString() : new Date().toISOString(), groupId });
      } else {
        const { createTask } = await import("@/app/_actions/tasks");
        await createTask({ title: title.trim(), groupId, assigneeId: targetUserId, creatorId: currentUserId, dueAt: date ? new Date(date).toISOString() : undefined });
      }
      setDone(true);
    } catch { /* ignore */ }
    setSaving(false);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 p-6">
        <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
          <CheckSquare className="size-5 text-brand-950" />
        </div>
        <span className="text-sm text-brand-950">Created!</span>
      </div>
    );
  }

  const inputCls = "w-full px-3 py-2 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-200";

  return (
    <div className="flex flex-col h-full p-4 gap-3">
      <div className="text-xs text-brand-950 opacity-50">
        {type === "chat" ? "Chat" : type === "event" ? "Event" : "Task"} with {targetUserName}
      </div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={type === "chat" ? "Subject (optional)" : "Title"} className={inputCls} autoFocus />
      {type !== "chat" && (
        <>
          <select value={groupId} onChange={(e) => setGroupId(e.target.value)} className={inputCls}>
            {allGroups.map((g) => (
              <option key={g.id} value={g.id}>{"  ".repeat(g.depth)}{g.name}</option>
            ))}
          </select>
          <input type={type === "event" ? "datetime-local" : "date"} value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </>
      )}
      <button onClick={handleCreate} disabled={saving || (!title.trim() && type !== "chat")} className="w-full py-2 text-sm font-medium rounded-lg bg-brand-950 text-brand-0 hover:opacity-80 transition-opacity disabled:opacity-40 cursor-pointer mt-auto">
        {saving ? "Creating..." : "Create"}
      </button>
    </div>
  );
}

// ─── Members Content (Main App) ─────────────────────────────────

export function MembersContent({ initialGroupId }: { initialGroupId?: string }) {
  const { selectedGroupIds, allGroups } = useGroupFilter();
  const { openNewInstance } = useWindowManager();
  const [members, setMembers] = useState<MemberWithGroups[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGroupId, setFilterGroupId] = useState<string | null>(initialGroupId ?? null);

  useEffect(() => {
    loadAllMembers().then((m) => { setMembers(m); setLoading(false); });
  }, []);

  const openProfile = useCallback((member: MemberWithGroups) => {
    openNewInstance("member-profile", {
      title: member.name,
      body: <MemberProfileContent userId={member.id} userName={member.name} />,
      width: 420,
      height: 520,
      resizable: true,
      centered: true,
    });
  }, [openNewInstance]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-xs text-brand-950">Loading...</span>
      </div>
    );
  }

  const q = searchQuery.toLowerCase();

  const filterGroupIds = new Set<string>();
  if (filterGroupId) {
    filterGroupIds.add(filterGroupId);
    allGroups.filter((g) => g.parentId === filterGroupId).forEach((g) => filterGroupIds.add(g.id));
  }

  const filtered = members.filter((m) => {
    if (filterGroupId && !m.groups.some((g) => filterGroupIds.has(g.id))) return false;
    if (!filterGroupId && !m.groups.some((g) => selectedGroupIds.has(g.id))) return false;
    if (q && !m.name.toLowerCase().includes(q) && !m.username.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Search + filter bar */}
      <div className="px-3 py-2.5 border-b border-brand-150 shrink-0 space-y-2">
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-brand-200 bg-brand-0">
          <Search className="size-3.5 text-brand-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search members..."
            className="flex-1 text-xs bg-transparent text-brand-950 outline-none placeholder:text-brand-400"
          />
        </div>

        <div className="flex gap-1 flex-wrap">
          <button
            onClick={() => setFilterGroupId(null)}
            className={`px-2 py-0.5 text-[10px] rounded-full border transition-colors cursor-pointer ${
              !filterGroupId
                ? "border-brand-950 bg-brand-950 text-brand-0"
                : "border-brand-200 text-brand-950 hover:bg-brand-50"
            }`}
          >
            All
          </button>
          {allGroups.filter((g) => g.depth === 0).map((g) => (
            <button
              key={g.id}
              onClick={() => setFilterGroupId(filterGroupId === g.id ? null : g.id)}
              className={`flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full border transition-colors cursor-pointer ${
                filterGroupIds.has(g.id)
                  ? "border-brand-950 bg-brand-950 text-brand-0"
                  : "border-brand-200 text-brand-950 hover:bg-brand-50"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: g.color }} />
              {g.name}
            </button>
          ))}
          {filterGroupId && allGroups.filter((g) => g.parentId === filterGroupId).map((g) => (
            <button
              key={g.id}
              onClick={() => setFilterGroupId(filterGroupId === g.id ? filterGroupId : g.id)}
              className={`flex items-center gap-1 px-1.5 py-0.5 text-[9px] rounded-full border transition-colors cursor-pointer ${
                filterGroupId === g.id
                  ? "border-brand-950 bg-brand-950 text-brand-0"
                  : "border-brand-150 text-brand-950 hover:bg-brand-50"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      {/* Member count */}
      <div className="px-3 py-1.5 text-[10px] text-brand-950 opacity-50 border-b border-brand-100 shrink-0">
        {filtered.length} Members
      </div>

      {/* Member list */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {filtered.map((m) => (
          <button
            key={m.id}
            onClick={() => openProfile(m)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-50 transition-colors cursor-pointer border-b border-brand-100 last:border-b-0 text-left"
          >
            <div className="w-9 h-9 rounded-full bg-brand-200 flex items-center justify-center shrink-0 text-xs font-bold text-brand-950">
              {m.nickname?.[0]?.toUpperCase() ?? m.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-brand-950 truncate">{m.name}</div>
              <div className="text-[10px] text-brand-950 opacity-50 truncate">
                @{m.username}
              </div>
            </div>
            <div className="flex gap-0.5 shrink-0">
              {m.groups.slice(0, 4).map((g) => (
                <span key={g.id} className="w-2 h-2 rounded-full" style={{ backgroundColor: g.color }} />
              ))}
              {m.groups.length > 4 && (
                <span className="text-[9px] text-brand-950 opacity-40">+{m.groups.length - 4}</span>
              )}
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="text-xs text-brand-950 opacity-50 py-8 text-center">No members found</div>
        )}
      </div>
    </div>
  );
}

// Helper to create members window content from any context
export function membersWindowContent(filterGroupId?: string) {
  return {
    title: "Members",
    body: <MembersContent initialGroupId={filterGroupId} />,
    width: 400,
    height: 480,
    resizable: true,
  };
}
