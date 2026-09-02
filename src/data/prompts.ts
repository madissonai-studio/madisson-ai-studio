// ─────────────────────────────────────────────────────────────────────────
// PROMPT + ASSET VAULT — sample content.
//
// Replace these entries with your real drops from Dropbox → AI Media
// Network HQ → Posting → Madisson.ai → [date] → Assets.
//
// tier: "free"  → visitors see the short prompt + one reference asset
// tier: "pro"   → same, PLUS the full shot-by-shot guideline + every asset,
//                 unlocked only after Pro Pass checkout
// ─────────────────────────────────────────────────────────────────────────

export type PromptTier = "free" | "pro";

export type PromptEntry = {
  slug: string;
  title: string;
  category: string;
  tier: PromptTier;
  cover: string; // gradient class used as a placeholder thumbnail
  shortPrompt: string; // always visible
  fullGuideline?: string; // pro-only: step-by-step how to recreate it
  assets: { label: string; type: "reference video" | "reference image" | "depth map" | "prompt doc" }[];
  requirements?: string[]; // pro-only: tools / settings needed
};

export const prompts: PromptEntry[] = [
  {
    slug: "rooftop-kiss-recreation",
    title: "Amazing Spider-Man — Rooftop Kiss Recreation",
    category: "Movie Recreation",
    tier: "pro",
    cover: "from-[#2b2620] via-[#121110] to-[#000000]",
    shortPrompt:
      "Use the reference face as the character and match her facial identity accurately. Dress her to match the iconic rooftop scene wardrobe. Use the provided scene image for the abandoned skyscraper environment, framing, depth, lighting and sunset atmosphere. Match the exact body movement, hand movement, timing and posture from the reference clip.",
    fullGuideline:
      "1) Generate the character reference frame first (face-lock pass) before touching motion — this avoids identity drift once video-to-video runs.\n2) Feed the scene still as your environment/depth reference; keep camera framing identical to the source so the motion reference maps cleanly.\n3) Run the motion-reference video in grayscale — colour information in the reference confuses the motion model. Strip it before upload.\n4) Keep denoise/strength low (around 35-45%) on the first pass so the identity lock survives; do a second higher-strength pass only on wardrobe/background.\n5) Match audio timing in your edit to the original beat drop — this is what makes the recreation feel 1:1, not just visually.\n6) Export at native reel resolution, add the trending audio last so captions don't shift the sync.",
    assets: [
      { label: "Character face reference", type: "reference image" },
      { label: "Scene / environment still", type: "reference image" },
      { label: "Motion reference clip (b/w)", type: "reference video" },
      { label: "Full prompt doc", type: "prompt doc" },
    ],
    requirements: [
      "Video-to-video model with motion-reference support (e.g. Kling, Runway, or similar)",
      "Face-lock / identity reference pass",
      "A clean 20-25s motion reference clip, stripped to black & white",
    ],
  },
  {
    slug: "golden-hour-skyline-walk",
    title: "Golden Hour Skyline Walk",
    category: "Cinematic Portrait",
    tier: "free",
    cover: "from-[#3a2f1f] via-[#1a1611] to-[#000000]",
    shortPrompt:
      "Use <<<image_1>>> strictly as the face/character reference. Place her walking along a rooftop ledge at golden hour, warm rim lighting, city skyline softly blurred behind her, hair and fabric moving gently in the wind. Cinematic 35mm film look, shallow depth of field.",
    assets: [
      { label: "Character face reference", type: "reference image" },
      { label: "Prompt doc", type: "prompt doc" },
    ],
  },
  {
    slug: "cyberpunk-drift",
    title: "Cyberpunk Neon Drift",
    category: "Action Recreation",
    tier: "pro",
    cover: "from-[#241a30] via-[#14101c] to-[#000000]",
    shortPrompt:
      "Recreate a neon-lit night drift scene — reflections on wet asphalt, glowing signage, motion blur on the wheels, camera doing a low, sweeping tracking shot. Use the reference clip strictly for camera movement and vehicle motion timing.",
    fullGuideline:
      "1) Start from the depth map, not the raw still — night scenes with heavy reflections confuse most depth estimators, so a clean depth pass up front saves 3-4 regenerations later.\n2) Camera movement reference should be trimmed to just the tracking portion; cut before/after frames that include cuts or zooms.\n3) Push saturation on neon signage only in a masked second pass — global saturation boosts wash out the vehicle's paint identity.\n4) Time your captions/text overlays to the two beat hits in the audio — this is the single biggest lever on watch-through rate for this style.",
    assets: [
      { label: "Depth map", type: "depth map" },
      { label: "Camera motion reference clip", type: "reference video" },
      { label: "Scene reference still", type: "reference image" },
      { label: "Full prompt doc", type: "prompt doc" },
    ],
    requirements: [
      "Depth-conditioned image/video model",
      "A trimmed 3-5s camera-movement-only reference clip",
    ],
  },
  {
    slug: "morning-coffee-balcony",
    title: "Morning Coffee, City Balcony",
    category: "Lifestyle",
    tier: "free",
    cover: "from-[#2e2a22] via-[#161310] to-[#000000]",
    shortPrompt:
      "Use <<<image_1>>> as the face/character reference. She's sitting on a balcony at sunrise, both hands wrapped around a coffee mug, soft steam rising, warm backlight, cozy oversized sweater, calm and quiet mood. Shallow depth of field, film grain.",
    assets: [
      { label: "Character face reference", type: "reference image" },
      { label: "Prompt doc", type: "prompt doc" },
    ],
  },
  {
    slug: "matrix-bullet-time",
    title: "Matrix-Style Bullet Time",
    category: "Movie Recreation",
    tier: "pro",
    cover: "from-[#1c2418] via-[#101410] to-[#000000]",
    shortPrompt:
      "Recreate the iconic bullet-time dodge — green-tinted cinematic grade, dramatic low-angle camera doing a slow arc around the subject, coat/fabric frozen mid-motion, subtle lens distortion at the edges.",
    fullGuideline:
      "1) The arc camera move is the hardest part — use a multi-frame reference (start, mid, end) rather than a single still so the model understands the rotation, not just a pose.\n2) Keep the green grade as a final colour-grade pass, not baked into the generation prompt — baking it in early causes the model to shift skin tones unnaturally.\n3) Fabric/coat freeze-motion reads best when you explicitly describe frozen droplets or dust in the air; this sells the 'frozen time' read far more than the pose alone.\n4) For the reel edit: hold the frozen frame for at least 8-10 frames before releasing motion — cutting too early kills the effect.",
    assets: [
      { label: "Multi-angle camera arc reference", type: "reference video" },
      { label: "Scene reference still", type: "reference image" },
      { label: "Full prompt doc", type: "prompt doc" },
    ],
    requirements: [
      "Multi-frame camera reference (not just one still)",
      "Colour grading pass done after generation, not before",
    ],
  },
  {
    slug: "rainy-window-portrait",
    title: "Rainy Window Portrait",
    category: "Cinematic Portrait",
    tier: "free",
    cover: "from-[#232a2e] via-[#121616] to-[#000000]",
    shortPrompt:
      "Use <<<image_1>>> as the face/character reference. Close-up through a rain-streaked window, soft blue-grey light, condensation on the glass, contemplative mood, cinematic color grade, shallow focus with the rain drops sharp in the foreground.",
    assets: [
      { label: "Character face reference", type: "reference image" },
      { label: "Prompt doc", type: "prompt doc" },
    ],
  },
];

export const categories = Array.from(new Set(prompts.map((p) => p.category)));
