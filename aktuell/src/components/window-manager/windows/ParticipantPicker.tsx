"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X, Search, ChevronDown, ChevronRight, UserPlus } from "lucide-react";
import { loadGroupsWithMembers, type GroupWithMembers } from "@/app/_actions/groups";
import { loadAvailableUsers } from "@/app/_actions/chats";

type Participant = { id: string; name: string };

const LARGE_LIST_THRESHOLD = 30;

function BulkParticipantPickerModal({
  selectedIds,
  onChange,
  users,
  onClose,
}: {
  selectedIds: Set<string>;
  onChange: (ids: Set<string>) => void;
  users: Participant[];
  onClose: () => void;
}) {
  const [searchSelected, setSearchSelected] = useState("");
  const [searchAdd, setSearchAdd] = useState("");
  const qs = searchSelected.toLowerCase();
  const qa = searchAdd.toLowerCase();

  const selectedList = useMemo(
    () => users.filter((u) => selectedIds.has(u.id)),
    [users, selectedIds]
  );
  const filteredSelected = qs
    ? selectedList.filter((u) => u.name.toLowerCase().includes(qs))
    : selectedList;

  const addCandidates = useMemo(() => {
    if (!qa) return [];
    return users.filter((u) => !selectedIds.has(u.id) && u.name.toLowerCase().includes(qa));
  }, [users, selectedIds, qa]);

  const remove = (id: string) => {
    const next = new Set(selectedIds);
    next.delete(id);
    onChange(next);
  };
  const add = (id: string) => {
    const next = new Set(selectedIds);
    next.add(id);
    onChange(next);
    setSearchAdd("");
  };

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/25 z-[20000]" onClick={onClose} aria-hidden />
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw-2rem,440px)] max-h-[min(85vh,560px)] bg-brand-0 border border-brand-150 rounded-xl shadow-xl z-[20001] flex flex-col overflow-hidden"
        role="dialog"
        aria-labelledby="bulk-participant-title"
      >
        <div className="px-4 py-3 border-b border-brand-150 flex justify-between items-center shrink-0">
          <span id="bulk-participant-title" className="text-sm font-medium text-brand-950">
            Manage participants
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-medium text-brand-950 px-2 py-1 rounded-md hover:bg-brand-100 cursor-pointer"
          >
            Done
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-5 min-h-0">
          <div>
            <div className="text-[10px] font-medium text-brand-950 uppercase tracking-wide mb-1.5">
              Selected ({selectedList.length})
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-brand-200 bg-brand-0 mb-2">
              <Search className="size-3.5 text-brand-400 shrink-0" />
              <input
                type="text"
                value={searchSelected}
                onChange={(e) => setSearchSelected(e.target.value)}
                placeholder="Filter by name..."
                className="flex-1 text-xs bg-transparent text-brand-950 outline-none placeholder:text-brand-400"
              />
            </div>
            <div className="max-h-[220px] overflow-y-auto rounded-lg border border-brand-100 divide-y divide-brand-100">
              {filteredSelected.length === 0 ? (
                <div className="px-3 py-4 text-[11px] text-brand-950 opacity-50 text-center">No matches</div>
              ) : (
                filteredSelected.map((u) => (
                  <div key={u.id} className="flex items-center justify-between gap-2 px-3 py-2">
                    <span className="text-xs text-brand-950 truncate">{u.name}</span>
                    <button
                      type="button"
                      onClick={() => remove(u.id)}
                      className="text-[10px] text-brand-950 px-2 py-0.5 rounded border border-brand-200 hover:bg-brand-50 shrink-0 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-medium text-brand-950 uppercase tracking-wide mb-1.5">Add person</div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-brand-200 bg-brand-0 mb-2">
              <Search className="size-3.5 text-brand-400 shrink-0" />
              <input
                type="text"
                value={searchAdd}
                onChange={(e) => setSearchAdd(e.target.value)}
                placeholder="Search name to add..."
                className="flex-1 text-xs bg-transparent text-brand-950 outline-none placeholder:text-brand-400"
              />
            </div>
            <div className="max-h-[160px] overflow-y-auto rounded-lg border border-brand-100">
              {addCandidates.length === 0 ? (
                <div className="px-3 py-3 text-[11px] text-brand-950 opacity-50 text-center">
                  {qa ? "No people found" : "Type to search"}
                </div>
              ) : (
                addCandidates.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => add(u.id)}
                    className="w-full text-left px-3 py-2 text-xs text-brand-950 hover:bg-brand-50 cursor-pointer border-b border-brand-50 last:border-0"
                  >
                    {u.name}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

/**
 * ParticipantPicker — Group-first participant selection.
 *
 * Flow:
 * 1. Parent form selects a group → passed as `groupId`
 * 2. All members of that group (+ subgroups) are auto-included
 * 3. User can deselect subgroups or individual people
 * 4. "Add person" allows adding from outside the group
 *
 * For direct chats (singleSelect), shows a simple person search.
 */
export function ParticipantPicker({
  selectedIds,
  onChange,
  currentUserId,
  singleSelect,
  groupId,
}: {
  selectedIds: Set<string>;
  onChange: (ids: Set<string>) => void;
  currentUserId: string;
  singleSelect?: boolean;
  groupId?: string;
}) {
  const [groups, setGroups] = useState<GroupWithMembers[]>([]);
  const [allUsers, setAllUsers] = useState<Participant[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showExternal, setShowExternal] = useState(false);
  const [externalSearch, setExternalSearch] = useState("");
  const [deselectedSubgroups, setDeselectedSubgroups] = useState<Set<string>>(new Set());
  const [bulkPickerOpen, setBulkPickerOpen] = useState(false);

  useEffect(() => {
    Promise.all([loadGroupsWithMembers(), loadAvailableUsers()]).then(
      ([g, u]) => {
        setGroups(g);
        setAllUsers(u.map((x) => ({ id: x.id, name: x.name })));
        setLoaded(true);
      }
    );
  }, []);

  const getRelevantGroups = () => {
    if (!groupId) return [];
    return groups.filter((g) => g.id === groupId || g.parentId === groupId);
  };

  // Auto-select group members when group changes
  useEffect(() => {
    if (!loaded || !groupId || singleSelect) return;

    const relevantGroups = getRelevantGroups();
    const memberIds = new Set<string>();
    for (const g of relevantGroups) {
      if (!deselectedSubgroups.has(g.id)) {
        for (const m of g.members) {
          if (m.id !== currentUserId) memberIds.add(m.id);
        }
      }
    }

    // Keep any externally-added people
    for (const id of selectedIds) {
      const isGroupMember = relevantGroups.some((g) => g.members.some((m) => m.id === id));
      if (!isGroupMember) memberIds.add(id);
    }

    onChange(memberIds);
  }, [groupId, loaded, deselectedSubgroups]);

  const otherUsers = allUsers.filter((u) => u.id !== currentUserId);
  const selected = otherUsers.filter((u) => selectedIds.has(u.id));

  // For single select (direct chats)
  if (singleSelect) {
    return <SinglePersonPicker users={otherUsers} selectedIds={selectedIds} onChange={onChange} />;
  }

  // Get subgroups of the selected group
  const parentGroup = groups.find((g) => g.id === groupId);
  const subgroups = groupId
    ? groups.filter((g) => g.parentId === groupId)
    : [];

  const removeUser = (id: string) => {
    const next = new Set(selectedIds);
    next.delete(id);
    onChange(next);
  };

  const addUser = (id: string) => {
    const next = new Set(selectedIds);
    next.add(id);
    onChange(next);
  };

  const toggleSubgroup = (sgId: string) => {
    const next = new Set(deselectedSubgroups);
    if (next.has(sgId)) next.delete(sgId);
    else next.add(sgId);
    setDeselectedSubgroups(next);
  };

  const externalQ = externalSearch.toLowerCase();
  const externalUsers = externalQ
    ? otherUsers.filter((u) => u.name.toLowerCase().includes(externalQ) && !selectedIds.has(u.id))
    : [];

  return (
    <div className="space-y-2">
      <label className="text-[11px] font-medium text-brand-950 uppercase tracking-wide block">
        Participants
      </label>

      {/* Auto-included info */}
      {groupId && parentGroup && (
        <div className="text-[10px] text-brand-950 opacity-60">
          All members of {parentGroup.name} are included ({selected.length} people)
        </div>
      )}

      {/* Subgroup toggles */}
      {subgroups.length > 0 && (
        <div className="space-y-0.5">
          {subgroups.map((sg) => {
            const isIncluded = !deselectedSubgroups.has(sg.id);
            const memberCount = sg.members.filter((m) => m.id !== currentUserId).length;
            return (
              <button
                key={sg.id}
                type="button"
                onClick={() => toggleSubgroup(sg.id)}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] transition-colors cursor-pointer ${
                  isIncluded
                    ? "bg-brand-100 text-brand-950"
                    : "bg-brand-50 text-brand-950 opacity-50"
                }`}
              >
                <span className={`w-3 h-3 rounded border flex items-center justify-center shrink-0 ${
                  isIncluded ? "bg-brand-950 border-brand-950" : "border-brand-300"
                }`}>
                  {isIncluded && (
                    <svg viewBox="0 0 12 12" className="size-2 text-brand-0" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  )}
                </span>
                <span className="flex-1 text-left truncate">{sg.name}</span>
                <span className="text-[9px] opacity-60">{memberCount}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Selected: chips (<30) or summary + searchable manager (≥30) */}
      {selected.length > 0 &&
        (selected.length >= LARGE_LIST_THRESHOLD ? (
          <>
            <div className="flex items-center justify-between gap-2 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2.5">
              <span className="text-xs text-brand-950">
                <strong>{selected.length}</strong> participants selected
              </span>
              <button
                type="button"
                onClick={() => setBulkPickerOpen(true)}
                className="text-xs font-medium text-brand-950 px-2.5 py-1 rounded-md border border-brand-200 bg-brand-0 hover:bg-brand-100 cursor-pointer shrink-0"
              >
                Manage…
              </button>
            </div>
            {bulkPickerOpen && (
              <BulkParticipantPickerModal
                selectedIds={selectedIds}
                onChange={onChange}
                users={otherUsers}
                onClose={() => setBulkPickerOpen(false)}
              />
            )}
          </>
        ) : (
          <div className="flex flex-wrap gap-1">
            {selected.map((u) => (
              <span
                key={u.id}
                className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5 rounded-full bg-brand-100 text-[10px] text-brand-950"
              >
                {u.name}
                <button
                  type="button"
                  onClick={() => removeUser(u.id)}
                  className="p-0.5 rounded-full hover:bg-brand-200 transition-colors cursor-pointer"
                >
                  <X className="size-2" />
                </button>
              </span>
            ))}
          </div>
        ))}

      {/* Add external person */}
      <div>
        <button
          type="button"
          onClick={() => setShowExternal(!showExternal)}
          className="flex items-center gap-1.5 text-[10px] text-brand-950 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        >
          {showExternal ? <ChevronDown className="size-2.5" /> : <ChevronRight className="size-2.5" />}
          <UserPlus className="size-2.5" />
          Add from other groups
        </button>

        {showExternal && (
          <div className="mt-1.5 border border-brand-200 rounded-lg bg-brand-0">
            <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-brand-100">
              <Search className="size-3 text-brand-400 shrink-0" />
              <input
                type="text"
                value={externalSearch}
                onChange={(e) => setExternalSearch(e.target.value)}
                placeholder="Search name..."
                className="flex-1 text-xs bg-transparent text-brand-950 outline-none placeholder:text-brand-400"
                autoFocus
              />
            </div>
            <div className="max-h-28 overflow-y-auto">
              {externalUsers.length > 0 ? externalUsers.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => { addUser(u.id); setExternalSearch(""); }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-brand-950 hover:bg-brand-50 transition-colors cursor-pointer"
                >
                  <span className="truncate">{u.name}</span>
                </button>
              )) : externalQ ? (
                <div className="px-3 py-2 text-[10px] text-brand-950 opacity-40">No results</div>
              ) : (
                <div className="px-3 py-2 text-[10px] text-brand-950 opacity-40">Type a name to search</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Single Person Picker (for direct chats) ───────────────────

function SinglePersonPicker({
  users,
  selectedIds,
  onChange,
}: {
  users: Participant[];
  selectedIds: Set<string>;
  onChange: (ids: Set<string>) => void;
}) {
  const [search, setSearch] = useState("");
  const q = search.toLowerCase();
  const filtered = q ? users.filter((u) => u.name.toLowerCase().includes(q)) : users;
  const selected = users.find((u) => selectedIds.has(u.id));

  return (
    <div>
      <label className="text-[11px] font-medium text-brand-950 uppercase tracking-wide mb-1.5 block">
        Recipient
      </label>

      {selected && (
        <div className="flex items-center gap-2 mb-2 px-2.5 py-1.5 rounded-md bg-brand-100">
          <span className="text-xs text-brand-950 flex-1">{selected.name}</span>
          <button
            type="button"
            onClick={() => onChange(new Set())}
            className="p-0.5 rounded-full hover:bg-brand-200 transition-colors cursor-pointer"
          >
            <X className="size-2.5" />
          </button>
        </div>
      )}

      {!selected && (
        <div className="border border-brand-200 rounded-lg bg-brand-0">
          <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-brand-100">
            <Search className="size-3 text-brand-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search person..."
              className="flex-1 text-xs bg-transparent text-brand-950 outline-none placeholder:text-brand-400"
              autoFocus
            />
          </div>
          <div className="max-h-32 overflow-y-auto">
            {filtered.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => { onChange(new Set([u.id])); setSearch(""); }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-brand-950 hover:bg-brand-50 transition-colors cursor-pointer"
              >
                <span className="truncate">{u.name}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-[10px] text-brand-950 opacity-40">No results</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
