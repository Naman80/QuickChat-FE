import type { ConversationSummary } from "../../modules/chat/types/chat.types";

interface IChatListItem {
  conversation: ConversationSummary;
  isActive: boolean;
  onClick: (conversationId: string) => void;
}

export const ChatListItem = ({
  conversation,
  isActive,
  onClick,
}: IChatListItem) => {
  return (
    <div
      onClick={() => onClick(conversation.id)}
      className={`px-4 py-3 flex items-center gap-4 cursor-pointer hover:bg-[#373737] rounded-xl ${
        isActive ? "bg-[#373737]" : ""
      }`}
    >
      <div className="h-10 w-10 rounded-full bg-[#171717] flex items-center justify-center text-xs text-neutral-500 uppercase">
        {conversation.title[0]}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold truncate">{conversation.title}</h3>
        <p className="text-xs text-neutral-500 truncate">
          {conversation.lastMessage}
        </p>
      </div>
      {conversation.unreadCount > 0 && (
        <div className="flex items-center justify-center h-5 bg-green-600 text-white text-xs rounded-full">
          {conversation.unreadCount}
        </div>
      )}
    </div>
  );
};
