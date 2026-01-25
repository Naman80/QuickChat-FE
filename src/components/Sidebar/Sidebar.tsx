import type { ConversationSummary } from "../../modules/internal/chat/types/chat.types";
import { useSessionContext } from "../../modules/session/SessionContext";
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
  const { user, logout } = useSessionContext();

  return (
    <aside className="w-100 border-r border-neutral-800 overflow-y-auto p-2 flex flex-col gap-2 bg-[#171717]">
      <div className="p-4 border-b border-neutral-800">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold">QuickChat</div>
          <div className="text-sm text-gray-400">{user?.phone}</div>
        </div>
      </div>

      {conversationSummaries.map((conversation) => (
        <ChatListItem
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === activeConversationId}
          onClick={onSelect}
        />
      ))}

      <div className="mt-auto p-4 flex flex-col gap-5">
        <button
          // onClick={createNewChat}
          className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Create Room
        </button>
        <button
          onClick={logout}
          className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};
