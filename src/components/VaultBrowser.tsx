"use client";

import { useMemo, useState } from "react";
import { prompts, categories, type PromptTier } from "@/data/prompts";
import PromptCard from "./PromptCard";

type TierFilter = "all" | PromptTier;

export default function VaultBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [tier, setTier] = useState<TierFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return prompts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (tier !== "all" && p.tier !== tier) return false;
      if (q && !(p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))) {
        return false;
      }
      return true;
    });
  }, [query, category, tier]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search prompts…"
          className="w-full max-w-sm rounded-full border border-ink/15 bg-white/70 px-5 py-2.5 text-sm outline-none focus:border-gold sm:w-auto"
        />
        <div className="flex flex-wrap gap-2">
          {(["all", "free", "pro"] as TierFilter[]).map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wide transition ${
                tier === t ? "border-ink bg-ink text-paper" : "border-ink/20 text-taupe hover:border-ink/40"
              }`}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-1.5 text-xs transition ${
              category === c ? "bg-gold text-ink" : "bg-paper-dim text-taupe hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs uppercase tracking-wide text-taupe">
        {filtered.length} prompt{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <PromptCard key={p.slug} prompt={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-taupe">
          Nothing matches that search. Try a different keyword or filter.
        </p>
      )}
    </div>
  );
}
