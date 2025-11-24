


// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import { io } from "socket.io-client"; // install: npm install socket.io-client

// // Create context
// const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState("guest");
//   const [loading, setLoading] = useState(true);
//   const [messages, setMessages] = useState([]);
//   // 🔹 Add socket state
//   const [socket, setSocket] = useState(null);

//   // Fetch latest user info from /api/me on initial load
//   const fetchMe = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/me", {
//         credentials: "include",
//         cache: "no-store",
//       });
//       const data = await res.json();
//       console.log("Response from /api/me:", { status: res.status, data });
//       if (res.ok && data.user) {
//         setUser(data.user);
//         setRole(data.user.role || "guest");
//       } else {
//         setUser(null);
//         setRole("guest");
//       }
//     } catch (err) {
//       console.error("Failed to fetch user:", err);
//       setUser(null);
//       setRole("guest");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Run on first load to check session
//   useEffect(() => {
//     fetchMe();
//   }, []);

//   // 🔹 Initialize WebSocket when user logs in
//   useEffect(() => {
//     if (user) {
//       const socketInstance = io("http://localhost:4000", {
//         query: { userId: user.id }, // optional: identify user
//       });

//       setSocket(socketInstance);

//       socketInstance.on("connect", () => {
//         console.log("WebSocket connected:", socketInstance.id);
//       });

//       socketInstance.on("disconnect", () => {
//         console.log("WebSocket disconnected");
//       });

//         socketInstance.on("receiveMessage", (data) => {
//       console.log("Message received:", data);
//       setMessages((prev) => [...prev, data]);
//     });

//       return () => {
//         socketInstance.disconnect();
//       };
//     }
//   }, [user]);

//   // Login function updates user and role
//   const login = (userData) => {
//     setUser(userData);
//     setRole(userData.role || "guest");
//   };

//   // Logout function clears user and role + socket
//   const logout = async () => {
//     try {
//       await fetch("/api/auth/logout", { method: "POST" });
//     } catch (error) {
//       console.error("Logout API call failed:", error);
//     } finally {
//       setUser(null);
//       setRole("guest");
//       if (socket) {
//         socket.disconnect();
//         setSocket(null);
//       }
//     }
//   };

//   // 🔹 Room & messaging helpers
//   const joinRoom = (roomId) => {
//     if (socket) {
//       socket.emit("joinRoom", roomId);
//     }
//   };

//   const sendMessage = (roomId, message) => {
//     if (socket) {
//       socket.emit("sendMessage", { roomId, message });
//     }
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         role,
//         isAuthenticated: !!user,
//         loading,
//         login,
//         logout,
//         fetchMe,
//         // 🔹 Expose WebSocket utilities
//         socket,
//         joinRoom,
//         sendMessage,
//         messages,   // 🔹 add this
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// // Custom hook
// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error("useAppContext must be used within an AppContextProvider");
//   }
//   return context;
// };


// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState("guest");
//   const [loading, setLoading] = useState(true);
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);

//   // Updated fetchMe to match new /api/me response structure
//   const fetchMe = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/me", {
//         credentials: "include",
//         cache: "no-store",
//       });
//       const data = await res.json();
//       console.log("Response from /api/me:", { status: res.status, data });
      
//       if (res.ok && data.user) {
//         setUser(data.user);
//         setRole(data.user.role || "guest");
//       } else {
//         setUser(null);
//         setRole("guest");
//       }
//     } catch (err) {
//       console.error("Failed to fetch user:", err);
//       setUser(null);
//       setRole("guest");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Run on first load to check session
//   useEffect(() => {
//     fetchMe();
//   }, []);

//   // WebSocket initialization (unchanged)
//   useEffect(() => {
//     if (user) {
//       const socketInstance = io("http://localhost:4000", {
//         query: { userId: user.id },
//       });

//       setSocket(socketInstance);

//       socketInstance.on("connect", () => {
//         console.log("WebSocket connected:", socketInstance.id);
//       });

//       socketInstance.on("disconnect", () => {
//         console.log("WebSocket disconnected");
//       });

//       socketInstance.on("receiveMessage", (data) => {
//         console.log("Message received:", data);
//         setMessages((prev) => [...prev, data]);
//       });

//       return () => {
//         socketInstance.disconnect();
//       };
//     }
//   }, [user]);

//   // Login function updates user and role
//   const login = (userData) => {
//     setUser(userData);
//     setRole(userData.role || "guest");
//   };

//   // Logout function clears user and role + socket
//   const logout = async () => {
//     try {
//       await fetch("/api/auth/logout", { method: "POST" });
//     } catch (error) {
//       console.error("Logout API call failed:", error);
//     } finally {
//       setUser(null);
//       setRole("guest");
//       if (socket) {
//         socket.disconnect();
//         setSocket(null);
//       }
//     }
//   };

//   // Room & messaging helpers
//   const joinRoom = (roomId) => {
//     if (socket) {
//       socket.emit("joinRoom", roomId);
//     }
//   };

//   const sendMessage = (roomId, message) => {
//     if (socket) {
//       socket.emit("sendMessage", { roomId, message });
//     }
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         role,
//         isAuthenticated: !!user,
//         loading,
//         login,
//         logout,
//         fetchMe,
//         socket,
//         joinRoom,
//         sendMessage,
//         messages,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error("useAppContext must be used within an AppContextProvider");
//   }
//   return context;
// };


// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState("guest");
//   const [loading, setLoading] = useState(true);
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [currentRoom, setCurrentRoom] = useState(null);

