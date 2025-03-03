import { google } from "@ai-sdk/google";
import { type CoreMessage, smoothStream, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-pro-exp-02-05"),
    messages,
    system:
      "You are a helpful assistant. Respond to the user in Markdown format.",
    experimental_transform: smoothStream(),
  });

  // Return just the response text directly
  return result.toDataStreamResponse();
}
