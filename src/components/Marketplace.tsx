import Link from "next/link";
import { prompts } from "@/data/prompts";
import PromptCard from "./PromptCard";
import { ArrowRightIcon } from "./icons";

export default function Marketplace() {
  // Curated homepage order: Pro (featured) picks first, then the newest free
  // drops filling the rest — same logic explained on the /vault sort control.
  const pro = prompts.filter((p) => p.tier === "pro");
  const free = prompts.filter((p) => p.tier === "free");
  const preview = [...pro, ...free].slice(0, 8);

  return (
    <section id="vault" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">
            The Vault · Featured picks, newest first
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">
            Every prompt, every asset, in one place
          </h2>
          <p className="mt-3 max-w-xl text-sm text-taupe sm:text-base">
            Hover any card to watch it play. Free cards get you the video and
            the effect breakdown — the same as commenting on a post. Pro cards
            unlock the exact prompt, every reference asset, and a full
            shot-by-shot guideline, instantly.
          </p>
        </div>
        <Link
          href="/vault"
          className="inline-flex shrink-0 items-center gap-2 text-sm text-ink underline decoration-gold decoration-2 underline-offset-4"
        >
          View full vault
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {preview.map((p) => (
          <PromptCard key={p.slug} prompt={p} />
        ))}
      </div>
    </section>
  );
}
