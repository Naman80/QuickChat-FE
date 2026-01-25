import { Navigate, Outlet } from "react-router-dom";
import {
  SESSION_STATUS,
  useSessionContext,
} from "../modules/session/SessionContext";

export const ProtectedRoute = () => {
  const { sessionStatus } = useSessionContext();

  return sessionStatus !== SESSION_STATUS.UNAUTHENTICATED ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
