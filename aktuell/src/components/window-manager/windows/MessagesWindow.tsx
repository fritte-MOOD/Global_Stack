"use client";

import { useEffect, useState, useRef, useCallback, useMemo, type ReactNode } from "react";
import { Mail, Send, ChevronLeft, MoreVertical, Trash2, Search, Plus, Users, UserIcon } from "lucide-react";
import Tag from "../logic/Tag";
import { useWindowManager, type WindowContent } from "../logic/WindowManager";
import {
  loadChats,
  loadChatMessages,
  sendChatMessage,
  createChat,
  deleteChat,
  addChatParticipants,
  loadAvailableUsers,
  type ChatInfo,
  type ChatMessage,
} from "@/app/_actions/chats";
import { useGroupFilter } from "@/components/desktop/GroupFilterContext";
import { searchWindowContent } from "./SearchWindow";
import { ParticipantPicker } from "./ParticipantPicker";
import { useOpenMemberProfile } from "../useOpenMemberProfile";

function chatMatchesGroupFilter(chat: ChatInfo, selectedGroupIds: Set<string>): boolean {
  if (selectedGroupIds.size === 0) return false;
  if (!chat.groupId) return true;
  return selectedGroupIds.has(chat.groupId);
}

// ─── Helpers ─────────────────────────────────────────────────────

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "2-digit" });
}

function getChatDisplayName(chat: ChatInfo, currentUserId: string): string {
  if (chat.subject) return chat.subject;
  if (chat.type === "group" && chat.groupName) return chat.groupName;
  const others = chat.participants.filter((p) => p.id !== currentUserId);
  if (others.length === 0) return "You";
  return others.map((p) => p.name).join(", ");
}

function getChatAvatar(chat: ChatInfo, currentUserId: string): { letter: string; color: string } {
  if (chat.type === "group" && chat.groupColor) {
    return { letter: (chat.subject ?? chat.groupName ?? "G")[0], color: chat.groupColor };
  }
  const others = chat.participants.filter((p) => p.id !== currentUserId);
  const name = others[0]?.name ?? "?";
  const hue = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return { letter: name[0], color: `hsl(${hue}, 50%, 50%)` };
}

// ─── New Chat Form ──────────────────────────────────────────────

