// "use client";
// import { useAppContext } from "@/context/AppContext";
// import {useState } from "react";
// // export default function MessagesPage() {
// //   const { messages, user } = useAppContext();

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">Messages</h1>
// //       <ul className="space-y-2">
// //         {messages.map((msg, i) => (
// //           <li
// //             key={i}
// //             className={`p-3 rounded ${
// //               msg.senderId === user?._id ? "bg-blue-100 text-right" : "bg-gray-200"
// //             }`}
// //           >
// //             <strong>{msg.senderName}:</strong> {msg.text}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// import { Search, Send, Paperclip, MoreVertical } from "lucide-react";

// export default function MessagesPage() {
//   const [selectedChat, setSelectedChat] = useState(1);
//   const [message, setMessage] = useState("");

//   const conversations = [
//     { id: 1, name: "John Smith", lastMessage: "Thanks for the great service!", unread: 2, time: "10:30 AM" },
//     { id: 2, name: "Sarah Johnson", lastMessage: "When are you available?", unread: 0, time: "Yesterday" },
//     { id: 3, name: "Mike Williams", lastMessage: "The plumbing looks great!", unread: 0, time: "Oct 20" },
//   ];

//   const messages = {
//     1: [
//       { id: 1, text: "Hi, I need help with a leaky faucet", sender: "client", time: "10:15 AM" },
//       { id: 2, text: "I can help with that. When are you available?", sender: "provider", time: "10:20 AM" },
//       { id: 3, text: "Thanks for the great service!", sender: "client", time: "10:30 AM" },
//     ],
//     2: [
//       { id: 1, text: "Hello, I need electrical work done", sender: "client", time: "Yesterday" },
//       { id: 2, text: "What type of electrical work do you need?", sender: "provider", time: "Yesterday" },
//     ]
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       // Add message sending logic here
//       setMessage("");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 h-[calc(100vh-4rem)]">
//       <div className="bg-white rounded-lg shadow-md h-full flex">
//         {/* Conversations List */}
//         <div className="w-1/3 border-r border-gray-200 flex flex-col">
//           <div className="p-4 border-b border-gray-200">
//             <h1 className="text-xl font-bold text-gray-900">Messages</h1>
//             <div className="mt-3 relative">
//               <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search conversations..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </div>
//           <div className="flex-1 overflow-y-auto">
//             {conversations.map((conversation) => (
//               <div
//                 key={conversation.id}
//                 onClick={() => setSelectedChat(conversation.id)}
//                 className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
//                   selectedChat === conversation.id ? "bg-blue-50" : ""
//                 }`}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
//                       <span className="text-white font-medium text-sm">
//                         {conversation.name.split(' ').map(n => n[0]).join('')}
//                       </span>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">{conversation.name}</h3>
//                       <p className="text-sm text-gray-500 truncate max-w-xs">{conversation.lastMessage}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-xs text-gray-400">{conversation.time}</span>
//                     {conversation.unread > 0 && (
//                       <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                         {conversation.unread}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Chat Area */}
//         <div className="flex-1 flex flex-col">
//           {/* Chat Header */}
//           <div className="p-4 border-b border-gray-200 flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
//                 <span className="text-white font-medium text-sm">
//                   {conversations.find(c => c.id === selectedChat)?.name.split(' ').map(n => n[0]).join('')}
//                 </span>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900">
//                   {conversations.find(c => c.id === selectedChat)?.name}
//                 </h3>
//                 <p className="text-sm text-gray-500">Online</p>
//               </div>
//             </div>
//             <button className="p-2 hover:bg-gray-100 rounded-lg">
//               <MoreVertical className="h-5 w-5 text-gray-400" />
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//             {messages[selectedChat]?.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex ${msg.sender === "provider" ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                     msg.sender === "provider"
//                       ? "bg-blue-600 text-white"
//                       : "bg-white text-gray-900 border border-gray-200"
//                   }`}
//                 >
//                   <p>{msg.text}</p>
//                   <p className={`text-xs mt-1 ${
//                     msg.sender === "provider" ? "text-blue-200" : "text-gray-400"
//                   }`}>
//                     {msg.time}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Message Input */}
//           <div className="p-4 border-t border-gray-200">
//             <form onSubmit={handleSendMessage} className="flex space-x-2">
//               <button type="button" className="p-2 hover:bg-gray-100 rounded-lg">
//                 <Paperclip className="h-5 w-5 text-gray-400" />
//               </button>
//               <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type a message..."
//                 className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 <Send className="h-5 w-5" />
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useAppContext } from "@/context/AppContext";
import { useState, useEffect } from "react";
import { Search, Send, MoreVertical } from "lucide-react";
import ServiceProviderChat from "@/components/ServiceProviderChat";

export default function ServiceProviderMessagesPage() {
  const { user, joinRoom } = useAppContext();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch provider's conversations
  useEffect(() => {
    if (user?.role === "serviceProvider") {
      // You'll need to implement this API endpoint
      fetch(`/api/conversations/provider/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setConversations(data.conversations);
          }
        })
        .catch(err => console.error("Error fetching conversations:", err));
    }
  }, [user]);

  const handleSelectConversation = (roomId) => {
    setSelectedRoom(roomId);
    joinRoom(roomId);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 h-[calc(100vh-4rem)]">
      <div className="bg-white rounded-lg shadow-md h-full flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            <div className="mt-3 relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.roomId}
                onClick={() => handleSelectConversation(conversation.roomId)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedRoom === conversation.roomId ? "bg-blue-50 border-blue-200" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {conversation.customerName?.split(' ').map(n => n[0]).join('') || "C"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conversation.customerName || "Customer"}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.lastMessage || "No messages yet"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs text-gray-400">
                      {conversation.lastMessageTime ? 
                        new Date(conversation.lastMessageTime).toLocaleDateString() : 
                        "New"
                      }
                    </span>
                    {conversation.unreadCount > 0 && (
                      <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedRoom ? (
            <ServiceProviderChat roomId={selectedRoom} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">No Conversation Selected</h3>
                <p>Select a conversation from the list to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}