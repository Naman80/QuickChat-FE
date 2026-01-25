import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useAuthContextInternal } from "../internal/auth/AuthContext";
import {
  useWebSocketInternal,
  WS_STATUS,
  type WSStatusType,
} from "../internal/ws/WebSocketContext";
import {
  clearLocalStorage,
  getLocalStorageItem,
  LOCALSTORAGE,
} from "../../utils/localStorage";
import {
  SESSION_STATUS,
  SessionContext,
  type SessionStatusType,
} from "./SessionContext";

function deriveSessionStatus(
  isAuthenticated: boolean,
  wsStatus: WSStatusType,
): SessionStatusType {
  if (!isAuthenticated) {
    return SESSION_STATUS.UNAUTHENTICATED;
  }

  switch (wsStatus) {
    case WS_STATUS.CONNECTED:
      return SESSION_STATUS.READY;

    case WS_STATUS.DISCONNECTED:
    default:
      return SESSION_STATUS.AUTHENTICATED;
  }
}

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<SessionStatusType>("BOOTSTRAPPING");

  const auth = useAuthContextInternal();
  const ws = useWebSocketInternal();

  console.log("Session provider Rendered", status, auth.user);

  /**
   * BOOTSTRAP SESSION (runs once)
   */
  useEffect(() => {
    if (!auth.user) {
      ws.disconnect();
      return;
    }

    // user exists → ensure WS is connected
    if (ws.wsStatus === WS_STATUS.DISCONNECTED) {
      const token = getLocalStorageItem(LOCALSTORAGE.TOKEN);
      if (token) {
        ws.connect(token);
      }
    }
  }, [auth.user, ws]); // dont add ws.status in dependency this will make infinite loop while re-connection

  /**
   * WS STATUS → SESSION STATUS
   */
  useEffect(() => {
    const nextStatus = deriveSessionStatus(Boolean(auth.user), ws.wsStatus);

    setStatus(nextStatus);
  }, [auth.user, ws.wsStatus]);

  const requestOtp = useCallback(
    (phone: string) => auth.requestOtp(phone),
    [auth],
  );

  const verifyOtpAndStartSession = useCallback(
    async (phone: string, otp: string) => {
      try {
        await auth.verifyOtp(phone, otp);

        const token = getLocalStorageItem(LOCALSTORAGE.TOKEN);

        if (!token) {
          throw new Error("Session token missing after OTP verification");
        }

        setStatus(SESSION_STATUS.AUTHENTICATED);
        ws.connect(token);
        setStatus(SESSION_STATUS.CONNECTING);

        // chat.initialize();
      } catch (error) {
        setStatus(SESSION_STATUS.UNAUTHENTICATED);
        console.error("Session start error:", error);
        throw error;
      }
    },
    [auth, ws],
  );

  const logout = useCallback(() => {
    ws.disconnect();
    // chat.reset();
    auth.clearUser();
    clearLocalStorage();
  }, [auth, ws]);

  return (
    <SessionContext.Provider
      value={{
        sessionStatus: status,

        // auth prov
        user: auth.user,
        requestOtp,
        verifyOtpAndStartSession,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
