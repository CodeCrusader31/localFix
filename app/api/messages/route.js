// import dbConnect from "@/lib/config/db";
// import Message from "@/lib/models/Message";

// export async function POST(req) {
//   await dbConnect();
//   try {
//     const { roomId, senderId, receiverId, message } = await req.json();

//     if (!roomId || !senderId || !receiverId || !message) {
//       return new Response(
//         JSON.stringify({ success: false, error: "Missing fields" }),
//         { status: 400 }
//       );
//     }

//     const newMsg = await Message.create({ roomId, senderId, receiverId, message });

//     return new Response(
//       JSON.stringify({ success: true, message: newMsg }),
//       { status: 201 }
//     );
//   } catch (err) {
//     return new Response(
//       JSON.stringify({ success: false, error: "Server error" }),
//       { status: 500 }
//     );
//   }
// }


import dbConnect from "@/lib/config/db";
import Message from "@/lib/models/Message";

export async function POST(req) {
  await dbConnect();
  try {
    const { roomId, senderId, receiverId, message } = await req.json();

    if (!roomId || !senderId || !receiverId || !message) {
      return new Response(JSON.stringify({ success: false, error: "Missing fields" }), { status: 400 });
    }

    // const newMsg = await Message.create({ roomId, senderId, receiverId, message });

    const normalizedMessage =
  typeof message === "string"
    ? message
    : message?.text || JSON.stringify(message);

const newMsg = await Message.create({
  roomId,
  senderId,
  receiverId,
  message: normalizedMessage, // ✅ ALWAYS STRING
});

    return new Response(JSON.stringify({ success: true, message: newMsg }), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500 });
  }
}
