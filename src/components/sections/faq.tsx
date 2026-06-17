"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { faqItems } from "@/lib/config/site-config";

export function Faq() {
  return (
    <section className="relative mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="text-center">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
            Preguntas frecuentes
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
            Todo lo que querés saber
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <Accordion
          type="single"
          collapsible
          className="mt-12 rounded-2xl border border-border/70 bg-surface/40 px-6"
        >
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
