

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("✅ User Connected:", socket.id);

  // Join Room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`👤 ${socket.id} joined room: ${roomId}`);
  });

  // Receive message from client and broadcast to room
  socket.on("sendMessage", ({ roomId, senderId, receiverId, message }) => {
    console.log("📩 Message:", { roomId, senderId, receiverId, message });

    // Broadcast full message object to room
    io.to(roomId).emit("receiveMessage", {
      roomId,
      senderId,
      receiverId,
      message,
      createdAt: new Date(), // optional timestamp
    });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("🚀 Socket server running on port 4000");
});
