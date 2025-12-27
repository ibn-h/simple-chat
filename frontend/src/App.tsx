import { useEffect, useRef } from "react";

function App() {
  const socketRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [messages, setMessages] = useState([]);
  // const [input, setInput] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && inputRef.current) {
      const message = inputRef.current.value;
      if (message.trim() !== "") {
        socketRef.current.send(message);
        inputRef.current.value = "";
      }
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
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          className="w-full text-black p-2 max-h-13 resize-none overflow-auto bg-f9 rounded-lg outline-0"
          maxLength={255}
          minLength={1}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
