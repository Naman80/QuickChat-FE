import { Sidebar } from "./components/Sidebar/Sidebar";
import { ChatWindow } from "./components/Chat/ChatWindow";
import { AppLayout } from "./Layouts/AppLayout";
import { useChatContext } from "./chat/ChatContext";

export default function App() {
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
}
