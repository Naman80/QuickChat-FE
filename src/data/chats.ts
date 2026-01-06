import { type Chat } from "../types/chat.ts";

export const chats: Chat[] = [
  {
    id: "chat-1",
    participants: [
      { id: "u1", name: "Aditya" },
      { id: "me", name: "You" },
    ],
    messages: [
      {
        id: "m1",
        chatId: "chat-1",
        senderId: "u1",
        text: "Hey, can we connect at 1:30?",
        timestamp: Date.now() - 600000,
      },
      {
        id: "m2",
        chatId: "chat-1",
        senderId: "me",
        text: "Sure, works for me.",
        timestamp: Date.now() - 300000,
      },
    ],
  },
  {
    id: "chat-2",
    participants: [
      { id: "u2", name: "Coding Group" },
      { id: "me", name: "You" },
    ],
    messages: [
      {
        id: "m3",
        chatId: "chat-2",
        senderId: "u2",
        text: "Did you check the React docs?",
        timestamp: Date.now() - 900000,
      },
    ],
  },
];
