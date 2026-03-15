"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the type for the context
interface DebateContextType {
  debateId: number | null;
  setDebateId: (id: number | null) => void;
}

// Create the context
const DebateContext = createContext<DebateContextType | undefined>(undefined);

// Provider for the global debate ID
export const DebateProvider = ({ children }: { children: ReactNode }) => {
  const [debateId, setDebateId] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedDebateId = localStorage.getItem("debateId");
    if (storedDebateId) {
      setDebateId(Number(storedDebateId));
    }
  }, []);

  useEffect(() => {
    if (isClient && debateId !== null) {
      localStorage.setItem("debateId", debateId.toString());
    }
  }, [isClient, debateId]);

  const value = {
    debateId,
    setDebateId,
  };

  if (!isClient) {
    return null; // or a loading indicator
  }

  return (
    <DebateContext.Provider value={value}>
      {children}
    </DebateContext.Provider>
  );
};

// Custom Hook to access the context
export const useDebate = () => {
  const context = useContext(DebateContext);
  if (!context) {
    throw new Error("useDebate must be used within a DebateProvider");
  }
  return context;
};