"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  MessageSquare,
  Calendar,
  Mail,
  CheckSquare,
  FileText,
  Settings,
  Users,
  Contact,
  BookOpen,
  BarChart3,
  LayoutGrid,
  ChevronDown,
  ChevronRight,
  LogIn,
  LogOut,
  User,
  Moon,
  Sun,
  Maximize,
  Minimize,
  Search,
  Save,
  Pencil,
} from "lucide-react";
import Link from "next/link";

import { useWindowManager } from "@/components/window-manager/logic/WindowManager";
import type { WindowContent } from "@/components/window-manager/logic/WindowManager";
import {
  CalendarContent,
  MessagesContent,
  TasksContent,
  DocumentsContent,
  DebateContent,
  GroupsContent,
  MembersContent,
  searchWindowContent,
} from "@/components/window-manager/windows";
import { useGroupFilter } from "./GroupFilterContext";
import { ContextMenuProvider, type ContextMenuItem } from "./ContextMenu";

export type DesktopGroup = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  color: string;
  icon: string;
  parentId: string | null;
  children: { id: string; slug: string; name: string; subtitle: string; color: string; icon: string }[];
};

export type DesktopUser = {
  id: string;
  name: string;
  username: string;
  isDemo: boolean;
};

export type DesktopProps = {
  mode: "demo" | "workspace";
  groups: DesktopGroup[];
  user?: DesktopUser | null;
  onLogout?: () => void;
  onOpenCommunities?: () => void;
  onOpenAccount?: () => void;
  onOpenSettings?: () => void;
};

type AppDef = {
  id: string;
  name: string;
  icon: typeof MessageSquare;
  windowComponent: "calendar" | "messages" | "tasks" | "documents" | "debate" | "groups" | "members" | "settings" | null;
  comingSoon?: boolean;
};

const APPS: AppDef[] = [
  { id: "calendar", name: "Calendar", icon: Calendar, windowComponent: "calendar" },
  { id: "messages", name: "Messages", icon: Mail, windowComponent: "messages" },
  { id: "tasks", name: "Tasks", icon: CheckSquare, windowComponent: "tasks" },
  { id: "groups", name: "Groups", icon: Users, windowComponent: "groups" },
  { id: "members", name: "Members", icon: Contact, windowComponent: "members" },
  { id: "documents", name: "Documents", icon: FileText, windowComponent: "documents", comingSoon: true },
  { id: "debate", name: "Debate", icon: MessageSquare, windowComponent: "debate", comingSoon: true },
  { id: "wiki", name: "Wiki", icon: BookOpen, windowComponent: null, comingSoon: true },
  { id: "analytics", name: "Analytics", icon: BarChart3, windowComponent: null, comingSoon: true },
  { id: "settings", name: "Settings", icon: Settings, windowComponent: "settings" },
];

const FOOTER_HEIGHT = 48;

// ─── Settings Window Content ───────────────────────────────────

function SettingsContent() {
  const [isDark, setIsDark] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    setIsFullscreen(!!document.fullscreenElement);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleDarkMode = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-brand-25">
        <div className="flex items-center gap-3">
          {isDark ? <Moon className="size-5 text-brand-950" /> : <Sun className="size-5 text-brand-950" />}
          <div>
            <div className="text-sm font-medium text-brand-950">Dark Mode</div>
            <div className="text-xs text-brand-950">{isDark ? "Dark theme active" : "Light theme active"}</div>
          </div>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
            isDark ? "bg-brand-950" : "bg-brand-200"
          }`}
        >
          <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-brand-0 shadow transition-transform ${
            isDark ? "translate-x-5.5" : "translate-x-0.5"
          }`} />
        </button>
      </div>

      <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-brand-25">
        <div className="flex items-center gap-3">
          {isFullscreen ? <Minimize className="size-5 text-brand-950" /> : <Maximize className="size-5 text-brand-950" />}
          <div>
            <div className="text-sm font-medium text-brand-950">Fullscreen</div>
            <div className="text-xs text-brand-950">{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</div>
          </div>
        </div>
        <button
          onClick={toggleFullscreen}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-brand-950 text-brand-0 hover:opacity-80 transition-opacity cursor-pointer"
        >
          {isFullscreen ? "Exit" : "Enter"}
        </button>
      </div>
    </div>
  );
}


