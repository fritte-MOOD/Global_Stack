"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  Users,
  ChevronRight,
  ChevronDown,
  Calendar,
  CheckSquare,
  FileText,
  List,
  GitFork,
  Contact,
} from "lucide-react";
import Tag from "../logic/Tag";
import { useWindowManager, type WindowContent } from "../logic/WindowManager";
import { useGroupFilter } from "@/components/desktop/GroupFilterContext";
import {
  loadGroupTree,
  loadGroupDetail,
  type GroupTree,
  type GroupDetail,
} from "@/app/_actions/members";
import { MembersContent, membersWindowContent } from "./MembersWindow";
import { CalendarContent } from "./CalendarWindow";
import { TasksContent } from "./TasksWindow";
import { DocumentsContent } from "./DocumentsWindow";

// ─── Group Info Tooltip (Portal) ────────────────────────────────

function GroupInfoTooltip({ group, anchorRect }: { group: GroupTree; anchorRect: DOMRect }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!ready || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let left = anchorRect.right + 8;
    let top = anchorRect.top;
    if (left + r.width > vw - 8) left = anchorRect.left - r.width - 8;
    if (top + r.height > vh - 8) top = vh - r.height - 8;
    if (left < 8) left = 8;
    if (top < 8) top = 8;
    setPos({ left, top });
  }, [ready, anchorRect]);

  if (!ready) return null;

  return createPortal(
    <div
      ref={ref}
      className="fixed z-[30000] bg-brand-0 border border-brand-150 rounded-lg shadow-xl p-3 min-w-[200px] max-w-[280px] pointer-events-none"
      style={{ left: pos.left || anchorRect.right + 8, top: pos.top || anchorRect.top }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: group.color }} />
        <span className="text-xs font-semibold text-brand-950">{group.name}</span>
      </div>
      <p className="text-[10px] text-brand-950 opacity-70 mb-2">{group.subtitle}</p>
      <div className="flex items-center gap-3 text-[10px] text-brand-950">
        <span className="flex items-center gap-1">
          <Users className="size-2.5" />
          {group.memberCount} Members
        </span>
        <span className="capitalize">{group.visibility}</span>
      </div>
      {group.children.length > 0 && (
        <div className="mt-1.5 text-[10px] text-brand-950 opacity-60">
          {group.children.length} subgroup{group.children.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>,
    document.body
  );
}

// ─── List View: Tree Node ───────────────────────────────────────

function ListTreeNode({
  group,
  depth,
  parentColor,
  onOpenInfo,
}: {
  group: GroupTree;
  depth: number;
  parentColor?: string;
  onOpenInfo: (g: GroupTree) => void;
}) {
  const [expanded, setExpanded] = useState(depth === 0);
  const [hover, setHover] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  const color = depth === 0 ? group.color : (parentColor ?? group.color);
  const hasChildren = group.children.length > 0;

  return (
    <div>
      <div
        ref={nodeRef}
        className="flex items-center gap-1.5 py-1 px-1 rounded hover:bg-brand-50 transition-colors"
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
        onMouseEnter={() => { setHover(true); if (nodeRef.current) setRect(nodeRef.current.getBoundingClientRect()); }}
        onMouseLeave={() => setHover(false)}
      >
        {hasChildren ? (
          <button onClick={() => setExpanded(!expanded)} className="p-0.5 rounded hover:bg-brand-100 cursor-pointer shrink-0">
            {expanded ? <ChevronDown className="size-3 text-brand-950" /> : <ChevronRight className="size-3 text-brand-950" />}
          </button>
        ) : (
          <span className="w-4" />
        )}

        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
        <button
          onClick={() => onOpenInfo(group)}
          className="flex-1 text-left text-xs text-brand-950 truncate cursor-pointer hover:underline decoration-brand-200 underline-offset-2"
        >
          {group.name}
        </button>

        <span className="text-[10px] text-brand-950 opacity-50 shrink-0">
          {group.memberCount}
        </span>
      </div>

      {hover && rect && <GroupInfoTooltip group={group} anchorRect={rect} />}

      {expanded && hasChildren && (
        <div>
          {group.children.map((child) => (
            <ListTreeNode key={child.id} group={child} depth={depth + 1} parentColor={color} onOpenInfo={onOpenInfo} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Visual Tree Diagram ────────────────────────────────────────

function VisualTreeGroup({
  group,
  onOpenInfo,
}: {
  group: GroupTree;
  onOpenInfo: (g: GroupTree) => void;
}) {
  const [hover, setHover] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-6">
      {/* Main group node */}
      <div
        ref={nodeRef}
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-brand-200 bg-brand-0 cursor-pointer hover:bg-brand-50 transition-colors"
        onClick={() => onOpenInfo(group)}
        onMouseEnter={() => { setHover(true); if (nodeRef.current) setRect(nodeRef.current.getBoundingClientRect()); }}
        onMouseLeave={() => setHover(false)}
      >
        <span className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: group.color }} />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-brand-950 truncate">{group.name}</div>
          <div className="text-[10px] text-brand-950 opacity-50">{group.memberCount} Members</div>
        </div>
      </div>

      {hover && rect && <GroupInfoTooltip group={group} anchorRect={rect} />}

      {/* Children with connecting lines */}
      {group.children.length > 0 && (
        <div className="ml-5 mt-0 relative">
          {/* Vertical connector */}
          <div className="absolute left-0 top-0 bottom-3 w-px bg-brand-200" />

          {group.children.map((child, i) => (
            <VisualTreeChild
              key={child.id}
              group={child}
              parentColor={group.color}
              isLast={i === group.children.length - 1}
              onOpenInfo={onOpenInfo}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function VisualTreeChild({
  group,
  parentColor,
  isLast,
  onOpenInfo,
}: {
  group: GroupTree;
  parentColor: string;
  isLast: boolean;
  onOpenInfo: (g: GroupTree) => void;
}) {
  const [hover, setHover] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`relative ${isLast ? "" : ""}`}>
      {/* Horizontal connector */}
      <div className="absolute left-0 top-4 w-4 h-px bg-brand-200" />
      {/* Trim vertical line at last child */}
      {isLast && <div className="absolute left-0 top-4 bottom-0 w-px bg-brand-50" />}

      <div
        ref={nodeRef}
        className="ml-5 mt-1 flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-brand-150 bg-brand-0 cursor-pointer hover:bg-brand-50 transition-colors"
        onClick={() => onOpenInfo(group)}
        onMouseEnter={() => { setHover(true); if (nodeRef.current) setRect(nodeRef.current.getBoundingClientRect()); }}
        onMouseLeave={() => setHover(false)}
      >
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: parentColor }} />
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-brand-950 truncate">{group.name}</div>
        </div>
        <span className="text-[9px] text-brand-950 opacity-40 shrink-0">{group.memberCount}</span>
      </div>

      {hover && rect && <GroupInfoTooltip group={group} anchorRect={rect} />}

      {/* Sub-children */}
      {group.children.length > 0 && (
        <div className="ml-5 relative">
          <div className="absolute left-0 top-0 bottom-3 w-px bg-brand-150" />
          {group.children.map((child, i) => (
            <VisualTreeChild
              key={child.id}
              group={child}
              parentColor={parentColor}
              isLast={i === group.children.length - 1}
              onOpenInfo={onOpenInfo}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Group Detail Content ───────────────────────────────────────

function GroupDetailContent({ groupId }: { groupId: string }) {
  const [detail, setDetail] = useState<GroupDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { openNewInstance } = useWindowManager();

  useEffect(() => {
    loadGroupDetail(groupId).then((d) => { setDetail(d); setLoading(false); });
  }, [groupId]);

  if (loading) return <div className="flex items-center justify-center h-full"><span className="text-xs text-brand-950">Loading...</span></div>;
  if (!detail) return <div className="flex items-center justify-center h-full"><span className="text-xs text-brand-950">Not found</span></div>;

  const color = detail.parentColor ?? detail.color;

  const openMembers = () => {
    openNewInstance("members-for-group", membersWindowContent(groupId));
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-5 pt-5 pb-4 bg-brand-50 border-b border-brand-150">
        {detail.parentName && (
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: detail.parentColor ?? detail.color }} />
            <span className="text-[10px] text-brand-950">{detail.parentName}</span>
            <ChevronRight className="size-2.5 text-brand-950 opacity-40" />
          </div>
        )}
        <div className="flex items-center gap-3 mb-2">
          <span className="w-5 h-5 rounded-full shrink-0" style={{ backgroundColor: color }} />
          <h3 className="text-lg font-bold text-brand-950">{detail.name}</h3>
        </div>
        <p className="text-sm text-brand-950 opacity-70">{detail.subtitle}</p>
      </div>

      <div className="px-5 py-4 grid grid-cols-2 gap-3">
        <button
          onClick={openMembers}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-brand-50 hover:bg-brand-100 transition-colors cursor-pointer text-left"
        >
          <Contact className="size-4 text-brand-950 shrink-0" />
          <div>
            <div className="text-sm font-semibold text-brand-950">{detail.memberCount}</div>
            <div className="text-[10px] text-brand-950 opacity-60">Members</div>
          </div>
        </button>
        <button
          onClick={() => openNewInstance(`calendar-${groupId}`, { title: `Calendar — ${detail.name}`, body: <CalendarContent focusGroupId={groupId} />, width: 700, height: 520, resizable: true })}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-brand-50 hover:bg-brand-100 transition-colors cursor-pointer text-left"
        >
          <Calendar className="size-4 text-brand-950 shrink-0" />
          <div>
            <div className="text-sm font-semibold text-brand-950">{detail.eventCount}</div>
            <div className="text-[10px] text-brand-950 opacity-60">Events</div>
          </div>
        </button>
        <button
          onClick={() => openNewInstance(`tasks-${groupId}`, { title: `Tasks — ${detail.name}`, body: <TasksContent focusGroupId={groupId} />, width: 420, height: 400, resizable: true })}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-brand-50 hover:bg-brand-100 transition-colors cursor-pointer text-left"
        >
          <CheckSquare className="size-4 text-brand-950 shrink-0" />
          <div>
            <div className="text-sm font-semibold text-brand-950">{detail.taskCount}</div>
            <div className="text-[10px] text-brand-950 opacity-60">Tasks</div>
          </div>
        </button>
        <button
          onClick={() => openNewInstance(`docs-${groupId}`, { title: `Documents — ${detail.name}`, body: <DocumentsContent focusGroupId={groupId} />, width: 460, height: 400, resizable: true })}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-brand-50 hover:bg-brand-100 transition-colors cursor-pointer text-left"
        >
          <FileText className="size-4 text-brand-950 shrink-0" />
          <div>
            <div className="text-sm font-semibold text-brand-950">{detail.documentCount}</div>
            <div className="text-[10px] text-brand-950 opacity-60">Documents</div>
          </div>
        </button>
      </div>

      <div className="px-5 py-3 border-t border-brand-150 text-[10px] text-brand-950 opacity-50">
        Created {new Date(detail.createdAt).toLocaleDateString("en-US")} · {detail.visibility}
      </div>
    </div>
  );
}

// ─── Groups Content ─────────────────────────────────────────────

export function GroupsContent() {
  const { openNewInstance } = useWindowManager();
  const [tree, setTree] = useState<GroupTree[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "tree">("list");

  useEffect(() => {
    loadGroupTree().then((t) => { setTree(t); setLoading(false); });
  }, []);

  const openGroupInfo = useCallback((group: GroupTree) => {
    openNewInstance("group-info", {
      title: group.name,
      body: <GroupDetailContent groupId={group.id} />,
      width: 400,
      height: 420,
      resizable: true,
      centered: true,
    });
  }, [openNewInstance]);

  const openMembersApp = useCallback(() => {
    openNewInstance("members-app", membersWindowContent());
  }, [openNewInstance]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <span className="text-xs text-brand-950">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with view toggle + members button */}
      <div className="px-3 py-2.5 border-b border-brand-150 bg-brand-50 shrink-0 flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold text-brand-950">Groups</span>
          <span className="text-[10px] text-brand-950 opacity-50 ml-2">
            {tree.length} Servers · {tree.reduce((a, g) => a + g.children.length, 0)} Subgroups
          </span>
        </div>

        {/* View toggle */}
        <div className="flex rounded-md border border-brand-200 overflow-hidden shrink-0">
          <button
            onClick={() => setView("list")}
            className={`p-1 transition-colors cursor-pointer ${view === "list" ? "bg-brand-950 text-brand-0" : "text-brand-950 hover:bg-brand-100"}`}
            title="List view"
          >
            <List className="size-3" />
          </button>
          <button
            onClick={() => setView("tree")}
            className={`p-1 transition-colors cursor-pointer ${view === "tree" ? "bg-brand-950 text-brand-0" : "text-brand-950 hover:bg-brand-100"}`}
            title="Tree diagram"
          >
            <GitFork className="size-3" />
          </button>
        </div>

        {/* Members button */}
        <button
          onClick={openMembersApp}
          className="flex items-center gap-1.5 px-2 py-1 text-[10px] rounded-md border border-brand-200 text-brand-950 hover:bg-brand-100 transition-colors cursor-pointer shrink-0"
        >
          <Contact className="size-3" />
          Members
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto min-h-0 py-1">
        {view === "list" ? (
          tree.map((group) => (
            <ListTreeNode key={group.id} group={group} depth={0} onOpenInfo={openGroupInfo} />
          ))
        ) : (
          <div className="px-3 py-2">
            {tree.map((group) => (
              <VisualTreeGroup key={group.id} group={group} onOpenInfo={openGroupInfo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Window Wrapper ─────────────────────────────────────────────

function GroupsTooltip() {
  return (
    <div className="p-3 flex flex-col items-center gap-2 text-center">
      <Users className="size-6 text-brand-950" />
      <span className="text-sm font-medium text-brand-950">Groups</span>
      <span className="text-xs text-brand-950">Click to open groups</span>
    </div>
  );
}

export default function GroupsWindow({ children }: { children?: ReactNode }) {
  const windowContent: WindowContent = {
    title: "Groups",
    body: <GroupsContent />,
    width: 380,
    height: 450,
    resizable: true,
  };

  return (
    <Tag
      id="app-groups"
      tooltip={children ? undefined : <GroupsTooltip />}
      window={windowContent}
      tooltipWidth={200}
      className={
        children
          ? ""
          : "font-semibold underline decoration-brand-200 underline-offset-2 transition-colors text-brand-950"
      }
      activeClassName={children ? "" : "text-brand-950"}
    >
      {children ?? "Groups"}
    </Tag>
  );
}
