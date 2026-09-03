import Link from "next/link";
import { notFound } from "next/navigation";
import { prompts } from "@/data/prompts";
import { LockIcon, ArrowRightIcon, CheckIcon } from "@/components/icons";
import PromptDetailMedia from "@/components/PromptDetailMedia";

export function generateStaticParams() {
  return prompts.map((p) => ({ slug: p.slug }));
}

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = prompts.find((p) => p.slug === slug);
  if (!prompt) notFound();

  const isPro = prompt.tier === "pro";

  return (
    <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <Link href="/vault" className="text-xs uppercase tracking-wide text-taupe">
        ← Back to the vault
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-xs uppercase tracking-wide text-gold">
          {prompt.category}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide ${
            isPro ? "bg-ink text-gold" : "bg-paper-dim text-ink"
          }`}
        >
          {isPro && <LockIcon className="h-3 w-3" />}
          {isPro ? "Pro" : "Free"}
        </span>
        {isPro && prompt.sourced === "drafted" && (
          <span className="text-[11px] uppercase tracking-wide text-taupe">
            Starter guideline — refine with your own notes
          </span>
        )}
      </div>

      <h1 className="mt-3 font-display text-3xl sm:text-4xl">{prompt.title}</h1>

      <PromptDetailMedia prompt={prompt} />

      <a
        href={prompt.igUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-xs text-taupe underline decoration-gold/60 underline-offset-4"
      >
        View the original on Instagram →
      </a>

      {/* Description — always visible */}
      <div className="mt-8">
        <h2 className="text-xs uppercase tracking-wide text-taupe">About this one</h2>
        <p className="mt-3 whitespace-pre-line rounded-2xl border border-ink/10 bg-white/60 p-6 text-sm leading-relaxed sm:text-base">
          {prompt.description}
        </p>
      </div>

      {/* Full prompt — Pro only */}
      {isPro && prompt.fullPrompt && (
        <div className="mt-8">
          <h2 className="text-xs uppercase tracking-wide text-taupe">The exact prompt</h2>
          <p className="mt-3 whitespace-pre-line rounded-2xl border border-ink/10 bg-white/60 p-6 text-sm leading-relaxed sm:text-base">
            {prompt.fullPrompt}
          </p>
        </div>
      )}

      {/* Assets */}
      <div className="mt-8">
        <h2 className="text-xs uppercase tracking-wide text-taupe">Included assets</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {prompt.assets.map((a) => (
            <li
              key={a.label}
              className="flex items-center justify-between rounded-xl border border-ink/10 bg-white/60 px-4 py-3 text-sm"
            >
              <span>{a.label}</span>
              <span className="text-xs uppercase tracking-wide text-taupe">
                {a.type}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Guideline + requirements — Pro only */}
      <div className="mt-8">
        <h2 className="text-xs uppercase tracking-wide text-taupe">
          Full guideline &amp; requirements
        </h2>

        {isPro ? (
          <div className="relative mt-3 overflow-hidden rounded-2xl border border-gold/40 bg-ink text-paper">
            <div className="pointer-events-none absolute inset-0 backdrop-blur-md" />
            <div className="relative flex flex-col items-center gap-4 px-8 py-14 text-center">
              <LockIcon className="h-8 w-8 text-gold" />
              <p className="max-w-sm text-sm text-paper/80">
                The step-by-step guideline and full requirement list for this
                recreation are exclusive to Pro Pass members.
              </p>
              <Link
                href={`/pro?from=${prompt.slug}`}
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm text-ink transition hover:bg-paper"
              >
                Unlock with Pro Pass
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
          <p className="mt-3 rounded-2xl border border-ink/10 bg-white/60 p-6 text-sm text-taupe">
            This one&rsquo;s a free drop — comment on the{" "}
            <a href={prompt.igUrl} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-gold">
              original Instagram reel
            </a>{" "}
            to get the exact prompt in your DMs, or{" "}
            <Link href="/pro" className="text-ink underline decoration-gold">
              unlock every prompt instantly
            </Link>{" "}
            with Pro Pass.
          </p>
        )}
      </div>

      {isPro && prompt.requirements && (
        <div className="mt-8 rounded-2xl border border-ink/10 bg-paper-dim/60 p-6">
          <h3 className="text-xs uppercase tracking-wide text-taupe">
            What you&rsquo;ll need (preview)
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {prompt.requirements.map((r) => (
              <li key={r} className="flex gap-2">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
