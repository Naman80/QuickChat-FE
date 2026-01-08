import { createContext, useContext } from "react";
import type { WSMessage } from "./ws.events";

export interface WebSocketContextValue {
  sendEvent: (event: WSMessage) => void;
}

export const WebSocketContext = createContext<WebSocketContextValue | null>(
  null
);

// hook to use socket functions
export const useWebSocket = () => {
  const ctx = useContext(WebSocketContext);
  console.log(ctx, "socket context");

  if (!ctx)
    throw new Error("useWebSocket must be used within WebSocketProvider");
  return ctx;
};
