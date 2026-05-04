
"use client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

let socket;

export default function ChatBox({ roomId, receiverId, senderId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // ✅ Initialize socket safely
  useEffect(() => {
    if (!socket) {
      socket = io("http://localhost:4000", {
        transports: ["websocket"],
      });
    }

    // const handleReceiveMessage = (message) => {
    //   console.log("📩 Incoming:", message);

    //   //setMessages((prev) => [...prev, message]);
    //   scrollToBottom();
    // };

    const handleReceiveMessage = (message) => {
  console.log("📩 Incoming:", message);

  const normalizedMessage = {
    ...message,
    message:
      typeof message.message === "string"
        ? message.message
        : message.message?.text || "",
  };

  setMessages((prev) => [...prev, normalizedMessage]);
  scrollToBottom();
};

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  // ✅ Join room safely
  useEffect(() => {
    if (!roomId || !socket) return;

    console.log("Joining room:", roomId);
    socket.emit("joinRoom", roomId);

    // Load old messages
    fetch(`/api/messages/${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
         setMessages(
  (data.messages || []).map((msg) => ({
    ...msg,
    message:
      typeof msg.message === "string"
        ? msg.message
        : msg.message?.text || "",
  }))
);
          scrollToBottom();
        }
      })
      .catch((err) => console.error(err));
  }, [roomId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !socket) return;

    const messageObj = {
      roomId,
      senderId,
      receiverId,
      message: newMessage.trim(),
      createdAt: new Date(),
    };

    // ✅ Optimistic UI
    setMessages((prev) => [...prev, messageObj]);
    scrollToBottom();

    // ✅ Emit to socket
    socket.emit("sendMessage", messageObj);

    // ✅ Save to DB
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageObj),
      });
    } catch (err) {
      console.error("DB save failed:", err);
    }

    setNewMessage("");
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="h-64 overflow-y-auto border-b mb-3 p-2 bg-white flex flex-col">
        {messages.length > 0 ? (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`my-2 p-2 rounded-md max-w-[75%] ${
                msg.senderId === senderId
                  ? "bg-blue-500 text-white self-end text-right"
                  : "bg-gray-200 text-black self-start text-left"
              }`}
            >
              {/* ✅ SAFE MESSAGE RENDER */}
              {typeof msg.message === "string"
                ? msg.message
                : msg.message?.text || ""}

              {/* ✅ Optional timestamp */}
              <div className="text-xs opacity-70 mt-1">
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString()
                  : ""}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet.</p>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}