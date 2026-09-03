// ─────────────────────────────────────────────────────────────────────────
// PROMPT + ASSET VAULT — real content pulled from @madissonai's Instagram
// (all 30 posts) plus verified prompt docs from Dropbox (AI Media Network
// HQ → Posting → Madisson.ai → [date] → Assets).
//
// tier: "free"  → visitors see the video + a cleaned-up description
// tier: "pro"   → same, PLUS the full generation prompt, every reference
//                 asset, and a step-by-step guideline — unlocked with Pro Pass
//
// sourced: "verified" → prompt/guideline copied directly from a real
//                        Dropbox prompt doc for this exact video
//          "drafted"  → written by us in Madisson's voice/workflow style as
//                        a starting point — swap in the real Dropbox doc
//                        whenever you have it
// ─────────────────────────────────────────────────────────────────────────

export type PromptTier = "free" | "pro";

export type PromptEntry = {
  slug: string;
  title: string;
  category: string;
  tier: PromptTier;
  isPhoto?: boolean;
  video?: string; // /reels/{slug}.webm
  thumb: string; // /thumbs/{slug}.jpg
  igUrl: string;
  description: string; // always visible — cleaned caption / effect summary
  fullPrompt?: string; // pro-only: the exact generation prompt
  fullGuideline?: string; // pro-only: step-by-step how to recreate it
  sourced?: "verified" | "drafted";
  assets: { label: string; type: "reference video" | "reference image" | "depth map" | "prompt doc" }[];
  requirements?: string[];
};

