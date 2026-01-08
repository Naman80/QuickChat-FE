import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import type { Conversation } from "../../chat/types/chat.types";

type Props = {
  conversation: Conversation | null;
  onSend: (text: string) => void;
};

export const ChatWindow = ({ conversation, onSend }: Props) => {
  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-neutral-500">
        Select a chat
      </div>
    );
  }

  return (
    <section className="flex-1 flex flex-col bg-[#212121] ">
      <header className="p-4 border-b border-neutral-800 bg-[#171717] font-bold">
        {conversation.participants[0].name}
      </header>

      <MessageList messages={conversation.messages} />

      <MessageInput onSend={onSend} />
    </section>
  );
};
