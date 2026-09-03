import Link from "next/link";
import type { PromptEntry } from "@/data/prompts";
import { CheckIcon, LockIcon, ArrowRightIcon } from "./icons";

const UNLOCK_ITEMS = [
  "The exact generation prompt (word for word)",
  "Every reference asset — character/scene image, motion clip, depth map",
  "A step-by-step guideline: settings, sequencing, what to watch out for",
  "Every future drop, unlocked automatically",
];

const WHY_PRO = [
  "Skip the wait — no need to comment and hope for a DM back",
  "Get the full technical breakdown, not just the one-line prompt",
  "New recreations unlock the moment they're posted",
  "Direct reply if you get stuck recreating it yourself",
];

export default function ProUnlockPanel({ prompt }: { prompt: PromptEntry }) {
  const isPro = prompt.tier === "pro";

  if (isPro) {
    return (
      <div className="mt-8 rounded-2xl border border-gold/40 bg-white/70 p-6">
        <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-gold">
          <CheckIcon className="h-4 w-4" /> Unlocked with your Pro Pass
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {UNLOCK_ITEMS.map((item) => (
            <li key={item} className="flex gap-2">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl border border-gold/40 bg-ink text-paper">
      <div className="relative flex flex-col gap-6 px-8 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-gold">
            <LockIcon className="h-4 w-4" /> What Pro Pass unlocks on this one
          </p>
          <ul className="mt-4 space-y-2 text-sm text-paper/85">
            {UNLOCK_ITEMS.map((item) => (
              <li key={item} className="flex gap-2">
                <LockIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs uppercase tracking-wide text-gold">Why creators upgrade</p>
          <ul className="mt-3 space-y-2 text-sm text-paper/70">
            {WHY_PRO.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-xl border border-paper/15 bg-paper/5 px-6 py-6 text-center sm:w-56">
          <span className="font-display text-2xl">Pro Pass</span>
          <span className="text-xs text-paper/70">Unlock this + every prompt in the vault</span>
          <Link
            href={`/pro?from=${prompt.slug}`}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm text-ink transition hover:bg-paper"
          >
            Unlock now
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
