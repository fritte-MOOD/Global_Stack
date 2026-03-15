"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the type for the context
interface ChatContextType {
  chatId: string;
  setChatId: (id: string) => void;
}

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider for the global chat ID
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatId, setChatId] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedChatId = localStorage.getItem("chatId");
    if (storedChatId) {
      setChatId(storedChatId);
    }
  }, []);

  useEffect(() => {
    if (isClient && chatId) {
      localStorage.setItem("chatId", chatId);
    }
  }, [isClient, chatId]);

  const value = {
    chatId,
    setChatId,
  };

  if (!isClient) {
    return null; // or a loading indicator
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom Hook to access the context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};