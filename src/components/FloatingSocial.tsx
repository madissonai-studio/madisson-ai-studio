import { site } from "@/config/site";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./icons";

const items = [
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
];

export default function FloatingSocial() {
  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 sm:flex lg:right-6">
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-paper/40 text-ink/40 opacity-50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-gold hover:bg-paper hover:text-ink hover:opacity-100 hover:shadow-lg"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
