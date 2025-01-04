import { generateText, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 5 requests per week
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "7 d"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  // Get IP address from request
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  const { success, remaining } = await ratelimit.limit(ip + "1");

  const { prompt, apiKey }: { prompt: string; apiKey: string } =
    await req.json();

  if (!success && apiKey === "") {
    return new Response("You have used all your free generations.", {
      status: 429,
    });
  }

  const openai = createOpenAI({
    apiKey: apiKey !== "" ? apiKey : process.env.OPENAI_API_KEY,
  });

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

  const stream = result.toDataStreamResponse();

  return new Response(stream.body, {
    headers: {
      ...stream.headers,
      "X-Remaining-Generations": remaining.toString(),
    },
    status: stream.status,
    statusText: stream.statusText,
  });
}
