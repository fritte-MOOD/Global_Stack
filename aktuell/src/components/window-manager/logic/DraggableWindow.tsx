"use client";

import { Maximize2, Minimize2, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type DraggableWindowProps = {
  id: string;
  title: string;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  onClose?: () => void;
  onFocus?: () => void;
  className?: string;
  width?: number;
  height?: number;
  resizable?: boolean;
  zIndex?: number;
  container?: HTMLElement | null;
  bottomInset?: number;
};

type Edge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
type SnapZone = "left" | "right" | "top" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | null;

const EDGE_CURSORS: Record<Edge, string> = {
  n: "ns-resize", s: "ns-resize",
  e: "ew-resize", w: "ew-resize",
  ne: "nesw-resize", sw: "nesw-resize",
  nw: "nwse-resize", se: "nwse-resize",
};

const MIN_W = 200;
const MIN_H = 120;
const TITLE_BAR_H = 32;
const SNAP_THRESHOLD = 12;
const SNAP_CORNER_SIZE = 80;

function detectSnapZone(clientX: number, clientY: number, areaW: number, areaH: number): SnapZone {
  const nearLeft = clientX <= SNAP_THRESHOLD;
  const nearRight = clientX >= areaW - SNAP_THRESHOLD;
  const nearTop = clientY <= SNAP_THRESHOLD;
  const nearBottom = clientY >= areaH - SNAP_THRESHOLD;
  const inTopCorner = clientY <= SNAP_CORNER_SIZE;
  const inBottomCorner = clientY >= areaH - SNAP_CORNER_SIZE;

  if (nearTop && clientX <= SNAP_CORNER_SIZE) return "top-left";
  if (nearTop && clientX >= areaW - SNAP_CORNER_SIZE) return "top-right";
  if (nearLeft && inTopCorner) return "top-left";
  if (nearRight && inTopCorner) return "top-right";
  if (nearLeft && inBottomCorner) return "bottom-left";
  if (nearRight && inBottomCorner) return "bottom-right";
  if (nearTop) return "top";
  if (nearLeft) return "left";
  if (nearRight) return "right";
  if (nearBottom && clientX < areaW / 2) return "bottom-left";
  if (nearBottom && clientX >= areaW / 2) return "bottom-right";
  return null;
}

function snapZoneRect(zone: SnapZone, areaW: number, areaH: number): { x: number; y: number; w: number; h: number } | null {
  if (!zone) return null;
  const hw = Math.round(areaW / 2);
  const hh = Math.round(areaH / 2);
  switch (zone) {
    case "left":         return { x: 0,  y: 0,  w: hw,    h: areaH };
    case "right":        return { x: hw, y: 0,  w: areaW - hw, h: areaH };
    case "top":          return { x: 0,  y: 0,  w: areaW, h: areaH };
    case "top-left":     return { x: 0,  y: 0,  w: hw,    h: hh };
    case "top-right":    return { x: hw, y: 0,  w: areaW - hw, h: hh };
    case "bottom-left":  return { x: 0,  y: hh, w: hw,    h: areaH - hh };
    case "bottom-right": return { x: hw, y: hh, w: areaW - hw, h: areaH - hh };
  }
}

// ─── Snap Preview Overlay ───────────────────────────────────────

function SnapPreview({ zone, areaW, areaH, container }: { zone: SnapZone; areaW: number; areaH: number; container: HTMLElement | null }) {
  if (!zone) return null;
  const r = snapZoneRect(zone, areaW, areaH);
  if (!r) return null;

  const padding = 6;
  const el = (
    <div
      className="pointer-events-none rounded-lg border-2 border-brand-950/30 bg-brand-950/8 transition-all duration-150 ease-out"
      style={{
        position: "absolute",
        left: r.x + padding,
        top: r.y + padding,
        width: r.w - padding * 2,
        height: r.h - padding * 2,
        zIndex: 29999,
      }}
    />
  );

  return createPortal(el, container ?? document.body);
}

export default function DraggableWindow({
  title,
  children,
  initialPosition = { x: 100, y: 100 },
  onClose,
  onFocus,
  className = "",
  width: initialWidth = 320,
  height: initialHeight,
  resizable = false,
  zIndex = 50,
  container,
  bottomInset = 0,
}: DraggableWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ offsetX: number; offsetY: number } | null>(null);
  const resizeState = useRef<{
    edge: Edge;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    startPosX: number;
    startPosY: number;
  } | null>(null);

  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({ w: initialWidth, h: initialHeight });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [snapPreview, setSnapPreview] = useState<SnapZone>(null);
  const [mounted, setMounted] = useState(false);

  const preFullscreenRef = useRef({ position: initialPosition, size: { w: initialWidth, h: initialHeight } });
  const preSnapRef = useRef({ position: initialPosition, size: { w: initialWidth, h: initialHeight } });
  const livePos = useRef(position);
  const liveSize = useRef(size);
  const liveSnapped = useRef(false);
  const liveFullscreen = useRef(false);
  livePos.current = position;
  liveSize.current = size;
  liveSnapped.current = isSnapped;
  liveFullscreen.current = isFullscreen;

  const getArea = () => {
    const c = container ?? document.body;
    const w = c === document.body ? window.innerWidth : c.clientWidth;
    const h = (c === document.body ? window.innerHeight : c.clientHeight) - bottomInset;
    return { w, h };
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (resizeState.current) {
        const rs = resizeState.current;
        const dx = e.clientX - rs.startX;
        const dy = e.clientY - rs.startY;

        let newW = rs.startW;
        let newH = rs.startH;
        let newX = rs.startPosX;
        let newY = rs.startPosY;

        if (rs.edge.includes("e")) newW = Math.max(MIN_W, rs.startW + dx);
        if (rs.edge.includes("w")) { newW = Math.max(MIN_W, rs.startW - dx); newX = rs.startPosX + (rs.startW - newW); }
        if (rs.edge.includes("s")) newH = Math.max(MIN_H, rs.startH + dy);
        if (rs.edge.includes("n")) { newH = Math.max(MIN_H, rs.startH - dy); newY = rs.startPosY + (rs.startH - newH); }

        setSize({ w: newW, h: newH });
        setPosition({ x: newX, y: newY });
        setIsSnapped(false);
        return;
      }

      if (!dragState.current) return;

      let newX: number;
      let newY: number;
      let cx: number;
      let cy: number;

      if (container) {
        const rect = container.getBoundingClientRect();
        newX = e.clientX - dragState.current.offsetX - rect.left;
        newY = e.clientY - dragState.current.offsetY - rect.top;
        const maxY = rect.height - bottomInset - TITLE_BAR_H;
        newY = Math.max(0, Math.min(newY, maxY));
        cx = e.clientX - rect.left;
        cy = e.clientY - rect.top;
      } else {
        newX = e.clientX - dragState.current.offsetX + window.scrollX;
        newY = e.clientY - dragState.current.offsetY + window.scrollY;
        const maxY = window.innerHeight - bottomInset - TITLE_BAR_H;
        newY = Math.max(0, Math.min(newY, maxY));
        cx = e.clientX;
        cy = e.clientY;
      }

      setPosition({ x: newX, y: newY });

      if (resizable) {
        const area = getArea();
        setSnapPreview(detectSnapZone(cx, cy, area.w, area.h));
      }
    };

    const onUp = (e: MouseEvent) => {
      if (dragState.current && resizable) {
        let cx: number;
        let cy: number;
        if (container) {
          const rect = container.getBoundingClientRect();
          cx = e.clientX - rect.left;
          cy = e.clientY - rect.top;
        } else {
          cx = e.clientX;
          cy = e.clientY;
        }

        const area = getArea();
        const zone = detectSnapZone(cx, cy, area.w, area.h);

        if (zone) {
          const r = snapZoneRect(zone, area.w, area.h);
          if (r) {
            setPosition({ x: r.x, y: r.y });
            setSize({ w: r.w, h: r.h });
            setIsSnapped(true);
            setIsFullscreen(zone === "top");
          }
        }

        setSnapPreview(null);
      }

      if (dragState.current || resizeState.current) {
        dragState.current = null;
        resizeState.current = null;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [container, resizable, bottomInset]);

  const startDrag = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    onFocus?.();

    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (isSnapped || isFullscreen) {
      const prev = preSnapRef.current;
      const prevW = prev.size.w ?? initialWidth;
      const prevH = prev.size.h;
      const ratioX = (e.clientX - rect.left) / rect.width;
      const offsetX = ratioX * prevW;
      const offsetY = e.clientY - rect.top;

      let newX: number;
      if (container) {
        const cRect = container.getBoundingClientRect();
        newX = e.clientX - offsetX - cRect.left;
      } else {
        newX = e.clientX - offsetX + window.scrollX;
      }

      setSize({ w: prevW, h: prevH });
      setPosition({ x: newX, y: position.y });
      setIsFullscreen(false);
      setIsSnapped(false);

      dragState.current = { offsetX, offsetY };
    } else {
      preSnapRef.current = { position: { ...position }, size: { ...size } };
      dragState.current = {
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      };
    }

    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  };

  const startEdgeResize = (edge: Edge) => (e: React.MouseEvent) => {
    if (e.button !== 0 || !resizable || isFullscreen) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus?.();

    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;

    resizeState.current = {
      edge,
      startX: e.clientX,
      startY: e.clientY,
      startW: rect.width,
      startH: rect.height,
      startPosX: position.x,
      startPosY: position.y,
    };
    document.body.style.cursor = EDGE_CURSORS[edge];
    document.body.style.userSelect = "none";
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      preFullscreenRef.current = { position, size: { ...size } };
      preSnapRef.current = { position, size: { ...size } };
      const area = getArea();
      setPosition({ x: 0, y: 0 });
      setSize({ w: area.w, h: area.h });
      setIsFullscreen(true);
      setIsSnapped(true);
    } else {
      setPosition(preFullscreenRef.current.position);
      setSize(preFullscreenRef.current.size);
      setIsFullscreen(false);
      setIsSnapped(false);
    }
  };

  const handleDoubleClickTitle = () => {
    if (resizable) toggleFullscreen();
  };

  if (!mounted) return null;

  const currentW = size.w ?? initialWidth;
  const currentH = size.h;

  const style: React.CSSProperties = {
    position: "absolute",
    left: position.x,
    top: position.y,
    width: currentW,
    ...(currentH ? { height: currentH } : {}),
    zIndex,
    ...(isFullscreen || isSnapped ? { borderRadius: 0 } : {}),
  };

  const area = mounted ? getArea() : { w: 0, h: 0 };

  const el = (
    <>
      <SnapPreview zone={snapPreview} areaW={area.w} areaH={area.h} container={container ?? null} />
      <div
        ref={windowRef}
        className={`flex flex-col rounded-lg border border-brand-200 bg-brand-50 shadow-lg shadow-brand-200/60 box-border ${isSnapped ? "rounded-none" : ""} ${className}`}
        style={style}
        onMouseDown={onFocus}
      >
        {/* Title Bar */}
        <div
          className="grid grid-cols-[minmax(4rem,1fr)_minmax(0,12rem)_minmax(4rem,1fr)] items-center px-2 h-8 border-b border-brand-200 select-none shrink-0 cursor-grab active:cursor-grabbing"
          onMouseDown={startDrag}
          onDoubleClick={handleDoubleClickTitle}
        >
          <div className="min-w-0" />
          <h3 className="text-xs font-normal text-brand-950 truncate text-center min-w-0 pointer-events-none">
            {title}
          </h3>

          <div className="flex items-center gap-1 justify-end min-w-0">
            {resizable && (
              <button
                onClick={toggleFullscreen}
                className="rounded p-0.5 hover:bg-brand-100 transition-colors text-brand-950 cursor-pointer"
                aria-label={isFullscreen ? "Restore" : "Maximize"}
              >
                {isFullscreen ? <Minimize2 className="size-3" /> : <Maximize2 className="size-3" />}
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="rounded p-0.5 hover:bg-brand-100 transition-colors text-brand-950 cursor-pointer"
                aria-label="Close"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {children}
        </div>

        {/* Edge and Corner Resize Handles */}
        {resizable && !isFullscreen && !isSnapped && (
          <>
            {/* Edges */}
            <div onMouseDown={startEdgeResize("n")} className="absolute -top-[3px] left-[6px] right-[6px] h-[6px] cursor-ns-resize" />
            <div onMouseDown={startEdgeResize("s")} className="absolute -bottom-[3px] left-[6px] right-[6px] h-[6px] cursor-ns-resize" />
            <div onMouseDown={startEdgeResize("e")} className="absolute top-[6px] -right-[3px] bottom-[6px] w-[6px] cursor-ew-resize" />
            <div onMouseDown={startEdgeResize("w")} className="absolute top-[6px] -left-[3px] bottom-[6px] w-[6px] cursor-ew-resize" />
            {/* Corners */}
            <div onMouseDown={startEdgeResize("nw")} className="absolute -top-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize" />
            <div onMouseDown={startEdgeResize("ne")} className="absolute -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nesw-resize" />
            <div onMouseDown={startEdgeResize("sw")} className="absolute -bottom-[3px] -left-[3px] w-[10px] h-[10px] cursor-nesw-resize" />
            <div onMouseDown={startEdgeResize("se")} className="absolute -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize" />
          </>
        )}
      </div>
    </>
  );

  return createPortal(el, container ?? document.body);
}
