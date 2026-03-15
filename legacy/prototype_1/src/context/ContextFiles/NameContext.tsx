"use client"; // Wichtig, damit der Context auf dem Client läuft

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Definiere den Typ für den Context
interface NameContextType {
  name: string;
  setName: (name: string) => void;
}

// Erstelle den Context
const NameContext = createContext<NameContextType | undefined>(undefined);

// Provider für den globalen Namen
export const NameProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>(() => {
    // Prüfe beim ersten Laden, ob ein Name im localStorage gespeichert ist
    if (typeof window !== "undefined") {
      return localStorage.getItem("name") || "";
    }
    return "";
  });

  // Speichere den Namen in den localStorage, wenn er sich ändert
  useEffect(() => {
    if (name) {
      localStorage.setItem("name", name);
    }
  }, [name]);

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};

// Custom Hook zum Zugriff auf den Context
export const useName = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error("useName muss innerhalb von NameProvider verwendet werden.");
  }
  return context;
};
