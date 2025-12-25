function App() {
  return (
    <div className="bg-gray-300 w-230 h-180 p-6 flex flex-col justify-start gap-4 items-start">
      <h1>Simple Chat</h1>

      {/* Chat container */}
      <main
        id="chat-container"
        className="h-full bg-f9 w-full rounded-lg p-2 gap-6 flex flex-col"
      ></main>

      <form action="" className="w-full flex gap-2 h-fit">
        <textarea
          placeholder="Type a message..."
          className="w-full p-2 max-h-13 resize-none overflow-auto bg-f9 rounded-lg outline-0"
          maxLength={255}
          minLength={1}
          required
        ></textarea>
        <button>Send</button>
      </form>
    </div>
  );
}

export default App;
