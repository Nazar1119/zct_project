// lib/bedrock-chat.ts
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: "us-east-2", // Match your Python region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getBedrockResponse(prompt: string): Promise<string> {
  const modelId = "arn:aws:bedrock:us-east-2:668610423384:inference-profile/us.amazon.nova-pro-v1:0"; // Match your Python modelId

  const params = {
    modelId,
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      inferenceConfig: {
        max_new_tokens: 1000, // Match your Python max_new_tokens
      },
      messages: [
        {
          role: "user",
          content: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }),
  };

  try {
    const command = new InvokeModelCommand(params);
    const response = await client.send(command);
    const body = JSON.parse(new TextDecoder().decode(response.body));
    console.log("Bedrock Raw Response:", body); // Log the raw response
    const responseText = body.output.message.content[0].text;
    console.log("Bedrock Response Text:", responseText); // Log the extracted text
    return responseText;
  } catch (error) {
    console.error("Error invoking Bedrock:", error);
    throw error;
  }

}