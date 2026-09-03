import { site } from "@/config/site";
import { InstagramIcon, FacebookIcon, YoutubeIcon, ArrowRightIcon } from "./icons";

const links = [
  {
    href: site.social.instagram,
    label: "Instagram",
    handle: "@madissonai",
    detail: `${site.instagramFollowers} followers`,
    Icon: InstagramIcon,
  },
  {
    href: site.social.youtube,
    label: "YouTube",
    handle: "@MadissonAi",
    detail: "Longer breakdowns & tutorials",
    Icon: YoutubeIcon,
  },
  {
    href: site.social.facebook,
    label: "Facebook",
    handle: "Madisson AI",
    detail: "Clips & community",
    Icon: FacebookIcon,
  },
];

export default function FollowSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-gold/30 bg-gradient-to-b from-paper-dim/80 to-paper px-8 py-14 text-center">
        <img
          src={site.profileImage}
          alt="Madisson AI"
          className="h-20 w-20 rounded-full border-2 border-gold object-cover shadow-lg"
        />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Follow Madisson AI</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">
            New recreations drop weekly — don&rsquo;t miss one
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-taupe sm:text-base">
            The vault is just the archive. Every new effect, trend, and prompt
            posts to Instagram and YouTube first.
          </p>
        </div>

        <div className="mt-4 grid w-full gap-4 sm:grid-cols-3">
          {links.map(({ href, label, handle, detail, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 rounded-2xl border border-ink/10 bg-white/70 px-5 py-6 transition hover:border-gold hover:shadow-md"
            >
              <Icon className="h-6 w-6 text-ink transition group-hover:text-gold" />
              <span className="font-display text-lg">{label}</span>
              <span className="text-xs text-taupe">{handle}</span>
              <span className="text-[11px] uppercase tracking-wide text-gold">{detail}</span>
              <span className="mt-1 inline-flex items-center gap-1 text-xs text-ink">
                Follow
                <ArrowRightIcon className="h-3 w-3 transition group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
