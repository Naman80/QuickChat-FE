import React, { useEffect, useRef, useState } from "react";
import { deserializeEvent, serializeEvent } from "./ws.utils";
import { WebSocketContext } from "./WebSocketContext";
import type { WSMessage } from "./ws.events";
import { WS_URL } from "./ws.constants";
import { useAuthContext } from "../auth/AuthContext";
import { getLocalStorageItem, LOCALSTORAGE } from "../../utils/localStorage";

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuthContext();

  const socketRef = useRef<WebSocket | null>(null);

  const listenersRef = useRef<Set<(parsedEvent: WSMessage) => void>>(new Set());

  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    const token = getLocalStorageItem(LOCALSTORAGE.TOKEN);

    const WS_TOKEN_URL = `${WS_URL}?token=${token}`;

    const socket = new WebSocket(WS_TOKEN_URL);
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
      // when I get something by socket
      listenersRef.current.forEach((listener) => {
        listener(parsed);
      });
    };

    return () => {
      socket.close();
    };
  }, [user]);

  const sendEvent = (event: WSMessage) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(serializeEvent(event));
    } else {
      console.warn("[WS] Tried to send while disconnected", event);
    }
  };

  const subscribe = (handler: (event: WSMessage) => void) => {
    listenersRef.current.add(handler);
    // we return a way to unsubscribe from socket events
    return () => listenersRef.current.delete(handler);
  };

  console.log("WS PROVIDER", status, user);

  return (
    <WebSocketContext.Provider value={{ sendEvent, subscribe }}>
      {children}
    </WebSocketContext.Provider>
  );
};
