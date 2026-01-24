import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { PhoneInput } from "./components/Auth/PhoneInput";
import { OTPVerification } from "./components/Auth/OTPVerification";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ChatWindow } from "./components/Chat/ChatWindow";
import { AppLayout } from "./Layouts/AppLayout";
import { useChatContext } from "./modules/chat/ChatContext";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<PhoneInput />} />
        <Route path="/verify-otp" element={<OTPVerification />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="chat" element={<ChatApp />} />
          <Route index element={<Navigate to="/chat" replace />} />
        </Route>

        {/* Catch all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// Original ChatApp component
const ChatApp = () => {
  const {
    conversationSummaries,
    conversations,
    activeConversationId,
    sendMessage,
    setActiveConversationId,
  } = useChatContext();

  const activeConversation = conversations[activeConversationId ?? ""] ?? null;

  return (
    <AppLayout>
      <Sidebar
        conversationSummaries={conversationSummaries}
        activeConversationId={activeConversationId}
        onSelect={setActiveConversationId}
      />
      <ChatWindow conversation={activeConversation} onSend={sendMessage} />
    </AppLayout>
  );
};
