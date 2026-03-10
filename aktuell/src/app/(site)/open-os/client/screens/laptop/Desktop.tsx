"use client";

import { useEffect, useState } from "react";
import { Desktop as SharedDesktop, type DesktopGroup } from "@/components/desktop";
import { loadDemoData } from "../../../_actions/load-demo-data";

const SERVER_SLUGS = ["park-club", "marin-quarter", "rochefort"];

export default function DemoDesktop() {
  const [groups, setGroups] = useState<DesktopGroup[]>([]);

  useEffect(() => {
    loadDemoData(SERVER_SLUGS).then((data) => {
      setGroups(data.groups);
    });
  }, []);

  return <SharedDesktop mode="demo" groups={groups} />;
}
