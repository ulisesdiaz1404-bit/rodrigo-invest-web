import Link from "next/link";
import { getWhatsappLink, siteConfig } from "@/lib/config/site-config";
import { BrandMark } from "@/components/ui/brand-mark";
import { WhatsAppGlyph } from "@/components/ui/social-icons";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label={`${siteConfig.brand.name} — inicio`}
        >
          <BrandMark className="size-9 transition-transform duration-500 ease-out group-hover:rotate-[8deg]" />
          <span className="font-serif text-base leading-tight tracking-tight text-fg sm:text-lg">
            Rodrigo Madrid Cabot
          </span>
        </Link>

        <a
          href={getWhatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-2 text-sm font-medium text-fg transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_24px_-8px_rgba(157,184,214,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          <WhatsAppGlyph className="size-4 text-accent" />
          <span className="hidden sm:inline">Hablemos</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
