import { createContext, useContext } from "react";
import type { ChatState } from "./types/chat.types";

type IChatContext = ChatState & {
  sendMessage: (text: string) => void;
  setActiveConversationId: (conversationId: string) => void;
};

export const ChatContext = createContext<IChatContext | null>(null);

// hook to use socket functions
export const useChatContext = () => {
  const ctx = useContext(ChatContext);

  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
};
