import { Navigate, Outlet } from "react-router-dom";
import {
  SESSION_STATUS,
  useSessionContext,
} from "../modules/session/SessionContext";

export const PublicRoute = () => {
  const { sessionStatus } = useSessionContext();

  return sessionStatus === SESSION_STATUS.AUTHENTICATED ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
};
