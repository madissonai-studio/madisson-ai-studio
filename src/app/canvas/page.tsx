import type { Metadata } from "next";
import { prompts } from "@/data/prompts";
import CanvasCard from "@/components/CanvasCard";

export const metadata: Metadata = {
  title: "Canvas — make your own version",
  description:
    "Pick any Madisson AI recreation, upload your own photo, and generate your own personalised video — pay once per video, no subscription.",
};

export default function CanvasIndexPage() {
  const eligible = prompts.filter((p) => !p.isPhoto);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <p className="text-xs uppercase tracking-wide text-gold">Canvas</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl">Make any recreation your own</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-taupe sm:text-base">
        Pick any recreation below, upload your own photo, generate your own personalised prompt
        with your own ChatGPT, and get your own video — pay once per video, no subscription, and
        no extra cost if you only ever want one.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {eligible.map((p) => (
          <CanvasCard key={p.slug} prompt={p} />
        ))}
      </div>
    </section>
  );
}
