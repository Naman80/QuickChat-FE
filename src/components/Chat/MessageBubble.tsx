import type { Message } from "../../modules/chat/types/chat.types";

export const MessageBubble = ({ message }: { message: Message }) => {
  const isMine = message.senderId === "me";

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-3 py-2 rounded-lg text-base ${
          isMine ? "bg-green-600 text-white" : "bg-neutral-700 text-white"
        }`}
      >
        {message.data}
      </div>
    </div>
  );
};
