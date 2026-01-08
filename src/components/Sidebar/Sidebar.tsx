import type { ConversationSummary } from "../../chat/types/chat.types";
import { ChatListItem } from "./ChatListItem";

interface ISidebar {
  conversationSummaries: ConversationSummary[];
  activeConversationId: string | null;
  onSelect: (conversationId: string) => void;
}

export const Sidebar = ({
  conversationSummaries,
  activeConversationId,
  onSelect,
}: ISidebar) => {
  return (
    <aside className="w-100 border-r border-neutral-800 overflow-y-auto p-2 flex flex-col gap-2 bg-[#171717]">
      {conversationSummaries.map((conversation) => (
        <ChatListItem
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === activeConversationId}
          onClick={onSelect}
        />
      ))}
    </aside>
  );
};
