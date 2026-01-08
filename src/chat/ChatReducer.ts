import type { ChatState, Message } from "./types/chat.types";

export const CHAT_ACTION_TYPES = {
  MESSAGE_SEND_INIT: "MESSAGE_SEND_INIT",
  SET_ACTIVE_CONVERSATION_ID: " SET_ACTIVE_CONVERSATION_ID",
} as const;

// type ChatActionType =
//   (typeof CHAT_ACTION_TYPES)[keyof typeof CHAT_ACTION_TYPES];

export type ChatAction =
  | {
      type: "MESSAGE_SEND_INIT";
      payload: {
        conversationId: string;
        clientMessageId: string;
        text: string;
        createdAt: number;
      };
    }
  | {
      type: "SET_ACTIVE_CONVERSATION_ID";
      payload: {
        conversationId: string;
      };
    };

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "MESSAGE_SEND_INIT": {
      const { conversationId, clientMessageId, text, createdAt } =
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
    case "SET_ACTIVE_CONVERSATION_ID": {
      const { conversationId } = action.payload;

      return {
        ...state,
        activeConversationId: conversationId,
      };
    }
    default:
      return state;
  }
}
