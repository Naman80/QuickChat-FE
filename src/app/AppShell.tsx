import type { ReactNode } from "react";
import {
  SESSION_STATUS,
  useSessionContext,
} from "../modules/session/SessionContext";

export const AppShell = ({ children }: { children: ReactNode }) => {
  const { sessionStatus } = useSessionContext();

  if (sessionStatus === SESSION_STATUS.BOOTSTRAPPING) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading…</span>
      </div>
    );
  }

  return <>{children}</>;
};
