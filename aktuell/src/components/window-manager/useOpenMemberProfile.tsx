"use client";

import { useCallback } from "react";
import { useWindowManager } from "./logic/WindowManager";
import { MemberProfileContent } from "./windows/MembersWindow";

/** Opens the standard member profile window (use for any clickable person name). */
export function useOpenMemberProfile() {
  const { openNewInstance } = useWindowManager();

  return useCallback(
    (userId: string, displayName: string) => {
      if (!userId) return;
      openNewInstance(`member-profile-${userId}`, {
        title: displayName,
        body: <MemberProfileContent userId={userId} userName={displayName} />,
        width: 420,
        height: 520,
        resizable: true,
        centered: true,
      });
    },
    [openNewInstance]
  );
}
