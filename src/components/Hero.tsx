import Link from "next/link";
import { ArrowRightIcon } from "./icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(197,160,89,0.55) 0%, rgba(197,160,89,0) 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-taupe">
            The prompt &amp; asset vault for Madisson AI
          </p>
          <h1 className="font-display text-4xl leading-[1.1] sm:text-6xl">
            &ldquo;I make AI do things
            <br />
            it wasn&rsquo;t ready for.&rdquo;
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-base text-taupe sm:text-lg">
            Every viral recreation on{" "}
            <span className="text-ink">@madissonai</span> starts here — the exact
            prompts, reference assets, and shot-by-shot guidelines behind each
            video. Free previews for everyone. Full craft for Pro Pass members.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#vault"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm text-paper transition hover:bg-gold hover:text-ink"
            >
              Explore the vault
              <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pro"
              className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-7 py-3.5 text-sm transition hover:border-ink"
            >
              Get Pro Pass
            </Link>
          </div>
        </div>

        <div className="mt-16 hairline" />

        <dl className="mt-10 grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {[
            ["5.2K+", "Instagram followers"],
            ["30", "Real recreations in the vault"],
            ["6", "Pro prompts unlocked"],
            ["1:1", "Mentorship available"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="font-display text-3xl text-ink sm:text-4xl">{value}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-taupe">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
