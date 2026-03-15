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
  noScale?: boolean;
};

type Edge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const EDGE_CURSORS: Record<Edge, string> = {
  n: "ns-resize", s: "ns-resize",
  e: "ew-resize", w: "ew-resize",
  ne: "nesw-resize", sw: "nesw-resize",
  nw: "nwse-resize", se: "nwse-resize",
};

const MIN_W = 200;
const MIN_H = 120;
const EDGE_SIZE = 6;

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
  noScale = false,
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
  const [mounted, setMounted] = useState(false);

  const preFullscreenRef = useRef({ position: initialPosition, size: { w: initialWidth, h: initialHeight } });
  const baseSize = useRef({ w: initialWidth, h: initialHeight });

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
        return;
      }

      if (!dragState.current) return;

      if (container) {
        const rect = container.getBoundingClientRect();
        setPosition({
          x: e.clientX - dragState.current.offsetX - rect.left,
          y: e.clientY - dragState.current.offsetY - rect.top,
        });
      } else {
        setPosition({
          x: e.clientX - dragState.current.offsetX + window.scrollX,
          y: e.clientY - dragState.current.offsetY + window.scrollY,
        });
      }
    };

    const onUp = () => {
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
  }, [container]);

  const startDrag = (e: React.MouseEvent) => {
    if (e.button !== 0 || isFullscreen) return;
    e.preventDefault();
    onFocus?.();

    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;

    dragState.current = {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
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
      const c = container ?? document.body;
      const cw = c === document.body ? window.innerWidth : c.clientWidth;
      const ch = (c === document.body ? window.innerHeight : c.clientHeight) - bottomInset;
      setPosition({ x: 0, y: 0 });
      setSize({ w: cw, h: ch });
      setIsFullscreen(true);
    } else {
      setPosition(preFullscreenRef.current.position);
      setSize(preFullscreenRef.current.size);
      setIsFullscreen(false);
    }
  };

  const handleDoubleClickTitle = () => {
    if (resizable) toggleFullscreen();
  };

  if (!mounted) return null;

  const currentW = size.w ?? initialWidth;
  const currentH = size.h;
  const baseW = baseSize.current.w;
  const baseH = baseSize.current.h;

  let scale = 1;
  if (!noScale && baseW && baseH && currentH) {
    const scaleW = currentW / baseW;
    const scaleH = currentH / baseH;
    const minScale = Math.min(scaleW, scaleH);
    if (minScale > 1) scale = minScale;
  }

  const style: React.CSSProperties = {
    position: "absolute",
    left: position.x,
    top: position.y,
    width: currentW,
    ...(currentH ? { height: currentH } : {}),
    zIndex,
    ...(isFullscreen ? { borderRadius: 0 } : {}),
  };

  const el = (
    <div
      ref={windowRef}
      className={`flex flex-col rounded-lg border border-brand-200 bg-brand-50 shadow-lg shadow-brand-200/60 box-border ${className}`}
      style={style}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="flex items-center px-3 h-8 border-b border-brand-200 select-none shrink-0 cursor-grab active:cursor-grabbing"
        onMouseDown={startDrag}
        onDoubleClick={handleDoubleClickTitle}
      >
        <h3 className="font-heading text-xs font-medium text-brand-950 flex-1">{title}</h3>

        <div className="flex items-center gap-1">
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
      <div
        className="flex-1 min-h-0 overflow-hidden"
        style={scale > 1 ? {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
        } : undefined}
      >
        {children}
      </div>

      {/* Edge and Corner Resize Handles */}
      {resizable && !isFullscreen && (
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
  );

  return createPortal(el, container ?? document.body);
}
