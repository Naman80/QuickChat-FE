import type { ReactNode } from "react";
import { WebSocketProvider } from "../modules/internal/ws/WebsocketProvider";
import { ChatProvider } from "../modules/internal/chat/ChatProvider";
import { AuthProvider } from "../modules/internal/auth/AuthProvider";
import { SessionProvider } from "../modules/session/SessionProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <ChatProvider>
          <SessionProvider>{children}</SessionProvider>
        </ChatProvider>
      </WebSocketProvider>
    </AuthProvider>
  );
};
