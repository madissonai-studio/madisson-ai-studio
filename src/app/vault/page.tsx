import { prompts } from "@/data/prompts";
import PromptCard from "@/components/PromptCard";

export const metadata = {
  title: "The Vault — Madisson AI Studio",
};

export default function VaultPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-gold">The Vault</p>
      <h1 className="mt-2 font-display text-4xl">Every prompt. Every asset.</h1>
      <p className="mt-3 max-w-xl text-sm text-taupe sm:text-base">
        Free cards show you the exact prompt and one reference asset. Pro cards
        unlock the full asset set plus a step-by-step guideline for recreating
        the video yourself.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {prompts.map((p) => (
          <PromptCard key={p.slug} prompt={p} />
        ))}
      </div>
    </section>
  );
}
