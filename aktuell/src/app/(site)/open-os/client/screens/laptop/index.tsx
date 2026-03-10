/*
 * Laptop Screen — Steuert den Ablauf im Laptop-Bildschirm.
 *
 * Setzt sich als Container für den WindowManager, damit Fenster
 * innerhalb des Laptop-Displays bleiben und nicht darüber hinauslaufen.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { useWindowManager } from "@/components/window-manager/logic/WindowManager";
import LoginScreen from "./LoginScreen";
import Desktop from "./Desktop";

type Screen = "login" | "desktop";

export default function LaptopScreen() {
  const [screen, setScreen] = useState<Screen>("login");
  const containerRef = useRef<HTMLDivElement>(null);
  const { setContainer } = useWindowManager();

  useEffect(() => {
    setContainer(containerRef.current);
    return () => setContainer(null);
  }, [setContainer]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {screen === "login" ? (
        <LoginScreen onContinue={() => setScreen("desktop")} />
      ) : (
        <Desktop />
      )}
    </div>
  );
}