// ─── Profile Edit Window Content ────────────────────────────────

function ProfileEditContent({ userId, windowId }: { userId: string; windowId: string }) {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { closeWindow } = useWindowManager();

  useEffect(() => {
    import("@/app/_actions/members").then(({ loadOwnProfile }) =>
      loadOwnProfile(userId).then((p) => {
        if (p) {
          setName(p.name);
          setNickname(p.nickname ?? "");
          setDescription(p.description ?? "");
        }
        setLoading(false);
      })
    );
  }, [userId]);

  const handleSave = async () => {
    setSaving(true);
    const { updateOwnProfile } = await import("@/app/_actions/members");
    await updateOwnProfile(userId, {
      name: name.trim(),
      nickname: nickname.trim() || undefined,
      description: description.trim() || undefined,
    });
    setSaving(false);
    closeWindow(windowId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-xs text-brand-950">Loading...</span>
      </div>
    );
  }

  const initial = nickname?.[0]?.toUpperCase() || name?.[0]?.toUpperCase() || "?";

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-5 pt-6 pb-4 bg-brand-50 border-b border-brand-150 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-brand-200 flex items-center justify-center text-2xl font-bold text-brand-950 mb-3">
          {initial}
        </div>
        <div className="text-xs text-brand-950 opacity-50">Click fields below to edit</div>
      </div>

      <div className="px-5 py-4 space-y-4 flex-1">
        <div>
          <label className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-1 block">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-200"
          />
        </div>

        <div>
          <label className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-1 block">Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Optional display name"
            className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-200 placeholder:text-brand-400"
          />
        </div>

        <div>
          <label className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-1 block">About me</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell others about yourself..."
            rows={4}
            className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-200 placeholder:text-brand-400 resize-none"
          />
        </div>
      </div>

      <div className="px-5 py-4 border-t border-brand-150 shrink-0">
        <button
          onClick={handleSave}
          disabled={saving || !name.trim()}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg bg-brand-950 text-brand-0 hover:opacity-80 transition-opacity disabled:opacity-40 cursor-pointer"
        >
          {saving ? "Saving..." : <><Save className="size-3.5" /> Save profile</>}
        </button>
      </div>
    </div>
  );
}

// ─── Window Content Factories ──────────────────────────────────

const WINDOW_DEFS: Record<string, () => WindowContent> = {
  calendar:  () => ({ title: "Calendar",  body: <CalendarContent />,  width: 700, height: 520, resizable: true }),
  messages:  () => ({ title: "Messages",  body: <MessagesContent />,  width: 480, height: 420, resizable: true }),
  tasks:     () => ({ title: "Tasks",     body: <TasksContent />,     width: 420, height: 400, resizable: true }),
  documents: () => ({ title: "Documents", body: <DocumentsContent />, width: 460, height: 400, resizable: true }),
  debate:    () => ({ title: "Debate",    body: <DebateContent />,    width: 460, height: 420, resizable: true }),
  groups:    () => ({ title: "Groups",    body: <GroupsContent />,    width: 380, height: 450, resizable: true }),
  members:   () => ({ title: "Members",  body: <MembersContent />,  width: 400, height: 480, resizable: true }),
  settings:  () => ({ title: "Settings",  body: <SettingsContent />,  width: 380, height: 240, resizable: false }),
};

// ─── Portal Overlay ────────────────────────────────────────────

function PortalOverlay({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-[9999]" onClick={onClose} />
      {children}
    </>,
    document.body,
  );
}

// ─── Group Picker Menu ─────────────────────────────────────────