function NewChatForm({
  chatType,
  currentUserId,
  onCreated,
  onCancel,
}: {
  chatType: "group" | "direct";
  currentUserId: string;
  onCreated: (chat: ChatInfo) => void;
  onCancel: () => void;
}) {
  const { allGroups } = useGroupFilter();
  const [subject, setSubject] = useState("");
  const [groupId, setGroupId] = useState(allGroups[0]?.id ?? "");
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (chatType === "group" && !subject.trim()) return;
    if (selectedUserIds.size === 0) return;
    setSaving(true);

    const participantIds = [currentUserId, ...selectedUserIds];

    const chat = await createChat({
      type: chatType,
      subject: subject.trim() || undefined,
      groupId: chatType === "group" ? groupId : undefined,
      participantIds,
    });
    onCreated(chat);
    setSaving(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-brand-150 bg-brand-50 shrink-0">
        <button onClick={onCancel} className="p-1 rounded hover:bg-brand-100 transition-colors cursor-pointer">
          <ChevronLeft className="size-4 text-brand-950" />
        </button>
        <span className="text-sm font-semibold text-brand-950">
          {chatType === "group" ? "New group chat" : "New direct chat"}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {/* Subject */}
        <div>
          <label className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-1 block">
            Subject{chatType === "direct" ? " (optional)" : ""}
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={chatType === "group" ? "Enter subject..." : "Subject (optional)"}
            className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-200"
            autoFocus
          />
        </div>

        {/* Group Selection (only for group chats) */}
        {chatType === "group" && (
          <div>
            <label className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-1 block">Group</label>
            <select
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-200"
            >
              {allGroups.map((g) => (
                <option key={g.id} value={g.id}>
                  {"  ".repeat(g.depth)}{g.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Participant Selection */}
        <ParticipantPicker
          selectedIds={selectedUserIds}
          onChange={setSelectedUserIds}
          currentUserId={currentUserId}
          singleSelect={chatType === "direct"}
          groupId={chatType === "group" ? groupId : undefined}
        />
      </div>

      <div className="px-4 py-3 border-t border-brand-150 shrink-0">
        <button
          onClick={handleCreate}
          disabled={saving || (chatType === "group" && !subject.trim()) || selectedUserIds.size === 0}
          className="w-full py-2 text-sm font-medium rounded-lg bg-brand-950 text-brand-0 hover:opacity-80 transition-opacity disabled:opacity-40 cursor-pointer"
        >
          {saving ? "Creating..." : "Create chat"}
        </button>
      </div>
    </div>
  );
}

// ─── Chat List ──────────────────────────────────────────────────

function ChatListView({
  chats,
  currentUserId,
  onOpenChat,
  onDeleteChat,
  onNewChat,
  onSearch,
  showNewDropdown,
  onCloseNewDropdown,
  onPickNewChatType,
  needsGroupSelection,
}: {
  chats: ChatInfo[];
  needsGroupSelection: boolean;
  currentUserId: string;
  onOpenChat: (chat: ChatInfo) => void;
  onDeleteChat: (chat: ChatInfo) => void;
  onNewChat: () => void;
  onSearch: () => void;
  showNewDropdown: boolean;
  onCloseNewDropdown: () => void;
  onPickNewChatType: (type: "group" | "direct") => void;
}) {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const sq = searchQuery.toLowerCase();
  const filteredChats = sq
    ? chats.filter((c) => {
        const name = getChatDisplayName(c, currentUserId).toLowerCase();
        const lastMsg = c.lastMessage?.content.toLowerCase() ?? "";
        return name.includes(sq) || lastMsg.includes(sq);
      })
    : chats;

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-brand-100 shrink-0 space-y-2 bg-brand-50">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-brand-200 bg-brand-0 flex-1 min-w-0">
            <Search className="size-3.5 text-brand-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className="flex-1 text-xs bg-transparent text-brand-950 outline-none placeholder:text-brand-400 min-w-0"
            />
          </div>
          <button
            onClick={onSearch}
            className="p-1.5 rounded-md hover:bg-brand-100 transition-colors cursor-pointer shrink-0"
            title="Global search (messages)"
          >
            <Search className="size-3.5 text-brand-950" />
          </button>
        </div>
        <div className="flex justify-end relative">
          <button
            onClick={onNewChat}
            className="p-1.5 rounded-md hover:bg-brand-100 transition-colors cursor-pointer shrink-0"
            title="New chat"
          >
            <Plus className="size-3.5 text-brand-950" />
          </button>
          {showNewDropdown && (
            <div className="absolute right-0 top-full mt-1 z-30">
              <NewChatDropdown
                onSelect={(type) => {
                  onPickNewChatType(type);
                  onCloseNewDropdown();
                }}
                onClose={onCloseNewDropdown}
              />
            </div>
          )}
        </div>
      </div>

      {/* Chat Items */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-brand-950">
            <Mail className="size-8 mb-2 opacity-40" />
            {needsGroupSelection ? (
              <span className="text-xs text-center max-w-[220px] leading-relaxed">
                Select one or more groups in the workspace bar to see chats.
              </span>
            ) : (
              <>
                <span className="text-sm">{chats.length === 0 ? "No chats" : "No results"}</span>
                {chats.length === 0 && (
                  <button
                    onClick={onNewChat}
                    className="mt-3 px-3 py-1.5 text-xs font-medium rounded-lg bg-brand-950 text-brand-0 hover:opacity-80 cursor-pointer"
                  >
                    Create chat
                  </button>
                )}
              </>
            )}
          </div>
        ) : (
          filteredChats.map((chat) => {
            const displayName = getChatDisplayName(chat, currentUserId);
            const avatar = getChatAvatar(chat, currentUserId);
            return (
              <div
                key={chat.id}
                className="relative flex items-center gap-3 px-4 py-3 hover:bg-brand-50 transition-colors cursor-pointer border-b border-brand-100 last:border-b-0"
                onClick={() => onOpenChat(chat)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setMenuOpen(chat.id);
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-white"
                  style={{ backgroundColor: avatar.color }}
                >
                  {chat.type === "group" ? <Users className="size-4" /> : avatar.letter}
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-brand-950 truncate">{displayName}</span>
                    {chat.lastMessage && (
                      <span className="text-[11px] text-brand-950 shrink-0">
                        {formatRelativeTime(chat.lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  {chat.lastMessage && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs text-brand-950 truncate">
                        <span className="font-medium">{chat.lastMessage.authorName}:</span>{" "}
                        {chat.lastMessage.content}
                      </span>
                    </div>
                  )}
                  {chat.type === "group" && chat.groupName && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: chat.groupColor ?? "#999" }} />
                      <span className="text-[10px] text-brand-950">{chat.groupName}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(menuOpen === chat.id ? null : chat.id);
                  }}
                  className="p-1 rounded hover:bg-brand-100 transition-colors cursor-pointer shrink-0"
                >
                  <MoreVertical className="size-3.5 text-brand-950" />
                </button>

                {menuOpen === chat.id && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setMenuOpen(null); }} />
                    <div className="absolute right-2 top-12 z-20 bg-brand-0 border border-brand-150 rounded-lg shadow-lg py-1 min-w-[140px]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpen(null);
                          onDeleteChat(chat);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="size-3.5" />
                        Delete chat
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ─── Chat View ──────────────────────────────────────────────────

function ChatParticipantsPanel({
  chat,
  currentUserId,
  onClose,
  onAdded,
}: {
  chat: ChatInfo;
  currentUserId: string;
  onClose: () => void;
  onAdded: () => void;
}) {
  const openMemberProfile = useOpenMemberProfile();
  const [allUsers, setAllUsers] = useState<{ id: string; name: string; nickname: string | null }[]>([]);
  const [addSearch, setAddSearch] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadAvailableUsers().then(setAllUsers);
  }, []);

  const existing = new Set(chat.participants.map((p) => p.id));
  const q = addSearch.toLowerCase();
  const candidates = q
    ? allUsers.filter((u) => !existing.has(u.id) && u.name.toLowerCase().includes(q))
    : [];

  const addOne = async (userId: string) => {
    if (adding) return;
    setAdding(true);
    try {
      await addChatParticipants({ chatId: chat.id, userIds: [userId] });
      onAdded();
      setAddSearch("");
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-[25000]" onClick={onClose} aria-hidden />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw-2rem,360px)] max-h-[min(80vh,480px)] bg-brand-0 border border-brand-150 rounded-xl shadow-xl z-[25001] flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-brand-150 flex justify-between items-center shrink-0">
          <span className="text-sm font-medium text-brand-950">Participants</span>
          <button type="button" onClick={onClose} className="text-xs text-brand-950 hover:underline cursor-pointer">
            Close
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
          {chat.participants.map((p) => (
            <div key={p.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openMemberProfile(p.id, p.name)}
                className="text-xs text-brand-950 hover:underline text-left cursor-pointer flex-1 min-w-0 truncate"
              >
                {p.name}
                {p.id === currentUserId && (
                  <span className="text-[10px] opacity-50 ml-1">(you)</span>
                )}
              </button>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-brand-150 shrink-0 space-y-2">
          <div className="text-[10px] font-medium text-brand-950 uppercase tracking-wide">Add someone</div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-brand-200 bg-brand-0">
            <Search className="size-3.5 text-brand-400 shrink-0" />
            <input
              type="text"
              value={addSearch}
              onChange={(e) => setAddSearch(e.target.value)}
              placeholder="Search by name..."
              className="flex-1 text-xs bg-transparent text-brand-950 outline-none placeholder:text-brand-400"
            />
          </div>
          <div className="max-h-28 overflow-y-auto rounded-lg border border-brand-100">
            {candidates.slice(0, 40).map((u) => (
              <button
                key={u.id}
                type="button"
                disabled={adding}
                onClick={() => addOne(u.id)}
                className="w-full text-left px-3 py-2 text-xs text-brand-950 hover:bg-brand-50 cursor-pointer disabled:opacity-40 border-b border-brand-50 last:border-0"
              >
                {u.name}
              </button>
            ))}
            {q && candidates.length === 0 && (
              <div className="px-3 py-2 text-[11px] text-brand-950 opacity-50">No matches</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ChatDetailView({
  chat,
  currentUserId,
  onBack,
  showBackButton,
  splitEmbed,
  onRefreshChats,
}: {
  chat: ChatInfo;
  currentUserId: string;
  onBack: () => void;
  showBackButton: boolean;
  /** When true, hide large in-pane header (window title is enough) */
  splitEmbed?: boolean;
  onRefreshChats: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const openMemberProfile = useOpenMemberProfile();

  useEffect(() => {
    loadChatMessages({ chatId: chat.id }).then((msgs) => {
      setMessages(msgs);
      setLoading(false);
    });
  }, [chat.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  const handleSend = useCallback(async () => {
    const text = newMessage.trim();
    if (!text || sending) return;
    setSending(true);
    setNewMessage("");
    try {
      const msg = await sendChatMessage({ chatId: chat.id, authorId: currentUserId, content: text });
      setMessages((prev) => [...prev, msg]);
    } catch {
      setNewMessage(text);
    } finally {
      setSending(false);
    }
  }, [newMessage, sending, currentUserId, chat.id]);

  const displayName = getChatDisplayName(chat, currentUserId);

  let lastDateStr = "";

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {splitEmbed ? (
        <div className="flex items-center justify-center px-2 py-2 border-b border-brand-150 bg-brand-50 shrink-0">
          <button
            type="button"
            onClick={() => setParticipantsOpen(true)}
            className="text-sm font-medium text-brand-950 truncate max-w-full hover:underline cursor-pointer text-center"
          >
            {displayName}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-brand-150 bg-brand-50 shrink-0">
          {showBackButton && (
            <button onClick={onBack} className="p-1 rounded hover:bg-brand-100 transition-colors cursor-pointer shrink-0">
              <ChevronLeft className="size-4 text-brand-950" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setParticipantsOpen(true)}
            className="min-w-0 flex-1 text-left text-sm font-medium text-brand-950 truncate hover:underline cursor-pointer"
          >
            {displayName}
          </button>
        </div>
      )}

      {participantsOpen && (
        <ChatParticipantsPanel
          chat={chat}
          currentUserId={currentUserId}
          onClose={() => setParticipantsOpen(false)}
          onAdded={() => {
            onRefreshChats();
          }}
        />
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0 bg-brand-25">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <span className="text-xs text-brand-950">Loading...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <span className="text-xs text-brand-950">No messages yet</span>
          </div>
        ) : (
          messages.map((msg) => {
            const msgDate = new Date(msg.createdAt);
            const dateStr = msgDate.toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
            });
            const showDate = dateStr !== lastDateStr;
            lastDateStr = dateStr;
            const mine = msg.author.id === currentUserId;

            return (
              <div key={msg.id}>
                {showDate && (
                  <div className="flex justify-center my-2">
                    <span className="text-[10px] text-brand-950 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-150">
                      {dateStr}
                    </span>
                  </div>
                )}
                <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[88%] rounded-2xl border border-brand-200 px-3 py-2 shadow-sm ${
                      mine
                        ? "bg-brand-100 rounded-br-sm"
                        : "bg-brand-0 rounded-bl-sm"
                    }`}
                  >
                    {!mine && (
                      <button
                        type="button"
                        onClick={() => openMemberProfile(msg.author.id, msg.author.name)}
                        className="text-[10px] font-semibold text-brand-950 hover:underline mb-0.5 block text-left w-full truncate"
                      >
                        {msg.author.name}
                      </button>
                    )}
                    <p className="text-sm text-brand-950 leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                    <div className={`text-[9px] text-brand-950 opacity-50 mt-1 ${mine ? "text-right" : ""}`}>
                      {msgDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="shrink-0 p-3 border-t border-brand-150 bg-brand-50">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 min-w-0 px-3 py-2 text-sm border border-brand-200 rounded-lg bg-brand-0 text-brand-950 focus:outline-none focus:ring-1 focus:ring-brand-200"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            className="px-3 py-2 rounded-lg bg-brand-950 text-brand-0 disabled:opacity-40 cursor-pointer hover:opacity-80 transition-opacity shrink-0"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Empty Panel ─────────────────────────────────────────────────

function EmptyChatPanel() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-brand-950">
      <Mail className="size-10 mb-3 opacity-40" />
      <span className="text-sm">Select a chat</span>
    </div>
  );
}

// ─── New Chat Dropdown ──────────────────────────────────────────

function NewChatDropdown({
  onSelect,
  onClose,
}: {
  onSelect: (type: "group" | "direct") => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="absolute right-0 top-full mt-1 z-20 bg-brand-0 border border-brand-150 rounded-lg shadow-lg py-1 min-w-[180px]">
        <button
          onClick={() => onSelect("group")}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-brand-950 hover:bg-brand-50 transition-colors cursor-pointer"
        >
          <Users className="size-3.5 text-brand-950" />
          Group chat
        </button>
        <button
          onClick={() => onSelect("direct")}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-brand-950 hover:bg-brand-50 transition-colors cursor-pointer"
        >
          <UserIcon className="size-3.5 text-brand-950" />
          Direct chat
        </button>
      </div>
    </>
  );
}

// ─── Messages Content ───────────────────────────────────────────

function ResizableSplitView({
  left,
  right,
  containerWidth,
}: {
  left: ReactNode;
  right: ReactNode;
  containerWidth: number;
}) {
  const [leftWidth, setLeftWidth] = useState(220);
  const dragging = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setLeftWidth(Math.max(140, Math.min(x, containerWidth - 160)));
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [containerWidth]);

  return (
    <div ref={rootRef} className="flex h-full w-full">
      <div className="shrink-0 overflow-hidden" style={{ width: leftWidth }}>
        {left}
      </div>
      <div
        className="w-[3px] shrink-0 bg-brand-150 hover:bg-brand-300 active:bg-brand-400 cursor-col-resize transition-colors"
        onMouseDown={() => { dragging.current = true; }}
      />
      <div className="flex-1 min-w-0 overflow-hidden">
        {right}
      </div>
    </div>
  );
}

export function MessagesContent() {
  const { currentUserId, selectedGroupIds } = useGroupFilter();
  const { openNewInstance } = useWindowManager();
  const [chats, setChats] = useState<ChatInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [openChat, setOpenChat] = useState<ChatInfo | null>(null);
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const [newChatType, setNewChatType] = useState<"group" | "direct" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const refreshChats = useCallback(async () => {
    if (!currentUserId) return;
    const next = await loadChats({ userId: currentUserId });
    setChats(next);
    setOpenChat((prev) => {
      if (!prev) return null;
      return next.find((c) => c.id === prev.id) ?? prev;
    });
  }, [currentUserId]);

  useEffect(() => {
    if (!currentUserId) return;
    loadChats({ userId: currentUserId }).then((c) => {
      setChats(c);
      setLoading(false);
    });
  }, [currentUserId]);

  const visibleChats = useMemo(
    () => chats.filter((c) => chatMatchesGroupFilter(c, selectedGroupIds)),
    [chats, selectedGroupIds]
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width);
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const handleDeleteChat = useCallback(async (chat: ChatInfo) => {
    setChats((prev) => prev.filter((c) => c.id !== chat.id));
    if (openChat?.id === chat.id) setOpenChat(null);
    try {
      await deleteChat({ chatId: chat.id });
    } catch { /* ignore */ }
  }, [openChat]);

  const handleChatCreated = useCallback((chat: ChatInfo) => {
    setChats((prev) => [chat, ...prev]);
    setOpenChat(chat);
    setNewChatType(null);
  }, []);

  const handleNewChat = useCallback(() => {
    setShowNewDropdown((prev) => !prev);
  }, []);

  const handleSearch = useCallback(() => {
    openNewInstance("search", searchWindowContent("message"));
  }, [openNewInstance]);

  if (loading) {
    return (
      <div ref={containerRef} className="flex items-center justify-center h-full p-8">
        <span className="text-sm text-brand-950">Loading...</span>
      </div>
    );
  }

  // New Chat Form view
  if (newChatType) {
    return (
      <div ref={containerRef} className="h-full">
        <NewChatForm
          chatType={newChatType}
          currentUserId={currentUserId}
          onCreated={handleChatCreated}
          onCancel={() => setNewChatType(null)}
        />
      </div>
    );
  }

  const isSplit = containerWidth >= 520;

  const chatListWithDropdown = (
    <div className="relative h-full">
      <ChatListView
        chats={visibleChats}
        needsGroupSelection={selectedGroupIds.size === 0}
        currentUserId={currentUserId}
        onOpenChat={setOpenChat}
        onDeleteChat={handleDeleteChat}
        onNewChat={handleNewChat}
        onSearch={handleSearch}
        showNewDropdown={showNewDropdown}
        onCloseNewDropdown={() => setShowNewDropdown(false)}
        onPickNewChatType={(type) => {
          setShowNewDropdown(false);
          setNewChatType(type);
        }}
      />
    </div>
  );

  if (isSplit) {
    return (
      <div ref={containerRef} className="flex h-full overflow-hidden">
        <ResizableSplitView
          left={chatListWithDropdown}
          right={
            openChat ? (
              <ChatDetailView
                chat={openChat}
                currentUserId={currentUserId}
                onBack={() => setOpenChat(null)}
                showBackButton={false}
                splitEmbed
                onRefreshChats={refreshChats}
              />
            ) : (
              <EmptyChatPanel />
            )
          }
          containerWidth={containerWidth}
        />
      </div>
    );
  }

  if (openChat) {
    return (
      <div ref={containerRef} className="h-full overflow-hidden">
        <ChatDetailView
          chat={openChat}
          currentUserId={currentUserId}
          onBack={() => setOpenChat(null)}
          showBackButton={true}
          splitEmbed={false}
          onRefreshChats={refreshChats}
        />
      </div>
    );
  }

  return <div ref={containerRef} className="h-full overflow-hidden">{chatListWithDropdown}</div>;
}

// ─── Window Wrapper ─────────────────────────────────────────────

function MessagesTooltip() {
  return (
    <div className="p-3 flex flex-col items-center gap-2 text-center">
      <Mail className="size-6 text-brand-950" />
      <span className="text-sm font-medium text-brand-950">Messages</span>
      <span className="text-xs text-brand-950">Click to open messages</span>
    </div>
  );
}

export default function MessagesWindow({ children }: { children?: ReactNode }) {
  const windowContent: WindowContent = {
    title: "Messages",
    body: <MessagesContent />,
    width: 440,
    height: 500,
    resizable: true,
  };

  return (
    <Tag
      id="app-messages"
      tooltip={children ? undefined : <MessagesTooltip />}
      window={windowContent}
      tooltipWidth={200}
      className={
        children
          ? ""
          : "font-semibold underline decoration-brand-200 underline-offset-2 transition-colors text-brand-950"
      }
      activeClassName={children ? "" : "text-brand-950"}
    >
      {children ?? "Messages"}
    </Tag>
  );
}
