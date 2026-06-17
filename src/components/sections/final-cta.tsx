import { Reveal } from "@/components/motion/reveal";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { finalCta } from "@/lib/config/site-config";

export function FinalCta() {
  return (
    <section className="relative mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-surface/60 px-6 py-16 text-center sm:px-12">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(157,184,214,0.16),transparent)]"
        />
        <div className="relative">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
              {finalCta.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mx-auto mt-5 max-w-2xl font-serif text-3xl leading-tight tracking-tight text-fg sm:text-4xl md:text-[2.75rem]">
              {finalCta.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {finalCta.body}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10 flex justify-center">
              <WhatsAppCta label={finalCta.cta} size="xxl" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
