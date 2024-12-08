import { useEffect, useRef } from "react"
const Chat = ({ chat, user, typing }) => {
  const scroller = useRef(null);
    useEffect(() => {
    if(!scroller.current) return

    scroller.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
}, [chat])
  return (
    <div className="h-full pb-12 md:p-4 bg-gray-900">
    <div className="w-full h-full max-h-screen rounded-md overflow-y-auto bg-gray-800 pt-2 md:pt-6">
      {chat.map((message, index) => (
        <Message key={index} message={{ ...message, own: message.user.id === user.id }} />
      ))}
      {typing[0] && <Typing user={typing[0]} />}
      <div ref={scroller} className="pb-2 md:pb-6" />
    </div>
  </div>
  
  );
};

const Typing = ({ user }) => {
  return (
    <div className="px-2 mt-2 flex items-center">
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">{user.name.charAt(0).toUpperCase()}</span>
          </div>
      <div className="loader rounded-md p-2 flex items-center">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

const Message = ({ message }) => {
  const { content, type, own, user } = message; // Destructure properties from the message object
  console.log(type); // Log the type for debugging

  return (
    <div className={`px-2 flex ${own ? "justify-end" : "justify-start"}`}>
      {type === "joined" ? (
        <div className="flex items-center space-x-2">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          {/* Message content */}
          <p className="text-gray-500 text-sm font-medium">{content}</p>
        </div>
      ) : (
        <div className={`message space-x-2 flex ${type!=="image" && "items-center" } align-center py-1 flex ${own ? "justify-end" : "justify-start"}`}>
          {/* Display the logo for other users */}
          {!own && (
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          )}

          {/* Message content */}
          <span
            className={` py-2 rounded-md ${
              type === "text" ? "px-6" : "px-2"
            } ${own ? "bg-sky-400 text-white" : "bg-slate-300"}`}
          >
            {type === "text" ? (
              content
            ) : type === "image" ? (
              <img src={content} className="rounded-md max-w-[150px]" alt="image" />
            ) : type === "typing" ? (
              <span className="text-gray-500">...</span>
            ) : null}
          </span>
        </div>
      )}
    </div>
  );
};
 
export default Chat;
