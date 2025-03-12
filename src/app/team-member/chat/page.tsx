"use client";
import { useAuth } from "@/context/AuthProvider";
import axios from "axios";
import { useEffect, useState } from "react";

const Chat = () => {
  const { user } = useAuth();
  const [chat, setChat] = useState<any>(null);
  const [message, setMessage] = useState("");

  const fetchChat = async () => {
    try {
      const res = await axios.get("/api/chat");
      setChat(res.data.chat);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await axios.post("/api/chat/send", { content: message, chat, user });
      fetchChat();
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)] bg-base-300 rounded-lg shadow-lg">
      {/* Header */}
      <header className="bg-base-200 px-5 py-3 rounded-t-lg flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          {chat?.team?.name || "Team Chat"}
        </h1>
        <span className="text-sm text-base-content/70">
          {chat?.team?.domain}
        </span>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chat?.messages?.map((msg: any) => (
          <div
            key={msg._id}
            className={`chat ${
              msg.sender._id === user._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={msg.sender.profileImage} alt="User Avatar" />
              </div>
            </div>
            <div className="chat-header">
              {msg.sender.name}
              <time className="text-xs opacity-50 ml-2">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </time>
            </div>
            <div className="chat-bubble">{msg.content}</div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form
        onSubmit={sendMessage}
        className="bg-base-200 px-5 py-3 rounded-b-lg flex gap-3"
      >
        <input
          type="text"
          className="input input-bordered flex-1"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
