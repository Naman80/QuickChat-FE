import {
  useEffect,
  useReducer,
  type ActionDispatch,
  type ReactNode,
} from "react";
import { ChatContext } from "./ChatContext";
import { CHAT_ACTION_TYPES, chatReducer, type ChatAction } from "./ChatReducer";
import {
  useWebSocketInternal,
  type WebSocketContextValue,
} from "../ws/WebSocketContext";
import type { ChatState } from "./types/chat.types";
import { data } from "../../../data/chats";
import { WS_EVENTS } from "../ws/ws.events";

const initialChatState: ChatState = { ...data };

const chatStateHelpers = (
  ws: WebSocketContextValue,
  state: ChatState,
  dispatch: ActionDispatch<[ChatAction]>,
) => {
  const { activeConversation } = state;

  function sendMessage(text: string) {
    if (!text.trim() || !activeConversation) return;

    const clientMessageId = crypto.randomUUID();
    const createdAt = Date.now();

    // 1. Optimistic state update
    dispatch({
      type: CHAT_ACTION_TYPES.MESSAGE_SEND_INIT,
      payload: {
        conversationId: activeConversation.conversationId,
        clientMessageId,
        text,
        createdAt,
      },
    });

    // 2. Side effect
    ws.sendEvent({
      type: WS_EVENTS.SEND_MESSAGE,
      payload: {
        roomId: activeConversation.conversationId,
        clientMessageId,
        text,
        createdAt,
      },
      meta: {
        userId: "",
      },
    });
  }

  function setActiveConversation(conversationId: string) {
    dispatch({
      type: "SET_ACTIVE_CONVERSATION",
      payload: {
        conversationId,
      },
    });

    ws.sendEvent({
      type: "JOIN_ROOM",
      payload: {
        roomId: conversationId,
      },
    });
  }

  function createNewChat() {
    console.log("createNewChat");
  }

  return { createNewChat, sendMessage, setActiveConversation };
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);
  const ws = useWebSocketInternal();

  // ⬇️ NEW: subscribe to WS events
  useEffect(() => {
    const unsubscribe = ws.subscribe((event) => {
      switch (event.type) {
        case WS_EVENTS.NEW_MESSAGE: {
          //
          dispatch({
            type: CHAT_ACTION_TYPES.MESSAGE_RECEIVED,
            payload: { ...event.payload },
          });
          break;
        }

        // case "MESSAGE_ACK": {
        //   dispatch({
        //     type: "MESSAGE_SEND_CONFIRMED",
        //     payload: event.payload,
        //   });
        //   break;
        // }

        default:
          break;
      }
    });

    return unsubscribe;
  }, [ws]);

  const stateHelpers = chatStateHelpers(ws, state, dispatch);

  return (
    <ChatContext.Provider
      value={{
        ...state,
        ...stateHelpers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
