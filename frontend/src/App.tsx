import { useEffect, useRef, useState } from "react";
import MessageContainer from "./components/messageContainer";

type Message = {
  text: string;
  time: string;
};

function App() {
  const socketRef = useRef<WebSocket | null>(null);
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>("");

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

  const createMessage = (message: string) => {
    const newMessage: Message = {
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
  };

  const sendMessage = () => {
    if (socketRef.current && messageInputRef.current) {
      const message = messageInputRef.current.value;

      if (message.trim() !== "") {
        createMessage(message);
        socketRef.current.send(message);
        messageInputRef.current.value = "";
      }
    }
  };

  const joinChat = () => {
    const nameInput = nameInputRef.current;

    if (nameInput && nameInput.value.length != 0) {
      setUsername(nameInput.value);
    }
  };

  if (username == "") {
    return (
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1>Enter your username</h1>
        <div className="flex w-full h-fit items-center justify-center gap-3">
          <input
            ref={nameInputRef}
            id="name-input"
            className="p-3 border-2 border-black rounded-lg outline-0"
            type="text"
            placeholder={username}
          />
          <button className="" onClick={joinChat}>
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-300 w-230 h-180 p-6 flex flex-col justify-start gap-4 items-start">
      <h1>Simple Chat</h1>

      <main
        id="chat-container"
        className="h-full bg-f9 w-full rounded-lg p-2 gap-6 flex flex-col"
      >
        {messages.map((message, index) => (
          <MessageContainer
            key={index}
            text={message.text}
            time={message.time}
            name="JOE"
          />
        ))}
      </main>

      <div className="w-full flex gap-2 h-fit">
        <input
          ref={messageInputRef}
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
