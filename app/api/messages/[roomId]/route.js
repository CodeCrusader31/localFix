import dbConnect from "@/lib/config/db";
import Message from "@/lib/models/Message";

export async function GET(req, context) {
  await dbConnect();

  const { roomId } = await context.params;

  if (!roomId || roomId === "null") {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid roomId" }),
      { status: 400 }
    );
  }

  try {
    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });

    return new Response(
      JSON.stringify({ success: true, messages }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: "Error fetching messages" }),
      { status: 500 }
    );
  }
}
