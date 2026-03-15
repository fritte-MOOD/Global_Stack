"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type GroupInfo = { id: string; name: string; color: string; depth: number; parentId: string | null };

type SetStateAction<T> = T | ((prev: T) => T);

type GroupFilterCtx = {
  selectedGroupIds: Set<string>;
  allGroups: GroupInfo[];
  currentUserId: string;
  setSelectedGroupIds: (action: SetStateAction<Set<string>>) => void;
  setAllGroups: (groups: GroupInfo[]) => void;
  setCurrentUserId: (id: string) => void;
};

const Ctx = createContext<GroupFilterCtx>({
  selectedGroupIds: new Set(),
  allGroups: [],
  currentUserId: "",
  setSelectedGroupIds: () => {},
  setAllGroups: () => {},
  setCurrentUserId: () => {},
});

export function useGroupFilter() {
  return useContext(Ctx);
}

export function GroupFilterProvider({ children }: { children: ReactNode }) {
  const [selectedGroupIds, setSelectedGroupIds] = useState<Set<string>>(new Set());
  const [allGroups, setAllGroups] = useState<GroupInfo[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");

  const stableSetGroups = useCallback((groups: GroupInfo[]) => setAllGroups(groups), []);
  const stableSetUserId = useCallback((id: string) => setCurrentUserId(id), []);

  return (
    <Ctx.Provider
      value={{
        selectedGroupIds,
        allGroups,
        currentUserId,
        setSelectedGroupIds,
        setAllGroups: stableSetGroups,
        setCurrentUserId: stableSetUserId,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
