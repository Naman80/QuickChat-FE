import type { ChatState } from "../chat/types/chat.types";

export const data: ChatState = {
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
        {
          id: "user-1",
          name: "Aditya",
        },
        {
          id: "user-2",
          name: "naman",
        },
      ],
      messages: [],
    },
    // "chat-2": {
    //   conversationId: "chat-2",
    //   participants: [
    //     {
    //       id: "user-2",
    //       name: "Aditya-2",
    //     },
    //     {
    //       id: "user-1",
    //       name: "Aditya-2",
    //     },
    //   ],
    //   messages: [],
    // },
  },
  activeConversationId: null,
};
