const express = require("express");

const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // join room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  // Handling Message

  socket.on("SendMessage", ({ roomId, message }) => {
    io.to(roomId).emit("recieveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("WebSocket running on 4000");
});
