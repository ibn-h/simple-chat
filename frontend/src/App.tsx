import { useEffect, useRef } from "react";

function App() {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socketRef.current = socket;
    socket.onmessage = (event) => {
      console.log("Message from server, ", event.data);
    };
  }, []);

  const onSendMessage = () => {
    if (socketRef.current) {
      socketRef.current.send("Hello from client");
    }
  };

  return (
    <div className="bg-gray-300 w-230 h-180 p-6 flex flex-col justify-start gap-4 items-start">
      <h1>Simple Chat</h1>

      {/* Chat container */}
      <main
        id="chat-container"
        className="h-full bg-f9 w-full rounded-lg p-2 gap-6 flex flex-col"
      ></main>

      <div className="w-full flex gap-2 h-fit">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full text-black p-2 max-h-13 resize-none overflow-auto bg-f9 rounded-lg outline-0"
          maxLength={255}
          minLength={1}
        />
        <button onClick={onSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
