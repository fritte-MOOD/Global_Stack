/*
 * index.ts — Barrel file für alle Window-Komponenten.
 *
 * Exportiert alle verfügbaren Fenster-Components für einfachen Import:
 *   import { ProjectWindow, CalendarWindow, ... } from "@/components/window-manager/windows";
 */

export { default as ProjectWindow } from "./ProjectWindow";
export { default as CalendarWindow, CalendarContent } from "./CalendarWindow";
export { default as MessagesWindow, MessagesContent } from "./MessagesWindow";
export { default as TasksWindow, TasksContent } from "./TasksWindow";
export { default as DocumentsWindow, DocumentsContent } from "./DocumentsWindow";
export { default as DebateWindow, DebateContent } from "./DebateWindow";
export { SearchContent, searchWindowContent } from "./SearchWindow";