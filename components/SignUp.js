const SignUp = ({ user, socket, input, setInput }) => {
  const addUser = () => {
    user.current = { name: input, id: socket.id };
    socket.emit("new_user", user.current);
    setInput("");
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
      <div className="text-center grid grid-rows-3 gap-2 gradient p-8 rounded-md">
        <p className="text-2xl font-bold text-white">Umar Chat App</p>
        <div className="space-y-2 flex flex-col items-start ">
          <p className="font-medium text-gray-300">Enter your name to join</p>
          <input
            value={input}
            type="text"
            className="text-center rounded-md p-2 my-2 text-blue-700 placeholder-blue-300 focus:outline-none"
            placeholder="Enter your name here..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addUser()}
          />
        </div>
        <button
          className={`w-full h-[48px] ${
            input ? "bg-green-400" : "bg-gray-600"
          } rounded-md py-2 text-white font-semibold shadow-md hover:bg-gray-700 transition-all duration-300 ease-in-out`}
          disabled={!input}
          onClick={addUser}
        >
          Enter Chat
        </button>
      </div>
    </div>
  );
};

export default SignUp;
