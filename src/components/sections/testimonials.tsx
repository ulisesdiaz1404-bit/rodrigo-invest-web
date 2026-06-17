import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/lib/config/site-config";
import type { Testimonial } from "@/lib/types/content";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full w-[300px] shrink-0 flex-col rounded-2xl border border-border/70 bg-bg/50 p-7 transition-colors duration-300 hover:border-accent/40 sm:w-[360px]">
      <Quote className="size-7 text-accent/70" strokeWidth={1.5} />
      <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-fg/90">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-border/60 pt-4">
        <p className="text-sm font-semibold text-fg">{t.name}</p>
        <p className="mt-0.5 text-xs text-muted">{t.role}</p>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  // Se duplica la lista para que el loop del marquee sea perfecto.
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-surface/30 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
              Lo que dicen los asesores
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
              Quedan bien ante sus clientes
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Marquee continuo de reseñas */}
      <Reveal delay={0.1} className="mt-14">
        <div className="marquee-mask">
          <div className="marquee-track gap-5 px-2.5">
            {loop.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>
      </Reveal>

      <p className="mt-10 text-center text-xs text-muted/70">
        Testimonios de ejemplo · reemplazá por casos reales en site-config.ts
      </p>
    </section>
  );
}
