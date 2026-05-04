



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

  const login = (userData, token) => {
    setUser(userData);
    setRole(userData.role || "guest");
    // Session cookie is set by `POST /api/auth/login` (HttpOnly),
    // so we don't need to mirror it here.
  };

  // WebSocket
  useEffect(() => {
    if (user) {
      const socketInstance = io("http://localhost:4000", {
        query: { userId: user.id, role: user.role },
      });

      setSocket(socketInstance);

      // Join a personal room for user-specific notifications (like bookings)
      socketInstance.emit("joinRoom", user.id);

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
      joinRoom, sendMessage, login, logout, setMessages, currentRoom
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
