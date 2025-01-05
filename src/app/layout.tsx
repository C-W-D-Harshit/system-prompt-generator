import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "System Prompt Generator",
  description: "Generate system prompts in real-time with AI",
  openGraph: {
    title: "System Prompt Generator",
    description: "Generate system prompts in real-time with AI",
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
    "system prompt generator",
    "ai prompt generator",
    "chatgpt system prompt",
    "gpt system prompt",
    "ai system messages",
    "prompt engineering",
    "custom ai instructions",
    "system",
    "prompt",
    "generator",
    "ai",
    "gpt-3",
    "openai",
    "llm prompts",
    "ai assistant prompts",
  ],
  authors: [
    {
      name: "Harshit Sharma",
      url: "https://x.com/cwd_harshit",
    },
  ],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
