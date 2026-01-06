import { useState, type KeyboardEventHandler } from "react";

export const MessageInput = ({ onSend }: { onSend: (t: string) => void }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { key } = event;

    if (key == "Enter") {
      handleSend();
    }
  };

  return (
    <div className="p-4 flex gap-2 ">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-1 px-7 py-3 rounded-3xl outline-none bg-[#232625]"
        placeholder="Type a message"
      />
      <button
        onClick={handleSend}
        className="bg-green-600 px-4 py-2 rounded-full"
      >
        Send
      </button>
    </div>
  );
};
