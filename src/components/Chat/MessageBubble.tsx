import { type Message } from "../../types/chat";

export const MessageBubble = ({ message }: { message: Message }) => {
  const isMine = message.senderId === "me";

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-3 py-2 rounded-lg text-base ${
          isMine ? "bg-green-600 text-white" : "bg-neutral-700 text-white"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};
