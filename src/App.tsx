// import { useEffect, useRef, useState } from "react";

// function App() {
//   const socket = useRef<WebSocket>(null);

//   const [input, setInput] = useState<string>();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//   };

//   const handleButtonClick = () => {
//     if (input) socket?.current?.send(input);
//   };

//   useEffect(() => {
//     const wsConnection = new WebSocket("ws://localhost:8080");

//     wsConnection.onopen = (e) => {
//       console.log(e);
//       wsConnection.send("hi server | client this side");
//     };

//     wsConnection.onmessage = (message) => {
//       console.log("Message from server", message);
//     };

//     socket.current = wsConnection;

//     return () => {
//       console.log("web server connection closed succ");
//       wsConnection.close();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Socket chat application</h1>
//       <input
//         type="text"
//         value={input}
//         onChange={handleInputChange}
//         className=""
//       />
//       <button onClick={handleButtonClick}>Send Message to Server</button>
//     </div>
//   );
// }

// export default App;

import { Sidebar } from "./components/Sidebar/Sidebar";
import { ChatWindow } from "./components/Chat/ChatWindow";
import { useChat } from "./hooks/useChat";
import { AppLayout } from "./Layouts/AppLayout";
import { WebSocketProvider } from "./websocket/WebsocketProvider";

export default function App() {
  const { chats, activeChat, setActiveChatId, sendMessage } = useChat();

  return (
    <WebSocketProvider>
      <AppLayout>
        <Sidebar
          chats={chats}
          activeChatId={activeChat?.id ?? null}
          onSelect={setActiveChatId}
        />
        <ChatWindow chat={activeChat} onSend={sendMessage} />
      </AppLayout>
    </WebSocketProvider>
  );
}
