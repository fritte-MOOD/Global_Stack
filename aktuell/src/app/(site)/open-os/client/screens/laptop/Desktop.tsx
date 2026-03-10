"use client";

import { useEffect, useState, useCallback } from "react";
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
  ArrowRight,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { loadDemoData, type DemoData, type DemoGroup } from "../../../_actions/load-demo-data";
import MessagesApp from "./apps/MessagesApp";
import CalendarApp from "./apps/CalendarApp";
import TasksApp from "./apps/TasksApp";
import DocumentsApp from "./apps/DocumentsApp";
import DebateApp from "./apps/DebateApp";

type AppId = "messages" | "calendar" | "tasks" | "documents" | "debate" | "groups" | null;

type AppDef = {
  id: string;
  name: string;
  icon: typeof MessageSquare;
  appId: AppId;
};

const APPS: AppDef[] = [
  { id: "debate", name: "Debate", icon: MessageSquare, appId: "debate" },
  { id: "calendar", name: "Calendar", icon: Calendar, appId: "calendar" },
  { id: "messages", name: "Messages", icon: Mail, appId: "messages" },
  { id: "tasks", name: "Tasks", icon: CheckSquare, appId: "tasks" },
  { id: "documents", name: "Documents", icon: FileText, appId: "documents" },
  { id: "groups", name: "Groups", icon: Users, appId: "groups" },
  { id: "wiki", name: "Wiki", icon: BookOpen, appId: null },
  { id: "analytics", name: "Analytics", icon: BarChart3, appId: null },
  { id: "settings", name: "Settings", icon: Settings, appId: null },
];

const SERVER_SLUGS = ["park-club", "marin-quarter", "rochefort"];