export const prompts: PromptEntry[] = [
  {
    slug: "db_ei1yjrrr",
    title: "Spider-Man City Swing",
    category: "Movie Recreation",
    tier: "pro",
    video: "/reels/db_ei1yjrrr.webm",
    thumb: "/thumbs/db_ei1yjrrr.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/Db_eI1yjRrR/",
    description:
      "A full Spider-Man swing through the city — leaping off a skyscraper and slinging between high-rises on web lines, motion-matched from a real reference clip.",
    fullPrompt:
      "Base the character's <<<image_1>>> movements entirely on the provided video (<<<video_1>>>) — ignoring its black-and-white visual style — and set the scene in New York City. Model the character exactly after the reference image I uploaded (<<<image_1>>> Image); have her leap from a skyscraper and swing between the city's high-rises using webs shot from her wrists.",
    fullGuideline:
      "1) Lock identity first: run a still character-reference pass before touching motion so the face doesn't drift once the video-to-video model starts animating the swing.\n2) Strip the motion-reference clip to black & white before uploading — colour data confuses the motion model, you only want the movement, not the look.\n3) Feed the depth reference alongside the scene still so the skyscraper environment holds up through the whole swing arc, not just the first frame.\n4) Keep denoise/strength low on the identity pass, then push it higher only for the environment/motion pass.\n5) Time the web-release frames to the music beat in your edit — that's what sells the swing as 'real' momentum instead of a floaty animation.",
    sourced: "verified",
    assets: [
      { label: "Character face reference", type: "reference image" },
      { label: "Motion reference clip (b/w)", type: "reference video" },
      { label: "Depth reference clip", type: "depth map" },
      { label: "Full prompt doc", type: "prompt doc" },
    ],
    requirements: [
      "Video-to-video model with motion-reference support",
      "A clean black & white motion reference clip",
      "Depth-conditioned generation for the environment pass",
    ],
  },
  {
    slug: "dchx249xtqs",
    title: "Brand New Day — Rooftop Entrance",
    category: "Movie Recreation",
    tier: "free",
    video: "/reels/dchx249xtqs.webm",
    thumb: "/thumbs/dchx249xtqs.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DcHX249xtqS/",
    description:
      "A 'Brand New Day' Spider-Man style rooftop entrance recreation — cinematic framing, city backdrop, comic-accurate suit detailing.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dcucgvmr1vh",
    title: "Amazing Spider-Man — Rooftop Kiss Recreation",
    category: "Movie Recreation",
    tier: "pro",
    video: "/reels/dcucgvmr1vh.webm",
    thumb: "/thumbs/dcucgvmr1vh.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DcuCGVmR1vh/",
    description:
      "The iconic rooftop kiss scene from The Amazing Spider-Man, recreated frame-for-frame with a face-swapped lead against an abandoned-skyscraper sunset backdrop.",
    fullPrompt:
      "Use <<<image_1>>> strictly as the face/character reference and match her facial identity accurately and naturally. Dress her in a fitted red short-sleeve T-shirt with a large white spider-shaped geometric emblem on the chest, paired with dark jeans. Use the provided scene image for the abandoned skyscraper environment, framing, depth, lighting, and NYC sunset atmosphere. Use <<<video_1>>> strictly for all character movement and action — copy the exact body movement, hand movement, timing, posture, and coffee-sipping action from the video. Ignore the video's black-and-white visual style completely. Keep the character naturally integrated into the environment with realistic proportions and movement.",
    fullGuideline:
      "1) Generate the character reference frame first (face-lock pass) before touching motion — this avoids identity drift once video-to-video runs.\n2) Feed the scene still as your environment/depth reference; keep camera framing identical to the source so the motion reference maps cleanly.\n3) Run the motion-reference video in grayscale — colour information in the reference confuses the motion model. Strip it before upload.\n4) Keep denoise/strength low (around 35-45%) on the first pass so the identity lock survives; do a second higher-strength pass only on wardrobe/background.\n5) Match audio timing in your edit to the original beat drop — this is what makes the recreation feel 1:1, not just visually.\n6) Export at native reel resolution, add the trending audio last so captions don't shift the sync.",
    sourced: "verified",
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
    slug: "dchxeh8xatr",
    title: "Brand New Day — Suit Reveal",
    category: "Movie Recreation",
    tier: "free",
    video: "/reels/dchxeh8xatr.webm",
    thumb: "/thumbs/dchxeh8xatr.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DcHXEh8xATR/",
    description: "A Brand New Day-style suit reveal moment, built around a slow push-in and dramatic lighting change.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dceujjnddrt",
    title: "Brand New Day — Web-Sling Landing",
    category: "Movie Recreation",
    tier: "free",
    video: "/reels/dceujjnddrt.webm",
    thumb: "/thumbs/dceujjnddrt.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DceUJjnDdRT/",
    description: "A web-sling landing sequence recreated with matched camera framing and impact timing.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dcum_l0sbt6",
    title: "Pigeon Trend — Seedance Edit",
    category: "Viral Trend",
    tier: "free",
    video: "/reels/dcum_l0sbt6.webm",
    thumb: "/thumbs/dcum_l0sbt6.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DcUM_l0sBt6/",
    description: "The viral 'pigeon' trend recreated using Seedance — quick, punchy, built for the trending-audio window.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dcwkgqkrkcd",
    title: "Brand New Day — Tony Stark Cameo",
    category: "Movie Recreation",
    tier: "free",
    video: "/reels/dcwkgqkrkcd.webm",
    thumb: "/thumbs/dcwkgqkrkcd.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DcWkGQkRKcd/",
    description: "A Brand New Day-themed recreation featuring a Tony Stark-style cameo beat.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dcuwkhsretw",
    title: "Spider-Man — Alley Reveal",
    category: "Movie Recreation",
    tier: "free",
    video: "/reels/dcuwkhsretw.webm",
    thumb: "/thumbs/dcuwkhsretw.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DcUWKHsReTw/",
    description: "A narrow alley reveal shot, Spider-Man themed, with dramatic top-down lighting.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dcpdxstrb8_",
    title: "Brand New Day — Dark Web Sequence",
    category: "Movie Recreation",
    tier: "free",
    video: "/reels/dcpdxstrb8_.webm",
    thumb: "/thumbs/dcpdxstrb8_.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DcPDxsTRB8_/",
    description: "A moodier, dark-toned Brand New Day recreation with a Tony Stark-adjacent beat.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dcrhvbcst2o",
    title: "Brand New Day — Skyline Chase",
    category: "Movie Recreation",
    tier: "free",
    video: "/reels/dcrhvbcst2o.webm",
    thumb: "/thumbs/dcrhvbcst2o.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DcRhvbCsT2O/",
    description: "A skyline chase sequence in the Brand New Day style, matched to a moving camera reference.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dcj7kggr3x1",
    title: "Shark Encounter Effect",
    category: "AI Tutorial",
    tier: "free",
    video: "/reels/dcj7kggr3x1.webm",
    thumb: "/thumbs/dcj7kggr3x1.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DcJ7kGGR3X1/",
    description: "A close-encounter shark effect — a good example of compositing a reference creature into a real scene.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dce0wsux5g6",
    title: "The Train Trend, Reacted & Rebuilt",
    category: "AI Tutorial",
    tier: "pro",
    video: "/reels/dce0wsux5g6.webm",
    thumb: "/thumbs/dce0wsux5g6.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DcE0wSUx5G6/",
    description:
      "A reaction-then-rebuild breakdown of the viral 'train' trend — watch it happen, then see exactly how it's made with AI, no studio or expensive gear required.",
    fullPrompt:
      "Recreate the train-window trend: subject seated by a moving train window, warm interior light against a blurred exterior landscape rushing past, reflective glass overlay on the subject's face, gentle camera sway matched to the train's motion.",
    fullGuideline:
      "1) Source or shoot a plain seated reference — the trend reads through the window/reflection compositing, not the pose, so a simple front-facing still works fine.\n2) Use a moving-landscape plate (train footage) as your background layer; keep its motion slow and horizontal so it doesn't fight the subject for attention.\n3) Add the glass reflection as a semi-transparent overlay layer, opacity around 15-25% — too strong and the subject disappears, too weak and it doesn't read as 'through glass.'\n4) Sync a gentle side-to-side camera sway to the audio's tempo, not the train motion — that's the detail most recreations miss.\n5) Grade slightly warm/golden to match the nostalgic tone that made the original trend spread.",
    sourced: "drafted",
    assets: [
      { label: "Moving landscape background plate", type: "reference video" },
      { label: "Glass reflection overlay", type: "reference image" },
      { label: "Full prompt doc", type: "prompt doc" },
    ],
    requirements: ["A moving background plate (train/vehicle POV footage)", "Layer compositing in your edit tool"],
  },
  {
    slug: "dccyk8txgdf",
    title: "Bike Trend Prompt",
    category: "Viral Trend",
    tier: "free",
    video: "/reels/dccyk8txgdf.webm",
    thumb: "/thumbs/dccyk8txgdf.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DcCYK8txGDF/",
    description: "A trending bike-effect recreation — fast to make, built for quick viral reach.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dccrnt1kb51",
    title: "Comment-to-Unlock Prompt Card",
    category: "Free Resource",
    tier: "free",
    isPhoto: true,
    thumb: "/thumbs/dccrnt1kb51.jpg",
    igUrl: "https://www.instagram.com/madissonai/p/DcCRNt1kb51/",
    description: "A saved prompt card from the feed — comment the keyword on the original post to get the prompt.",
    assets: [{ label: "Prompt card image", type: "reference image" }],
  },
  {
    slug: "db_z0aixcoq",
    title: "Spider-Man Swing, Take Two",
    category: "Movie Recreation",
    tier: "free",
    video: "/reels/db_z0aixcoq.webm",
    thumb: "/thumbs/db_z0aixcoq.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/Db_Z0aIxCOQ/",
    description: "A second take on the Spider-Man swing effect, shorter and punchier for the feed.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "db_zuznrdqu",
    title: "Unicorn Transformation",
    category: "Viral Trend",
    tier: "free",
    video: "/reels/db_zuznrdqu.webm",
    thumb: "/thumbs/db_zuznrdqu.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/Db_ZuzNRDQU/",
    description: "A whimsical unicorn transformation effect built with Seedance 2.5.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "db4lvd8ku0c",
    title: "Prompt Card — Saved for Later",
    category: "Free Resource",
    tier: "free",
    isPhoto: true,
    thumb: "/thumbs/db4lvd8ku0c.jpg",
    igUrl: "https://www.instagram.com/madissonai/p/Db4Lvd8ku0c/",
    description: "A text-card prompt drop from the feed, saved as quick reference.",
    assets: [{ label: "Prompt card image", type: "reference image" }],
  },
  {
    slug: "db284v_la_b",
    title: "Netflix Intro Effect",
    category: "Cinematic Recreation",
    tier: "free",
    video: "/reels/db284v_la_b.webm",
    thumb: "/thumbs/db284v_la_b.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/Db284V_lA_b/",
    description: "The iconic Netflix intro 'ta-dum' sting recreated as a personal opener.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dbx-4nvxixq",
    title: "Seedance 2.5 Showcase",
    category: "AI Tutorial",
    tier: "free",
    video: "/reels/dbx-4nvxixq.webm",
    thumb: "/thumbs/dbx-4nvxixq.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/Dbx-4nVxiXq/",
    description: "A showcase reel of cinema-grade clips made entirely with Seedance 2.5.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dbxhysbiqk-",
    title: "OpenArt Studio Self-Portrait",
    category: "Cinematic Portrait",
    tier: "free",
    video: "/reels/dbxhysbiqk-.webm",
    thumb: "/thumbs/dbxhysbiqk-.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DbxhysbiQK-/",
    description: "A cinematic self-portrait style edit built with OpenArt Studio.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dbtlrtttsnp",
    title: "Higgsfield Portrait Edit",
    category: "Cinematic Portrait",
    tier: "free",
    video: "/reels/dbtlrtttsnp.webm",
    thumb: "/thumbs/dbtlrtttsnp.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DbtlRTtTsnp/",
    description: "A moody cinematic portrait edit made with Higgsfield.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dbq-s5xztgj",
    title: "Viral Floating Caption Effect",
    category: "Viral Trend",
    tier: "free",
    video: "/reels/dbq-s5xztgj.webm",
    thumb: "/thumbs/dbq-s5xztgj.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/Dbq-S5XzTGJ/",
    description: "The viral floating-caption text effect, where on-screen text appears to physically float in the scene.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dbonlgwyzle",
    title: "Monster Encounter",
    category: "Viral Trend",
    tier: "pro",
    video: "/reels/dbonlgwyzle.webm",
    thumb: "/thumbs/dbonlgwyzle.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DbonlGWyzLe/",
    description: "A creature-encounter effect — a reference monster image composited into a real environment with matched lighting and shadow.",
    fullPrompt:
      "Composite the provided monster reference image into the scene, matching the environment's lighting direction, colour temperature, and ground-contact shadow. Scale the creature naturally against real-world objects in frame. Keep camera shake and grain consistent between the plate and the composited creature so it reads as one shot, not an overlay.",
    fullGuideline:
      "1) Match lighting direction first — pick your monster reference from a set shot in similar light to your plate, or you'll spend most of your time fixing shadows.\n2) Add a soft contact shadow directly under the creature's feet/base — this single detail sells 'it's really there' more than anything else.\n3) Match grain/noise between the plate and the creature layer so the composite doesn't look glued on.\n4) Time the reveal to a sudden camera whip or light flicker — a hard cut to 'it's just there' reads as more real than a slow fade-in.\n5) Keep the creature in frame for under 2 seconds on first reveal — longer exposure makes AI artifacts easier to spot.",
    sourced: "drafted",
    assets: [
      { label: "Monster reference image", type: "reference image" },
      { label: "Scene plate", type: "reference video" },
      { label: "Full prompt doc", type: "prompt doc" },
    ],
    requirements: ["A reference creature/monster image", "Basic compositing in your edit tool"],
  },
  {
    slug: "dbozwcotrwc",
    title: "Higgsfield Direct Link Edit",
    category: "AI Tutorial",
    tier: "free",
    video: "/reels/dbozwcotrwc.webm",
    thumb: "/thumbs/dbozwcotrwc.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DboZwCoTrWC/",
    description: "A quick Higgsfield-built edit, shared as a direct-link drop.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dblb-rgmnus",
    title: "Viral Zoom Effect",
    category: "Viral Trend",
    tier: "pro",
    video: "/reels/dblb-rgmnus.webm",
    thumb: "/thumbs/dblb-rgmnus.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/Dblb-RgMNus/",
    description: "The viral rapid zoom-punch effect — subject snaps from wide to extreme close-up on the beat, a staple opener for reels.",
    fullPrompt:
      "Rapid dolly-zoom style push from a wide establishing frame to an extreme close-up on the subject's face, timed to hit exactly on the beat drop. Add a subtle motion-blur streak during the zoom and a soft flash-white frame at the peak of the punch-in for impact.",
    fullGuideline:
      "1) Mark your beat drop in the audio track first — the whole effect is built backward from that single frame.\n2) Keyframe scale on a sharp ease-in curve (not linear) over 4-6 frames right before the beat — linear zooms read as slow and floaty.\n3) Add directional motion blur only during the zoom frames, not before/after, or the whole clip looks smeared.\n4) A 1-2 frame white flash exactly on the beat sells the 'punch' — skip it and the effect feels flat.\n5) Hold the close-up for at least half a second after the punch before cutting away, so viewers register the payoff.",
    sourced: "drafted",
    assets: [{ label: "Full prompt doc", type: "prompt doc" }],
    requirements: ["Any video editor with keyframeable scale + motion blur"],
  },
  {
    slug: "dbi2nzjmddi",
    title: "Card Reveal Effect",
    category: "Viral Trend",
    tier: "free",
    video: "/reels/dbi2nzjmddi.webm",
    thumb: "/thumbs/dbi2nzjmddi.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/Dbi2NzjMDdi/",
    description: "A card-style reveal transition effect, built for quick attention-grabbing reels.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dbgpb1ls4rg",
    title: "Movie-Grade AI Reveal",
    category: "Viral Trend",
    tier: "free",
    video: "/reels/dbgpb1ls4rg.webm",
    thumb: "/thumbs/dbgpb1ls4rg.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DbgPb1ls4rG/",
    description: "A mind-bending AI reveal effect that turns a simple idea into a movie-quality moment.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dbdojcmrenk",
    title: "Floating Objects, Cinematic Scene",
    category: "Viral Trend",
    tier: "free",
    video: "/reels/dbdojcmrenk.webm",
    thumb: "/thumbs/dbdojcmrenk.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DbdojCmRENK/",
    description: "Everyday objects turned into a floating cinematic scene with one prompt.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dbbjkybswwv",
    title: "Become Spider-Man",
    category: "Movie Recreation",
    tier: "free",
    video: "/reels/dbbjkybswwv.webm",
    thumb: "/thumbs/dbbjkybswwv.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DbbJKYbSWwV/",
    description: "A full self-to-Spider-Man transformation workflow, one of the earliest recreations in the series.",
    assets: [{ label: "Reference video (on Instagram)", type: "reference video" }],
  },
  {
    slug: "dbty4tastfe",
    title: "Odyssey Edit",
    category: "Cinematic Recreation",
    tier: "pro",
    video: "/reels/dbty4tastfe.webm",
    thumb: "/thumbs/dbty4tastfe.jpg",
    igUrl: "https://www.instagram.com/madissonai/reel/DbTY4tAStFE/",
    description: "One selfie turned into a full cinematic 'Odyssey' edit — epic scale, painterly lighting, movie-poster composition.",
    fullPrompt:
      "Transform the reference selfie into an epic cinematic scene in the style of a mythic odyssey: dramatic painterly lighting, wide heroic composition, wind-swept fabric and hair, a vast landscape or sea behind the subject, warm rim light separating the subject from the background, film-grade colour grade.",
    fullGuideline:
      "1) Pick a selfie with a clear, well-lit face and simple background — busy backgrounds fight the epic-scale composition you're aiming for.\n2) Generate the environment first as a separate wide establishing plate, then composite the subject in at roughly 1/3 frame height — going bigger loses the 'epic scale' read.\n3) Add wind-swept motion to hair/fabric via a short animation pass; static hair breaks the illusion immediately.\n4) Rim-light the subject's silhouette against the background — this is the single biggest lever for making it read as 'cinematic' instead of 'photoshopped.'\n5) Finish with a warm, slightly desaturated grade — pure vibrant colour reads as 'filter,' desaturated-warm reads as 'film.'",
    sourced: "drafted",
    assets: [{ label: "Full prompt doc", type: "prompt doc" }],
    requirements: ["A well-lit reference selfie", "Image generation model with strong environment/lighting control"],
  },
];

export const categories = Array.from(new Set(prompts.map((p) => p.category)));
