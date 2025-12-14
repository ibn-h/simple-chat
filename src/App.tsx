function App() {
  return (
    <div className="bg-gray-300 w-230 h-180 p-6 flex flex-col justify-start gap-4 items-start">
      <h1>Simple Chat</h1>

      {/* Chat container */}
      <main className="h-full bg-f9 w-full rounded-lg p-2 gap-6 flex flex-col">
        <div className="flex gap-3 items-end">
          <div className="bg-gray-200 w-16 h-16 rounded-full"></div>
          <div className="bg-gray-200 w-fit p-4 rounded-lg">
            <div className="w-full flex items-start justify-between mb-2">
              <p className="text-lg font-semibold">ALI</p>
              <p>7:00</p>
            </div>

            <p>SALAMU ALAYKOM WORLD!</p>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-3 items-end">
          <div className="bg-gray-200 w-16 h-16 rounded-full"></div>
          <div className="bg-blue text-white w-fit p-4 rounded-lg">
            <div className="w-full flex items-start justify-between mb-2">
              <p className="text-lg font-semibold">ME</p>
              <p>7:01</p>
            </div>

            <p>WA ALAYKOM SALAM!</p>
          </div>
        </div>
      </main>

      <form action="" className="w-full flex gap-2 h-fit">
        <textarea
          placeholder="Type a message..."
          className="w-full p-2 max-h-[52px] resize-none overflow-auto bg-f9 rounded-lg outline-0"
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
