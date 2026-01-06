import type { SocketEvent } from "./socket.types";

export const serializeEvent = (event: SocketEvent): string => {
  return JSON.stringify(event);
};

export const deserializeEvent = (raw: string): SocketEvent => {
  return JSON.parse(raw);
};
