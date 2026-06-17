import type { CSSProperties } from "react";
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppGlyph,
} from "@/components/ui/social-icons";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/reveal";
import { getSocialLinks, socialSection } from "@/lib/config/site-config";
import type { SocialNetwork } from "@/lib/types/content";

const NETWORK_META: Record<
  SocialNetwork,
  { glow: string; ring: string; Icon: typeof InstagramIcon }
> = {
  instagram: { glow: "#E1306C", ring: "rgba(225,48,108,0.5)", Icon: InstagramIcon },
  tiktok: { glow: "#25F4EE", ring: "rgba(37,244,238,0.5)", Icon: TikTokIcon },
  whatsapp: { glow: "#25D366", ring: "rgba(37,211,102,0.5)", Icon: WhatsAppGlyph },
};

export function Social() {
  const links = getSocialLinks();

  return (
    <section className="relative mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
      <Reveal>
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
          {socialSection.eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
          {socialSection.title}
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          {socialSection.body}
        </p>
      </Reveal>

      <RevealStagger className="mx-auto mt-14 flex flex-wrap items-stretch justify-center gap-5">
        {links.map((link) => {
          const meta = NETWORK_META[link.network];
          const Icon = meta.Icon;
          const style = {
            "--glow": meta.glow,
            "--ring": meta.ring,
          } as CSSProperties;

          return (
            <RevealItem key={link.network}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} ${link.handle}`}
                style={style}
                className="group flex w-44 flex-col items-center gap-4 rounded-2xl border border-border/70 bg-surface/50 p-7 outline-none transition-all duration-300 hover:-translate-y-1.5 hover:border-[color:var(--glow)] hover:bg-surface hover:shadow-[0_0_50px_-12px_var(--ring)] focus-visible:ring-2 focus-visible:ring-[color:var(--glow)]"
              >
                <span className="grid size-16 place-items-center rounded-full border border-border bg-bg text-muted transition-all duration-300 group-hover:scale-110 group-hover:border-[color:var(--glow)] group-hover:text-[color:var(--glow)] group-hover:shadow-[0_0_30px_-4px_var(--glow)] group-focus-visible:text-[color:var(--glow)]">
                  <Icon className="size-7 transition-[filter] duration-300 group-hover:[filter:drop-shadow(0_0_8px_var(--glow))]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">{link.label}</p>
                  <p className="mt-0.5 text-xs text-muted">{link.handle}</p>
                </div>
              </a>
            </RevealItem>
          );
        })}
      </RevealStagger>
    </section>
  );
}
