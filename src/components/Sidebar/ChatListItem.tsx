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
      className={`px-4 py-3 flex items-center gap-4 cursor-pointer hover:bg-[#373737] rounded-xl ${
        isActive ? "bg-[#373737]" : ""
      }`}
    >
      <div className="rounded-full h-12 w-16 bg-gray-400"></div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-row justify-between items-center">
          <span className="font-medium">{conversation.title}</span>
          <span className="text-xs mt-1 ml-1 text-neutral-400">
            {/* {conversation.lastMessageAt} */}
            Yesterday
          </span>
        </div>
        <div className="text-sm text-neutral-400 truncate">
          {conversation.lastMessage}
        </div>
      </div>
    </div>
  );
};
