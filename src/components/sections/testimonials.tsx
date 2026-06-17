"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/lib/config/site-config";

const INTERVAL = 5000;
const EASE = [0.16, 1, 0.3, 1] as const;

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 60, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (d: number) => ({ opacity: 0, x: d * -60, scale: 0.97 }),
};

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = useCallback(
    (next: number, direction: number) => {
      setState([(next + count) % count, direction]);
    },
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setState(([i]) => [(i + 1) % count, 1]);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [paused, count]);

  const t = testimonials[index];

  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-surface/30 py-24 sm:py-32">
      {/* glow ambiental */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(157,184,214,0.12),transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
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

        <Reveal delay={0.12}>
          <div
            className="relative mt-14 min-h-[280px] sm:min-h-[240px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-0 flex flex-col items-center rounded-3xl border border-border/70 bg-bg/60 p-8 text-center shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:p-12"
              >
                <Quote className="size-9 text-accent" strokeWidth={1.4} />
                <blockquote className="mt-5 font-serif text-xl leading-relaxed text-fg sm:text-2xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-7">
                  <p className="text-sm font-semibold text-fg">{t.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{t.role}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* indicadores */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ver reseña ${i + 1}`}
              onClick={() => go(i, i > index ? 1 : -1)}
              className="group p-1.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-7 bg-accent"
                    : "w-1.5 bg-border group-hover:bg-muted"
                }`}
              />
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted/70">
          Testimonios de ejemplo · reemplazá por casos reales en site-config.ts
        </p>
      </div>
    </section>
  );
}
