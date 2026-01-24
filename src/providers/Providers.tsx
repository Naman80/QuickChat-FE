import type { ReactNode } from "react";
import { WebSocketProvider } from "../modules/ws/WebsocketProvider";
import { ChatProvider } from "../modules/chat/ChatProvider";
import { AuthProvider } from "../modules/auth/AuthProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <ChatProvider>{children}</ChatProvider>
      </WebSocketProvider>
    </AuthProvider>
  );
};
