"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Github,
  Twitter,
  Sparkles,
  Zap,
  Copy,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useCompletion } from "ai/react";
import { MemoizedMarkdown } from "./MemoizedMarkdown";
import Link from "next/link";

const MAX_FREE_GENERATIONS = 5;

export function SystemPromptGenerator() {
  const [apiKey, setApiKey] = React.useState("");
  const [usageCount, setUsageCount] = React.useState(0);
  const [isApiKeyEntered, setIsApiKeyEntered] = React.useState(false); // Added state for API key visibility
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  } = useCompletion({
    api: "/api/generate",
    body: {
      apiKey,
    },
    onError(error) {
      toast.error(error.message);
    },
    onFinish(prompt, completion) {
      toast.success("System prompt generated successfully!");
    },
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(completion);
    toast.success("Prompt copied to clipboard!");
  };

  const handleRegenerate = () => {
    handleSubmit();
  };

  const handleApiKeySubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Added function to handle API key submission
    if (e.key === "Enter" && apiKey.trim()) {
      setIsApiKeyEntered(true);
      toast.success("Open API key added successfully");
    }
  };

  // Auto-resize textarea
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md flex justify-center">
        <div className="container flex items-center justify-between h-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <span className="text-lg font-semibold text-white">
                systemprompt.pro
              </span>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {!isApiKeyEntered && (
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-sm">Free generations:</span>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    usageCount >= MAX_FREE_GENERATIONS
                      ? "text-red-400"
                      : "text-green-400"
                  )}
                >
                  {Math.max(MAX_FREE_GENERATIONS - usageCount, 0)}/
                  {MAX_FREE_GENERATIONS}
                </span>
              </div>
            )}
            {isApiKeyEntered ? ( // Replaced API key input section
              <div className="flex items-center gap-2">
                <div className="h-9 px-3 flex items-center bg-green-900/20 border border-green-500/50 rounded-md">
                  <span className="text-green-400 text-sm">
                    API Key added ✓
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsApiKeyEntered(false)}
                  className="h-9 text-gray-400 hover:text-white"
                >
                  Change
                </Button>
              </div>
            ) : (
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyDown={handleApiKeySubmit}
                className="w-[300px] h-9 bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500 hidden lg:flex"
                placeholder="[Optional] Add your Openai API Key"
              />
            )}
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-16">
        <div className="w-full max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Generate system prompts in real-time
            </h1>
            <p className="text-lg text-gray-400">
              Craft powerful system prompts with AI assistance.
            </p>
          </motion.div>

          {usageCount >= MAX_FREE_GENERATIONS && !apiKey && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-red-900/50 border border-red-500 rounded-lg p-4 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-500">
                  Free generations limit reached
                </h3>
                <p className="text-gray-300">
                  You have used all your free generations. Please enter an API
                  key to continue using the service.
                </p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder={"Generate a system prompt..."}
                className={cn(
                  "min-h-[200px] w-full resize-none bg-gray-800 border-gray-700",
                  "text-gray-200 placeholder:text-gray-500",
                  "focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500",
                  "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent",
                  "transition-all duration-200"
                )}
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <Button
                  type="submit"
                  disabled={
                    !input ||
                    isLoading ||
                    (usageCount >= MAX_FREE_GENERATIONS && !apiKey)
                  }
                  className={cn(
                    "h-9 px-4 bg-yellow-500 text-black hover:bg-yellow-400",
                    "transition-all duration-200",
                    (isLoading ||
                      (usageCount >= MAX_FREE_GENERATIONS && !apiKey)) &&
                      "opacity-50 cursor-not-allowed"
                  )}
                  effect={"shine"}
                >
                  {isLoading ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-pulse" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </form>

          {completion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-white">
                  Generated System Prompt:
                </h2>
                <div className="flex gap-2 items-center">
                  <Button
                    onClick={handleCopy}
                    variant="secondary"
                    effect={"ringHover"}
                    size="icon"
                    className="size-7 items-center justify-center flex"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleRegenerate}
                    variant="secondary"
                    effect={"ringHover"}
                    size="icon"
                    className="size-7 items-center justify-center flex"
                    disabled={usageCount >= MAX_FREE_GENERATIONS && !apiKey}
                    title="Regenerate"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button
                    // onClick={() => setPrompt(generatedPrompt)}
                    variant="secondary"
                    effect={"ringHover"}
                    size="sm"
                    title="Coming soon"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Follow Up
                  </Button>
                </div>
              </div>
              <MemoizedMarkdown content={completion} id="1" />
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-800 bg-black/50 backdrop-blur-md flex justify-center">
        <div className="container px-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              100% free and{" "}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-gray-300 transition-colors"
              >
                open source
              </a>
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
