"use client";

import { useState } from "react";
import { site, currencySymbol, pricing } from "@/config/site";
import { useCurrency } from "@/components/currency-context";
import { CheckIcon } from "@/components/icons";

export default function AcademyPage() {
  const { currency } = useCurrency();
  const [form, setForm] = useState({ name: "", email: "", goal: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Academy 1:1 enquiry — Madisson AI");
    const body = encodeURIComponent(
      `Hi Madisson,\n\nName: ${form.name}\nEmail: ${form.email}\n\nWhat I want to learn:\n${form.goal}`
    );
    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-gold">Academy</p>
      <h1 className="mt-2 font-display text-4xl">Learn to create these yourself</h1>
      <p className="mt-3 max-w-xl text-sm text-taupe sm:text-base">
        Prompts and assets get you most of the way. A live 1:1 session covers
        the rest: tool choice, workflow, and the judgment calls that make a
        recreation actually land. Tell us where you&rsquo;re at and we&rsquo;ll
        set up a time.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-white/60 p-8">
          <span className="font-display text-3xl">
            {currencySymbol[currency]}
            {pricing.academy[currency]}
          </span>
          <span className="ml-1 text-sm text-taupe">/ session</span>

          <ul className="mt-6 space-y-3 text-sm">
            {[
              "60-90 minute live 1:1 call",
              "We review and improve one of your own recreations",
              "Model/tool recommendations for your budget and goals",
              "Follow-up notes after the session",
            ].map((f) => (
              <li key={f} className="flex gap-2">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-2xl border border-ink/10 bg-paper-dim/60 p-8"
        >
          <label className="text-xs uppercase tracking-wide text-taupe">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-2 rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
          />

          <label className="mt-5 text-xs uppercase tracking-wide text-taupe">
            Email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="mt-2 rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
          />

          <label className="mt-5 text-xs uppercase tracking-wide text-taupe">
            What do you want to learn?
          </label>
          <textarea
            required
            rows={4}
            value={form.goal}
            onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
            className="mt-2 rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
          />

          <button
            type="submit"
            className="mt-6 rounded-full bg-ink px-6 py-3.5 text-sm text-paper transition hover:bg-gold hover:text-ink"
          >
            Request a session
          </button>

          {sent && (
            <p className="mt-4 text-center text-xs text-taupe">
              Check your email client — a message is ready to send.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
