"use client";

import { useEffect, useState } from "react";
import { X, Users, UserPlus, ChevronDown, Search } from "lucide-react";
import { loadGroupsWithMembers, type GroupWithMembers } from "@/app/_actions/groups";
import { loadAvailableUsers } from "@/app/_actions/chats";

type Participant = { id: string; name: string };

export function ParticipantPicker({
  selectedIds,
  onChange,
  currentUserId,
  singleSelect,
}: {
  selectedIds: Set<string>;
  onChange: (ids: Set<string>) => void;
  currentUserId: string;
  singleSelect?: boolean;
}) {
  const [groups, setGroups] = useState<GroupWithMembers[]>([]);
  const [allUsers, setAllUsers] = useState<Participant[]>([]);
  const [mode, setMode] = useState<"idle" | "group" | "person">("idle");
  const [personSearch, setPersonSearch] = useState("");

  useEffect(() => {
    Promise.all([loadGroupsWithMembers(), loadAvailableUsers()]).then(
      ([g, u]) => {
        setGroups(g);
        setAllUsers(u.map((x) => ({ id: x.id, name: x.name })));
      }
    );
  }, []);

  const otherUsers = allUsers.filter((u) => u.id !== currentUserId);
  const selected = otherUsers.filter((u) => selectedIds.has(u.id));

  const addUser = (id: string) => {
    if (singleSelect) {
      onChange(new Set([id]));
      setMode("idle");
    } else {
      const next = new Set(selectedIds);
      next.add(id);
      onChange(next);
    }
  };

  const removeUser = (id: string) => {
    const next = new Set(selectedIds);
    next.delete(id);
    onChange(next);
  };

  const addGroup = (group: GroupWithMembers) => {
    const next = new Set(selectedIds);
    for (const m of group.members) {
      if (m.id !== currentUserId) next.add(m.id);
    }
    onChange(next);
    setMode("idle");
  };

  const q = personSearch.toLowerCase();
  const filteredUsers = q
    ? otherUsers.filter((u) => u.name.toLowerCase().includes(q))
    : otherUsers;

  return (
    <div>
      <label className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-1.5 block">
        Teilnehmer
      </label>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {selected.map((u) => (
            <span
              key={u.id}
              className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5 rounded-full bg-brand-100 text-xs text-brand-950"
            >
              {u.name}
              <button
                type="button"
                onClick={() => removeUser(u.id)}
                className="p-0.5 rounded-full hover:bg-brand-200 transition-colors cursor-pointer"
              >
                <X className="size-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-1.5">
        {!singleSelect && (
          <button
            type="button"
            onClick={() => setMode(mode === "group" ? "idle" : "group")}
            className={`flex items-center gap-1.5 px-2 py-1 text-[11px] rounded-md border transition-colors cursor-pointer ${
              mode === "group"
                ? "border-brand-950 bg-brand-950 text-brand-0"
                : "border-brand-200 text-brand-950 hover:bg-brand-50"
            }`}
          >
            <Users className="size-3" />
            Gruppe
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setMode(mode === "person" ? "idle" : "person");
            setPersonSearch("");
          }}
          className={`flex items-center gap-1.5 px-2 py-1 text-[11px] rounded-md border transition-colors cursor-pointer ${
            mode === "person"
              ? "border-brand-950 bg-brand-950 text-brand-0"
              : "border-brand-200 text-brand-950 hover:bg-brand-50"
          }`}
        >
          <UserPlus className="size-3" />
          Person
        </button>
      </div>

      {/* Group dropdown */}
      {mode === "group" && (
        <div className="mt-2 border border-brand-200 rounded-lg bg-brand-0 max-h-40 overflow-y-auto">
          {groups.filter((g) => g.members.length > 0).map((g) => {
            const addable = g.members.filter(
              (m) => m.id !== currentUserId && !selectedIds.has(m.id)
            );
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => addGroup(g)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-brand-50 transition-colors cursor-pointer"
                style={{ paddingLeft: g.depth === 1 ? "1.5rem" : "0.75rem" }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: g.color }}
                />
                <span className="flex-1 text-left text-brand-950 truncate">
                  {g.name}
                </span>
                <span className="text-[10px] text-brand-950 opacity-60">
                  +{addable.length}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Person search */}
      {mode === "person" && (
        <div className="mt-2 border border-brand-200 rounded-lg bg-brand-0">
          <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-brand-100">
            <Search className="size-3 text-brand-400 shrink-0" />
            <input
              type="text"
              value={personSearch}
              onChange={(e) => setPersonSearch(e.target.value)}
              placeholder="Name suchen..."
              className="flex-1 text-xs bg-transparent text-brand-950 outline-none placeholder:text-brand-400"
              autoFocus
            />
          </div>
          <div className="max-h-32 overflow-y-auto">
            {filteredUsers.map((u) => {
              const isSelected = selectedIds.has(u.id);
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() =>
                    isSelected ? removeUser(u.id) : addUser(u.id)
                  }
                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-brand-50 text-brand-950"
                      : "text-brand-950 hover:bg-brand-50"
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-brand-950 border-brand-950"
                        : "border-brand-300"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        viewBox="0 0 12 12"
                        className="size-2 text-brand-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </span>
                  <span className="truncate">{u.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
