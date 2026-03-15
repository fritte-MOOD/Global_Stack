"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the type for the context
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the context
const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

// Provider for the global dark mode state
export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setIsDarkMode(storedDarkMode === "true");
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("darkMode", isDarkMode.toString());
      if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  }, [isClient, isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
  };

  if (!isClient) {
    return null; // or a loading indicator
  }

  return (
      <DarkModeContext.Provider value={value}>
        {children}
      </DarkModeContext.Provider>
  );
};

// Custom Hook to access the context
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};