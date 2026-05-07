import dbConnect from "@/lib/config/db";
import Message from "@/lib/models/Message";
import User from "@/lib/models/User";

function getOtherUserIdFromRoom(roomId, providerId) {
  if (!roomId) return "";
  const ids = roomId.includes("_") ? roomId.split("_") : roomId.split("-");
  return ids.find((id) => id && id !== providerId) || "";
}

function normalizeMessageText(message) {
  return typeof message === "string" ? message : message?.text || "";
}

export async function GET(req, context) {
  await dbConnect();

  try {
    const { providerId } = await context.params;

    if (!providerId) {
      return new Response(
        JSON.stringify({ success: false, error: "Provider ID is required" }),
        { status: 400 }
      );
    }

    console.log("Fetching conversations for provider:", providerId);

    // Get all unique rooms where this provider is either sender or receiver
    const messages = await Message.find({
      $or: [
        { senderId: providerId },
        { receiverId: providerId }
      ]
    })
    .sort({ createdAt: -1 })
    .lean(); // Use lean() for better performance

    console.log(`Found ${messages.length} messages for provider`);

    // Group messages by roomId and get the latest message for each room
    const roomMap = new Map();

    for (const message of messages) {
      const roomId = message.roomId;
      
      if (!roomMap.has(roomId)) {
        // Debug log to see the message structure
        console.log("Processing message:", {
          roomId,
          senderId: message.senderId,
          receiverId: message.receiverId,
          senderIdType: typeof message.senderId,
          senderIdString: message.senderId?.toString()
        });

        const isProviderSender = message.senderId?.toString() === providerId;
        let otherUserId = isProviderSender ? message.receiverId : message.senderId;

        if (
          !otherUserId ||
          String(otherUserId) === providerId ||
          String(otherUserId).includes("-") ||
          String(otherUserId).includes("_")
        ) {
          otherUserId = getOtherUserIdFromRoom(roomId, providerId);
        }

        // Fetch the other user's details
        let otherUser = null;
        if (otherUserId) {
          try {
            otherUser = await User.findById(otherUserId).select('fullName username email').lean();
          } catch (err) {
            console.error("Error fetching user:", err);
          }
        }

        const customerName = otherUser?.fullName || otherUser?.username || "Customer";

        roomMap.set(roomId, {
          roomId: roomId,
          roomName: `Chat with ${customerName}`,
          customerId: otherUserId,
          customerName,
          customerEmail: otherUser?.email,
          lastMessage: normalizeMessageText(message.message),
          lastMessageTime: message.createdAt,
          unreadCount: 0,
          lastMessageSender: isProviderSender ? 'provider' : 'customer'
        });
      }
    }

    const conversations = Array.from(roomMap.values())
      .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

    console.log(`Returning ${conversations.length} conversations`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        conversations 
      }),
      { status: 200 }
    );

  } catch (err) {
    console.error("Error fetching conversations:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Server error fetching conversations",
        details: err.message 
      }),
      { status: 500 }
    );
  }
}
