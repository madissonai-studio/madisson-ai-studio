import Link from "next/link";
import type { PromptEntry } from "@/data/prompts";
import { LockIcon, PlayIcon } from "./icons";

export default function PromptCard({ prompt }: { prompt: PromptEntry }) {
  const isPro = prompt.tier === "pro";

  return (
    <Link
      href={`/vault/${prompt.slug}`}
      className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/60"
    >
      <div
        className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${prompt.cover}`}
      >
        <PlayIcon className="h-10 w-10 text-paper/70 transition group-hover:scale-110 group-hover:text-gold" />
        <span
          className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide ${
            isPro ? "bg-ink text-gold" : "bg-paper text-ink"
          }`}
        >
          {isPro && <LockIcon className="h-3 w-3" />}
          {isPro ? "Pro" : "Free"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs uppercase tracking-wide text-taupe">
          {prompt.category}
        </span>
        <h3 className="mt-1 font-display text-lg leading-snug">{prompt.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-taupe">{prompt.shortPrompt}</p>
        <span className="mt-4 text-xs text-gold">
          {prompt.assets.length} asset{prompt.assets.length > 1 ? "s" : ""} included →
        </span>
      </div>
    </Link>
  );
}
