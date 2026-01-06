import { type Chat } from "../../types/chat";
import { ChatListItem } from "./ChatListItem";

type Props = {
  chats: Chat[];
  activeChatId: string | null;
  onSelect: (id: string) => void;
};

export const Sidebar = ({ chats, activeChatId, onSelect }: Props) => {
  return (
    <aside className="w-100 border-r border-neutral-800 overflow-y-auto p-2 flex flex-col gap-2 bg-[#171717]">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          isActive={chat.id === activeChatId}
          onClick={() => onSelect(chat.id)}
        />
      ))}
    </aside>
  );
};
