"use client";

import { WindowManagerProvider } from "@/components/window-manager";
import { GroupFilterProvider } from "@/components/desktop/GroupFilterContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <GroupFilterProvider>
      <WindowManagerProvider>
        {children}
      </WindowManagerProvider>
    </GroupFilterProvider>
  );
}
