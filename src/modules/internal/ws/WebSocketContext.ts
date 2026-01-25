import { createContext, useContext } from "react";
import type { WSMessage } from "./ws.events";

export const WS_STATUS = {
  CONNECTED: "CONNECTED",
  DISCONNECTED: "DISCONNECTED",
} as const;

export type WSStatusType = (typeof WS_STATUS)[keyof typeof WS_STATUS];

export type WebSocketContextValue = {
  wsStatus: WSStatusType;
  connect(token: string): void;
  disconnect(): void;
  sendEvent: (event: WSMessage) => void;
  subscribe(handler: (event: WSMessage) => void): () => void;
};

export const WebSocketContext = createContext<WebSocketContextValue | null>(
  null,
);

// hook to use socket functions
export const useWebSocketInternal = () => {
  const ctx = useContext(WebSocketContext);

  if (!ctx)
    throw new Error("useWebSocket must be used within WebSocketProvider");
  return ctx;
};
