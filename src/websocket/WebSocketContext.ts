import { createContext, useContext } from "react";
import type { SocketEvent, SocketStatus } from "./socket.types";

interface WebSocketContextValue {
  status: SocketStatus;
  sendEvent: (event: SocketEvent) => void;
}

export const WebSocketContext = createContext<WebSocketContextValue | null>(
  null
);

export const useWebSocket = () => {
  const ctx = useContext(WebSocketContext);
  if (!ctx)
    throw new Error("useWebSocket must be used within WebSocketProvider");
  return ctx;
};
