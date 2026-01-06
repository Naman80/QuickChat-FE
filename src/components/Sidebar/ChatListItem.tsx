import { type Chat } from "../../types/chat";

type Props = {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
};

export const ChatListItem = ({ chat, isActive, onClick }: Props) => {
  const lastMessage = chat.messages.at(-1);

  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 cursor-pointer hover:bg-[#373737] rounded-2xl ${
        isActive ? "bg-[#373737]" : ""
      }`}
    >
      <div className="font-medium">{chat.participants[0].name}</div>
      <div className="text-sm text-neutral-400 truncate">
        {lastMessage?.text}
      </div>
    </div>
  );
};
