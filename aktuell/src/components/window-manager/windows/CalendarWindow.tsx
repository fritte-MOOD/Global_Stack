"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus,
  List,
  Clock,
  MapPin,
  User,
  MessageSquare,
  Check,
  X,
  HelpCircle,
  Send,
  Smile,
  Search,
} from "lucide-react";
import Tag from "../logic/Tag";
import { useWindowManager, type WindowContent } from "../logic/WindowManager";
import {
  loadEvents,
  loadEventDetails,
  createEvent,
  updateRSVP,
  addComment,
  toggleReaction,
  type CalendarEvent,
  type EventComment,
} from "@/app/_actions/events";
import { loadGroups, type GroupOption } from "@/app/_actions/groups";
import { useGroupFilter } from "@/components/desktop/GroupFilterContext";
import { searchWindowContent } from "./SearchWindow";
import { ParticipantPicker } from "./ParticipantPicker";

type ViewMode = "month" | "week" | "day" | "list";
type HierarchicalGroup = GroupOption & { depth: number };

// ─── Helpers ────────────────────────────────────────────────────

function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

const DAY_SEGMENTS = [
  { label: "Morning", start: 6, end: 12 },
  { label: "Afternoon", start: 12, end: 17 },
  { label: "Evening", start: 17, end: 21 },
  { label: "Night", start: 21, end: 6 },
] as const;

const MIN_CELL_HEIGHT = 70;
const EMOJI_OPTIONS = ["👍", "❤️", "😄", "🎉", "👀", "🤔"];

// ─── Event Tooltip (Portal-based, no clipping) ──────────────────

function EventTooltip({ ev, anchorRect }: { ev: CalendarEvent; anchorRect: DOMRect }) {
  const [mounted, setMounted] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !tooltipRef.current) return;
    const rect = tooltipRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = anchorRect.right + 8;
    let top = anchorRect.top;

    if (left + rect.width > vw - 8) left = anchorRect.left - rect.width - 8;
    if (top + rect.height > vh - 8) top = vh - rect.height - 8;
    if (left < 8) left = 8;
    if (top < 8) top = 8;

    setPos({ left, top });
  }, [mounted, anchorRect]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={tooltipRef}
      className="fixed z-[30000] bg-brand-0 border border-brand-150 rounded-lg shadow-xl p-2.5 min-w-[200px] max-w-[280px] pointer-events-none"
      style={{ left: pos.left || anchorRect.right + 8, top: pos.top || anchorRect.top }}
    >
      <div className="text-xs font-semibold text-brand-950 mb-1">{ev.title}</div>
      <div className="flex items-center gap-1.5 text-[10px] text-brand-950">
        <Clock className="size-2.5 shrink-0" />
        {formatTime(new Date(ev.startsAt))}
      </div>
      {ev.location && (
        <div className="flex items-center gap-1.5 text-[10px] text-brand-950 mt-0.5">
          <MapPin className="size-2.5 shrink-0" />
          <span className="truncate">{ev.location}</span>
        </div>
      )}
      <div className="flex items-center gap-1.5 mt-1">
        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ev.groupColor }} />
        <span className="text-[10px] text-brand-950">{ev.groupPath}</span>
      </div>
    </div>,
    document.body
  );
}

// ─── Event Chip ─────────────────────────────────────────────────

