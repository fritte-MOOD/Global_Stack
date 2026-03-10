/*
 * Laptop Screen — Steuert den Ablauf im Laptop-Bildschirm.
 *
 * Flow:
 *   1. LoginScreen (Server-Auswahl → Verbindung → Continue)
 *   2. Desktop (Uhrzeit + App-Launcher)
 */

"use client";

import { useState } from "react";
import LoginScreen from "./LoginScreen";
import Desktop from "./Desktop";

type Screen = "login" | "desktop";

export default function LaptopScreen() {
  const [screen, setScreen] = useState<Screen>("login");

  if (screen === "login") {
    return <LoginScreen onContinue={() => setScreen("desktop")} />;
  }

  return <Desktop />;
}