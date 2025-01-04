import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";

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
      </body>
    </html>
  );
}
