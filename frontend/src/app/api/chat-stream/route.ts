// import { NextRequest, NextResponse } from "next/server";
// import { getBedrockResponse } from "@/lib/bedrock-chat";

// export const POST = async (req: NextRequest) => {
//   const { messages, sessionId } = await req.json();
//   const lastMessage = messages[messages.length - 1]?.content;

//   if (!lastMessage) {
//     return NextResponse.json({ error: "No message provided" }, { status: 400 });
//   }

//   try {
//     const response = await getBedrockResponse(lastMessage);
//     const apiResponse = {
//       id: Date.now().toString(),
//       role: "assistant",
//       content: response,
//     };
//     console.log("API Response Sent to Frontend:", apiResponse);
//     return NextResponse.json(apiResponse);
//   } catch (error) {
//     console.error("Error in Bedrock chat:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// };


import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { messages } = await req.json();

  const lastMessage = messages[messages.length - 1]?.content;

  const res = await fetch("https://deploy-backend-835536692802.us-east1.run.app/prompt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: lastMessage }),
  });

  const data = await res.json();

  return NextResponse.json({
    role: "assistant",
    content: data.response, // just the text from the Python backend
  });
};