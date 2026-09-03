import Link from "next/link";
import { site } from "@/config/site";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <img
                src={site.profileImage}
                alt={site.shortName}
                className="h-9 w-9 rounded-full border border-gold object-cover"
              />
              <span className="font-display text-lg">Madisson AI Studio</span>
            </div>
            <p className="mt-3 text-sm text-taupe">{site.tagline}</p>
            <div className="mt-5 flex gap-4">
              <SocialLink href={site.social.instagram} label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </SocialLink>
              <SocialLink href={site.social.facebook} label="Facebook">
                <FacebookIcon className="h-5 w-5" />
              </SocialLink>
              <SocialLink href={site.social.youtube} label="YouTube">
                <YoutubeIcon className="h-5 w-5" />
              </SocialLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h4 className="text-xs uppercase tracking-wide text-taupe">Explore</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/vault">All prompts</Link></li>
                <li><Link href="/#vault">Free drops</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wide text-taupe">Membership</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/pro">Pro Pass</Link></li>
                <li><Link href="/academy">Academy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wide text-taupe">Contact</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 hairline" />
        <p className="mt-6 text-center text-xs text-taupe">
          © {new Date().getFullYear()} {site.name}. All prompts and assets are
          for personal creative use.
        </p>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}