function EventChip({
  ev,
  compact,
  showTime,
  onOpenDetail,
}: {
  ev: CalendarEvent;
  compact?: boolean;
  showTime?: boolean;
  onOpenDetail: (ev: CalendarEvent) => void;
}) {
  const [hover, setHover] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const chipRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    setHover(true);
    if (chipRef.current) setRect(chipRef.current.getBoundingClientRect());
  };

  if (compact) {
    return (
      <>
        <button
          ref={chipRef}
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetail(ev);
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setHover(false)}
          className="w-2.5 h-2.5 rounded-full shrink-0 cursor-pointer hover:scale-125 transition-transform"
          style={{ backgroundColor: ev.groupColor }}
        />
        {hover && rect && <EventTooltip ev={ev} anchorRect={rect} />}
      </>
    );
  }

  const timeStr = formatTime(new Date(ev.startsAt));

  return (
    <>
      <button
        ref={chipRef}
        onClick={(e) => {
          e.stopPropagation();
          onOpenDetail(ev);
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHover(false)}
        className="w-full text-[9px] px-1 py-0.5 rounded text-white truncate text-left cursor-pointer hover:brightness-110 transition-all leading-tight flex items-center gap-1"
        style={{ backgroundColor: ev.groupColor }}
      >
        {showTime && <span className="opacity-80 shrink-0">{timeStr}</span>}
        <span className="truncate">{ev.title}</span>
      </button>
      {hover && rect && <EventTooltip ev={ev} anchorRect={rect} />}
    </>
  );
}

// ─── Comment Component ──────────────────────────────────────────

