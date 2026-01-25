import { createContext, useContext } from "react";
import type { User } from "../internal/auth/AuthContext";

export const SESSION_STATUS = {
  BOOTSTRAPPING: "BOOTSTRAPPING",
  UNAUTHENTICATED: "UNAUTHENTICATED",
  AUTHENTICATED: "AUTHENTICATED",
  CONNECTING: "CONNECTING",
  READY: "READY",
} as const;

export type SessionStatusType =
  (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS];

export type SessionContextValue = {
  user: User | null;
  sessionStatus: SessionStatusType;

  requestOtp(phone: string): Promise<void>;
  verifyOtpAndStartSession(phone: string, otp: string): Promise<void>;
  logout(): void;
};

export const SessionContext = createContext<SessionContextValue | null>(null);

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within an SessionProvider");
  }
  return context;
};
