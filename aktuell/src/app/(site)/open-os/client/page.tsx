"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import DeviceSwitcher from "@/components/ui/DeviceSwitcher";
import LaptopScreen from "./screens/laptop/index";
import TabletScreen from "./screens/tablet";
import MobileScreen from "./screens/mobile";

type Device = "laptop" | "tablet" | "mobile";

export default function OpenOSClientPage() {
  const [device, setDevice] = useState<Device>("laptop");
  const [navCenter, setNavCenter] = useState<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const screenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const el = document.getElementById("navbar-center");
    if (el) setNavCenter(el);
  }, []);

  const enterFullscreen = useCallback(() => {
    const el = screenRef.current;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    }
  }, []);

  return (
    <>
      {mounted && navCenter && createPortal(
        <DeviceSwitcher value={device} onChange={setDevice} onFullscreen={enterFullscreen} />,
        navCenter,
      )}

      <div className="flex items-center justify-center p-3" style={{ height: "calc(100vh - 3.5rem)" }}>

        {device === "laptop" && (
          <div className="w-full h-full flex flex-col items-center justify-center" style={{ maxWidth: 1100 }}>
            <div className="relative w-full flex-1 flex flex-col min-h-0">
              <div className="rounded-t-lg border-[3px] border-b-0 border-device-frame bg-device-frame pt-1 px-[3px] flex-1 flex flex-col min-h-0">
                <div className="flex justify-center pb-1 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-700/30" />
                </div>
                <div ref={screenRef} className="bg-brand-50 overflow-hidden flex-1 min-h-0">
                  <LaptopScreen />
                </div>
              </div>
              <div className="shrink-0 -mx-10">
                <div className="h-10 bg-device-frame rounded-b-xl flex items-center justify-center">
                  <div className="w-28 h-1 rounded-full bg-device-trackpad" />
                </div>
              </div>
            </div>
          </div>
        )}

        {device === "tablet" && (
          <div className="h-full flex items-center justify-center">
            <div className="rounded-2xl border-[4px] border-device-frame bg-device-frame p-1 flex flex-col" style={{ height: "100%", aspectRatio: "4/3" }}>
              <div className="flex justify-center py-1 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-700/40" />
              </div>
              <div ref={screenRef} className="rounded-xl bg-brand-50 overflow-hidden flex-1 min-h-0">
                <TabletScreen />
              </div>
              <div className="flex justify-center py-2 shrink-0">
                <div className="w-8 h-1 rounded-full bg-brand-700/30" />
              </div>
            </div>
          </div>
        )}

        {device === "mobile" && (
          <div className="h-full flex items-center justify-center">
            <div className="rounded-[2rem] border-[4px] border-device-frame bg-device-frame p-1 flex flex-col" style={{ height: "100%", aspectRatio: "9/19" }}>
              <div className="flex justify-center py-1.5 shrink-0">
                <div className="w-20 h-4 rounded-full bg-brand-800" />
              </div>
              <div ref={screenRef} className="rounded-2xl bg-brand-50 overflow-hidden flex-1 min-h-0">
                <MobileScreen />
              </div>
              <div className="flex justify-center py-2 shrink-0">
                <div className="w-24 h-1 rounded-full bg-brand-700/30" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}