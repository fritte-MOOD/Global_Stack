/*
 * index.ts — Barrel file für alle Window-Komponenten.
 *
 * Exportiert alle verfügbaren Fenster-Components für einfachen Import:
 *   import { ProjectWindow, CalendarWindow, ... } from "@/components/window-manager/windows";
 */

export { default as ProjectWindow } from "./ProjectWindow";
export { default as CalendarWindow } from "./CalendarWindow";
export { default as MessagesWindow } from "./MessagesWindow";
export { default as TasksWindow } from "./TasksWindow";
export { default as DocumentsWindow } from "./DocumentsWindow";
export { default as DebateWindow } from "./DebateWindow";