function CommentItem({
  comment,
  userId,
  onReact,
  onReply,
  depth = 0,
}: {
  comment: EventComment;
  userId: string;
  onReact: (commentId: string, emoji: string) => void;
  onReply: (parentId: string, content: string) => void;
  depth?: number;
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [repliesCollapsed, setRepliesCollapsed] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText.trim());
    setReplyText("");
    setShowReplyInput(false);
  };

  return (
    <div className={`${depth > 0 ? "ml-4 border-l-2 border-brand-150 pl-3" : ""}`}>
      <div className="bg-brand-25 rounded-lg p-3">
        <div className="flex items-center gap-2 text-xs mb-1.5">
          <span className="font-semibold text-brand-950">{comment.authorName}</span>
          <span className="text-brand-950">{new Date(comment.createdAt).toLocaleDateString("de-DE")}</span>
        </div>
        <p className="text-sm text-brand-950 whitespace-pre-wrap leading-relaxed">{comment.content}</p>

        <div className="flex items-center gap-2 mt-2">
          {comment.reactions.length > 0 && (
            <div className="flex gap-1">
              {comment.reactions.map((r, i) => (
                <button
                  key={i}
                  onClick={() => onReact(comment.id, r.emoji)}
                  className={`text-xs px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                    r.userReacted ? "bg-brand-200" : "bg-brand-100 hover:bg-brand-150"
                  }`}
                >
                  {r.emoji} {r.count}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-1 rounded hover:bg-brand-100 transition-colors cursor-pointer"
              >
                <Smile className="size-3.5 text-brand-950" />
              </button>
              {showEmojiPicker && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowEmojiPicker(false)} />
                  <div className="absolute bottom-full right-0 mb-1 bg-brand-0 border border-brand-150 rounded-lg shadow-lg p-1.5 flex gap-1 z-20">
                    {EMOJI_OPTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          onReact(comment.id, emoji);
                          setShowEmojiPicker(false);
                        }}
                        className="p-1.5 hover:bg-brand-50 rounded transition-colors cursor-pointer text-base"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            {depth < 2 && (
              <button
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="text-xs text-brand-950 hover:text-brand-950 transition-colors cursor-pointer"
              >
                Antworten
              </button>
            )}
          </div>
        </div>
      </div>

      {showReplyInput && (
        <div className="flex gap-1.5 mt-1.5">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Antwort schreiben..."
            className="flex-1 px-2.5 py-1.5 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-200"
            onKeyDown={(e) => e.key === "Enter" && handleReply()}
            autoFocus
          />
          <button
            onClick={handleReply}
            disabled={!replyText.trim()}
            className="p-1.5 rounded-lg bg-brand-950 text-brand-0 disabled:opacity-40 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Send className="size-3.5" />
          </button>
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="mt-2">
          <button
            onClick={() => setRepliesCollapsed(!repliesCollapsed)}
            className="text-xs text-brand-950 hover:text-brand-950 cursor-pointer mb-1.5 flex items-center gap-1"
          >
            <ChevronRight className={`size-3 transition-transform ${repliesCollapsed ? "" : "rotate-90"}`} />
            {comment.replies.length} {comment.replies.length === 1 ? "Antwort" : "Antworten"}
          </button>
          {!repliesCollapsed && (
            <div className="space-y-2">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} userId={userId} onReact={onReact} onReply={onReply} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Event Detail Window Content ────────────────────────────────

function EventDetailContent({ eventId, currentUserId }: { eventId: string; currentUserId: string }) {
  const [event, setEvent] = useState<CalendarEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reload = useCallback(async () => {
    const e = await loadEventDetails(eventId);
    setEvent(e);
    setLoading(false);
  }, [eventId]);

  useEffect(() => {
    reload();
  }, [reload]);

  const handleRSVP = async (status: "accepted" | "declined" | "maybe") => {
    if (!event) return;
    await updateRSVP({ eventId: event.id, userId: currentUserId, status });
    reload();
  };

  const handleAddComment = async () => {
    if (!event || !newComment.trim()) return;
    setSubmitting(true);
    await addComment({ eventId: event.id, authorId: currentUserId, content: newComment.trim() });
    setNewComment("");
    setSubmitting(false);
    reload();
  };

  const handleReplyComment = async (parentId: string, content: string) => {
    if (!event) return;
    await addComment({ eventId: event.id, authorId: currentUserId, content, parentId });
    reload();
  };

  const handleReaction = async (commentId: string, emoji: string) => {
    await toggleReaction({ commentId, userId: currentUserId, emoji });
    reload();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <span className="text-xs text-brand-950">Loading...</span>
      </div>
    );
  }
  if (!event) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <span className="text-xs text-brand-950">Event not found</span>
      </div>
    );
  }

  const evDate = new Date(event.startsAt);
  const createdDate = new Date(event.createdAt);

  const myRSVP = event.invitees?.find((i) => i.userId === currentUserId);
  const accepted = event.invitees?.filter((i) => i.status === "accepted") ?? [];
  const declined = event.invitees?.filter((i) => i.status === "declined") ?? [];
  const maybe = event.invitees?.filter((i) => i.status === "maybe") ?? [];

  const totalInvited = (accepted.length + declined.length + maybe.length);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Hero Header */}
      <div className="px-5 pt-5 pb-4 bg-brand-50 border-b border-brand-150">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: event.groupColor }} />
          <span className="text-xs font-medium text-brand-950">{event.groupPath}</span>
        </div>
        <h3 className="text-lg font-bold text-brand-950 leading-tight">{event.title}</h3>
        {event.description && (
          <p className="text-sm text-brand-950 mt-2 whitespace-pre-wrap leading-relaxed">{event.description}</p>
        )}
      </div>

      {/* Details Grid */}
      <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-3 border-b border-brand-150">
        <div className="flex items-start gap-2.5">
          <CalendarIcon className="size-4 text-brand-950 mt-0.5 shrink-0" />
          <div>
            <div className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-0.5">Datum</div>
            <div className="text-sm text-brand-950">
              {evDate.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Clock className="size-4 text-brand-950 mt-0.5 shrink-0" />
          <div>
            <div className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-0.5">Uhrzeit</div>
            <div className="text-sm text-brand-950">{formatTime(evDate)} Uhr</div>
          </div>
        </div>
        {event.location && (
          <div className="flex items-start gap-2.5">
            <MapPin className="size-4 text-brand-950 mt-0.5 shrink-0" />
            <div>
              <div className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-0.5">Ort</div>
              <div className="text-sm text-brand-950">{event.location}</div>
            </div>
          </div>
        )}
        <div className="flex items-start gap-2.5">
          <User className="size-4 text-brand-950 mt-0.5 shrink-0" />
          <div>
            <div className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-0.5">Erstellt von</div>
            <div className="text-sm text-brand-950">{event.creatorName}</div>
            <div className="text-[11px] text-brand-950">{createdDate.toLocaleDateString("de-DE")}</div>
          </div>
        </div>
      </div>

      {/* RSVP Section */}
      <div className="px-5 py-4 border-b border-brand-150">
        <div className="text-xs font-semibold text-brand-950 uppercase tracking-wide mb-3">Deine Antwort</div>
        <div className="flex gap-2">
          <button
            onClick={() => handleRSVP("accepted")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              myRSVP?.status === "accepted"
                ? "bg-brand-950 text-brand-0"
                : "bg-brand-100 text-brand-950 hover:bg-brand-200"
            }`}
          >
            <Check className="size-3.5" />
            Zusage
          </button>
          <button
            onClick={() => handleRSVP("maybe")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              myRSVP?.status === "maybe"
                ? "bg-brand-950 text-brand-0"
                : "bg-brand-100 text-brand-950 hover:bg-brand-200"
            }`}
          >
            <HelpCircle className="size-3.5" />
            Vielleicht
          </button>
          <button
            onClick={() => handleRSVP("declined")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              myRSVP?.status === "declined"
                ? "bg-brand-950 text-brand-0"
                : "bg-brand-100 text-brand-950 hover:bg-brand-200"
            }`}
          >
            <X className="size-3.5" />
            Absage
          </button>
        </div>

        {totalInvited > 0 && (
          <div className="mt-3 flex gap-4 text-xs">
            {accepted.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-950" />
                <span className="text-brand-950"><span className="font-semibold">{accepted.length}</span> Zusage{accepted.length !== 1 && "n"}</span>
              </div>
            )}
            {maybe.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-400" />
                <span className="text-brand-950"><span className="font-semibold">{maybe.length}</span> Vielleicht</span>
              </div>
            )}
            {declined.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-200" />
                <span className="text-brand-950"><span className="font-semibold">{declined.length}</span> Absage{declined.length !== 1 && "n"}</span>
              </div>
            )}
          </div>
        )}

        {totalInvited > 0 && (
          <div className="mt-2 text-xs text-brand-950">
            {[...accepted, ...maybe, ...declined].map((i) => i.userName).join(", ")}
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className="px-5 py-4 flex-1 flex flex-col min-h-0">
        <div className="text-xs font-semibold text-brand-950 uppercase tracking-wide flex items-center gap-1.5 mb-3">
          <MessageSquare className="size-3.5" />
          Kommentare {event.comments && event.comments.length > 0 && `(${event.comments.length})`}
        </div>

        {event.comments && event.comments.length > 0 && (
          <div className="space-y-3 mb-3 flex-1 overflow-y-auto">
            {event.comments.map((c) => (
              <CommentItem key={c.id} comment={c} userId={currentUserId} onReact={handleReaction} onReply={handleReplyComment} />
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-auto pt-3 border-t border-brand-150">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Kommentar schreiben..."
            className="flex-1 px-3 py-2 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-200"
            onKeyDown={(e) => e.key === "Enter" && !submitting && handleAddComment()}
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim() || submitting}
            className="px-3 py-2 rounded-lg bg-brand-950 text-brand-0 disabled:opacity-40 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Group Select ───────────────────────────────────────────────

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
        {selected && <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: selected.color }} />}
        <span className="flex-1 truncate">{selected?.name ?? "Select group..."}</span>
        <ChevronLeft className="size-3 text-brand-950 -rotate-90" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 top-full mt-1 bg-brand-0 border border-brand-150 rounded-lg shadow-lg py-1 z-20 max-h-48 overflow-y-auto">
            {groups.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => {
                  onChange(g.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-brand-50 transition-colors cursor-pointer ${g.id === value ? "bg-brand-50" : ""}`}
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

// ─── Create Event Form ──────────────────────────────────────────

function CreateEventForm({
  hierarchicalGroups,
  onCreated,
  currentUserId,
}: {
  hierarchicalGroups: HierarchicalGroup[];
  onCreated: (ev: CalendarEvent) => void;
  currentUserId: string;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [location, setLocation] = useState("");
  const [groupId, setGroupId] = useState(hierarchicalGroups[0]?.id ?? "");
  const [inviteeIds, setInviteeIds] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const selectedGroup = hierarchicalGroups.find((g) => g.id === groupId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date || !groupId) return;
    setSaving(true);
    setError("");
    const startsAt = new Date(`${date}T${time}`).toISOString();
    const result = await createEvent({
      title,
      description: description || undefined,
      startsAt,
      groupId,
      location: location || undefined,
    });
    if (result.success && result.event) {
      onCreated(result.event);
    } else {
      setError(result.error ?? "Failed");
    }
    setSaving(false);
  };

  const inputCls = "w-full px-3 py-2 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-200";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-y-auto">
      {/* Hero Header — Title + Description + Group */}
      <div className="px-5 pt-5 pb-4 bg-brand-50 border-b border-brand-150">
        <div className="mb-3">
          <GroupSelect groups={hierarchicalGroups} value={groupId} onChange={setGroupId} />
        </div>
        <input
          type="text"
          placeholder="Titel des Termins"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-lg font-bold text-brand-950 bg-transparent border-b border-brand-200 focus:border-brand-400 outline-none pb-1 placeholder:text-brand-400 placeholder:font-normal"
          autoFocus
          required
        />
        <textarea
          placeholder="Beschreibung (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full mt-3 text-sm text-brand-950 bg-transparent border border-brand-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-200 resize-none placeholder:text-brand-400 leading-relaxed"
        />
      </div>

      {/* Details Grid */}
      <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-4 border-b border-brand-150">
        <div className="flex items-start gap-2.5">
          <CalendarIcon className="size-4 text-brand-950 mt-2.5 shrink-0" />
          <div className="flex-1">
            <div className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-1">Datum</div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCls}
              required
            />
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Clock className="size-4 text-brand-950 mt-2.5 shrink-0" />
          <div className="flex-1">
            <div className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-1">Uhrzeit</div>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>
        <div className="flex items-start gap-2.5 col-span-2">
          <MapPin className="size-4 text-brand-950 mt-2.5 shrink-0" />
          <div className="flex-1">
            <div className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-1">Ort</div>
            <input
              type="text"
              placeholder="Ort eingeben (optional)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Participants */}
      <div className="px-5 py-4 border-b border-brand-150">
        <ParticipantPicker
          selectedIds={inviteeIds}
          onChange={setInviteeIds}
          currentUserId={currentUserId}
        />
      </div>

      {/* Footer with Submit */}
      <div className="px-5 py-4 mt-auto">
        {error && <div className="text-xs text-red-600 mb-3">{error}</div>}
        <button
          type="submit"
          disabled={saving || !title.trim() || !date}
          className="w-full py-2.5 text-sm font-medium rounded-lg bg-brand-950 text-brand-0 hover:opacity-80 transition-opacity disabled:opacity-40 cursor-pointer"
        >
          {saving ? "Wird erstellt..." : "Termin erstellen"}
        </button>
      </div>
    </form>
  );
}

// ─── Calendar Content ───────────────────────────────────────────

export function CalendarContent() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [dbGroups, setDbGroups] = useState<GroupOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { toggleWindow, closeWindow, openNewInstance } = useWindowManager();
  const { selectedGroupIds, allGroups: filterGroups, currentUserId } = useGroupFilter();

  const reload = useCallback(async () => {
    const [evts, grps] = await Promise.all([loadEvents(), loadGroups()]);
    setAllEvents(evts);
    setDbGroups(grps);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const groupFilteredEvents = allEvents.filter((e) => selectedGroupIds.has(e.groupId));
  const sq = searchQuery.toLowerCase();
  const events = sq
    ? groupFilteredEvents.filter(
        (e) =>
          e.title.toLowerCase().includes(sq) ||
          e.location?.toLowerCase().includes(sq) ||
          e.groupPath?.toLowerCase().includes(sq)
      )
    : groupFilteredEvents;

  const hierarchicalGroups: HierarchicalGroup[] = filterGroups.map((fg) => ({
    id: fg.id,
    name: fg.name,
    color: fg.color,
    depth: fg.depth,
  }));

  const openCreateWindow = () => {
    toggleWindow("create-event", {
      title: "New Event",
      body: (
        <CreateEventForm
          hierarchicalGroups={hierarchicalGroups.length > 0 ? hierarchicalGroups : dbGroups.map((g) => ({ ...g, depth: 0 }))}
          currentUserId={currentUserId}
          onCreated={(ev) => {
            setAllEvents((prev) => [...prev, ev].sort((a, b) => a.startsAt.localeCompare(b.startsAt)));
            closeWindow("create-event");
          }}
        />
      ),
      width: 480,
      height: 520,
      resizable: true,
      centered: true,
    });
  };

  const openEventDetail = (ev: CalendarEvent) => {
    openNewInstance("event-detail", {
      title: ev.title,
      body: <EventDetailContent eventId={ev.id} currentUserId={currentUserId} />,
      width: 480,
      height: 640,
      resizable: true,
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

  const goToDay = (date: Date) => {
    setCurrentDate(new Date(date));
    setViewMode("day");
  };
  const goToWeek = (date: Date) => {
    setCurrentDate(getMondayOfWeek(date));
    setViewMode("week");
  };

  // ─── Month View ─────────────────────────────────────────────

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const dayOfWeek = firstDay.getDay();
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - ((dayOfWeek + 6) % 7));

    const weeks: Date[][] = [];
    const cur = new Date(startDate);
    for (let w = 0; w < 6; w++) {
      const week: Date[] = [];
      for (let d = 0; d < 7; d++) {
        week.push(new Date(cur));
        cur.setDate(cur.getDate() + 1);
      }
      if (week.some((d) => d.getMonth() === month)) weeks.push(week);
    }

    return (
      <div className="flex flex-col min-h-0 overflow-y-auto">
        <div className="grid grid-cols-[2.5rem_repeat(7,1fr)] bg-brand-50 border-b border-brand-200 shrink-0 sticky top-0 z-10">
          <div className="p-1 text-[10px] font-semibold text-brand-950 text-center border-r border-brand-200">KW</div>
          {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
            <div
              key={d}
              className="p-1 text-[10px] font-semibold text-brand-950 text-center border-r border-brand-200 last:border-r-0"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="flex-1">
          {weeks.map((week, wi) => {
            const weekNum = getISOWeekNumber(week[3]);
            return (
              <div
                key={wi}
                className="grid grid-cols-[2.5rem_repeat(7,1fr)] border-b border-brand-100"
                style={{ minHeight: MIN_CELL_HEIGHT }}
              >
                <button
                  onClick={() => goToWeek(week[0])}
                  className="flex items-start justify-center pt-1 text-[10px] font-medium text-brand-950 bg-brand-25 border-r border-brand-100 hover:bg-brand-100 hover:text-brand-950 transition-colors cursor-pointer"
                >
                  {weekNum}
                </button>
                {week.map((day, di) => {
                  const dayEvents = getEventsForDate(day);
                  const isCurrentMonth = day.getMonth() === month;
                  const isToday = day.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={di}
                      className={`p-0.5 border-r border-brand-100 last:border-r-0 overflow-hidden flex flex-col ${isCurrentMonth ? "bg-brand-0" : "bg-brand-25"} ${isToday ? "ring-1 ring-brand-950 ring-inset" : ""}`}
                    >
                      <button
                        onClick={() => goToDay(day)}
                        className={`text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center cursor-pointer transition-colors shrink-0 ${isCurrentMonth ? "text-brand-950 hover:bg-brand-100" : "text-brand-400 hover:bg-brand-50"}`}
                      >
                        {day.getDate()}
                      </button>
                      <div className="flex-1 min-h-0 overflow-hidden mt-0.5">
                        {dayEvents.length <= 3 ? (
                          <div className="space-y-0.5">
                            {dayEvents.map((ev) => (
                              <EventChip key={ev.id} ev={ev} onOpenDetail={openEventDetail} />
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-0.5">
                            {dayEvents.slice(0, 5).map((ev) => (
                              <EventChip key={ev.id} ev={ev} compact onOpenDetail={openEventDetail} />
                            ))}
                            {dayEvents.length > 5 && <span className="text-[8px] text-brand-950">+{dayEvents.length - 5}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── Week View ──────────────────────────────────────────────

  const renderWeekView = () => {
    const monday = getMondayOfWeek(currentDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });

    return (
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        <div className="grid grid-cols-7 bg-brand-50 border-b border-brand-200 shrink-0 sticky top-0 z-10">
          {weekDays.map((day, i) => (
            <button
              key={i}
              onClick={() => goToDay(day)}
              className="p-2 text-center border-r border-brand-200 last:border-r-0 hover:bg-brand-100 transition-colors cursor-pointer"
            >
              <div className="text-xs font-semibold text-brand-950">
                {day.toLocaleDateString("de-DE", { weekday: "short" })}
              </div>
              <div
                className={`text-sm font-medium mt-1 ${day.toDateString() === new Date().toDateString() ? "text-brand-0 bg-brand-950 rounded-full w-6 h-6 flex items-center justify-center mx-auto" : "text-brand-950"}`}
              >
                {day.getDate()}
              </div>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-1 border-l border-brand-200">
          {weekDays.map((day, i) => {
            const dayEvents = getEventsForDate(day);
            const showCompact = dayEvents.length > 4;
            return (
              <div key={i} className="p-1.5 border-r border-brand-200 last:border-r-0 overflow-hidden">
                {showCompact ? (
                  <div className="flex flex-wrap gap-0.5">
                    {dayEvents.slice(0, 6).map((ev) => (
                      <EventChip key={ev.id} ev={ev} compact onOpenDetail={openEventDetail} />
                    ))}
                    {dayEvents.length > 6 && <span className="text-[8px] text-brand-950">+{dayEvents.length - 6}</span>}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {dayEvents.map((ev) => (
                      <EventChip key={ev.id} ev={ev} showTime onOpenDetail={openEventDetail} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── Day View ───────────────────────────────────────────────

  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate);
    const segments = DAY_SEGMENTS.map((seg) => {
      const segEvents = dayEvents.filter((ev) => {
        const h = new Date(ev.startsAt).getHours();
        if (seg.label === "Night") return h >= 21 || h < 6;
        return h >= seg.start && h < seg.end;
      });
      return { ...seg, events: segEvents };
    });

    return (
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {segments.map((seg) => (
          <div key={seg.label} className="border-b border-brand-100">
            <div className="flex">
              <div className="w-20 p-2 text-xs font-medium text-brand-950 bg-brand-25 border-r border-brand-100 shrink-0">
                {seg.label}
              </div>
              <div className="flex-1 p-2 min-h-[40px]">
                {seg.events.length === 0 ? (
                  <div className="text-[10px] text-brand-400 italic">—</div>
                ) : (
                  <div className="space-y-1">
                    {seg.events.map((ev) => (
                      <EventChip key={ev.id} ev={ev} showTime onOpenDetail={openEventDetail} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ─── List View ──────────────────────────────────────────────

  const renderListView = () => {
    const upcoming = events
      .filter((e) => new Date(e.startsAt) >= new Date(new Date().setHours(0, 0, 0, 0)))
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
    if (upcoming.length === 0)
      return (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs text-brand-950">No upcoming events.</span>
        </div>
      );

    let lastDateStr = "";
    return (
      <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-0.5">
        {upcoming.map((ev) => {
          const evDate = new Date(ev.startsAt);
          const dateStr = evDate.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "long" });
          const showDate = dateStr !== lastDateStr;
          lastDateStr = dateStr;
          const isToday = evDate.toDateString() === new Date().toDateString();
          return (
            <div key={ev.id}>
              {showDate && (
                <div className={`text-xs font-semibold px-1 pt-2 pb-1 ${isToday ? "text-brand-950" : "text-brand-950"}`}>
                  {isToday ? "Today" : dateStr}
                </div>
              )}
              <EventChip ev={ev} showTime onOpenDetail={openEventDetail} />
            </div>
          );
        })}
      </div>
    );
  };

  // ─── Header ─────────────────────────────────────────────────

  const formatTitle = () => {
    if (viewMode === "list") return "Upcoming";
    if (viewMode === "month")
      return currentDate.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
    if (viewMode === "week") {
      const monday = getMondayOfWeek(currentDate);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      const wn = getISOWeekNumber(currentDate);
      return `KW ${wn} · ${monday.getDate()}.${monday.getMonth() + 1} – ${sunday.getDate()}.${sunday.getMonth() + 1}`;
    }
    return currentDate.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "long" });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-xs text-brand-950">Loading...</span>
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2 border-b border-brand-200 bg-brand-50 shrink-0 gap-2">
        <div className="flex items-center gap-1 shrink-0">
          <div className="flex rounded-md border border-brand-200 bg-brand-0 p-0.5">
            {(["list", "month", "week", "day"] as ViewMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`px-2 py-1 text-xs rounded transition-colors cursor-pointer ${viewMode === m ? "bg-brand-950 text-brand-0 font-medium" : "text-brand-950 hover:bg-brand-50"}`}
              >
                {m === "list" ? <List className="size-3" /> : m === "month" ? "M" : m === "week" ? "W" : "D"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 flex-1 justify-center min-w-0">
          <button
            onClick={() => navigateDate("prev")}
            className="p-1 rounded hover:bg-brand-50 transition-colors cursor-pointer shrink-0"
          >
            <ChevronLeft className="size-3.5 text-brand-950" />
          </button>
          <div className="px-1 py-0.5 text-[11px] font-medium text-brand-950 text-center truncate">{formatTitle()}</div>
          <button
            onClick={() => navigateDate("next")}
            className="p-1 rounded hover:bg-brand-50 transition-colors cursor-pointer shrink-0"
          >
            <ChevronRight className="size-3.5 text-brand-950" />
          </button>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              setShowSearch(!showSearch);
              if (showSearch) setSearchQuery("");
            }}
            className={`p-1 rounded transition-colors cursor-pointer ${showSearch ? "bg-brand-200" : "hover:bg-brand-50"}`}
            title="Termine filtern"
          >
            <Search className="size-3.5 text-brand-950" />
          </button>
          <button
            onClick={openCreateWindow}
            className="p-1 rounded hover:bg-brand-50 transition-colors cursor-pointer"
          >
            <Plus className="size-3.5 text-brand-950" />
          </button>
        </div>
      </div>

      {/* Inline Search Bar */}
      {showSearch && (
        <div className="px-2 py-1.5 border-b border-brand-100 bg-brand-0 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-brand-200 bg-brand-0 flex-1">
              <Search className="size-3.5 text-brand-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Termine filtern..."
                className="flex-1 text-xs bg-transparent text-brand-950 outline-none placeholder:text-brand-400"
                autoFocus
              />
            </div>
            <button
              onClick={() => openNewInstance("search", searchWindowContent("event"))}
              className="p-1.5 rounded-md hover:bg-brand-100 transition-colors cursor-pointer shrink-0"
              title="Globale Suche (Termine)"
            >
              <Search className="size-3.5 text-brand-950" />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {viewMode === "month" && renderMonthView()}
        {viewMode === "week" && renderWeekView()}
        {viewMode === "day" && renderDayView()}
        {viewMode === "list" && renderListView()}
      </div>
    </div>
  );
}

// ─── Window Wrapper ─────────────────────────────────────────────

function CalendarTooltip() {
  return (
    <div className="p-3 flex flex-col items-center gap-2 text-center">
      <CalendarIcon className="size-6 text-brand-950" />
      <span className="text-sm font-medium text-brand-950">Calendar</span>
      <span className="text-xs text-brand-950">Click to open</span>
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
      className={
        children ? "" : "font-semibold underline decoration-brand-200 underline-offset-2 transition-colors text-brand-950"
      }
      activeClassName={children ? "" : "text-brand-950"}
    >
      {children ?? name}
    </Tag>
  );
}
