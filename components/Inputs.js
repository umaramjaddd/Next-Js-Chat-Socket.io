"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { send, upload } from "@/assets";

const Inputs = ({ setChat, user, socket }) => {
  const uploadInput = useRef(null);
  const [input, setInput] = useState("");
  const userTyping = (e) => {
    setInput(e.target.value);
    socket.emit("user_typing", {user, typing: e.target.value ? true : false})
  };
  const sendMessage = () => {
    if (input) {
      const msg = { content: input, type: "text", user };
      socket.emit("send_message", msg);
      socket.emit("user_typing", {user, typing:  false})
      setChat((prev) => [...prev, msg]);
      setInput("");
    } else uploadInput.current.click();
  };
  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file.type === "image/jpeg" || file.type === "image/png") {
      const image = URL.createObjectURL(file);
      console.log(image);
      const msg = {
        content: image,
        type: "image",
        user,
      };

      setChat((prev) => [...prev, msg]);
      socket.emit("send_message", msg);
    }
  };
  return (
    <div className="w-full absolute bottom-0 text-sm grid grid-cols-5 gradient md:bg-none md:text-lg md:flex md:justify-center md:relative">
  <input
    className="focus:outline-none rounded-lg p-2 text-white placeholder-slate-100 col-span-4 bg-gray-700 md:w-6/12 md:mr-2"
    type="text"
    placeholder="Enter your message"
    value={input}
    onChange={(e) => userTyping(e)}
    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  />
  <input
    className="hidden"
    type="file"
    ref={uploadInput}
    onChange={(e) => handleImageUpload(e)}
  />
  <button className="w-full py-1 px-2 bg-sky-400 text-white font-semibold rounded text-sm gradient md:w-1/12 md:text-base">
    <Image
      src={input ? send : upload}
      className="w-4 md:w-8 mx-auto"
      alt="send"
      height={10}
      width={10}
      onClick={sendMessage}
    />
  </button>
</div>

  );
};

export default Inputs;
