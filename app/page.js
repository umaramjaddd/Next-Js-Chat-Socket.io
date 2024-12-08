"use client";
import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
const socket = io("http://localhost:3001");
import { Chat, Inputs, SignUp } from "@/components";

export default function Home() {
  const [typing, setTyping] =useState([]);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const user = useRef("");
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on("user_joined", (newuser) => {
      console.log("user is:", newuser);
      setChat((prev) => [
        ...prev,
        {
          content: `${newuser.name} has joined the chat.`,
          user: newuser,
          type: "joined",
        },
      ]);
    });

    socket.on("user_typing", (data) => {
      if (!user.current) return;
      setTyping((prev) => {
        // Remove user if typing is false
        if (data.typing === false) {
          return prev.filter((u) => u.id !== data.user.id);
        }
        // Add user only if they are not already in the list
        if (!prev.some((u) => u.id === data.user.id)) {
          return [...prev, data.user];
        }
        // Return prev if no changes are needed
        return prev;
      });
      
      
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("user_joined");
    };
  }, []);

  useEffect(() => {
    console.log("typing by:", typing);
  }, [typing]);
  return (
    <main className="h-screen max-h-screen max-w-screen mx-auto md:container md:p-20 md:pt-4 bg-gray-900">
    {user.current ? (
      <>
        <Chat chat={chat} user={user.current} typing={typing} />
        <Inputs setChat={setChat} user={user.current} socket={socket} />
      </>
    ) : (
      <SignUp user={user} socket={socket} input={input} setInput={setInput} />
    )}
  </main>
  
  );
}
