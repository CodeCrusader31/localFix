const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

function normalizeMessagePayload(payload = {}) {
  const savedMessage = payload.message;

  if (savedMessage && typeof savedMessage === "object") {
    return {
      ...savedMessage,
      roomId: savedMessage.roomId || payload.roomId,
      senderId: savedMessage.senderId || payload.senderId,
      receiverId: savedMessage.receiverId || payload.receiverId,
      message:
        typeof savedMessage.message === "string"
          ? savedMessage.message
          : savedMessage.message?.text || "",
      createdAt: savedMessage.createdAt || new Date(),
    };
  }

  return {
    roomId: payload.roomId,
    senderId: payload.senderId,
    receiverId: payload.receiverId,
    message: typeof savedMessage === "string" ? savedMessage : savedMessage?.text || "",
    createdAt: new Date(),
  };
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room: ${roomId}`);
  });

  socket.on("sendBookingNotification", ({ receiverId, booking }) => {
    console.log("New booking notification to:", receiverId, "Booking:", booking);
    io.to(receiverId).emit("newBooking", { booking });
  });

  socket.on("bookingStatusUpdate", ({ receiverId, bookingId, status, booking }) => {
    console.log("Booking status update to:", receiverId, "BookingID:", bookingId, "Status:", status);
    io.to(receiverId).emit("bookingStatusUpdate", { bookingId, status, booking });
  });

  socket.on("sendMessage", (payload) => {
    const message = normalizeMessagePayload(payload);
    io.to(message.roomId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
