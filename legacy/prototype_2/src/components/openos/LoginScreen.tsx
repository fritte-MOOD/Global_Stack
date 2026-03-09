"use client";

import { useEffect, useState } from "react";

/* ═══════════════════════════════════════════
   Server definitions (MOOD communities)
   ═══════════════════════════════════════════ */

type Server = {
  id: string;
  name: string;
  location: string;
  status: "connecting" | "connected" | "error";
  latency?: number;
};

const SERVERS: Omit<Server, "status" | "latency">[] = [
  { id: "marin", name: "Marin Quarter", location: "Berlin" },
  { id: "sportclub", name: "Sportclub", location: "Hamburg" },
  { id: "rochefort", name: "Rochefort", location: "Paris" },
];

type LoginScreenProps = {
  onConnected: () => void;
};

export default function LoginScreen({ onConnected }: LoginScreenProps) {
  const [servers, setServers] = useState<Server[]>(
    SERVERS.map(s => ({ ...s, status: "connecting" as const }))
  );
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

  useEffect(() => {
    const delays = [1200, 2400, 3800];
    const latencies = [24, 31, 48];

    SERVERS.forEach((server, i) => {
      setTimeout(() => {
        setServers(prev =>
          prev.map(s =>
            s.id === server.id
              ? { ...s, status: "connected", latency: latencies[i] }
              : s
          )
        );
      }, delays[i]);
    });
  }, []);

  const allConnected = servers.every(s => s.status === "connected");

  return (
    <div className="h-full flex flex-col items-center justify-center bg-brand-900 p-8 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle, var(--brand-50) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Time display */}
      <div className="text-center mb-12 relative z-10">
        <div className="text-6xl font-light text-brand-50 tracking-tight mb-2">
          {currentTime}
        </div>
        <div className="text-lg text-brand-400">
          {currentDate}
        </div>
      </div>

      {/* OpenOS Logo */}
      <div className="mb-8 relative z-10">
        <div className="w-20 h-20 rounded-2xl bg-brand-800 border border-brand-700 flex items-center justify-center shadow-2xl">
          <svg className="w-10 h-10 text-brand-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 3v4M12 17v4M3 12h4M17 12h4"/>
          </svg>
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-brand-50 mb-2 relative z-10">OpenOS</h1>
      <p className="text-sm text-brand-400 mb-10 relative z-10">Connecting to community servers...</p>

      {/* Server connection status */}
      <div className="w-full max-w-sm space-y-3 relative z-10">
        {servers.map(server => (
          <div
            key={server.id}
            className="flex items-center gap-4 p-4 bg-brand-800/50 backdrop-blur-sm rounded-xl border border-brand-700/50"
          >
            {/* Status indicator */}
            <div className="relative">
              {server.status === "connecting" ? (
                <div className="w-3 h-3 rounded-full bg-brand-400 animate-pulse" />
              ) : server.status === "connected" ? (
                <div className="w-3 h-3 rounded-full bg-green-400" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-red-400" />
              )}
            </div>

            {/* Server info */}
            <div className="flex-1">
              <div className="text-sm font-medium text-brand-50">{server.name}</div>
              <div className="text-xs text-brand-500">{server.location}</div>
            </div>

            {/* Status text */}
            <div className="text-right">
              {server.status === "connecting" ? (
                <span className="text-xs text-brand-400">Connecting...</span>
              ) : server.status === "connected" ? (
                <span className="text-xs text-green-400">{server.latency}ms</span>
              ) : (
                <span className="text-xs text-red-400">Failed</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Connection progress */}
      <div className="w-full max-w-sm mt-8 relative z-10">
        <div className="h-1 bg-brand-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-300 transition-all duration-500 ease-out"
            style={{ width: `${(servers.filter(s => s.status === "connected").length / servers.length) * 100}%` }}
          />
        </div>
        <div className="mt-3 text-center">
          <span className="text-xs text-brand-500">
            {servers.filter(s => s.status === "connected").length} of {servers.length} servers connected
          </span>
        </div>
      </div>

      {/* Enter button - only shown when all connected */}
      <div className="mt-10 relative z-10">
        {allConnected ? (
          <button
            onClick={onConnected}
            className="px-8 py-3 bg-brand-300 hover:bg-brand-200 text-brand-900 rounded-xl font-medium transition-colors shadow-lg"
          >
            Enter Personal Space
          </button>
        ) : (
          <div className="px-8 py-3 bg-brand-800 text-brand-500 rounded-xl font-medium cursor-not-allowed">
            Waiting for connections...
          </div>
        )}
      </div>
    </div>
  );
}
