"use client";

import { createContext, useContext, type ReactNode } from "react";

type GroupFilterCtx = {
  selectedGroupIds: Set<string>;
  allGroups: { id: string; name: string; color: string; depth: number; parentId: string | null }[];
};

const Ctx = createContext<GroupFilterCtx>({
  selectedGroupIds: new Set(),
  allGroups: [],
});

export function useGroupFilter() {
  return useContext(Ctx);
}

export function GroupFilterProvider({
  selectedGroupIds,
  allGroups,
  children,
}: GroupFilterCtx & { children: ReactNode }) {
  return (
    <Ctx.Provider value={{ selectedGroupIds, allGroups }}>
      {children}
    </Ctx.Provider>
  );
}
