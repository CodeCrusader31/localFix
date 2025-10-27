"use client";
import { useAppContext } from "@/context/AppContext";

export default function MessagesPage() {
  const { messages, user } = useAppContext();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <ul className="space-y-2">
        {messages.map((msg, i) => (
          <li
            key={i}
            className={`p-3 rounded ${
              msg.senderId === user?._id ? "bg-blue-100 text-right" : "bg-gray-200"
            }`}
          >
            <strong>{msg.senderName}:</strong> {msg.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
