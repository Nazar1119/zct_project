// import { NextRequest, NextResponse} from "next/server";
// import { ragChat } from "@/lib/rag-chat";

// export const POST = async(req: NextRequest) => {
//     const { messages, sessionID } = await req.json()
//     const  lastMessege = messages[messages.length - 1]?.content

//     const response = await ragChat.chat(lastMessege)

//     console.log("response", response)
//     console.log("typeof response", typeof response);
//     console.log("response keys", Object.keys(response));

//     return NextResponse.json({ response })
// }

// import { NextRequest, NextResponse } from "next/server";
// import { ragChat } from "@/lib/rag-chat";

// export const POST = async (req: NextRequest) => {
//   const { messages, sessionID } = await req.json();
//   const lastMessage = messages[messages.length - 1]?.content;

//   if (!lastMessage) {
//     return NextResponse.json({ error: "No message provided" }, { status: 400 });
//   }

//   try {
//     const response = await ragChat.chat(lastMessage);

//     return NextResponse.json({
//       message: {
//         role: "assistant",
//         content: response.output, // 🔥 This is the fix
//       },
//     });
//   } catch (error) {
//     console.error("🔥 Error in ragChat.chat:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// };




// import { NextRequest, NextResponse } from "next/server";
// import { ragChat } from "@/lib/rag-chat";

// export const POST = async (req: NextRequest) => {
//   try {
//     console.log("📥 Received POST /api/chat-stream");

//     const body = await req.json();
//     console.log("🧠 Request body:", body);

//     const { messages, sessionId } = body;

//     const lastMessage = messages?.[messages.length - 1]?.content;
//     if (!lastMessage) {
//       console.warn("⚠️ No last message found");
//       return NextResponse.json({ error: "No message content found" }, { status: 400 });
//     }

//     console.log("💬 Last message content:", lastMessage);

//     const result = await ragChat.chat(lastMessage);

//     console.log("📤 ragChat.chat() result:", result);


//     if (!result) {
//       return NextResponse.json({ error: "No response from ragChat" }, { status: 500 });
//     }

//     return NextResponse.json({
//       messages: [
//         ...messages,
//         {
//           id: Date.now().toString(),
//           role: "assistant",
//           content: result,
//         },
//       ],
//     });
//   } catch (err) {
//     console.error("🔥 API ERROR:", err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 503 });
//   }
// };

// app/api/chat-stream/route.ts
// src/app/api/chat-stream/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getBedrockResponse } from "@/lib/bedrock-chat";

export const POST = async (req: NextRequest) => {
  const { messages, sessionId } = await req.json();
  const lastMessage = messages[messages.length - 1]?.content;

  if (!lastMessage) {
    return NextResponse.json({ error: "No message provided" }, { status: 400 });
  }

  try {
    const response = await getBedrockResponse(lastMessage);
    return NextResponse.json({ content: response }); // Simplified format
  } catch (error) {
    console.error("Error in Bedrock chat:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
