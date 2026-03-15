"use client";

import { useDarkMode } from "@/context/ContextFiles/DarkModeContext";
import { Moon, Sun } from "lucide-react";

export const DarkModeToggle = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-brand-100 hover:bg-brand-200 transition-colors"
            aria-label="Toggle dark mode"
        >
            {isDarkMode ? (
                <Sun className="h-5 w-5 text-brand-900" />
            ) : (
                <Moon className="h-5 w-5 text-brand-900" />
            )}
        </button>
    );
};