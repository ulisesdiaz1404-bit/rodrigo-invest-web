import { Reveal, RevealStagger, RevealItem } from "@/components/motion/reveal";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { steps } from "@/lib/config/site-config";

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
            Cómo funciona
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
            Tres pasos y listo
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 text-lg text-muted">
            Simple, privado y sin formularios. Todo arranca con un mensaje.
          </p>
        </Reveal>
      </div>

      <RevealStagger className="relative mt-16 grid gap-8 md:grid-cols-3">
        {/* Línea conectora en desktop */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
        />
        {steps.map((step) => (
          <RevealItem key={step.number}>
            <div className="relative text-center md:text-left">
              <span className="relative z-10 inline-flex size-14 items-center justify-center rounded-full border border-accent/40 bg-bg font-serif text-xl text-accent shadow-[0_0_30px_-10px_rgba(157,184,214,0.6)]">
                {step.number}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-fg">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>

      <Reveal delay={0.1}>
        <div className="mt-14 flex justify-center">
          <WhatsAppCta label="Empezar por WhatsApp" size="xl" />
        </div>
      </Reveal>
    </section>
  );
}
