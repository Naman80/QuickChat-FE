import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ChatWindow } from "../../components/Chat/ChatWindow";
import { AppLayout } from "../../Layouts/AppLayout";
import { useChatContextInternal } from "../../modules/internal/chat/ChatContext";
import {
  SESSION_STATUS,
  useSessionContext,
} from "../../modules/session/SessionContext";

export const ChatPage = () => {
  const { sessionStatus } = useSessionContext();
  const {
    conversationSummaries,
    activeConversation,
    sendMessage,
    setActiveConversation,
  } = useChatContextInternal();

  if (sessionStatus !== SESSION_STATUS.READY) {
    return <h1>Will add something that can make session ready state</h1>;
  }

  return (
    <AppLayout>
      <Sidebar
        conversationSummaries={conversationSummaries}
        activeConversationId={activeConversation?.conversationId ?? null}
        onSelect={setActiveConversation}
      />
      <ChatWindow conversation={activeConversation} onSend={sendMessage} />
    </AppLayout>
  );
};
