/**
 * workspace/layout.tsx — Layout für die persistente App.
 *
 * Kein Geräte-Rahmen, keine Navbar — läuft als vollwertige Web-App.
 * Nutzer muss angemeldet sein (Middleware schützt die Routen).
 * Alle Daten kommen aus der Datenbank.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenOS Workspace",
  description: "Your persistent OpenOS workspace",
};

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-brand-25 text-brand-950">
      {children}
    </div>
  );
}
