"use client";

import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-14 bg-brand-50/90 backdrop-blur-sm border-b border-brand-200">
      <div className="max-w-6xl mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <Link
            href="/"
            className="text-lg font-bold text-brand-900"
          >
            <span className="text-brand-300">/</span>
            Global Stack
          </Link>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
