"use client";

import Link from "next/link";
import { useRef } from "react";
import type { PromptEntry } from "@/data/prompts";
import { useCurrency } from "./currency-context";
import { canvasPricing, currencySymbol } from "@/config/site";
import { PlayIcon } from "./icons";

export default function CanvasCard({ prompt }: { prompt: PromptEntry }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currency } = useCurrency();

  const { costPerSecUSD, defaultDurationSec, platformFeePercent, inrPerUsd } = canvasPricing;
  const baseUSD = costPerSecUSD * defaultDurationSec;
  const totalUSD = baseUSD / (1 - platformFeePercent / 100);
  const rate = currency === "USD" ? 1 : inrPerUsd;
  const total = currency === "USD" ? Math.round(totalUSD * 100) / 100 : Math.round(totalUSD * rate);

  function handleEnter() {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }
  function handleLeave() {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }

  return (
    <Link
      href={`/canvas/${prompt.slug}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/60"
    >
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-ink/90">
        <img src={prompt.thumb} alt={prompt.title} className="absolute inset-0 h-full w-full object-cover" />
        {prompt.video && (
          <video
            ref={videoRef}
            src={prompt.video}
            poster={prompt.thumb}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10 transition-opacity duration-300 group-hover:opacity-0" />
        <PlayIcon className="pointer-events-none absolute h-9 w-9 text-paper/80 drop-shadow transition group-hover:opacity-0" />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-gold">
          Canvas
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs uppercase tracking-wide text-taupe">{prompt.category}</span>
        <h3 className="mt-1 font-display text-lg leading-snug">{prompt.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-taupe">{prompt.description}</p>
        <span className="mt-4 text-xs text-gold">
          ~{currencySymbol[currency]}{total} for your own video →
        </span>
      </div>
    </Link>
  );
}
