// ─────────────────────────────────────────────────────────────────────────
// SITE CONFIG — edit these values, nothing else in the code needs to change.
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Madisson AI Studio",
  shortName: "Madisson AI",
  tagline: "I make AI do things it wasn't ready for.",
  description:
    "The prompt & asset vault behind Madisson AI's viral cinematic AI recreations — free previews for everyone, full prompts + reference assets + step-by-step guidelines for Pro Pass members, and 1:1 mentorship for creators who want to learn the craft.",
  // Replace with your real handles/URLs whenever ready.
  social: {
    instagram: "https://www.instagram.com/madissonai/",
    // TODO: verify — no Facebook Page was found connected yet (checked SlideDM
    // settings). Swap this for the real Page URL once you have one linked.
    facebook: "https://www.facebook.com/madissonai",
    youtube: "https://www.youtube.com/@MadissonAi",
  },
  instagramFollowers: "5.2K+",
  profileImage: "/madisson-profile.jpg",
  contactEmail: "madissonai@boringfilmcompany.com",
};

// ─────────────────────────────────────────────────────────────────────────
// PAYMENTS — no gateway account is required to go live with this config.
// Fill in whichever of these you already have; anything left blank simply
// shows a "coming soon" state instead of a dead/broken button.
//
//   paypalMeUsername  → from paypal.me, e.g. "madissonai" (no business API needed)
//   upiId             → your UPI VPA, e.g. "madissonai@okicici" (no gateway needed)
//   razorpayKeyId     → add later for real card/UPI checkout + auto receipts
//   stripePublicKey   → add later if you'd rather use Stripe for card/USD
// ─────────────────────────────────────────────────────────────────────────

export const payments = {
  paypalMeUsername: "",
  upiId: "",
  razorpayKeyId: "",
  stripePublicKey: "",
};

export type Currency = "INR" | "USD";

export const pricing = {
  pro: { INR: 499, USD: 9 },
  academy: { INR: 4999, USD: 59 },
};

export const currencySymbol: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
};
