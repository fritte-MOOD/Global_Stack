"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const THEME_KEY = "theme";

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(THEME_KEY, next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full bg-brand-100 hover:bg-brand-200 transition-colors cursor-pointer"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-brand-950" />
      ) : (
        <Moon className="h-5 w-5 text-brand-950" />
      )}
    </button>
  );
};
