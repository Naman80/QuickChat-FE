import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { PhoneInputPage } from "../pages/auth/PhoneInputPage";
import { OTPVerificationPage } from "../pages/auth/OTPVerificationPage";
import { ChatPage } from "../pages/chat/ChatPage";
import { PublicRoute } from "../routes/PublicRoute";

export const AppRoutes = () => (
  <Routes>
    {/* Public-only routes */}
    <Route element={<PublicRoute />}>
      <Route path="/login" element={<PhoneInputPage />} />
      <Route path="/verify-otp" element={<OTPVerificationPage />} />
    </Route>

    {/* Protected routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="/chat" element={<ChatPage />} />
      <Route index element={<Navigate to="/chat" replace />} />
    </Route>

    {/* Catch all */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
