import { Reveal } from "@/components/motion/reveal";
import { valueProposition } from "@/lib/config/site-config";

export function ValueProposition() {
  const { eyebrow, title, body } = valueProposition;

  return (
    <section className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
      <Reveal>
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight text-fg sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <div className="hairline mx-auto mt-8 w-24" />
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          {body}
        </p>
      </Reveal>
    </section>
  );
}