export default function Desktop() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [showApps, setShowApps] = useState(false);
  const [activeApp, setActiveApp] = useState<AppId>(null);
  const [data, setData] = useState<DemoData | null>(null);
  const [loading, setLoading] = useState(true);

  // Gruppen-Filter: welche Gruppe wird gerade angezeigt? null = alle
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [showGroupPicker, setShowGroupPicker] = useState(false);

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

  useEffect(() => {
    loadDemoData(SERVER_SLUGS).then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  const openApp = useCallback((appId: AppId) => {
    if (!appId) return;
    setActiveApp(appId);
    setShowApps(false);
    setSelectedGroupId(null);
    setShowGroupPicker(false);
  }, []);

  const backToDesktop = useCallback(() => {
    setActiveApp(null);
    setSelectedGroupId(null);
    setShowGroupPicker(false);
  }, []);

  const allGroups: (DemoGroup & { depth: number })[] = data
    ? data.groups.flatMap((g) => [
        { ...g, depth: 0 },
        ...g.children.map((c) => ({ ...c, depth: 1, parentId: g.id, children: [] as DemoGroup["children"] })),
      ])
    : [];

  const selectedGroup = allGroups.find((g) => g.id === selectedGroupId) ?? null;
  const selectedGroupIds: string[] = selectedGroupId
    ? [selectedGroupId, ...(allGroups.find((g) => g.id === selectedGroupId && g.depth === 0)?.children.map((c) => c.id) ?? [])]
    : allGroups.map((g) => g.id);

  // ── Home Screen ──
  if (!activeApp) {
    return (
      <div className="w-full h-full flex flex-col bg-brand-25 relative overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-6xl font-light text-brand-950 tracking-tight">{currentTime}</div>
            <div className="text-base text-brand-950 mt-2">{currentDate}</div>
          </div>
          <button
            onClick={() => setShowApps(true)}
            className="mt-6 p-4 rounded-xl border border-brand-200 bg-brand-50 hover:bg-brand-100 transition-colors"
            aria-label="Open Apps"
          >
            <LayoutGrid className="size-8 text-brand-950" />
          </button>
        </div>

        <div className="absolute bottom-4 right-4 z-10">
          <Link
            href="/workspace"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border border-brand-200 bg-brand-50/80 backdrop-blur-sm text-brand-700 hover:border-brand-800 hover:text-brand-900 transition-all"
          >
            Create your own workspace
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {showApps && (
          <div
            className="absolute inset-0 bg-brand-25/95 backdrop-blur-sm flex flex-col items-center justify-center z-20"
            onClick={() => setShowApps(false)}
          >
            <div className="grid grid-cols-3 gap-6 max-w-sm" onClick={(e) => e.stopPropagation()}>
              {APPS.map((app) => {
                const Icon = app.icon;
                return (
                  <button
                    key={app.id}
                    onClick={() => openApp(app.appId)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${
                      app.appId ? "hover:bg-brand-100 cursor-pointer" : "opacity-40 cursor-not-allowed"
                    }`}
                    disabled={!app.appId}
                  >
                    <div className="w-14 h-14 rounded-xl border border-brand-200 bg-brand-50 flex items-center justify-center">
                      <Icon className="size-6 text-brand-950" />
                    </div>
                    <span className="text-xs text-brand-950">{app.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── App View ──
  const currentAppDef = APPS.find((a) => a.appId === activeApp);

  return (
    <div className="w-full h-full flex flex-col bg-brand-25 overflow-hidden">
      {/* Top Bar */}
      <div className="shrink-0 h-10 border-b border-brand-200 bg-brand-50 flex items-center px-3 gap-3">
        <button onClick={backToDesktop} className="flex items-center gap-1 text-xs text-brand-700 hover:text-brand-950 transition-colors">
          <ArrowLeft className="size-3.5" />
          Home
        </button>

        <div className="h-4 w-px bg-brand-200" />

        <div className="flex items-center gap-1.5">
          {currentAppDef && <currentAppDef.icon className="size-3.5 text-brand-950" />}
          <span className="text-xs font-semibold text-brand-950">{currentAppDef?.name}</span>
        </div>

        <div className="ml-auto relative">
          <button
            onClick={() => setShowGroupPicker(!showGroupPicker)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border border-brand-200 hover:bg-brand-100 transition-colors"
          >
            {selectedGroup ? (
              <>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: selectedGroup.color }} />
                <span className="text-brand-950">{selectedGroup.name}</span>
              </>
            ) : (
              <span className="text-brand-700">All groups</span>
            )}
            <ChevronDown className="size-3 text-brand-500" />
          </button>

          {showGroupPicker && (
            <div className="absolute right-0 top-full mt-1 w-56 bg-brand-0 border border-brand-200 rounded-lg shadow-lg z-50 py-1 max-h-64 overflow-y-auto">
              <button
                onClick={() => { setSelectedGroupId(null); setShowGroupPicker(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-brand-50 transition-colors ${
                  !selectedGroupId ? "font-semibold text-brand-950" : "text-brand-700"
                }`}
              >
                All groups
              </button>
              {allGroups.map((g) => (
                <button
                  key={g.id}
                  onClick={() => { setSelectedGroupId(g.id); setShowGroupPicker(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-brand-50 transition-colors flex items-center gap-2 ${
                    selectedGroupId === g.id ? "font-semibold text-brand-950" : "text-brand-700"
                  }`}
                  style={{ paddingLeft: g.depth === 1 ? "1.75rem" : undefined }}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: g.color }} />
                  {g.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* App Content */}
      <div className="flex-1 overflow-y-auto">
        {loading || !data ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-sm text-brand-500">Loading...</span>
          </div>
        ) : (
          <>
            {activeApp === "messages" && <MessagesApp data={data} groupIds={selectedGroupIds} allGroups={allGroups} />}
            {activeApp === "calendar" && <CalendarApp data={data} groupIds={selectedGroupIds} allGroups={allGroups} />}
            {activeApp === "tasks" && <TasksApp data={data} groupIds={selectedGroupIds} allGroups={allGroups} />}
            {activeApp === "documents" && <DocumentsApp data={data} groupIds={selectedGroupIds} allGroups={allGroups} />}
            {activeApp === "debate" && <DebateApp data={data} groupIds={selectedGroupIds} allGroups={allGroups} />}
            {activeApp === "groups" && <GroupsView groups={data.groups} onSelectGroup={(id) => { setSelectedGroupId(id); setActiveApp("messages"); }} />}
          </>
        )}
      </div>
    </div>
  );
}

function GroupsView({ groups, onSelectGroup }: { groups: DemoData["groups"]; onSelectGroup: (id: string) => void }) {
  return (
    <div className="p-4 space-y-3">
      <h2 className="text-sm font-semibold text-brand-950 mb-3">Your Communities</h2>
      {groups.map((g) => (
        <div key={g.id} className="rounded-xl border border-brand-200 bg-brand-50 p-4">
          <button onClick={() => onSelectGroup(g.id)} className="flex items-center gap-3 w-full text-left hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: g.color }}>
              <Users className="size-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-brand-950">{g.name}</div>
              <div className="text-xs text-brand-600">{g.subtitle}</div>
            </div>
          </button>
          {g.children.length > 0 && (
            <div className="mt-3 ml-4 space-y-1.5 border-l-2 border-brand-200 pl-3">
              {g.children.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectGroup(c.id)}
                  className="flex items-center gap-2 w-full text-left hover:opacity-80 transition-opacity py-1"
                >
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-xs text-brand-800">{c.name}</span>
                  <span className="text-[10px] text-brand-500 ml-auto">{c.subtitle}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
