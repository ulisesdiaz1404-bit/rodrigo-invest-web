import {
  CalendarCheck,
  Clock,
  MessageSquareText,
  Send,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/reveal";
import { benefits } from "@/lib/config/site-config";

const ICONS: Record<string, LucideIcon> = {
  Clock,
  Send,
  CalendarCheck,
  MessageSquareText,
};

export function Benefits() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
            Beneficios para el asesor
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
            Menos trabajo para vos, más valor para tus clientes
          </h2>
        </Reveal>
      </div>

      <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => {
          const Icon = ICONS[benefit.iconKey] ?? Clock;
          return (
            <RevealItem key={benefit.title}>
              <article className="group h-full rounded-2xl border border-border/70 bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-surface hover:shadow-[0_18px_40px_-20px_rgba(157,184,214,0.45)]">
                <span className="inline-flex size-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/5 text-accent transition-colors duration-300 group-hover:border-accent/60 group-hover:bg-accent/10">
                  <Icon className="size-6" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-fg">
                  {benefit.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {benefit.description}
                </p>
              </article>
            </RevealItem>
          );
        })}
      </RevealStagger>
    </section>
  );
}
