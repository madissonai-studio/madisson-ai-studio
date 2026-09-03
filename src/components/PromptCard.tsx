"use client";

import Link from "next/link";
import { useRef } from "react";
import type { PromptEntry } from "@/data/prompts";
import { LockIcon, PlayIcon } from "./icons";

export default function PromptCard({ prompt }: { prompt: PromptEntry }) {
  const isPro = prompt.tier === "pro";
  const videoRef = useRef<HTMLVideoElement>(null);

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
      href={`/vault/${prompt.slug}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/60"
    >
      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-ink/90">
        <img
          src={prompt.thumb}
          alt={prompt.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
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
        {!prompt.isPhoto && (
          <PlayIcon className="pointer-events-none absolute h-9 w-9 text-paper/80 drop-shadow transition group-hover:opacity-0" />
        )}
        <span
          className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide ${
            isPro ? "bg-ink text-gold" : "bg-paper text-ink"
          }`}
        >
          {isPro && <LockIcon className="h-3 w-3" />}
          {isPro ? "Pro" : "Free"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs uppercase tracking-wide text-taupe">
          {prompt.category}
        </span>
        <h3 className="mt-1 font-display text-lg leading-snug">{prompt.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-taupe">{prompt.description}</p>
        <span className="mt-4 text-xs text-gold">
          {isPro ? "Full prompt + guideline unlocked with Pro →" : "Watch + get the effect →"}
        </span>
      </div>
    </Link>
  );
}
