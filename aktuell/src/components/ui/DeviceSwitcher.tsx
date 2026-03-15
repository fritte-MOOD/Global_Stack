"use client";

import { Monitor, Tablet, Smartphone, Maximize } from "lucide-react";

type Device = "laptop" | "tablet" | "mobile";

const devices: { id: Device; label: string; icon: typeof Monitor }[] = [
  { id: "laptop", label: "Laptop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
];

export default function DeviceSwitcher({
  value,
  onChange,
  onFullscreen,
}: {
  value: Device;
  onChange: (d: Device) => void;
  onFullscreen?: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 p-0.5 rounded-md bg-brand-100/50 border border-brand-200">
        {devices.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
              value === id
                ? "bg-brand-50 text-brand-950 shadow-sm"
                : "text-brand-950 hover:bg-brand-50/50"
            }`}
          >
            <Icon className="size-3.5" />
            {label}
          </button>
        ))}
      </div>
      {onFullscreen && (
        <button
          onClick={onFullscreen}
          className="p-1.5 rounded-md bg-brand-100/50 border border-brand-200 text-brand-950 hover:bg-brand-100 transition-all cursor-pointer"
          aria-label="Fullscreen"
          title="Fullscreen"
        >
          <Maximize className="size-3.5" />
        </button>
      )}
    </div>
  );
}