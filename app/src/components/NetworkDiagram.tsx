"use client";

import Link from "next/link";
import { HoverMenuProvider, useHoverMenu, type HoverMenuItem } from "./HoverMenu";
import { WindowManagerProvider } from "./WindowManager";

const b = (token: string) => `var(--color-brand-${token})`;

/* ── Device Preview Component (large with OS UI) ── */
const DevicePreview = () => (
  <div className="mt-3">
    {/* Laptop on top */}
    <div className="mb-3">
      <div className="border border-brand-700 rounded-md bg-brand-900 p-2" style={{ width: '220px', height: '130px' }}>
        {/* Window bar */}
        <div className="flex items-center gap-1 mb-2 bg-brand-800 rounded px-2 py-1">
          <div className="w-2 h-2 rounded-full bg-brand-700"></div>
          <div className="w-2 h-2 rounded-full bg-brand-700"></div>
          <div className="w-2 h-2 rounded-full bg-brand-700"></div>
          <span className="text-[8px] text-brand-200 ml-2">Global Stack Desktop</span>
        </div>
        {/* Desktop icons */}
        <div className="grid grid-cols-5 gap-2">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-brand-600 rounded flex items-center justify-center text-[8px]">📁</div>
            <span className="text-[6px] text-brand-200 mt-0.5">Files</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-brand-600 rounded flex items-center justify-center text-[8px]">💬</div>
            <span className="text-[6px] text-brand-200 mt-0.5">MOOD</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-brand-600 rounded flex items-center justify-center text-[8px]">🤖</div>
            <span className="text-[6px] text-brand-200 mt-0.5">AI</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-brand-600 rounded flex items-center justify-center text-[8px]">⚙️</div>
            <span className="text-[6px] text-brand-200 mt-0.5">Settings</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-brand-600 rounded flex items-center justify-center text-[8px]">🌐</div>
            <span className="text-[6px] text-brand-200 mt-0.5">Browser</span>
          </div>
        </div>
      </div>
      <div className="w-[230px] h-2 bg-brand-700 rounded-b-md mx-auto"></div>
    </div>
    
    {/* Tablet and Phone side by side */}
    <div className="flex gap-3">
      {/* Tablet */}
      <div className="border border-brand-700 rounded-lg bg-brand-900 p-2" style={{ width: '100px', height: '140px' }}>
        <div className="text-[7px] text-brand-200 text-center mb-2">Global Stack</div>
        <div className="grid grid-cols-3 gap-1">
          <div className="bg-brand-700 rounded p-1 text-center">
            <div className="text-[10px]">📁</div>
            <div className="text-[5px] text-brand-200">Files</div>
          </div>
          <div className="bg-brand-700 rounded p-1 text-center">
            <div className="text-[10px]">💬</div>
            <div className="text-[5px] text-brand-200">MOOD</div>
          </div>
          <div className="bg-brand-700 rounded p-1 text-center">
            <div className="text-[10px]">🤖</div>
            <div className="text-[5px] text-brand-200">AI</div>
          </div>
          <div className="bg-brand-700 rounded p-1 text-center">
            <div className="text-[10px]">📷</div>
            <div className="text-[5px] text-brand-200">Photos</div>
          </div>
          <div className="bg-brand-700 rounded p-1 text-center">
            <div className="text-[10px]">🎵</div>
            <div className="text-[5px] text-brand-200">Music</div>
          </div>
          <div className="bg-brand-700 rounded p-1 text-center">
            <div className="text-[10px]">⚙️</div>
            <div className="text-[5px] text-brand-200">Settings</div>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <div className="w-6 h-6 border border-brand-700 rounded-full"></div>
        </div>
      </div>
      
      {/* Phone */}
      <div className="border border-brand-700 rounded-xl bg-brand-900 p-1.5" style={{ width: '60px', height: '120px' }}>
        <div className="w-8 h-1 bg-brand-700 rounded-full mx-auto mb-1"></div>
        <div className="text-[6px] text-brand-200 text-center mb-1">Global Stack</div>
        <div className="space-y-1">
          <div className="bg-brand-700 rounded p-0.5 flex items-center gap-1">
            <span className="text-[8px]">📁</span>
            <span className="text-[5px] text-brand-200">Files</span>
          </div>
          <div className="bg-brand-700 rounded p-0.5 flex items-center gap-1">
            <span className="text-[8px]">💬</span>
            <span className="text-[5px] text-brand-200">MOOD</span>
          </div>
          <div className="bg-brand-700 rounded p-0.5 flex items-center gap-1">
            <span className="text-[8px]">🤖</span>
            <span className="text-[5px] text-brand-200">AI</span>
          </div>
          <div className="bg-brand-700 rounded p-0.5 flex items-center gap-1">
            <span className="text-[8px]">⚙️</span>
            <span className="text-[5px] text-brand-200">Settings</span>
          </div>
        </div>
        <div className="w-6 h-1 bg-brand-700 rounded-full mx-auto mt-2"></div>
      </div>
    </div>
  </div>
);

