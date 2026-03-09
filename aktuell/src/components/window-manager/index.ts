/*
 * index.ts — Barrel-Export für den Window-Manager.
 *
 * Statt langer Pfade wie:
 *   import { useWindowManager } from "@/components/window-manager/logic/WindowManager"
 *
 * Einfach:
 *   import { useWindowManager } from "@/components/window-manager"
 *
 * Fenster-Components (windows/) werden NICHT hier exportiert,
 * die importiert man direkt:
 *   import ProjectWindow from "@/components/window-manager/windows/ProjectWindow"
 */

export { WindowManagerProvider, useWindowManager } from "./logic/WindowManager";
export type { WindowContent } from "./logic/WindowManager";
export { default as DraggableWindow } from "./logic/DraggableWindow";
export type { DraggableWindowProps } from "./logic/DraggableWindow";
export { default as Tag } from "./logic/Tag";
