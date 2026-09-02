"use client";

import { useState } from "react";
import { useCurrency } from "@/components/currency-context";
import { currencySymbol, payments, pricing, site } from "@/config/site";
import { CheckIcon } from "@/components/icons";

const features = [
  "Full prompt + every reference asset on all Pro drops (images, depth maps, motion clips)",
  "Step-by-step shot guideline: settings, sequencing, requirements",
  "Every new drop unlocked automatically, no extra payment",
  "Priority reply if you get stuck recreating something",
];

export default function ProPage() {
  const { currency, setCurrency } = useCurrency();
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<"upi" | "paypal" | "card">("upi");
  const [submitted, setSubmitted] = useState(false);

  const amount = pricing.pro[currency];
  const upiReady = Boolean(payments.upiId);
  const paypalReady = Boolean(payments.paypalMeUsername);
  const cardReady = Boolean(payments.razorpayKeyId || payments.stripePublicKey);

  function handleReserve(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    if (method === "upi" && upiReady) {
      window.location.href = `upi://pay?pa=${payments.upiId}&pn=${encodeURIComponent(
        site.shortName
      )}&am=${amount}&cu=INR&tn=${encodeURIComponent("Madisson AI Pro Pass")}`;
      return;
    }
    if (method === "paypal" && paypalReady) {
      window.open(
        `https://paypal.me/${payments.paypalMeUsername}/${amount}${currency}`,
        "_blank"
      );
      return;
    }

    // Fallback: no gateway wired yet — send a manual order intake email.
    const subject = encodeURIComponent("Pro Pass request — Madisson AI Studio");
    const body = encodeURIComponent(
      `Hi Madisson,\n\nI'd like to join the Pro Pass (${currencySymbol[currency]}${amount}/mo, preferred method: ${method}).\n\nMy email: ${email}\n\nPlease send me a payment link.`
    );
    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-gold">Pro Pass</p>
      <h1 className="mt-2 font-display text-4xl">
        Unlock every prompt, asset &amp; guideline
      </h1>
      <p className="mt-3 max-w-xl text-sm text-taupe sm:text-base">
        One membership, the entire vault — including every new drop we post.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {/* Summary */}
        <div className="rounded-2xl border border-ink/10 bg-white/60 p-8">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl">
              {currencySymbol[currency]}
              {amount}
            </span>
            <span className="text-sm text-taupe">/ month</span>
          </div>

          <div className="mt-3 flex gap-2 text-xs">
            {(["INR", "USD"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`rounded-full border px-3 py-1 ${
                  currency === c
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 text-taupe"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <ul className="mt-6 space-y-3 text-sm">
            {features.map((f) => (
              <li key={f} className="flex gap-2">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Checkout */}
        <form
          onSubmit={handleReserve}
          className="flex flex-col rounded-2xl border border-ink/10 bg-paper-dim/60 p-8"
        >
          <label className="text-xs uppercase tracking-wide text-taupe">
            Your email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="mt-2 rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
          />

          <label className="mt-6 text-xs uppercase tracking-wide text-taupe">
            Payment method
          </label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(
              [
                ["upi", "UPI", upiReady],
                ["paypal", "PayPal", paypalReady],
                ["card", "Card", cardReady],
              ] as const
            ).map(([key, label, ready]) => (
              <button
                key={key}
                type="button"
                onClick={() => setMethod(key)}
                className={`rounded-lg border px-3 py-2.5 text-sm transition ${
                  method === key
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/15 text-ink/70"
                }`}
              >
                {label}
                {!ready && (
                  <span className="mt-0.5 block text-[10px] text-gold">
                    coming soon
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="mt-8 rounded-full bg-ink px-6 py-3.5 text-sm text-paper transition hover:bg-gold hover:text-ink"
          >
            {method === "upi" && upiReady
              ? "Pay with UPI"
              : method === "paypal" && paypalReady
              ? "Pay with PayPal"
              : "Reserve my access"}
          </button>

          <p className="mt-4 text-center text-xs text-taupe">
            {submitted
              ? "Check your email client — a message is ready to send. We'll reply with a secure payment link."
              : "Card checkout and instant UPI/PayPal go live as soon as the gateway is connected."}
          </p>
        </form>
      </div>
    </section>
  );
}
