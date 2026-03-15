"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the type for the context
interface GroupContextType {
  groupName: string;
  setGroupName: (name: string) => void;
}

// Create the context
const GroupContext = createContext<GroupContextType | undefined>(undefined);

// Provider for the global group name
export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groupName, setGroupName] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedGroupName = localStorage.getItem("groupName");
    if (storedGroupName) {
      setGroupName(storedGroupName);
    }
  }, []);

  useEffect(() => {
    if (isClient && groupName) {
      localStorage.setItem("groupName", groupName);
    }
  }, [isClient, groupName]);

  const value = {
    groupName,
    setGroupName,
  };

  if (!isClient) {
    return null; // or a loading indicator
  }

  return (
    <GroupContext.Provider value={value}>
      {children}
    </GroupContext.Provider>
  );
};

// Custom Hook to access the context
export const useGroup = () => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroup must be used within a GroupProvider");
  }
  return context;
};