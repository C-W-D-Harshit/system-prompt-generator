import { generateText, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  const { prompt, apiKey }: { prompt: string; apiKey: string } =
    await req.json();

  const openai = createOpenAI({
    apiKey: apiKey !== "" ? apiKey : process.env.OPENAI_API_KEY,
  });

  console.log(apiKey);

  const initialResult = await generateText({
    model: openai("gpt-4o-mini"),
    prompt,
    system: process.env.PRE_SYSTEM_PROMPT,
  });

  const result = streamText({
    model: openai("gpt-4-turbo"),
    prompt: `Make this system prompt better: ${initialResult.text}. Stricter guidelines, more examples, and clearer instructions are always better.`,
    system: process.env.SYSTEM_PROMPT,
  });

  return result.toDataStreamResponse();
}
