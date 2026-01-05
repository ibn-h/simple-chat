import { useEffect, useRef, useState } from "react";
import { BACKGROUND_COLOR_ME, BACKGROUND_COLOR_OTHER } from "./CONSTANTS.json";
import MessageContainer from "./components/messageContainer";

type Message = {
  text: string;
  time: string;
  sender: string;
};

function App() {
  const socketRef = useRef<WebSocket | null>(null);
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>("");

  const getDateTimeString = () => {
    const date = new Date();
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sendMessage = () => {
    if (!socketRef.current || !messageInputRef.current) {
      return;
    }

    const message = messageInputRef.current.value;

    if (message.trim() !== "") {
      const newMessage: Message = {
        text: message,
        sender: username,
        time: getDateTimeString(),
      };

      setMessages((prev) => [...prev, newMessage]);
      messageInputRef.current.value = "";

      socketRef.current.send(
        JSON.stringify({
          type: "message",
          text: message,
        })
      );
    }
  };

  const joinChat = () => {
    const nameInput = nameInputRef.current;

    if (!socketRef.current) {
      return;
    }

    if (nameInput && nameInput.value.length != 0) {
      setUsername(nameInput.value);

      socketRef.current.send(
        JSON.stringify({
          type: "setUsername",
          username: nameInput.value,
        })
      );
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.0.251:3000");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);

      if (data.type === "message") {
        const newMessage: Message = {
          text: data.text,
          sender: data.username,
          time: getDateTimeString(),
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

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
            placeholder={"ENTER NAME"}
            defaultValue={"JOE"}
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
        className="h-full bg-f9 w-full rounded-lg p-2 gap-6 flex flex-col overflow-auto"
      >
        {messages.map((message, index) => (
          <MessageContainer
            key={index}
            text={message.text}
            time={message.time}
            name={message.sender}
            justifySelf={message.sender == username ? "end" : "start"}
            bubbleColor={
              message.sender == username
                ? BACKGROUND_COLOR_ME
                : BACKGROUND_COLOR_OTHER
            }
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
          defaultValue={"Hello World!"}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