/* ── Menu items ── */

const ITEMS: Record<string, HoverMenuItem> = {
  server: {
    title: "Server Hardware",
    body: "Share one powerful computer as a large group to save resources and money. No need for everyone to buy their own high-end PC, AI subscription, and cloud storage.",
  },
  openos: {
    title: "Open OS",
    body: (
      <>
        <p>A NixOS-based operating system managing all server resources. Reproducible, declarative, and fully configurable.</p>
        <Link href="/open-os" className="mt-2 inline-flex items-center gap-1 text-brand-700 hover:text-brand-900 font-medium">
          Explore Open OS &rarr;
        </Link>
      </>
    ),
  },
  mood: {
    title: "MOOD — Deliberation",
    body: (
      <>
        <p>Structured decision-making for groups. Collect ideas, debate, estimate consequences, prioritize, and vote.</p>
        <Link href="/mood" className="mt-2 inline-flex items-center gap-1 text-brand-700 hover:text-brand-900 font-medium">
          Explore MOOD &rarr;
        </Link>
      </>
    ),
  },
  ai: {
    title: "AI Server",
    body: "AI models run locally on your server. No external API calls, no data leaving your network. Private, fast, and without recurring subscription costs.",
  },
  data: {
    title: "Data",
    body: "All files, databases, and user data live on your own hardware. No third-party cloud providers, no monthly fees. Your data stays yours.",
  },
  cloud: {
    title: "Cloud Computing",
    body: "Your server provides cloud-like services to all connected devices. Compute on demand, accessible from anywhere — but you own the infrastructure.",
  },
  internet: {
    title: "Internet Connection",
    body: "Secure connections over the internet. All traffic is end-to-end encrypted using VPN or TOR. Access your server from anywhere in the world.",
  },
  alex: {
    title: "Alex",
    body: (
      <>
        <p>Each user accesses their personal workspace from any device. All data syncs seamlessly.</p>
        <DevicePreview />
      </>
    ),
  },
  sam: {
    title: "Sam",
    body: (
      <>
        <p>Each user accesses their personal workspace from any device. All data syncs seamlessly.</p>
        <DevicePreview />
      </>
    ),
  },
  robin: {
    title: "Robin",
    body: (
      <>
        <p>Each user accesses their personal workspace from any device. All data syncs seamlessly.</p>
        <DevicePreview />
      </>
    ),
  },
};

/* ── SVG styles ── */

const STYLES = `
  .nd-zone { cursor: pointer; }

  .nd-rack { transition: filter .3s ease; }
  .nd-rack.nd-active { filter: drop-shadow(0 0 8px ${b("200")}); }

  .nd-os > rect:first-child { transition: stroke-width .3s ease; }
  .nd-os.nd-active > rect:first-child { stroke-width: 2; }

  .nd-svc > rect:first-child { transition: fill .2s ease, stroke-width .2s ease; }
  .nd-svc.nd-active > rect:first-child { fill: ${b("100")}; stroke-width: 1.8; }
  .nd-svc > text { transition: fill .2s ease; }
  .nd-svc.nd-active > text { fill: ${b("900")}; }

  .nd-cloud { transition: opacity .2s ease; }
  .nd-cloud.nd-active { opacity: 0.8; }

  .nd-user { transition: filter .3s ease; }
  .nd-user.nd-active { filter: drop-shadow(0 0 8px ${b("200")}); }

  .nd-conn > path.nd-visible { transition: stroke .2s ease, stroke-width .2s ease; }
  .nd-conn.nd-active > path.nd-visible { stroke: ${b("600")}; stroke-width: 2.2; }
`;

const LINE_PROPS = {
  stroke: b("700"),
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  fill: "none",
};

/* ── Helpers ── */

function ServiceBox({
  x, y, w, h, label, id,
}: {
  x: number; y: number; w: number; h: number; label: string; id: string;
}) {
  const { bind, isHovered, isPinned } = useHoverMenu();
  const isActive = isHovered(id) || isPinned(id);
  return (
    <g className={`nd-svc nd-zone ${isActive ? "nd-active" : ""}`} {...bind(id)}>
      <rect x={x} y={y} width={w} height={h} rx={4} fill="transparent" stroke={b("800")} strokeWidth={1} />
      <text
        x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fill={b("950")}
        style={{ fontSize: 11, fontFamily: "var(--font-sans)" }}
      >{label}</text>
    </g>
  );
}

/* ── Inner SVG ── */

