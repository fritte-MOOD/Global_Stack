/*
 * LoginScreen.tsx — Server-Auswahl und Verbindungsanimation (Laptop).
 *
 * Ablauf:
 *   1. "select"     → Nutzer wählt Server aus
 *   2. "connecting"  → Ladescreen: Server verbinden sich nacheinander
 *   3. "done"        → Alle verbunden, "Continue" Button erscheint
 *
 * REIN:  onContinue() — wird aufgerufen wenn der Nutzer auf "Continue" klickt
 * RAUS:  Der komplette Login-Flow als UI
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import { Building2, Dumbbell, Landmark, Check, ArrowRight } from "lucide-react";

type ServerDef = {
  id: string;
  name: string;
  subtitle: string;
  icon: typeof Building2;
  colorVar: string;
};

const SERVERS: ServerDef[] = [
  {
    id: "park-club",
    name: "ParkClub",
    subtitle: "Sports Club",
    icon: Dumbbell,
    colorVar: "var(--color-group-park-club)",
  },
  {
    id: "marin-quarter",
    name: "MarinQuarter",
    subtitle: "Housing Community",
    icon: Building2,
    colorVar: "var(--color-group-marin-quarter)",
  },
  {
    id: "rochefort",
    name: "Rochefort",
    subtitle: "Town",
    icon: Landmark,
    colorVar: "var(--color-group-rochefort)",
  },
];

type ConnectionState = {
  id: string;
  status: "waiting" | "connecting" | "connected";
  latency?: number;
};

type Phase = "select" | "connecting" | "done";

export default function LoginScreen({ onContinue }: { onContinue: () => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set(SERVERS.map(s => s.id)));
  const [phase, setPhase] = useState<Phase>("select");
  const [connections, setConnections] = useState<ConnectionState[]>([]);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }));
      setCurrentDate(now.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleServer = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const startConnecting = useCallback(() => {
    const selectedServers = SERVERS.filter(s => selected.has(s.id));
    setConnections(selectedServers.map(s => ({ id: s.id, status: "waiting" })));
    setPhase("connecting");

    const latencies = [18, 31, 42];
    selectedServers.forEach((server, i) => {
      setTimeout(() => {
        setConnections(prev =>
          prev.map(c => c.id === server.id ? { ...c, status: "connecting" } : c)
        );
      }, i * 800);

      setTimeout(() => {
        setConnections(prev =>
          prev.map(c => c.id === server.id ? { ...c, status: "connected", latency: latencies[i % 3] } : c)
        );
      }, i * 800 + 1200);
    });

    setTimeout(() => {
      setPhase("done");
    }, selectedServers.length * 800 + 1400);
  }, [selected]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-brand-25 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md px-6">

        {/* Uhrzeit */}
        <div className="text-center mb-2">
          <div className="text-5xl font-light text-brand-950 tracking-tight">
            {currentTime}
          </div>
          <div className="text-sm text-brand-950 mt-1">
            {currentDate}
          </div>
        </div>

        {/* ── Phase 1: Server-Auswahl ── */}
        {phase === "select" && (
          <>
            <p className="text-sm text-brand-950 text-center">
              Select your communities for a new session:
            </p>

            <div className="w-full space-y-2">
              {SERVERS.map(server => {
                const isSelected = selected.has(server.id);
                const Icon = server.icon;
                return (
                  <button
                    key={server.id}
                    onClick={() => toggleServer(server.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? "bg-brand-50 border-brand-800 shadow-sm"
                        : "bg-brand-50 border-brand-200 hover:border-brand-800"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: server.colorVar, opacity: isSelected ? 1 : 0.5 }}
                    >
                      <Icon className="size-5 text-white" />
                    </div>

                    <div className="flex-1 text-left">
                      <div className="text-sm font-semibold text-brand-950">{server.name}</div>
                      <div className="text-xs text-brand-950">{server.subtitle}</div>
                    </div>

                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-brand-900 bg-brand-900"
                        : "border-brand-200"
                    }`}>
                      {isSelected && <Check className="size-3 text-brand-50" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={startConnecting}
              disabled={selected.size === 0}
              className={`group relative z-10 flex items-center justify-center gap-2 w-full h-14 px-8 rounded-md text-base font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                selected.size > 0
                  ? "bg-brand-0 border border-brand-800 shadow-md shadow-brand-200 hover:shadow-xl hover:border-transparent hover:ring-2 hover:ring-brand-300 hover:ring-offset-2 hover:ring-offset-brand-25"
                  : "bg-brand-200 border border-brand-200 text-brand-950 cursor-not-allowed"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2 text-brand-900">
                Connect to {selected.size} {selected.size === 1 ? "server" : "servers"}
                <ArrowRight className="size-4 shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-[2px]" />
              </span>
              {selected.size > 0 && (
                <div className="absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-brand-300 opacity-20 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:left-[120%]" />
              )}
            </button>
          </>
        )}

        {/* ── Phase 2 + 3: Verbindung + Continue ── */}
        {(phase === "connecting" || phase === "done") && (
          <>
            <p className="text-sm text-brand-950 text-center">
              {phase === "connecting" ? "Connecting to your communities..." : "All servers connected."}
            </p>

            <div className="w-full space-y-3">
              {connections.map(conn => {
                const server = SERVERS.find(s => s.id === conn.id)!;
                const Icon = server.icon;
                return (
                  <div
                    key={conn.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-brand-200 bg-brand-50 transition-all duration-500"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-opacity duration-500"
                      style={{
                        backgroundColor: server.colorVar,
                        opacity: conn.status === "connected" ? 1 : 0.3,
                      }}
                    >
                      <Icon className="size-5 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="text-sm font-semibold text-brand-950">{server.name}</div>
                      <div className="text-xs text-brand-950">{server.subtitle}</div>
                    </div>

                    <div className="text-right">
                      {conn.status === "waiting" && (
                        <span className="text-xs text-brand-700">Waiting...</span>
                      )}
                      {conn.status === "connecting" && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: server.colorVar }} />
                          <span className="text-xs text-brand-700">Connecting</span>
                        </div>
                      )}
                      {conn.status === "connected" && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-xs text-green-600">{conn.latency}ms</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-full">
              <div className="h-1 bg-brand-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-300 transition-all duration-700 ease-out"
                  style={{
                    width: `${(connections.filter(c => c.status === "connected").length / connections.length) * 100}%`
                  }}
                />
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs text-brand-700">
                  {connections.filter(c => c.status === "connected").length} / {connections.length} connected
                </span>
              </div>
            </div>

            {phase === "done" && (
              <button
                onClick={onContinue}
                className="group relative z-10 flex items-center justify-center gap-2 w-full h-14 px-8 rounded-md text-base font-medium whitespace-nowrap bg-brand-0 border border-brand-800 shadow-md shadow-brand-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-transparent hover:ring-2 hover:ring-brand-300 hover:ring-offset-2 hover:ring-offset-brand-25"
              >
                <span className="relative z-10 flex items-center gap-2 text-brand-900">
                  Continue
                  <ArrowRight className="size-4 shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-[2px]" />
                </span>
                <div className="absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-brand-300 opacity-20 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:left-[120%]" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}