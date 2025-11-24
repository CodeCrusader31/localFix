// "use client";
// import { useEffect, useState } from "react";
// import { useAppContext } from "@/context/AppContext";

// export default function ServiceProviderChat({ roomId }) {
//   const { messages, sendMessage, joinRoom, user } = useAppContext();
//   const [newMessage, setNewMessage] = useState("");
//   const [activeRoom, setActiveRoom] = useState(roomId);

//   useEffect(() => {
//     if (roomId && user) {
//       joinRoom(roomId);
//       setActiveRoom(roomId);
//     }
//   }, [roomId, user, joinRoom]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (newMessage.trim() && activeRoom) {
//       await sendMessage(activeRoom, newMessage);
//       setNewMessage("");
//     }
//   };

//   return (
//     <div className="border rounded-lg p-4 bg-gray-50 h-full">
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Chat Room: {activeRoom}</h3>
//         <p className="text-sm text-gray-600">Service Provider Chat</p>
//       </div>

//       {/* Messages Display */}
//       <div className="h-96 overflow-y-auto border rounded-lg mb-4 p-3 bg-white">
//         {messages.length > 0 ? (
//           messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`my-2 p-3 rounded-lg max-w-xs md:max-w-md ${
//                 msg.senderId === user?.id
//                   ? "bg-blue-500 text-white ml-auto"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               <div className="flex justify-between items-start mb-1">
//                 <span className="text-xs font-medium">
//                   {msg.senderId === user?.id ? "You" : msg.senderName || "Customer"}
//                 </span>
//                 <span className="text-xs opacity-75">
//                   {new Date(msg.timestamp || msg.createdAt).toLocaleTimeString()}
//                 </span>
//               </div>
//               <p className="text-sm">{msg.message}</p>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-500 py-8">
//             No messages yet. Start a conversation!
//           </div>
//         )}
//       </div>

//       {/* Message Input */}
//       <form onSubmit={handleSendMessage} className="flex gap-2">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//         />
//         <button
//           type="submit"
//           disabled={!newMessage.trim()}
//           className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }

// components/ServiceProviderChat.jsx
"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";

export default function ServiceProviderChat({ roomId }) {
  const { messages, sendMessage, joinRoom, user, socket } = useAppContext();
  const [newMessage, setNewMessage] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);

  // Filter messages for current room
  useEffect(() => {
    if (roomId) {
      const filtered = messages.filter(msg => msg.roomId === roomId);
      setRoomMessages(filtered);
    }
  }, [messages, roomId]);

  // Join room when component mounts
  useEffect(() => {
    if (roomId && user) {
      console.log("Joining room:", roomId);
      joinRoom(roomId);
      
      // Load previous messages for this room
      fetch(`/api/messages/${roomId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("Loaded room messages:", data.messages);
            // Note: These will be added to the global messages state via context
          }
        })
        .catch((err) => {
          console.error("Error loading room messages:", err);
        });
    }
  }, [roomId, user, joinRoom]);

  // Debug socket events
  useEffect(() => {
    if (socket) {
      const handleReceiveMessage = (messageData) => {
        console.log("Received message in ServiceProviderChat:", messageData);
      };

      socket.on("receiveMessage", handleReceiveMessage);

      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
      };
    }
  }, [socket]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && roomId && user) {
      console.log("Sending message:", newMessage, "to room:", roomId);
      
      const messageData = {
        roomId,
        senderId: user.id,
        receiverId: "", // You need to determine who the receiver is
        message: newMessage.trim(),
      };

      try {
        await sendMessage(roomId, newMessage.trim());
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Chat Room: {roomId}</h3>
        <p className="text-sm text-gray-600">
          Socket: {socket?.connected ? "Connected" : "Disconnected"}
        </p>
      </div>

      {/* Messages Display */}
      <div className="flex-1 overflow-y-auto border rounded-lg mb-4 p-3 bg-white">
        {roomMessages.length > 0 ? (
          roomMessages.map((msg, i) => (
            <div
              key={i}
              className={`my-2 p-3 rounded-lg max-w-xs md:max-w-md ${
                msg.senderId === user?.id
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-medium">
                  {msg.senderId === user?.id ? "You" : "Customer"}
                </span>
                <span className="text-xs opacity-75">
                  {new Date(msg.createdAt || msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm">{msg.message}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No messages in this room yet.
          </div>
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}