function GroupPickerMenu({
  groups,
  selectedGroupIds,
  onToggle,
  onSelectAll,
  onDeselectAll,
  onBatchToggle,
  allCount,
  onClose,
}: {
  groups: DesktopGroup[];
  selectedGroupIds: Set<string>;
  onToggle: (id: string) => void;
  onBatchToggle: (ids: string[], selected: boolean) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  allCount: number;
  onClose: () => void;
}) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isMainGroupFullySelected = (g: DesktopGroup) => {
    const childIds = g.children.map((c) => c.id);
    const allIds = [g.id, ...childIds];
    return allIds.every((id) => selectedGroupIds.has(id));
  };

  const isMainGroupPartiallySelected = (g: DesktopGroup) => {
    const childIds = g.children.map((c) => c.id);
    const allIds = [g.id, ...childIds];
    const selectedCount = allIds.filter((id) => selectedGroupIds.has(id)).length;
    return selectedCount > 0 && selectedCount < allIds.length;
  };

  const toggleMainGroupAll = (g: DesktopGroup) => {
    const childIds = g.children.map((c) => c.id);
    const allIds = [g.id, ...childIds];
    const allSelected = allIds.every((id) => selectedGroupIds.has(id));
    
    onBatchToggle(allIds, !allSelected);
  };

  const Checkbox = ({ checked, partial, onClick }: { checked: boolean; partial?: boolean; onClick: () => void }) => (
    <div
      role="checkbox"
      aria-checked={checked ? "true" : partial ? "mixed" : "false"}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
        checked ? "border-brand-950 bg-brand-950" : partial ? "border-brand-950 bg-brand-950 opacity-50" : "border-brand-400"
      }`}
    >
      {checked && (
        <svg className="w-2.5 h-2.5 text-brand-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
      {partial && !checked && (
        <div className="w-2 h-0.5 bg-brand-950 rounded" />
      )}
    </div>
  );

  return (
    <PortalOverlay onClose={onClose}>
      <div className="fixed left-1/2 -translate-x-1/2 bottom-14 w-80 bg-brand-0 border border-brand-150 rounded-lg shadow-lg z-[10000] flex flex-col" style={{ maxHeight: "calc(100vh - 4rem)" }}>
        {/* Header */}
        <div className="flex items-center justify-end px-3 py-2 border-b border-brand-150">
          <button
            onClick={() => {
              if (selectedGroupIds.size === allCount) onDeselectAll();
              else onSelectAll();
            }}
            className="text-xs text-brand-950 hover:opacity-60 cursor-pointer"
          >
            {selectedGroupIds.size === allCount ? "Deselect all" : "Select all"}
          </button>
        </div>

        {/* Main Groups */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {groups.map((mainGroup, idx) => {
            const isExpanded = expandedGroups.has(mainGroup.id);
            const isFullySelected = isMainGroupFullySelected(mainGroup);
            const isPartiallySelected = isMainGroupPartiallySelected(mainGroup);
            const hasChildren = mainGroup.children.length > 0;

            return (
              <div key={mainGroup.id}>
                {idx > 0 && <div className="border-t border-brand-100" />}
                
                {/* Main Group Header Row */}
                <div className="flex items-center px-3 py-2.5 hover:bg-brand-25 transition-colors">
                  <Checkbox
                    checked={isFullySelected}
                    partial={isPartiallySelected}
                    onClick={() => toggleMainGroupAll(mainGroup)}
                  />
                  <span className="w-3 h-3 rounded-full shrink-0 mx-2" style={{ backgroundColor: mainGroup.color }} />
                  <span
                    className="flex-1 text-xs font-medium text-brand-950 truncate cursor-pointer"
                    onClick={() => toggleMainGroupAll(mainGroup)}
                  >
                    {mainGroup.name}
                  </span>
                  {hasChildren && (
                    <button
                      onClick={() => toggleExpand(mainGroup.id)}
                      className="p-1.5 hover:bg-brand-100 rounded transition-colors cursor-pointer"
                    >
                      <ChevronRight className={`size-4 text-brand-950 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </button>
                  )}
                </div>

                {/* Expanded Content: Main Group + Subgroups */}
                {isExpanded && (
                  <div className="bg-brand-25 border-t border-brand-100">
                    {/* Main Group Entry (selectable individually) */}
                    <div
                      onClick={() => onToggle(mainGroup.id)}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-brand-50 transition-colors flex items-center gap-2 cursor-pointer ${
                        selectedGroupIds.has(mainGroup.id) ? "bg-brand-50" : ""
                      }`}
                      style={{ paddingLeft: "2rem" }}
                    >
                      <Checkbox checked={selectedGroupIds.has(mainGroup.id)} onClick={() => onToggle(mainGroup.id)} />
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: mainGroup.color }} />
                      <span className="truncate text-brand-950">{mainGroup.name}</span>
                      <span className="text-[10px] text-brand-400 ml-auto">(Main)</span>
                    </div>

                    {/* Subgroups */}
                    {mainGroup.children.map((child) => (
                      <div
                        key={child.id}
                        onClick={() => onToggle(child.id)}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-brand-50 transition-colors flex items-center gap-2 cursor-pointer ${
                          selectedGroupIds.has(child.id) ? "bg-brand-50" : ""
                        }`}
                        style={{ paddingLeft: "2rem" }}
                      >
                        <Checkbox checked={selectedGroupIds.has(child.id)} onClick={() => onToggle(child.id)} />
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: mainGroup.color }} />
                        <span className="truncate text-brand-950">{child.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PortalOverlay>
  );
}

