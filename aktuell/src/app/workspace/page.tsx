"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import { User } from "lucide-react";
import { Desktop, type DesktopGroup, type DesktopUser } from "@/components/desktop";
import { useWindowManager } from "@/components/window-manager/logic/WindowManager";
import { loadUserData } from "./_actions/load-user-data";
import { logout } from "./_actions/auth";

export default function WorkspacePage() {
  const [groups, setGroups] = useState<DesktopGroup[]>([]);
  const [user, setUser] = useState<DesktopUser | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setContainer, openWindow } = useWindowManager();
  const [, startTransition] = useTransition();

  useEffect(() => {
    setContainer(containerRef.current);
    return () => setContainer(null);
  }, [setContainer]);

  useEffect(() => {
    loadUserData().then((data) => {
      setUser(data.user);
      setGroups(data.groups);
    });
  }, []);

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  const handleOpenCommunities = () => {
    openWindow("communities", {
      title: "Server",
      body: <CommunitiesWindowContent groups={groups} />,
      width: 400,
      height: 350,
      resizable: true,
    });
  };

  const handleOpenAccount = () => {
    openWindow("account", {
      title: "Account",
      body: <AccountWindowContent user={user} />,
      width: 380,
      height: 300,
      resizable: true,
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <Desktop
        mode="workspace"
        groups={groups}
        user={user}
        onLogout={handleLogout}
        onOpenCommunities={handleOpenCommunities}
        onOpenAccount={handleOpenAccount}
        onOpenSettings={() => {}}
      />
    </div>
  );
}

function CommunitiesWindowContent({ groups }: { groups: DesktopGroup[] }) {
  return (
    <div className="p-4 space-y-4">
      <div className="text-sm text-brand-950 mb-2">
        Your communities ({groups.length})
      </div>
      <div className="space-y-2">
        {groups.filter(g => g.parentId === null).map((g) => (
          <div
            key={g.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-brand-200 bg-brand-25"
          >
            <span className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: g.color }} />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-brand-950 truncate">{g.name}</div>
              <div className="text-xs text-brand-950">{g.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full py-2 px-4 text-sm font-medium text-brand-950 border border-dashed border-brand-200 rounded-lg hover:bg-brand-50 transition-colors cursor-pointer">
        + Join or Create Community
      </button>
    </div>
  );
}

function AccountWindowContent({ user }: { user: DesktopUser | null }) {
  if (!user) {
    return (
      <div className="p-4 text-sm text-brand-950">
        Not logged in
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-brand-200 flex items-center justify-center">
          <User className="size-8 text-brand-950" />
        </div>
        <div>
          <div className="font-medium text-lg text-brand-950">{user.name}</div>
          <div className="text-sm text-brand-950">@{user.username}</div>
          {user.isDemo && (
            <span className="inline-block mt-1 text-xs bg-brand-200 text-brand-950 px-2 py-0.5 rounded">
              Demo Account
            </span>
          )}
        </div>
      </div>
      <div className="border-t border-brand-100 pt-4 space-y-3">
        <button className="w-full py-2 px-4 text-sm font-medium text-brand-950 border border-brand-200 rounded-lg hover:bg-brand-50 transition-colors cursor-pointer text-left">
          Edit Profile
        </button>
        <button className="w-full py-2 px-4 text-sm font-medium text-brand-950 border border-brand-200 rounded-lg hover:bg-brand-50 transition-colors cursor-pointer text-left">
          Change Password
        </button>
      </div>
    </div>
  );
}
