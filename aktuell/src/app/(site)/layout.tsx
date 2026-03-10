/**
 * (site)/layout.tsx — Layout für alle öffentlichen Seiten.
 *
 * Enthält die Navbar und den WindowManager.
 * Gilt für: Landing, OpenOS Demo, About, etc.
 * Gilt NICHT für: /workspace/ (persistente App ohne Navbar)
 */

import { Navbar_landing } from "@/components/ui/navbar_landing";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar_landing />
      {children}
    </>
  );
}
