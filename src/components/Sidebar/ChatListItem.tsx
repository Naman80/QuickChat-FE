import type { ConversationSummary } from "../../chat/types/chat.types";

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
      className={`px-4 py-3 cursor-pointer hover:bg-[#373737] rounded-2xl ${
        isActive ? "bg-[#373737]" : ""
      }`}
    >
      <div className="font-medium">{conversation.title}</div>
      <div className="text-sm text-neutral-400 truncate">
        {conversation.lastMessage}
      </div>
    </div>
  );
};
