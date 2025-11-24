// "use client";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// let socket;

// export default function ChatBox({ roomId, receiverId, senderId }) {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     // connect to socket server
//     socket = io("http://localhost:4000", {
//       transports: ["websocket"],
//     });

//     if (roomId) {
//       socket.emit("joinRoom", roomId);

//       // load old messages
//       fetch(`/api/messages/${roomId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) setMessages(data.messages);
//         });

//       // listen for new messages
//       socket.on("recieveMessage", (message) => {
//         setMessages((prev) => [...prev, message]);
//       });
//     }

//     return () => {
//       socket.disconnect();
//     };
//   }, [roomId]);

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     const messageObj = {
//       roomId,
//       senderId,
//       receiverId,
//       message: newMessage,
//     };

//     // emit to socket for real-time
//     socket.emit("SendMessage", messageObj);

//     // save to DB
//     await fetch("/api/messages", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(messageObj),
//     });

//     setNewMessage("");
//   };

//   return (
//     <div className="border rounded-lg p-4 bg-gray-50">
//       <div className="h-64 overflow-y-auto border-b mb-3 p-2 bg-white">
//         {messages.length > 0 ? (
//           messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`my-2 p-2 rounded-md ${
//                 msg.senderId === senderId
//                   ? "bg-blue-500 text-white self-end text-right"
//                   : "bg-gray-200 text-black self-start text-left"
//               }`}
//             >
//               {msg.message}
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center">No messages yet.</p>
//         )}
//       </div>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="flex-1 border rounded-lg px-3 py-2"
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

let socket;

export default function ChatBox({ roomId, receiverId, senderId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // ✅ connect only once
    if (!socket) {
      socket = io("http://localhost:4000", {
        transports: ["websocket"],
      });
    }

    // ✅ Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    if (!roomId) return;

    // ✅ join room
    socket.emit("joinRoom", roomId);

    // ✅ load old chat history
    fetch(`/api/messages/${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMessages(data.messages);
        scrollToBottom();
      });

  }, [roomId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageObj = {
      roomId,
      senderId,
      receiverId,
      message: newMessage,
    };
        setMessages((prev) => [...prev, messageObj]);
  scrollToBottom();

    // ✅ emit to socket server
    socket.emit("sendMessage", messageObj);

    // ✅ save to DB
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageObj),
    });

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
              {msg.message}
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
