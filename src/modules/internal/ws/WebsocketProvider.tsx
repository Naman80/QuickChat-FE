import React, { useCallback, useRef, useState } from "react";
import { deserializeEvent, serializeEvent } from "./ws.utils";
import {
  WebSocketContext,
  WS_STATUS,
  type WSStatusType,
} from "./WebSocketContext";
import type { WSMessage } from "./ws.events";
import { WS_URL } from "./ws.constants";

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<WebSocket | null>(null);
  const listenersRef = useRef<Set<(parsedEvent: WSMessage) => void>>(new Set());
  const [wsStatus, setWsStatus] = useState<WSStatusType>(
    WS_STATUS.DISCONNECTED,
  );

  const connect = useCallback((token: string) => {
    if (socketRef.current) return;

    console.log("CONNECTING TO WS");

    const socket = new WebSocket(`${WS_URL}?token=${token}`);

    socketRef.current = socket;

    socket.onopen = () => {
      console.info("[WS] Connected");
      setWsStatus(WS_STATUS.CONNECTED);
    };

    socket.onclose = () => {
      socketRef.current = null;
      console.info("[WS] Disconnected");
      setWsStatus(WS_STATUS.DISCONNECTED);
    };

    socket.onerror = (err) => {
      console.info("[WS] Error", err);
      socketRef.current = null;
      setWsStatus(WS_STATUS.DISCONNECTED);
    };

    socket.onmessage = (event) => {
      const parsed = deserializeEvent(event.data);
      console.debug("[WS] Incoming", parsed);
      listenersRef.current.forEach((listener) => {
        listener(parsed);
      });
    };
  }, []);

  const disconnect = useCallback(() => {
    socketRef.current?.close();
    socketRef.current = null;
    listenersRef.current.clear(); // we have to check if this is needed
    setWsStatus(WS_STATUS.DISCONNECTED);
  }, []);

  const subscribe = useCallback((handler: (e: WSMessage) => void) => {
    listenersRef.current.add(handler);
    // we return a way to unsubscribe from socket events
    return () => listenersRef.current.delete(handler);
  }, []);

  const sendEvent = useCallback((event: WSMessage) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(serializeEvent(event));
    } else {
      console.warn("[WS] Tried to send while disconnected", event);
    }
  }, []);

  console.log("WS PROVIDER Rendered | STATUS:", wsStatus);

  return (
    <WebSocketContext.Provider
      value={{ connect, disconnect, sendEvent, subscribe, wsStatus }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
