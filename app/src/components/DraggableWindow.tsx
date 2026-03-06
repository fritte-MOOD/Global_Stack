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
  className?: string;
  width?: number;
  zIndex?: number;
};

export default function DraggableWindow({
  id,
  title,
  children,
  initialPosition = { x: 100, y: 100 },
  onClose,
  onFocus,
  className = "",
  width = 320,
  zIndex = 50,
}: DraggableWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ offsetX: number; offsetY: number } | null>(null);
  const [position, setPosition] = useState(initialPosition);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragState.current) return;
      setPosition({
        x: e.clientX - dragState.current.offsetX + window.scrollX,
        y: e.clientY - dragState.current.offsetY + window.scrollY,
      });
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
  }, []);

  const startDrag = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
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

  if (!mounted) return null;

  const el = (
    <div
      ref={windowRef}
      className={`rounded-lg border border-brand-200 bg-brand-50 shadow-xl shadow-brand-200/60 ${className}`}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width,
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-brand-200 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={startDrag}
      >
        <h3 className="font-heading text-sm font-semibold text-brand-900">
          {title}
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-brand-700 hover:text-brand-900 text-lg leading-none hover:bg-brand-100 rounded px-1"
            aria-label="Close window"
          >
            ×
          </button>
        )}
      </div>
      <div className="px-4 py-3">{children}</div>
    </div>
  );

  return createPortal(el, document.body);
}
