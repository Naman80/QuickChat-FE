import type { Message } from "../../modules/internal/chat/types/chat.types";
import { MessageBubble } from "./MessageBubble";

export const MessageList = ({ messages }: { messages: Message[] }) => {
  console.log(messages, "messages");

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};
