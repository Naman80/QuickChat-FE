import React, { useEffect, useRef, useState } from "react";
import { WS_URL } from "./socket.constants";
import { deserializeEvent, serializeEvent } from "./socket.utils";
import type { SocketEvent, SocketStatus } from "./socket.types";
import { WebSocketContext } from "./WebSocketContext";

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<SocketStatus>("connecting");

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      setStatus("connected");
      console.info("[WS] Connected");
    };

    socket.onclose = () => {
      setStatus("disconnected");
      console.warn("[WS] Disconnected");
    };

    socket.onerror = (err) => {
      console.error("[WS] Error", err);
    };

    socket.onmessage = (event) => {
      const parsed = deserializeEvent(event.data);
      console.debug("[WS] Incoming", parsed);
      // Phase 2 will route this to chat state
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendEvent = (event: SocketEvent) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(serializeEvent(event));
    } else {
      console.warn("[WS] Tried to send while disconnected", event);
    }
  };

  return (
    <WebSocketContext.Provider value={{ status, sendEvent }}>
      {children}
    </WebSocketContext.Provider>
  );
};
