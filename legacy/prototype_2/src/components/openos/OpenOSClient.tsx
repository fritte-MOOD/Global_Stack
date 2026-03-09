"use client";

import { useState } from "react";
import { WindowManagerProvider } from "@/components/WindowManager";
import Navigation from "@/components/Navigation";
import DarkModeToggle from "@/components/DarkModeToggle";
import LoginScreen from "./LoginScreen";
import DesktopView from "./DesktopView";
import MobileView from "./MobileView";
import Link from "next/link";

type DeviceType = "laptop" | "mobile";

export default function OpenOSClient() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [device, setDevice] = useState<DeviceType>("laptop");

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Custom Navigation with Back + Device Switcher */}
      <nav className="h-14 bg-brand-50/90 backdrop-blur-sm border-b border-brand-200 shrink-0 z-40">
        <div className="max-w-full mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Left: Logo + Back */}
            <div className="flex items-center gap-4">
              <Link href="/" className="text-lg font-bold text-brand-900">
                <span className="text-brand-300">/</span>
                Global Stack
              </Link>
              <Link
                href="/open-os"
                className="text-sm text-brand-600 hover:text-brand-900 transition-colors"
              >
                ← Back
              </Link>
            </div>

            {/* Right: Device Switcher + DarkMode */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-brand-100 rounded-lg p-1">
                <button
                  onClick={() => setDevice("laptop")}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    device === "laptop"
                      ? "bg-brand-50 text-brand-900 shadow-sm"
                      : "text-brand-600 hover:text-brand-900"
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <path d="M2 17h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z"/>
                  </svg>
                  Laptop
                </button>
                <button
                  onClick={() => setDevice("mobile")}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    device === "mobile"
                      ? "bg-brand-50 text-brand-900 shadow-sm"
                      : "text-brand-600 hover:text-brand-900"
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2"/>
                    <path d="M12 18h.01"/>
                  </svg>
                  Mobile
                </button>
              </div>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Content area - full remaining height */}
      <div className="flex-1 bg-brand-100 overflow-hidden">
        {device === "laptop" ? (
          /* Laptop - full width, no frame */
          <div className="h-full">
            {loggedIn ? (
              <WindowManagerProvider>
                <DesktopView />
              </WindowManagerProvider>
            ) : (
              <LoginScreen onConnected={() => setLoggedIn(true)} />
            )}
          </div>
        ) : (
          /* Mobile - centered phone frame */
          <div className="h-full flex items-center justify-center p-4">
            <div className="w-80 h-full max-h-[700px] bg-brand-800 rounded-[40px] p-2 shadow-2xl border-4 border-brand-700">
              <div className="h-full bg-brand-900 rounded-[32px] overflow-hidden">
                {loggedIn ? (
                  <MobileView />
                ) : (
                  <LoginScreen onConnected={() => setLoggedIn(true)} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
