



"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const AppContext = createContext();
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

function normalizeUser(userData) {
  if (!userData) return null;
  return {
    ...userData,
    id: userData.id || userData._id,
  };
}

function normalizeMessage(msg) {
  if (!msg) return msg;
  return {
    ...msg,
    message:
      typeof msg.message === "string"
        ? msg.message
        : msg.message?.text || "",
  };
}

function getReceiverIdFromRoom(roomId, currentUserId) {
  if (!roomId || !currentUserId) return "";
  const ids = roomId.includes("_") ? roomId.split("_") : roomId.split("-");
  return ids.find((id) => id && id !== currentUserId) || "";
}

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
        setUser(normalizeUser(data.user));
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
    setUser(normalizeUser(userData));
    setRole(userData.role || "guest");
    // Session cookie is set by `POST /api/auth/login` (HttpOnly),
    // so we don't need to mirror it here.
  };

  // WebSocket
  useEffect(() => {
    if (user) {
      const socketInstance = io(SOCKET_URL, {
        query: { userId: user.id, role: user.role },
      });

      setSocket(socketInstance);

      // Join a personal room for user-specific notifications (like bookings)
      socketInstance.emit("joinRoom", user.id);

      socketInstance.on("receiveMessage", (msg) => {
        setMessages((prev) => [...prev, normalizeMessage(msg)]);
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
        if (data.success) setMessages((data.messages || []).map(normalizeMessage));
      });
  };

  // ✅ Send Message
  const sendMessage = async (roomId, messageContent) => {
    if (!socket || !user || !roomId || !messageContent.trim()) return;

    const receiverId = getReceiverIdFromRoom(roomId, user.id);

    if (!receiverId) {
      console.error("Unable to determine message receiver from room:", roomId);
      return;
    }

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
        const savedMessage = normalizeMessage(result.message);
        socket.emit("sendMessage", savedMessage);
      }
    } catch (err) {
      console.error("Message error", err);
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      role,
      loading,
      isAuthenticated: !!user,
      socket,
      messages,
      joinRoom,
      sendMessage,
      login,
      logout,
      setMessages,
      currentRoom,
      fetchMe,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
