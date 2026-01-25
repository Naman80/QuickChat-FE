export interface ChatUser {
  id: string;
  name: string;
  avatarUrl?: string;
}

export type Message = {
  id: string;
  clientMessageId: string;
  senderId: string;
  type: string;
  data: string;
  status: "sending" | "sent" | "received" | "read" | "failed";
  timestamp: number;
};

export type Conversation = {
  conversationId: string;
  participants: ChatUser[];
  messages: Message[];
};

export type ConversationSummary = {
  id: string;
  title: string;
  lastMessage: string;
  lastMessageAt: number;
  unreadCount: number;
};

export type ChatState = {
  conversationSummaries: ConversationSummary[];
  conversations: Record<string, Conversation>;
  activeConversation: Conversation | null;
};
