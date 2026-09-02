"use client";

import Link from "next/link";
import { useCurrency } from "./currency-context";
import { currencySymbol, pricing } from "@/config/site";
import { CheckIcon } from "./icons";

const tiers = [
  {
    name: "Free",
    price: null,
    cta: "Browse for free",
    href: "/vault",
    features: [
      "Short prompt text for every drop",
      "One reference asset per prompt",
      "New drops posted regularly",
    ],
  },
  {
    name: "Pro Pass",
    price: "pro" as const,
    highlight: true,
    cta: "Get Pro Pass",
    href: "/pro",
    features: [
      "Everything in Free",
      "Full prompt with every reference asset (images, depth maps, motion clips)",
      "Step-by-step guideline: settings, sequencing, requirements",
      "Every new drop unlocked automatically",
    ],
  },
  {
    name: "Academy",
    price: "academy" as const,
    cta: "Book a 1:1 session",
    href: "/academy",
    features: [
      "Everything in Pro Pass",
      "Live 1:1 mentorship session",
      "Personal feedback on your own recreations",
      "Guidance on tools, workflow and monetizing your own page",
    ],
  },
];

export default function Pricing() {
  const { currency } = useCurrency();

  return (
    <section className="border-y border-ink/10 bg-paper-dim/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Membership</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">
            Pick how deep you want to go
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-2xl border p-8 ${
                tier.highlight
                  ? "border-gold bg-ink text-paper shadow-xl shadow-ink/20"
                  : "border-ink/10 bg-white/70"
              }`}
            >
              <h3 className="font-display text-xl">{tier.name}</h3>
              <div className="mt-4">
                {tier.price ? (
                  <span className="font-display text-3xl">
                    {currencySymbol[currency]}
                    {pricing[tier.price][currency]}
                    <span
                      className={`ml-1 text-sm font-sans ${
                        tier.highlight ? "text-paper/60" : "text-taupe"
                      }`}
                    >
                      {tier.price === "pro" ? "/ month" : "/ session"}
                    </span>
                  </span>
                ) : (
                  <span className="font-display text-3xl">
                    {currencySymbol[currency]}0
                  </span>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <CheckIcon
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        tier.highlight ? "text-gold" : "text-gold"
                      }`}
                    />
                    <span className={tier.highlight ? "text-paper/85" : "text-ink/80"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm transition ${
                  tier.highlight
                    ? "bg-gold text-ink hover:bg-paper"
                    : "border border-ink/25 hover:border-ink"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-taupe">
          Prices shown in {currency}. Switch currency from the header. Payments
          via UPI, cards, or PayPal.
        </p>
      </div>
    </section>
  );
}
