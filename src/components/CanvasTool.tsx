"use client";

import { useState, type ChangeEvent } from "react";
import type { PromptEntry } from "@/data/prompts";
import { useCurrency } from "./currency-context";
import { canvasPricing, currencySymbol } from "@/config/site";
import { CheckIcon } from "./icons";

function buildCanvasPrompt(prompt: PromptEntry): string {
  const base =
    prompt.fullPrompt?.trim() ||
    `${prompt.description} Recreate this in the "${prompt.category}" style, matching the mood, lighting, and camera work of the original @madissonai video.`;

  return `You are a visual prompt reconstruction assistant.

I'm attaching my own photo as the ONLY reference for the main character in this recreation. Wherever the template below mentions "<<<image_1>>>", a "character reference", "her identity", or "his identity", that means ME — use my real face, proportions, skin tone, and apparent age exactly as shown in my attached photo. Do not blend it with anyone else's face, and do not keep the original character's identity.

ORIGINAL RECREATION TEMPLATE (this exact "${prompt.title}" recreation — preserve its scene, action, camera work, lighting and style):
"""
${base}
"""

Now write ONE final, production-ready video-generation prompt that places ME (from the attached photo) into this exact recreation — same scene, same action, same camera work, same lighting and mood as the template above, just with my face and identity as the subject.

Output ONLY the final prompt text. No explanation, no analysis, no side-by-side comparison — just the finished prompt, ready to paste into a video generator.`;
}

function useCanvasCost() {
  const { currency } = useCurrency();
  const { costPerSecUSD, defaultDurationSec, platformFeePercent, inrPerUsd } = canvasPricing;
  const baseUSD = costPerSecUSD * defaultDurationSec;
  const totalUSD = baseUSD / (1 - platformFeePercent / 100);
  const feeUSD = totalUSD - baseUSD;
  const rate = currency === "USD" ? 1 : inrPerUsd;
  const round = (n: number) => (currency === "USD" ? Math.round(n * 100) / 100 : Math.round(n));
  return {
    symbol: currencySymbol[currency],
    base: round(baseUSD * rate),
    fee: round(feeUSD * rate),
    total: round(totalUSD * rate),
    durationSec: defaultDurationSec,
  };
}

