import Image from "next/image";
import { getWhatsappLink, getSocialLinks, siteConfig } from "@/lib/config/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = getSocialLinks();

  return (
    <footer className="border-t border-border/50 bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={28}
              height={28}
              className="size-7"
            />
            <span className="font-serif text-lg text-fg">
              Rodrigo<span className="text-accent">.invest</span>
            </span>
            <span className="hidden text-sm text-muted sm:inline">
              · {siteConfig.brand.suffix}
            </span>
          </div>

          <nav className="flex items-center gap-5 text-sm text-muted">
            {socials.map((s) => (
              <a
                key={s.network}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {s.label}
              </a>
            ))}
            <a
              href={getWhatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              Contacto
            </a>
          </nav>
        </div>

        <div className="hairline mt-8" />

        <p className="mt-6 text-center text-xs leading-relaxed text-muted/70">
          © {year} {siteConfig.brand.name}. {siteConfig.brand.tagline}.
          <br className="sm:hidden" />
          <span className="sm:ml-1">
            Este sitio no procesa pagos ni recopila datos: la consulta se
            realiza de forma privada por WhatsApp.
          </span>
        </p>
      </div>
    </footer>
  );
}
