import type { ReactNode } from "react";
import { WebSocketProvider } from "../ws/WebsocketProvider";
import { ChatProvider } from "../chat/ChatProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <WebSocketProvider>
      <ChatProvider>{children}</ChatProvider>
    </WebSocketProvider>
  );
};