function DiagramSVG() {
  const { bind, isHovered, isPinned } = useHoverMenu();

  const act = (id: string) => (isHovered(id) || isPinned(id) ? "nd-active" : "");

  // Server rack dimensions (top-down perspective)
  const rackX = 20;
  const rackY = 60;
  const rackW = 260;
  const rackH = 320;
  const depth = 25; // 3D depth for top

  // OS overlay position
  const osX = 40;
  const osY = 100;
  const osW = 220;
  const osH = 200;

  // Service boxes
  const svcX = 55;
  const svcW = 190;
  const svcH = 32;

  // Cloud position
  const cloudX = 420;
  const cloudY = 230;

  // User positions (more spread out)
  const users = [
    { id: "alex", x: 620, y: 70, label: "Alex" },
    { id: "sam", x: 680, y: 230, label: "Sam" },
    { id: "robin", x: 620, y: 390, label: "Robin" },
  ];

  return (
    <svg
      viewBox="0 0 820 480"
      className="w-full max-w-4xl mx-auto"
      role="img"
      aria-label="Network architecture: server running Open OS connected via internet to multiple users"
    >
      <defs><style>{STYLES}</style></defs>

      {/* ── Connection: Server to Cloud ── */}
      <g className={`nd-conn ${act("internet")}`} {...bind("internet")}>
        <path 
          d={`M${rackX + rackW},${cloudY} L${cloudX - 55},${cloudY}`} 
          className="nd-visible" {...LINE_PROPS} 
        />
        <path 
          d={`M${rackX + rackW},${cloudY} L${cloudX - 55},${cloudY}`} 
          stroke="transparent" strokeWidth={20} fill="none" 
        />
      </g>

      {/* ── Connections: Cloud to Users ── */}
      {users.map((user, i) => (
        <g key={user.id} className={`nd-conn ${act("internet")}`} {...bind("internet")}>
          <path 
            d={`M${cloudX + 55},${cloudY + (i - 1) * 40} C${cloudX + 100},${cloudY + (i - 1) * 40} ${user.x - 80},${user.y} ${user.x - 50},${user.y}`}
            className="nd-visible" 
            {...LINE_PROPS}
          />
          <path 
            d={`M${cloudX + 55},${cloudY + (i - 1) * 40} C${cloudX + 100},${cloudY + (i - 1) * 40} ${user.x - 80},${user.y} ${user.x - 50},${user.y}`}
            stroke="transparent" strokeWidth={20} fill="none"
          />
        </g>
      ))}

      {/* ── Internet Cloud ── */}
      <g className={`nd-cloud nd-zone ${act("internet")}`} {...bind("internet")}>
        <ellipse cx={cloudX} cy={cloudY} rx={50} ry={32} fill={b("50")} stroke={b("700")} strokeWidth={1.5} />
        <ellipse cx={cloudX - 30} cy={cloudY - 8} rx={28} ry={20} fill={b("50")} stroke={b("700")} strokeWidth={1.5} />
        <ellipse cx={cloudX + 30} cy={cloudY - 8} rx={28} ry={20} fill={b("50")} stroke={b("700")} strokeWidth={1.5} />
        <ellipse cx={cloudX - 20} cy={cloudY + 12} rx={22} ry={16} fill={b("50")} stroke={b("700")} strokeWidth={1.5} />
        <ellipse cx={cloudX + 20} cy={cloudY + 12} rx={22} ry={16} fill={b("50")} stroke={b("700")} strokeWidth={1.5} />
        <ellipse cx={cloudX} cy={cloudY} rx={40} ry={25} fill={b("50")} />
        <text x={cloudX} y={cloudY + 5} textAnchor="middle" fill={b("700")} 
          style={{ fontSize: 11, fontWeight: 500, fontFamily: "var(--font-sans)" }}>
          Internet
        </text>
      </g>

      {/* ── 3D Server Rack (top-down view) ── */}
      <g className={`nd-rack nd-zone ${act("server")}`} {...bind("server")}>
        {/* Top face (trapezoid - both top edges go inward) */}
        <polygon 
          points={`${rackX + depth},${rackY - depth} ${rackX + rackW - depth},${rackY - depth} ${rackX + rackW},${rackY} ${rackX},${rackY}`}
          fill={b("100")} stroke={b("900")} strokeWidth={1.5}
        />
        {/* Front face */}
        <rect x={rackX} y={rackY} width={rackW} height={rackH} rx={4}
          fill={b("50")} stroke={b("900")} strokeWidth={2}
        />
        
        {/* Server modules (rack units) */}
        {[0, 1, 2, 3, 4, 5, 6].map(i => {
          const moduleY = rackY + 12 + i * 42;
          const moduleH = 36;
          return (
            <g key={i}>
              <rect x={rackX + 8} y={moduleY} width={rackW - 16} height={moduleH} rx={3}
                fill={b("100")} stroke={b("800")} strokeWidth={1}
              />
              {/* LEDs */}
              <circle cx={rackX + 22} cy={moduleY + moduleH/2} r={3} fill={b("700")} />
              <circle cx={rackX + 36} cy={moduleY + moduleH/2} r={2} fill={b("700")} opacity={0.5} />
              {/* Vents */}
              {[0, 10, 20, 30, 40, 50].map(dx => (
                <line key={dx} x1={rackX + 55 + dx} y1={moduleY + 6} x2={rackX + 55 + dx} y2={moduleY + moduleH - 6}
                  stroke={b("200")} strokeWidth={1}
                />
              ))}
              {/* Handle */}
              <rect x={rackX + rackW - 40} y={moduleY + moduleH/2 - 4} width={24} height={8} rx={2}
                fill="none" stroke={b("700")} strokeWidth={1}
              />
            </g>
          );
        })}
        
        {/* Rack label */}
        <text x={rackX + rackW/2} y={rackY + rackH + 20} textAnchor="middle" fill={b("900")}
          style={{ fontSize: 10, fontWeight: 600, fontFamily: "var(--font-sans)", letterSpacing: "0.05em" }}>
          Community-Server
        </text>
      </g>

      {/* ── Open OS (overlaying rack) ── */}
      <g className={`nd-os nd-zone ${act("openos")}`} {...bind("openos")}>
        <rect x={osX} y={osY} width={osW} height={osH} rx={6}
          fill={b("25")} stroke={b("900")} strokeWidth={1.5} fillOpacity={0.95}
        />
        <text x={osX + osW/2} y={osY + 20} textAnchor="middle" fill={b("900")}
          style={{ fontSize: 13, fontWeight: 600, fontFamily: "var(--font-heading)" }}>
          Open OS
        </text>
        <line x1={osX + 12} y1={osY + 28} x2={osX + osW - 12} y2={osY + 28} stroke={b("200")} strokeWidth={1} />
      </g>

      {/* ── Services ── */}
      <ServiceBox x={svcX} y={osY + 38} w={svcW} h={svcH} label="MOOD" id="mood" />
      <ServiceBox x={svcX} y={osY + 76} w={svcW} h={svcH} label="AI Server" id="ai" />
      <ServiceBox x={svcX} y={osY + 114} w={svcW} h={svcH} label="Data" id="data" />
      <ServiceBox x={svcX} y={osY + 152} w={svcW} h={svcH} label="Cloud Computing" id="cloud" />

      {/* ── Users with devices around them ── */}
      {users.map((user) => (
        <g key={user.id} className={`nd-user nd-zone ${act(user.id)}`} {...bind(user.id)}>
          {/* User icon (person symbol) */}
          <circle cx={user.x} cy={user.y - 8} r={12} fill={b("50")} stroke={b("700")} strokeWidth={1.5} />
          <circle cx={user.x} cy={user.y - 12} r={6} fill={b("700")} />
          <ellipse cx={user.x} cy={user.y + 2} rx={8} ry={5} fill={b("700")} />
          
          {/* User name below icon */}
          <text x={user.x} y={user.y + 22} textAnchor="middle" fill={b("900")}
            style={{ fontSize: 11, fontWeight: 600, fontFamily: "var(--font-sans)" }}>
            {user.label}
          </text>
          
          {/* Laptop (top left) */}
          <g transform={`translate(${user.x - 48}, ${user.y - 38})`}>
            <rect width={28} height={18} rx={2} fill={b("50")} stroke={b("700")} strokeWidth={1} />
            <rect x={-2} y={19} width={32} height={3} rx={1} fill={b("50")} stroke={b("700")} strokeWidth={0.8} />
          </g>
          
          {/* Tablet (top right) */}
          <g transform={`translate(${user.x + 22}, ${user.y - 38})`}>
            <rect width={18} height={26} rx={3} fill={b("50")} stroke={b("700")} strokeWidth={1} />
            <circle cx={9} cy={22} r={2} fill="none" stroke={b("700")} strokeWidth={0.6} />
          </g>
          
          {/* Phone (bottom) */}
          <g transform={`translate(${user.x - 7}, ${user.y + 30})`}>
            <rect width={14} height={24} rx={3} fill={b("50")} stroke={b("700")} strokeWidth={1} />
            <rect x={4} y={2} width={6} height={1.5} rx={0.5} fill={b("700")} opacity={0.4} />
          </g>
        </g>
      ))}

      {/* Connection dot */}
      <circle cx={rackX + rackW} cy={cloudY} r={3} fill={b("700")} />
    </svg>
  );
}

/* ── Exported wrapper ── */

export default function NetworkDiagram() {
  return (
    <WindowManagerProvider>
      <HoverMenuProvider items={ITEMS}>
        <DiagramSVG />
      </HoverMenuProvider>
    </WindowManagerProvider>
  );
}
