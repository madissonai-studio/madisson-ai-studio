import VaultBrowser from "@/components/VaultBrowser";

export const metadata = {
  title: "The Vault — Madisson AI Studio",
  description: "Every prompt and reference asset behind Madisson AI's viral cinematic recreations.",
};

export default function VaultPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-gold">The Vault</p>
      <h1 className="mt-2 font-display text-4xl">Every prompt. Every asset.</h1>
      <p className="mt-3 max-w-xl text-sm text-taupe sm:text-base">
        Hover any card to watch it play. Free cards show the video and effect
        breakdown. Pro cards unlock the exact prompt, every reference asset,
        and a step-by-step guideline for recreating it yourself.
      </p>
      <p className="mt-2 max-w-xl text-xs text-taupe/80">
        Shown newest-first by default, matching the order these were posted to
        Instagram — switch to “Featured” to see Pro picks first, or search /
        filter by category.
      </p>

      <div className="mt-10">
        <VaultBrowser />
      </div>
    </section>
  );
}
