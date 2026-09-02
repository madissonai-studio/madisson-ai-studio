"use client";

import Link from "next/link";
import { useState } from "react";
import { useCurrency } from "./currency-context";
import type { Currency } from "@/config/site";

const navLinks = [
  { href: "/#vault", label: "Vault" },
  { href: "/vault", label: "All Prompts" },
  { href: "/pro", label: "Pro Pass" },
  { href: "/academy", label: "Academy" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold text-gold font-display text-lg">
            M
          </span>
          <span className="font-display text-lg tracking-wide">Madisson AI Studio</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide text-ink/70 transition hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <CurrencySwitch currency={currency} setCurrency={setCurrency} />
          <Link
            href="/pro"
            className="rounded-full bg-ink px-5 py-2 text-sm text-paper transition hover:bg-gold hover:text-ink"
          >
            Join Pro Pass
          </Link>
        </div>

        <button
          className="text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-paper px-5 pb-6 md:hidden">
          <nav className="flex flex-col gap-4 pt-4">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <div className="pt-2">
              <CurrencySwitch currency={currency} setCurrency={setCurrency} />
            </div>
            <Link
              href="/pro"
              className="mt-2 rounded-full bg-ink px-5 py-2 text-center text-sm text-paper"
              onClick={() => setOpen(false)}
            >
              Join Pro Pass
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function CurrencySwitch({
  currency,
  setCurrency,
}: {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}) {
  return (
    <div className="flex rounded-full border border-ink/15 p-0.5 text-xs">
      {(["INR", "USD"] as Currency[]).map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={`rounded-full px-3 py-1.5 transition ${
            currency === c ? "bg-ink text-paper" : "text-ink/60 hover:text-ink"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
