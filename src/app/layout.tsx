import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { CSPostHogProvider } from "@/components/providers/PosthogProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "System Prompt Generator",
  description:
    "Create precise, effective AI system prompts with intelligent assistance",
  openGraph: {
    title: "System Prompt Generator",
    description:
      "Create precise, effective AI system prompts with intelligent assistance",
    url: "https://systemprompt.pro",
    siteName: "System Prompt Generator",
    images: [
      {
        url: "https://systemprompt.pro/og.png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://systemprompt.pro"),
  creator: "https://x.com/cwd_harshit",
  applicationName: "System Prompt Generator",
  keywords: [
    // Core functionality keywords
    "system prompt generator",
    "AI system prompt creator",
    "custom system prompt builder",
    "ChatGPT system message generator",
    "LLM system prompt maker",

    // Use cases and applications
    "AI personality customization",
    "ChatGPT behavior control",
    "AI assistant configuration",
    "custom AI instructions generator",
    "AI role definition tool",

    // Technical and specific terms
    "prompt engineering tool",
    "GPT system message template",
    "AI behavior prompting",
    "LLM instruction generator",
    "AI context setting",

    // Related concepts
    "AI personality designer",
    "ChatGPT instruction maker",
    "AI assistant customization",
    "GPT behavior modifier",
    "custom AI personality",

    // Platform specific
    "ChatGPT system prompts",
    "GPT-4 system messages",
    "Claude system prompts",
    "LLaMA instruction format",
    "OpenAI system messages",

    // Generic but relevant
    "prompt engineering",
    "AI customization",
    "LLM configuration",
    "AI instruction design",
    "system prompts",
  ],
  authors: [
    {
      name: "Harshit Sharma",
      url: "https://x.com/cwd_harshit",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <CSPostHogProvider>
            {children}
            <Toaster />
            <Analytics />
          </CSPostHogProvider>
        </Suspense>
      </body>
    </html>
  );
}
