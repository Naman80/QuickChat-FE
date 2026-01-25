import type { ChatState } from "../modules/internal/chat/types/chat.types";

export const data: ChatState = {
  activeConversation: null,
  conversationSummaries: [
    {
      id: "chat-1",
      title: "Aditya",
      lastMessage: "We will connect at",
      lastMessageAt: Date.now() - 3000,
      unreadCount: 0,
    },
    // {
    //   id: "chat-2",
    //   title: "Aditya-2",
    //   lastMessage: "We will connect at",
    //   lastMessageAt: Date.now() - 9000,
    //   unreadCount: 0,
    // },
  ],
  conversations: {
    "chat-1": {
      conversationId: "chat-1",
      participants: [
        { id: "user-1", name: "Aditya" },
        { id: "me", name: "You" },
      ],
      messages: [
        {
          id: "1",
          clientMessageId: "1",
          senderId: "me",
          type: "text",
          data: "Hello! How are you?",
          status: "read",
          timestamp: Date.now() - 3600000,
        },
        {
          id: "2",
          clientMessageId: "2",
          senderId: "user-1",
          type: "text",
          data: "I'm doing well, thanks! How about you?",
          status: "read",
          timestamp: Date.now() - 3000000,
        },
        {
          id: "3",
          clientMessageId: "3",
          senderId: "me",
          type: "text",
          data: "I'm good too. When are we meeting?",
          status: "read",
          timestamp: Date.now() - 2400000,
        },
        {
          id: "4",
          clientMessageId: "4",
          senderId: "user-1",
          type: "text",
          data: "We will connect at 6 PM tomorrow.",
          status: "read",
          timestamp: Date.now() - 3000,
        },
      ],
    },
  },
};
