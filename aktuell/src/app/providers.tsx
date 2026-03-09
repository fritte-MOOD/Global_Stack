"use client";

import { WindowManagerProvider } from "@/components/window-manager";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WindowManagerProvider>
      {children}
    </WindowManagerProvider>
  );
}
