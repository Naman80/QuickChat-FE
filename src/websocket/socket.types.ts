export type SocketEventType =
  | "CONNECT"
  | "DISCONNECT"
  | "MESSAGE_SEND"
  | "MESSAGE_RECEIVE"
  | "ERROR";

export interface SocketEvent<T = unknown> {
  type: SocketEventType;
  payload: T;
}

export type SocketStatus = "connecting" | "connected" | "disconnected";
