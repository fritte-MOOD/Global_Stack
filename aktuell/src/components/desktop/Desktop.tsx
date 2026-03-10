"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  MessageSquare,
  Calendar,
  Mail,
  CheckSquare,
  FileText,
  Settings,
  Users,
  BookOpen,
  BarChart3,
  LayoutGrid,
  ChevronDown,
  LogIn,
  LogOut,
  User,
  Moon,
  Sun,
  Maximize,
  Minimize,
} from "lucide-react";
import Link from "next/link";

import { useWindowManager, type WindowContent } from "@/components/window-manager/logic/WindowManager";
import Tag from "@/components/window-manager/logic/Tag";
import {
  CalendarWindow,
  MessagesWindow,
  TasksWindow,
  DocumentsWindow,
  DebateWindow,
} from "@/components/window-manager/windows";
import { GroupFilterProvider } from "./GroupFilterContext";

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
  windowComponent: "calendar" | "messages" | "tasks" | "documents" | "debate" | "settings" | null;
};

const APPS: AppDef[] = [
  { id: "debate", name: "Debate", icon: MessageSquare, windowComponent: "debate" },
  { id: "calendar", name: "Calendar", icon: Calendar, windowComponent: "calendar" },
  { id: "messages", name: "Messages", icon: Mail, windowComponent: "messages" },
  { id: "tasks", name: "Tasks", icon: CheckSquare, windowComponent: "tasks" },
  { id: "documents", name: "Documents", icon: FileText, windowComponent: "documents" },
  { id: "groups", name: "Groups", icon: Users, windowComponent: null },
  { id: "wiki", name: "Wiki", icon: BookOpen, windowComponent: null },
  { id: "analytics", name: "Analytics", icon: BarChart3, windowComponent: null },
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
            <div className="text-xs text-brand-500">{isDark ? "Dark theme active" : "Light theme active"}</div>
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
            <div className="text-xs text-brand-500">{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</div>
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

function SettingsWindow({ children }: { children?: ReactNode }) {
  const windowContent: WindowContent = {
    title: "Settings",
    body: <SettingsContent />,
    width: 380,
    height: 240,
    resizable: false,
  };

  return (
    <Tag
      id="app-settings"
      window={windowContent}
      className={children ? "" : "font-semibold underline decoration-brand-300 underline-offset-2 transition-colors text-brand-900"}
      activeClassName={children ? "" : "text-brand-700"}
    >
      {children ?? "Settings"}
    </Tag>
  );
}

// ─── App Tile Routing ──────────────────────────────────────────

function AppTile({ app, tile }: { app: AppDef; tile: React.ReactNode }) {
  switch (app.windowComponent) {
    case "calendar":   return <CalendarWindow name="Calendar">{tile}</CalendarWindow>;
    case "messages":   return <MessagesWindow>{tile}</MessagesWindow>;
    case "tasks":      return <TasksWindow>{tile}</TasksWindow>;
    case "documents":  return <DocumentsWindow>{tile}</DocumentsWindow>;
    case "debate":     return <DebateWindow>{tile}</DebateWindow>;
    case "settings":   return <SettingsWindow>{tile}</SettingsWindow>;
    default:
      return <div className="opacity-40 cursor-not-allowed">{tile}</div>;
  }
}

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

// ─── Desktop ───────────────────────────────────────────────────

export default function Desktop({ mode, groups, user, onLogout, onOpenCommunities, onOpenAccount, onOpenSettings }: DesktopProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [showApps, setShowApps] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { setBottomInset, toggleWindow } = useWindowManager();

  const [selectedGroupIds, setSelectedGroupIds] = useState<Set<string>>(new Set());
  const [showGroupPicker, setShowGroupPicker] = useState(false);

  useEffect(() => {
    setBottomInset(FOOTER_HEIGHT);
    return () => setBottomInset(0);
  }, [setBottomInset]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }));
      setCurrentDate(now.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" }));
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

  const groupFilterData = allGroups.map((g) => ({ id: g.id, name: g.name, color: g.color, depth: g.depth, parentId: g.parentId }));

  return (
    <GroupFilterProvider selectedGroupIds={selectedGroupIds} allGroups={groupFilterData}>
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
              const tile = (
                <div
                  className="flex flex-col items-center justify-center gap-3 w-32 h-32 cursor-pointer"
                  onClick={() => app.windowComponent && setShowApps(false)}
                >
                  <Icon className="size-11 text-brand-950 hover:scale-90 transition-transform" />
                  <span className="text-sm text-brand-950">{app.name}</span>
                </div>
              );

              return (
                <div key={app.id}>
                  <AppTile app={app} tile={tile} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Menu — rendered via portal into document.body */}
      {showMenu && (
        <PortalOverlay onClose={() => setShowMenu(false)}>
          <div className="fixed left-4 bottom-14 w-56 bg-brand-0 border border-brand-150 rounded-lg shadow-lg overflow-hidden z-[10000]">
            {user ? (
              <div className="px-4 py-3 border-b border-brand-150">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-200 flex items-center justify-center">
                    <User className="size-5 text-brand-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-brand-950 truncate">{user.name}</div>
                    <div className="text-xs text-brand-500">@{user.username}</div>
                  </div>
                  {user.isDemo && (
                    <span className="text-xs bg-brand-200 text-brand-500 px-1.5 py-0.5 rounded shrink-0">
                      Demo
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="px-4 py-3 border-b border-brand-150">
                <div className="text-sm text-brand-500">Not logged in</div>
              </div>
            )}

            <div className="py-2">
              <button
                onClick={() => { setShowMenu(false); onOpenCommunities?.(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-brand-950 hover:bg-brand-50 transition-colors cursor-pointer"
              >
                <Users className="size-4 text-brand-500" />
                Server
              </button>
              <button
                onClick={() => { setShowMenu(false); onOpenAccount?.(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-brand-950 hover:bg-brand-50 transition-colors cursor-pointer"
              >
                <User className="size-4 text-brand-500" />
                Account
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  toggleWindow("app-settings", {
                    title: "Settings",
                    body: <SettingsContent />,
                    width: 380,
                    height: 240,
                    resizable: false,
                  });
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-brand-950 hover:bg-brand-50 transition-colors cursor-pointer"
              >
                <Settings className="size-4 text-brand-500" />
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
                  <LogIn className="size-4 text-brand-500" />
                  Log in to save changes
                </Link>
              ) : (
                onLogout && (
                  <button
                    onClick={() => { setShowMenu(false); onLogout(); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-brand-950 hover:bg-brand-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="size-4 text-brand-500" />
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
        <PortalOverlay onClose={() => setShowGroupPicker(false)}>
          <div className="fixed left-1/2 -translate-x-1/2 bottom-14 w-72 bg-brand-0 border border-brand-150 rounded-lg shadow-lg py-2 z-[10000]">
            <div className="flex items-center justify-end px-3 py-2 border-b border-brand-150">
              <button
                onClick={() => {
                  if (selectedGroupIds.size === allGroups.length) deselectAll();
                  else selectAll();
                }}
                className="text-xs text-brand-950 hover:opacity-60 cursor-pointer"
              >
                {selectedGroupIds.size === allGroups.length ? "Deselect all" : "Select all"}
              </button>
            </div>

            <div className="py-1">
              {allGroups.map((g) => {
                const isSelected = selectedGroupIds.has(g.id);
                return (
                  <button
                    key={g.id}
                    onClick={() => toggleGroupSelection(g.id)}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-brand-50 transition-colors flex items-center gap-2 cursor-pointer ${
                      isSelected ? "bg-brand-50" : ""
                    }`}
                    style={{ paddingLeft: g.depth === 1 ? "2rem" : "0.75rem" }}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? "border-brand-950 bg-brand-950" : "border-brand-400"
                    }`}>
                      {isSelected && (
                        <svg className="w-2.5 h-2.5 text-brand-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: g.color }} />
                    <span className="truncate text-brand-950">{g.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </PortalOverlay>
      )}

      {/* Footer/Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-brand-50 border-t border-brand-550 flex items-center px-4 z-30">
        {/* Left: Menu Button */}
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 rounded-full border-[4px] border-brand-950 hover:scale-90 transition-all cursor-pointer"
            aria-label="Menu"
          />
        </div>

        {/* Center: App Button + Group Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowApps(!showApps)}
            className="flex items-center justify-center w-8 h-8 rounded-md border border-brand-950 hover:bg-brand-100 transition-colors cursor-pointer"
            aria-label="Apps"
          >
            <LayoutGrid className="size-4 text-brand-950" />
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

        {/* Right: Empty space for balance */}
        <div className="flex-1" />
      </div>
    </div>
    </GroupFilterProvider>
  );
}
