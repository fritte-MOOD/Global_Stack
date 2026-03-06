"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const THEME_KEY = "theme";
const DARK_CLASS = "dark";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains(DARK_CLASS));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle(DARK_CLASS, next);
    localStorage.setItem(THEME_KEY, next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 rounded-full bg-brand-100 hover:bg-brand-200 transition-colors"
      aria-label={dark ? "Hellmodus" : "Dunkelmodus"}
    >
      {dark ? (
        <Sun className="h-5 w-5 text-brand-900" />
      ) : (
        <Moon className="h-5 w-5 text-brand-900" />
      )}
    </button>
  );
}
