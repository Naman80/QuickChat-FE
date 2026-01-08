// import { useState } from "react";
// import { chats as initialChats } from "../data/chats";
// import { type Chat, type Message } from "../types/chat.ts";
// import { useWebSocket } from "../websocket/WebSocketContext.ts";
// import { WS_EVENTS } from "../websocket/ws.events.ts";

// export const useChat = () => {
//   // we have chats
//   const { sendEvent } = useWebSocket();
//   const [chats, setChats] = useState<Chat[]>(initialChats);

//   // active chat id
//   const [activeChatId, setActiveChatId] = useState<string | null>(
//     initialChats[0]?.id ?? null
//   );

//   // active chat
//   const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

//   // sending msge
//   const sendMessage = (text: string) => {
//     if (!activeChatId) return;

//     const userId = crypto.randomUUID();
//     const newMessage: Message = {
//       id: crypto.randomUUID(),
//       chatId: activeChatId,
//       senderId: "me",
//       text,
//       timestamp: Date.now(),
//     };

//     setChats((prev) =>
//       prev.map((chat) =>
//         chat.id === activeChatId
//           ? { ...chat, messages: [...chat.messages, newMessage] }
//           : chat
//       )
//     );

//     sendEvent({
//       type: WS_EVENTS.SEND_MESSAGE,
//       payload: {
//         type: "text",
//         content: text,
//       },
//       meta: {
//         timestamp: Date.now(),
//         userId,
//         roomId: activeChatId,
//       },
//     });
//   };

//   return {
//     chats,
//     activeChat,
//     setActiveChatId,
//     sendMessage,
//   };
// };