export default function CanvasTool({ prompt }: { prompt: PromptEntry }) {
  const cost = useCanvasCost();

  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState("");
  const [promptGenerated, setPromptGenerated] = useState(false);
  const [finalPrompt, setFinalPrompt] = useState("");
  const [pastedSheet, setPastedSheet] = useState("");
  const [sheetConfirmed, setSheetConfirmed] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [paid, setPaid] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  }

  function handlePhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoDataUrl(reader.result as string);
      setPhotoName(file.name);
    };
    reader.readAsDataURL(file);
  }

  function handleGeneratePrompt() {
    setFinalPrompt(buildCanvasPrompt(prompt));
    setPromptGenerated(true);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(finalPrompt);
      showToast("Copied! Paste it into ChatGPT along with your photo.");
    } catch {
      showToast("Couldn't copy automatically — select the text and copy manually.");
    }
  }

  function handleGenerateVideo() {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setVideoReady(true);
    }, 3000);
  }

  const step1Done = !!photoDataUrl;

  return (
    <div className="mt-10 space-y-5">
      <div className="rounded-2xl border border-gold/40 bg-ink px-6 py-4 text-paper">
        <p className="text-xs uppercase tracking-wide text-gold">Canvas — demo mode</p>
        <p className="mt-1 text-sm text-paper/80">
          No real payment or API call happens yet on this page. This is a working preview of the
          exact flow — upload your photo, generate your own prompt, pay once, get your video.
        </p>
      </div>

      {/* Step 1 */}
      <div className="rounded-2xl border border-ink/10 bg-white/60 p-6">
        <StepTitle n={1} done={step1Done} label="Upload your photo" />
        <label className="mt-3 flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-ink/15 px-6 py-8 text-center text-sm text-taupe transition hover:border-gold">
          {photoDataUrl ? (
            <>
              <img src={photoDataUrl} alt={photoName} className="h-32 w-32 rounded-xl object-cover" />
              <span>{photoName} — click to replace</span>
            </>
          ) : (
            <span>
              📷 Click to upload a clear photo of your face — used only as the character
              reference, nothing is uploaded anywhere in this demo.
            </span>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        </label>
      </div>

      {/* Step 2 */}
      <div className={`rounded-2xl border border-ink/10 bg-white/60 p-6 ${!step1Done ? "pointer-events-none opacity-40" : ""}`}>
        <StepTitle n={2} done={promptGenerated} label="Generate your Character Sheet Prompt" />
        <p className="mt-2 text-xs text-taupe">
          This builds a personalised prompt from the exact recreation template for &ldquo;{prompt.title}&rdquo;.
        </p>
        <button
          onClick={handleGeneratePrompt}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition hover:bg-gold hover:text-ink"
        >
          Generate Character Sheet Prompt
        </button>
        {promptGenerated && (
          <div className="mt-4">
            <textarea
              readOnly
              value={finalPrompt}
              rows={10}
              className="w-full rounded-xl border border-ink/10 bg-paper-dim p-4 font-mono text-xs leading-relaxed"
            />
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                onClick={handleCopy}
                className="rounded-full border border-ink/20 px-4 py-2 text-xs transition hover:border-ink"
              >
                📋 Copy Prompt
              </button>
              <a
                href="https://chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-ink px-4 py-2 text-xs text-paper transition hover:bg-gold hover:text-ink"
              >
                Open ChatGPT ↗
              </a>
            </div>
            <p className="mt-2 text-xs text-taupe">
              In ChatGPT: start a new chat, attach your photo, paste this prompt, and send. ChatGPT
              writes your personalised character sheet — the final prompt used for your video.
            </p>
          </div>
        )}
      </div>

      {/* Step 3 */}
      <div className={`rounded-2xl border border-ink/10 bg-white/60 p-6 ${!promptGenerated ? "pointer-events-none opacity-40" : ""}`}>
        <StepTitle n={3} done={sheetConfirmed} label="Paste ChatGPT's character sheet back here" />
        <textarea
          value={pastedSheet}
          onChange={(e) => setPastedSheet(e.target.value)}
          rows={6}
          placeholder="Paste what ChatGPT gave you here..."
          className="mt-3 w-full rounded-xl border border-ink/10 bg-white p-4 text-sm"
        />
        <button
          disabled={!pastedSheet.trim()}
          onClick={() => setSheetConfirmed(true)}
          className="mt-3 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition hover:bg-gold hover:text-ink disabled:opacity-40"
        >
          Confirm Character Sheet
        </button>
      </div>

      {/* Step 4 */}
      <div className={`rounded-2xl border border-ink/10 bg-white/60 p-6 ${!sheetConfirmed ? "pointer-events-none opacity-40" : ""}`}>
        <StepTitle n={4} done={paid} label="Pay for your video" />
        <div className="mt-3 rounded-xl border border-ink/10 bg-paper-dim/60 p-4 text-sm">
          <Row label={`AI video generation (est. ${cost.durationSec}s, ByteDance video model)`} value={`${cost.symbol}${cost.base}`} />
          <Row label="PromptCanvas fee (5% of total)" value={`${cost.symbol}${cost.fee}`} />
          <div className="mt-2 flex items-center justify-between border-t border-ink/10 pt-2 text-base font-semibold">
            <span>Total — pay once</span>
            <span>{cost.symbol}{cost.total}</span>
          </div>
        </div>
        <button
          disabled={paid}
          onClick={() => setPayOpen(true)}
          className="mt-3 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition hover:bg-gold hover:text-ink disabled:opacity-60"
        >
          {paid ? "Paid ✓" : "Pay with Razorpay"}
        </button>
        <p className="mt-2 text-xs text-taupe">
          Demo mode: no real charge happens. Live version opens a real Razorpay checkout for {cost.symbol}{cost.total}, and the video only generates after payment succeeds.
        </p>
      </div>

      {/* Step 5 */}
      <div className={`rounded-2xl border border-ink/10 bg-white/60 p-6 ${!paid ? "pointer-events-none opacity-40" : ""}`}>
        <StepTitle n={5} done={videoReady} label="Get your video" />
        {videoReady ? (
          <>
            <div className="mt-3 flex aspect-[9/16] max-w-[220px] items-center justify-center rounded-xl border border-ink/10 bg-ink text-center text-xs text-paper/50">
              🎬 your video
              <br />
              (demo placeholder)
            </div>
            <button
              onClick={() => showToast("Demo mode — nothing to download yet.")}
              className="mt-3 rounded-full border border-ink/20 px-4 py-2 text-xs transition hover:border-ink"
            >
              ⬇ Download (demo)
            </button>
            <p className="mt-2 text-xs text-taupe">
              Live version plays the actual MP4 returned by the ByteDance video model once the
              generation task finishes.
            </p>
          </>
        ) : generating ? (
          <p className="mt-3 flex items-center gap-2 text-sm text-taupe">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink/15 border-t-gold" />
            Sending your character sheet to the ByteDance video model and generating your{" "}
            {cost.durationSec}s video... (demo, ~3s)
          </p>
        ) : (
          <button
            onClick={handleGenerateVideo}
            className="mt-3 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition hover:bg-gold hover:text-ink"
          >
            Generate My Video
          </button>
        )}
      </div>

      {payOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPayOpen(false);
          }}
        >
          <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-paper p-6 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-gold">
              ⚡ Razorpay Checkout (demo)
            </span>
            <h3 className="font-display text-2xl">
              Pay {cost.symbol}
              {cost.total}
            </h3>
            <p className="mt-1 text-xs text-taupe">
              {prompt.title} — one video ({cost.durationSec}s)
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                onClick={() => {
                  setPayOpen(false);
                  setPaid(true);
                  showToast("Payment confirmed (demo). You can now generate your video.");
                }}
                className="rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition hover:bg-gold hover:text-ink"
              >
                Simulate Successful Payment
              </button>
              <button
                onClick={() => setPayOpen(false)}
                className="rounded-full border border-ink/20 px-5 py-2.5 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-paper shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

function StepTitle({ n, done, label }: { n: number; done: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold">
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          done ? "bg-gold text-ink" : "bg-ink text-paper"
        }`}
      >
        {done ? <CheckIcon className="h-3.5 w-3.5" /> : n}
      </span>
      {label}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1 text-taupe">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
