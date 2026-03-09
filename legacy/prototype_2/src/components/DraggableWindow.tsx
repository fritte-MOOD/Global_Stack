"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type DraggableWindowProps = {
  id: string;
  title: string;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  onClose?: () => void;
  onFocus?: () => void;
  onMinimize?: () => void;
  className?: string;
  width?: number;
  height?: number;
  zIndex?: number;
  /** Confine to a container element instead of full page */
  container?: HTMLElement | null;
};

export default function DraggableWindow({
  title,
  children,
  initialPosition = { x: 100, y: 100 },
  onClose,
  onFocus,
  onMinimize,
  className = "",
  width = 320,
  height,
  zIndex = 50,
  container,
}: DraggableWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ offsetX: number; offsetY: number } | null>(null);
  const [position, setPosition] = useState(initialPosition);
  const [maximized, setMaximized] = useState(false);
  const [preMaxState, setPreMaxState] = useState<{ x: number; y: number; w: number; h?: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragState.current) return;
      if (maximized) return;

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
      if (dragState.current) {
        dragState.current = null;
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
  }, [container, maximized]);

  const startDrag = (e: React.MouseEvent) => {
    if (e.button !== 0 || maximized) return;
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

  const toggleMaximize = () => {
    if (maximized) {
      if (preMaxState) {
        setPosition({ x: preMaxState.x, y: preMaxState.y });
      }
      setPreMaxState(null);
      setMaximized(false);
    } else {
      setPreMaxState({ x: position.x, y: position.y, w: width, h: height });
      setPosition({ x: 0, y: 0 });
      setMaximized(true);
    }
  };

  if (!mounted) return null;

  const style: React.CSSProperties = maximized
    ? { position: "absolute", inset: 0, zIndex }
    : {
        position: "absolute",
        left: position.x,
        top: position.y,
        width,
        ...(height ? { height } : {}),
        zIndex,
      };

  const el = (
    <div
      ref={windowRef}
      className={`
        flex flex-col rounded-lg border border-brand-200 bg-brand-50
        shadow-xl shadow-brand-200/60
        ${maximized ? "!rounded-none" : ""}
        ${className}
      `}
      style={style}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        className={`
          flex items-center gap-2 px-3 py-2 border-b border-brand-200 select-none shrink-0
          ${maximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"}
        `}
        onMouseDown={startDrag}
        onDoubleClick={toggleMaximize}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          {onClose && (
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
              aria-label="Close"
            />
          )}
          {onMinimize && (
            <button
              onClick={onMinimize}
              className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
              aria-label="Minimize"
            />
          )}
          <button
            onClick={toggleMaximize}
            className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors"
            aria-label={maximized ? "Restore" : "Maximize"}
          />
        </div>

        <h3 className="font-heading text-xs font-medium text-brand-700 flex-1 text-center">
          {title}
        </h3>

        {/* Spacer to balance the traffic lights */}
        <div className="w-[54px]" />
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );

  if (container) {
    return createPortal(el, container);
  }
  return createPortal(el, document.body);
}
