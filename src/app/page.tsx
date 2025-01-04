import { SystemPromptGenerator } from "@/components/system-prompt-generator";

export default async function Home() {
  return (
    <div className="min-h-screen bg-black">
      <SystemPromptGenerator />
    </div>
  );
}
