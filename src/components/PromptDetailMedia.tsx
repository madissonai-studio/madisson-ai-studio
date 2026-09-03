"use client";

import { useRef } from "react";
import type { PromptEntry } from "@/data/prompts";
import { PlayIcon } from "./icons";

export default function PromptDetailMedia({ prompt }: { prompt: PromptEntry }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleEnter() {
    videoRef.current?.play().catch(() => {});
  }
  function handleLeave() {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      className="group relative mt-6 h-[420px] w-full overflow-hidden rounded-2xl bg-ink"
    >
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
      {!prompt.isPhoto && (
        <PlayIcon className="pointer-events-none absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-paper/80 drop-shadow transition group-hover:opacity-0" />
      )}
    </div>
  );
}
