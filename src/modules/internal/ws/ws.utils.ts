import type { WSMessage } from "./ws.events";

export const serializeEvent = (event: WSMessage): string => {
  return JSON.stringify(event);
};

export const deserializeEvent = (raw: string): WSMessage => {
  return JSON.parse(raw);
};