//   const fetchMe = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/me", {
//         credentials: "include",
//         cache: "no-store",
//       });
//       const data = await res.json();
//       console.log("Response from /api/me:", { status: res.status, data });
      
//       if (res.ok && data.user) {
//         setUser(data.user);
//         setRole(data.user.role || "guest");
//       } else {
//         setUser(null);
//         setRole("guest");
//       }
//     } catch (err) {
//       console.error("Failed to fetch user:", err);
//       setUser(null);
//       setRole("guest");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMe();
//   }, []);

//   // WebSocket initialization with better error handling
//   useEffect(() => {
//     if (user) {
//       const socketInstance = io("http://localhost:4000", {
//         query: { userId: user.id, role: user.role },
//       });

//       setSocket(socketInstance);

//       socketInstance.on("connect", () => {
//         console.log("WebSocket connected:", socketInstance.id);
//       });

//       socketInstance.on("disconnect", () => {
//         console.log("WebSocket disconnected");
//       });

//       socketInstance.on("receiveMessage", (messageData) => {
//         console.log("Message received in context:", messageData);
//         setMessages((prev) => [...prev, messageData]);
//       });

//       socketInstance.on("connect_error", (error) => {
//         console.error("WebSocket connection error:", error);
//       });

//       return () => {
//         socketInstance.disconnect();
//       };
//     }
//   }, [user]);

//   const login = (userData) => {
//     setUser(userData);
//     setRole(userData.role || "guest");
//   };

//   const logout = async () => {
//     try {
//       await fetch("/api/auth/logout", { method: "POST" });
//     } catch (error) {
//       console.error("Logout API call failed:", error);
//     } finally {
//       setUser(null);
//       setRole("guest");
//       setMessages([]);
//       setCurrentRoom(null);
//       if (socket) {
//         socket.disconnect();
//         setSocket(null);
//       }
//     }
//   };

//   // Improved room joining
//   const joinRoom = (roomId) => {
//     if (socket && roomId) {
//       setCurrentRoom(roomId);
//       socket.emit("joinRoom", roomId);
      
//       // Load previous messages when joining room
//       fetch(`/api/messages/${roomId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) {
//             setMessages(data.messages || []);
//           }
//         })
//         .catch((err) => {
//           console.error("Error loading messages:", err);
//         });
//     }
//   };

//   // Improved message sending
//   const sendMessage = async (roomId, messageContent) => {
//     if (socket && roomId && messageContent.trim() && user) {
//       const messageData = {
//         roomId,
//         senderId: user.id,
//         receiverId: "", // You'll need to set this based on your logic
//         message: messageContent,
//         timestamp: new Date().toISOString(),
//         senderName: user.name || "User"
//       };

//       try {
//         // Save to database first
//         const response = await fetch("/api/messages", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(messageData),
//         });

//         const result = await response.json();

//         if (result.success) {
//           // Then send via WebSocket for real-time
//           socket.emit("sendMessage", { 
//             roomId, 
//             message: result.message 
//           });
          
//           // Add to local state immediately
//           setMessages((prev) => [...prev, result.message]);
//         }
//       } catch (error) {
//         console.error("Error sending message:", error);
//       }
//     }
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         role,
//         isAuthenticated: !!user,
//         loading,
//         login,
//         logout,
//         fetchMe,
//         socket,
//         joinRoom,
//         sendMessage,
//         messages,
//         currentRoom,
//         setMessages
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error("useAppContext must be used within an AppContextProvider");
//   }
//   return context;
// };


"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);

  const fetchMe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/me", { credentials: "include", cache: "no-store" });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        setRole(data.user.role || "guest");
      } else {
        setUser(null);
        setRole("guest");
      }
    } catch {
      setUser(null);
      setRole("guest");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMe(); }, []);

  // WebSocket
  useEffect(() => {
    if (user) {
      const socketInstance = io("http://localhost:4000", {
        query: { userId: user.id, role: user.role },
      });

      setSocket(socketInstance);

      socketInstance.on("receiveMessage", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => socketInstance.disconnect();
    }
  }, [user]);

  const logout = async () => {
    try { await fetch("/api/auth/logout", { method: "POST" }); } catch {}
    setUser(null);
    setRole("guest");
    setMessages([]);
    setCurrentRoom(null);
    socket?.disconnect();
    setSocket(null);
  };

  // ✅ Join room
  const joinRoom = (roomId) => {
    if (!socket || !roomId) return;

    setCurrentRoom(roomId);
    socket.emit("joinRoom", roomId);

    fetch(`/api/messages/${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMessages(data.messages || []);
      });
  };

  // ✅ Send Message
  const sendMessage = async (roomId, messageContent) => {
    if (!socket || !user || !roomId || !messageContent.trim()) return;

    // extract receiver from roomId
    const ids = roomId.split("_");
    const receiverId = ids.find((x) => x !== user.id);

    const msgPayload = {
      roomId,
      senderId: user.id,
      receiverId,
      message: messageContent,
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msgPayload),
      });
      const result = await res.json();

      if (result.success) {
        socket.emit("sendMessage", {
          roomId,
          message: result.message,
        });

        setMessages((prev) => [...prev, result.message]);
      }
    } catch (err) {
      console.error("Message error", err);
    }
  };

  return (
    <AppContext.Provider value={{
      user, role, loading, socket, messages,
      joinRoom, sendMessage, logout, setMessages, currentRoom
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
