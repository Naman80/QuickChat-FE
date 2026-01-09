import type { ChatState, Message } from "./types/chat.types";

export const CHAT_ACTION_TYPES = {
  MESSAGE_SEND_INIT: "MESSAGE_SEND_INIT",
  SET_ACTIVE_CONVERSATION_ID: "SET_ACTIVE_CONVERSATION_ID",
  MESSAGE_RECEIVED: "MESSAGE_RECEIVED",
} as const;

export type ChatActionType =
  (typeof CHAT_ACTION_TYPES)[keyof typeof CHAT_ACTION_TYPES];

export type ChatActionPayloadMap = {
  MESSAGE_SEND_INIT: {
    conversationId: string;
    clientMessageId: string;
    text: string;
    createdAt: number;
  };

  SET_ACTIVE_CONVERSATION_ID: {
    conversationId: string;
  };

  MESSAGE_RECEIVED: {
    roomId: string;
    messageId: string;
    text: string;
    senderId: string;
    createdAt: number;
  };
};

export type ChatAction = {
  [K in ChatActionType]: {
    type: K;
    payload: ChatActionPayloadMap[K];
  };
}[ChatActionType];

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case CHAT_ACTION_TYPES.MESSAGE_SEND_INIT: {
      const { clientMessageId, conversationId, createdAt, text } =
        action.payload;

      const message: Message = {
        id: clientMessageId,
        clientMessageId,
        type: "text",
        senderId: "me",
        data: text,
        status: "sending" as const,
        timestamp: createdAt,
      };

      const conversation = state.conversations[conversationId] ?? {
        messages: [],
      };

      return {
        ...state,
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...conversation,
            messages: [...conversation.messages, message],
          },
        },
      };
    }
    case CHAT_ACTION_TYPES.SET_ACTIVE_CONVERSATION_ID: {
      const { conversationId } = action.payload;

      return {
        ...state,
        activeConversationId: conversationId,
      };
    }
    case CHAT_ACTION_TYPES.MESSAGE_RECEIVED: {
      const { roomId, messageId, text, senderId, createdAt } = action.payload;

      const conversation = state.conversations[roomId] ?? { messages: [] };

      return {
        ...state,
        conversations: {
          ...state.conversations,
          [roomId]: {
            ...conversation,
            messages: [
              ...conversation.messages,
              {
                id: messageId,
                senderId,
                clientMessageId: "",
                type: "text",
                data: text,
                status: "sent",
                timestamp: createdAt,
              },
            ],
          },
        },
      };
    }
    default:
      return state;
  }
}
