import Link from "next/link";
import { ArrowRightIcon } from "./icons";

export default function AcademyTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="grid items-center gap-10 rounded-3xl border border-ink/10 bg-ink px-8 py-14 text-paper sm:grid-cols-2 sm:px-14">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">
            Madisson AI Academy
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
            Want to learn how to make these yourself?
          </h2>
          <p className="mt-4 text-sm text-paper/70 sm:text-base">
            Prompts get you 80% of the way. The rest is workflow — tool choice,
            sequencing, and the small technical decisions that separate a
            recreation from a viral one. Book a 1:1 session and we&rsquo;ll walk
            through it together, live.
          </p>
          <Link
            href="/academy"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm text-ink transition hover:bg-paper"
          >
            Learn with us
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <ul className="space-y-4 text-sm">
          {[
            "Live 1:1 walkthrough of your first recreation",
            "Tool & model recommendations for your budget",
            "Feedback on your own attempts",
            "A path from viewer → creator → your own page",
          ].map((item) => (
            <li
              key={item}
              className="rounded-xl border border-paper/15 px-5 py-4 text-paper/85"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
