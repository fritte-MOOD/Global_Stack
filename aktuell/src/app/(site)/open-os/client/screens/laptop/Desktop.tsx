"use client";

import { useEffect, useState } from "react";
import { Desktop as SharedDesktop, type DesktopGroup, type DesktopUser } from "@/components/desktop";
import { loadDemoData } from "../../../_actions/load-demo-data";

const SERVER_SLUGS = ["sportclub", "marin-quarter", "rochefort"];

export default function DemoDesktop() {
  const [groups, setGroups] = useState<DesktopGroup[]>([]);
  const [user, setUser] = useState<DesktopUser | null>(null);

  useEffect(() => {
    loadDemoData(SERVER_SLUGS).then((data) => {
      setGroups(data.groups);
      if (data.user) {
        setUser({ id: data.user.id, name: data.user.name, username: data.user.username, isDemo: true });
      }
    });
  }, []);

  return <SharedDesktop mode="demo" groups={groups} user={user} />;
}
