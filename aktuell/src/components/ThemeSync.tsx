"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const THEME_KEY = "theme";
const DARK_CLASS = "dark";

export default function ThemeSync() {
  const pathname = usePathname();

  useEffect(() => {
    const dark =
      localStorage.getItem(THEME_KEY) === "dark" ||
      (!localStorage.getItem(THEME_KEY) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle(DARK_CLASS, dark);
  }, [pathname]);

  return null;
}