// ─── Desktop ───────────────────────────────────────────────────

export default function Desktop({ mode, groups, user, onLogout, onOpenCommunities, onOpenAccount, onOpenSettings }: DesktopProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [showApps, setShowApps] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { setBottomInset, openNewInstance, openWindow } = useWindowManager();
  const {
    selectedGroupIds,
    setSelectedGroupIds,
    setAllGroups: setGlobalGroups,
    setCurrentUserId: setGlobalUserId,
  } = useGroupFilter();

  const [showGroupPicker, setShowGroupPicker] = useState(false);
  const [comingSoonTip, setComingSoonTip] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setBottomInset(FOOTER_HEIGHT);
    return () => setBottomInset(0);
  }, [setBottomInset]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
      setCurrentDate(now.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const allGroups: (DesktopGroup & { depth: number })[] = groups.flatMap((g) => [
    { ...g, depth: 0 },
    ...g.children.map((c) => ({ ...c, depth: 1, parentId: g.id, color: g.color, children: [] as DesktopGroup["children"] })),
  ]);

  const selectedGroups = allGroups.filter((g) => selectedGroupIds.has(g.id));

  // Sync local group/user data to global context so windows can access it
  // On first load, select all groups by default
  useEffect(() => {
    setGlobalGroups(allGroups.map((g) => ({ id: g.id, name: g.name, color: g.color, depth: g.depth, parentId: g.parentId })));
    setSelectedGroupIds((prev) => {
      if (prev.size === 0) return new Set(allGroups.map((g) => g.id));
      return prev;
    });
  }, [groups, setGlobalGroups]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setGlobalUserId(user?.id ?? "");
  }, [user?.id, setGlobalUserId]);

  const toggleGroupSelection = (groupId: string) => {
    setSelectedGroupIds((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  const selectAll = () => setSelectedGroupIds(new Set(allGroups.map((g) => g.id)));
  const deselectAll = () => setSelectedGroupIds(new Set());

  const batchToggle = (ids: string[], selected: boolean) => {
    setSelectedGroupIds((prev) => {
      const next = new Set(prev);
      for (const id of ids) {
        if (selected) next.add(id);
        else next.delete(id);
      }
      return next;
    });
  };

  const openSearch = useCallback(() => {
    openNewInstance("search", searchWindowContent());
  }, [openNewInstance]);

  // Ctrl+K / Cmd+K keyboard shortcut for search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openSearch]);

  const desktopMenuItems = useCallback((): ContextMenuItem[] => [
    { type: "label", text: "Desktop" },
    { type: "action", label: "Open Apps", icon: <LayoutGrid className="size-3.5" />, onClick: () => setShowApps(true) },
    { type: "action", label: "Search", icon: <Search className="size-3.5" />, onClick: openSearch },
    { type: "action", label: "Settings", icon: <Settings className="size-3.5" />, onClick: () => openNewInstance("settings", WINDOW_DEFS.settings()) },
    { type: "separator" },
    { type: "action", label: "Toggle Dark Mode", icon: <Moon className="size-3.5" />, onClick: () => {
      const next = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
    }},
  ], [openNewInstance, openSearch]);

  return (
    <ContextMenuProvider defaultItems={desktopMenuItems}>
    <div className="w-full h-full flex flex-col bg-brand-25 relative overflow-hidden select-none">
      {/* Desktop Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 pb-12">
        <div className="text-center cursor-default">
          <div className="text-6xl font-light text-brand-950 tracking-tight">{currentTime}</div>
          <div className="text-base text-brand-950 mt-2">{currentDate}</div>
        </div>
        <button
          onClick={() => setShowApps(true)}
          className="mt-6 p-4 rounded-xl border border-brand-200 bg-brand-50 hover:bg-brand-100 transition-colors cursor-pointer"
          aria-label="Open Apps"
        >
          <LayoutGrid className="size-8 text-brand-950" />
        </button>
      </div>

      {/* App Grid Overlay */}
      {showApps && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-[9000]"
          onClick={() => setShowApps(false)}
        >
          <div
            className="grid grid-cols-3 backdrop-blur-md border border-brand-150 rounded-2xl p-10 shadow-xl"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-brand-0) 85%, transparent)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {APPS.map((app) => {
              const Icon = app.icon;
              const factory = app.windowComponent && !app.comingSoon ? WINDOW_DEFS[app.windowComponent] : null;
              const disabled = app.comingSoon || !factory;

              return (
                <div
                  key={app.id}
                  className={`relative group flex flex-col items-center justify-center gap-3 w-32 h-32 ${
                    disabled ? "opacity-35 cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={() => {
                    if (disabled) return;
                    openNewInstance(app.id, factory!());
                    setShowApps(false);
                  }}
                  onMouseMove={app.comingSoon ? (e) => setComingSoonTip({ x: e.clientX, y: e.clientY }) : undefined}
                  onMouseLeave={app.comingSoon ? () => setComingSoonTip(null) : undefined}
                >
                  <Icon className={`size-11 text-brand-950 ${disabled ? "" : "hover:scale-90"} transition-transform`} />
                  <span className="text-sm text-brand-950">{app.name}</span>
                </div>
              );
            })}
          </div>
          {comingSoonTip && (
            <div
              className="fixed pointer-events-none z-[10001] px-3.5 py-2 bg-brand-950 text-brand-0 text-sm font-medium rounded-lg shadow-lg whitespace-nowrap"
              style={{ left: comingSoonTip.x + 14, top: comingSoonTip.y - 16 }}
            >
              Coming soon
            </div>
          )}
        </div>
      )}

      {/* Main Menu — rendered via portal into document.body */}
      {showMenu && (
        <PortalOverlay onClose={() => setShowMenu(false)}>
          <div className="fixed left-4 bottom-14 w-56 bg-brand-0 border border-brand-150 rounded-lg shadow-lg overflow-hidden z-[10000]">
            {user ? (
              <div
                className="px-4 py-3 border-b border-brand-150 hover:bg-brand-50 transition-colors cursor-pointer"
                onClick={() => {
                  setShowMenu(false);
                  openWindow("profile-edit", {
                    title: "Edit Profile",
                    body: <ProfileEditContent userId={user.id} windowId="profile-edit" />,
                    width: 380,
                    height: 520,
                    resizable: true,
                    centered: true,
                  });
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-200 flex items-center justify-center">
                    <User className="size-5 text-brand-950" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-brand-950 truncate">{user.name}</div>
                    <div className="text-xs text-brand-950">@{user.username}</div>
                  </div>
                  <Pencil className="size-3.5 text-brand-950 opacity-0 group-hover:opacity-50 shrink-0" />
                  {user.isDemo && (
                    <span className="text-xs bg-brand-200 text-brand-950 px-1.5 py-0.5 rounded shrink-0">
                      Demo
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="px-4 py-3 border-b border-brand-150">
                <div className="text-sm text-brand-950">Not logged in</div>
              </div>
            )}

            <div className="py-2">
              <button
                onClick={() => { setShowMenu(false); onOpenCommunities?.(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-brand-950 hover:bg-brand-50 transition-colors cursor-pointer"
              >
                <Users className="size-4 text-brand-950" />
                Server
              </button>
              <button
                onClick={() => { setShowMenu(false); onOpenAccount?.(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-brand-950 hover:bg-brand-50 transition-colors cursor-pointer"
              >
                <User className="size-4 text-brand-950" />
                Account
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  openNewInstance("settings", WINDOW_DEFS.settings());
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-brand-950 hover:bg-brand-50 transition-colors cursor-pointer"
              >
                <Settings className="size-4 text-brand-950" />
                Settings
              </button>
            </div>

            <div className="border-t border-brand-150 py-2">
              {mode === "demo" ? (
                <Link
                  href="/workspace/login"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-950 hover:bg-brand-50 transition-colors cursor-pointer"
                  onClick={() => setShowMenu(false)}
                >
                  <LogIn className="size-4 text-brand-950" />
                  Log in to save changes
                </Link>
              ) : (
                onLogout && (
                  <button
                    onClick={() => { setShowMenu(false); onLogout(); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-brand-950 hover:bg-brand-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="size-4 text-brand-950" />
                    Logout
                  </button>
                )
              )}
            </div>
          </div>
        </PortalOverlay>
      )}

      {/* Group Picker — rendered via portal into document.body */}
      {showGroupPicker && (
        <GroupPickerMenu
          groups={groups}
          selectedGroupIds={selectedGroupIds}
          onToggle={toggleGroupSelection}
          onBatchToggle={batchToggle}
          onSelectAll={selectAll}
          onDeselectAll={deselectAll}
          allCount={allGroups.length}
          onClose={() => setShowGroupPicker(false)}
        />
      )}

      {/* Footer/Taskbar — z-index above all windows (windows start at z-100+) */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-brand-50 border-t border-brand-550 flex items-center px-4 z-[20000]">
        {/* Left: Menu Button */}
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 rounded-full border-[4px] border-brand-950 hover:scale-90 transition-all cursor-pointer"
            aria-label="Menu"
          />
        </div>

        {/* Center: App Button + Search + Group Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowApps(!showApps)}
            className="flex items-center justify-center w-8 h-8 rounded-md border border-brand-950 hover:bg-brand-100 transition-colors cursor-pointer"
            aria-label="Apps"
          >
            <LayoutGrid className="size-4 text-brand-950" />
          </button>

          <button
            onClick={openSearch}
            className="flex items-center justify-center w-8 h-8 rounded-md border border-brand-950 hover:bg-brand-100 transition-colors cursor-pointer"
            aria-label="Search (Ctrl+K)"
            title="Search (Ctrl+K)"
          >
            <Search className="size-4 text-brand-950" />
          </button>

          <button
            onClick={() => setShowGroupPicker(!showGroupPicker)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium border border-brand-950 hover:bg-brand-100 transition-colors cursor-pointer"
          >
            {selectedGroups.length === 0 ? (
              <span className="text-brand-950">No groups selected</span>
            ) : selectedGroups.length === allGroups.length ? (
              <span className="text-brand-950">All Groups</span>
            ) : selectedGroups.length === 1 ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: selectedGroups[0].color }} />
                <span className="text-brand-950">{selectedGroups[0].name}</span>
              </>
            ) : (
              <>
                <div className="flex -space-x-1">
                  {selectedGroups.slice(0, 3).map((g) => (
                    <span key={g.id} className="w-2.5 h-2.5 rounded-full border border-brand-0" style={{ backgroundColor: g.color }} />
                  ))}
                </div>
                <span className="text-brand-950">{selectedGroups.length} Groups</span>
              </>
            )}
            <ChevronDown className="size-3 text-brand-950" />
          </button>
        </div>

        {/* Right: DarkMode toggle + time */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <span className="text-xs text-brand-950">{currentTime}</span>
          <button
            onClick={() => {
              const next = !document.documentElement.classList.contains("dark");
              document.documentElement.classList.toggle("dark", next);
              localStorage.setItem("theme", next ? "dark" : "light");
            }}
            className="p-1 rounded-md hover:bg-brand-100 transition-colors cursor-pointer"
            aria-label="Toggle dark mode"
          >
            <Sun className="size-4 text-brand-950 hidden dark:block" />
            <Moon className="size-4 text-brand-950 dark:hidden" />
          </button>
        </div>
      </div>
    </div>
    </ContextMenuProvider>
  );
}
