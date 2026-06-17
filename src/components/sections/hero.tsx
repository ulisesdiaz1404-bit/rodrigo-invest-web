import { WebGLShader } from "@/components/ui/web-gl-shader";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { Reveal } from "@/components/motion/reveal";
import { heroContent } from "@/lib/config/site-config";

export function Hero() {
  const { eyebrow, title, highlight, subtitle, primaryCta, secondaryCta } =
    heroContent;

  // Resalta en dorado la porción "highlight" dentro del título.
  const [before, after] = title.split(highlight);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-24 pb-20 sm:px-8"
    >
      {/* Fondo: shader tintado a marca */}
      <WebGLShader className="absolute inset-0 block h-full w-full opacity-70" />

      {/* Overlays para legibilidad */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_30%,transparent_0%,rgba(7,11,20,0.55)_55%,var(--color-bg)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-bg/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-accent" />
            {eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-7 font-serif text-4xl leading-[1.08] tracking-tight text-fg sm:text-5xl md:text-6xl">
            {before}
            <span className="text-accent-gradient">{highlight}</span>
            {after}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <WhatsAppCta label={primaryCta} size="xl" />
            <a
              href="#como-funciona"
              className="text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              {secondaryCta}
            </a>
          </div>
        </Reveal>
      </div>

      {/* Indicador de scroll animado */}
      <a
        href="#como-funciona"
        aria-label="Bajar"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-border/70 p-1.5">
          <span className="mouse-dot block h-2 w-1 rounded-full bg-accent" />
        </span>
      </a>
    </section>
  );
}
