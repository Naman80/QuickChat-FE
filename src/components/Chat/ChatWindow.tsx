import { type Chat } from "../../types/chat";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

type Props = {
  chat: Chat | null;
  onSend: (text: string) => void;
};

export const ChatWindow = ({ chat, onSend }: Props) => {
  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-neutral-500">
        Select a chat
      </div>
    );
  }

  return (
    <section className="flex-1 flex flex-col bg-[#212121] ">
      <header className="p-4 border-b border-neutral-800 bg-[#171717] font-bold">
        {chat.participants[0].name}
      </header>

      <MessageList messages={chat.messages} />

      <MessageInput onSend={onSend} />
    </section>
  );
};
