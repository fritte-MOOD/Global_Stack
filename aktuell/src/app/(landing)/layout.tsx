import { ReactNode } from "react";
import { Navbar_landing } from "@/components/ui/navbar_landing";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar_landing />
      {children}
    </>
  );
}
