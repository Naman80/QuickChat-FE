import { useReducer, type ActionDispatch, type ReactNode } from "react";
import { ChatContext } from "./ChatContext";
import { chatReducer, type ChatAction } from "./ChatReducer";
import {
  useWebSocket,
  type WebSocketContextValue,
} from "../ws/WebSocketContext";
import type { ChatState } from "./types/chat.types";

import { data } from "../data/chats";

const initialChatState: ChatState = { ...data };

const chatStateHelpers = (
  ws: WebSocketContextValue,
  state: ChatState,
  dispatch: ActionDispatch<[ChatAction]>
) => {
  const { activeConversationId } = state;

  function sendMessage(text: string) {
    if (!text.trim() || !activeConversationId) return;

    const clientMessageId = crypto.randomUUID();
    const createdAt = Date.now();

    // 1. Optimistic state update
    dispatch({
      type: "MESSAGE_SEND_INIT",
      payload: {
        conversationId: activeConversationId,
        clientMessageId,
        text,
        createdAt,
      },
    });

    // 2. Side effect
    ws.sendEvent({
      type: "SEND_MESSAGE",
      payload: {
        conversationId: activeConversationId,
        clientMessageId,
        text,
        createdAt,
      },
      meta: {
        userId: "",
      },
    });
  }

  function setActiveConversationId(conversationId: string) {
    dispatch({
      type: "SET_ACTIVE_CONVERSATION_ID",
      payload: {
        conversationId,
      },
    });
  }

  return { sendMessage, setActiveConversationId };
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);
  const ws = useWebSocket();

  const { sendMessage, setActiveConversationId } = chatStateHelpers(
    ws,
    state,
    dispatch
  );

  return (
    <ChatContext.Provider
      value={{
        ...state,
        sendMessage,
        setActiveConversationId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
