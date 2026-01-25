import { createContext, useContext } from "react";
import type { ChatState } from "./types/chat.types";

export type ChatContextValue = ChatState & {
  createNewChat: () => void;
  sendMessage: (text: string) => void;
  setActiveConversation: (conversationId: string) => void;
};

export const ChatContext = createContext<ChatContextValue | null>(null);

// hook to use socket functions
export const useChatContextInternal = () => {
  const ctx = useContext(ChatContext);

  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
};
