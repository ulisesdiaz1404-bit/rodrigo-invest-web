"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/lib/config/site-config";

const INTERVAL = 5000;
const EASE = [0.16, 1, 0.3, 1] as const;

// Paleta vibrante (pero elegante) — un acento por reseña.
const ACCENTS = [
  { from: "#34d399", to: "#06b6d4", glow: "rgba(45,212,191,0.20)", solid: "#2dd4bf" },
  { from: "#60a5fa", to: "#6366f1", glow: "rgba(99,102,241,0.20)", solid: "#818cf8" },
  { from: "#c084fc", to: "#ec4899", glow: "rgba(236,72,153,0.18)", solid: "#e879b9" },
];

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 64, scale: 0.96 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (d: number) => ({ opacity: 0, x: d * -64, scale: 0.96 }),
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

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
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-surface/30 py-24 sm:py-32">
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
            className="relative mt-14 grid"
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
                className="overflow-hidden rounded-3xl border border-white/10 bg-surface/80 p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.85)] backdrop-blur-sm [grid-area:1/1] sm:p-10"
              >
                {/* glow de color por reseña */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
                  style={{ background: accent.glow }}
                />
                {/* barra superior con gradiente */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                  }}
                />
                {/* comilla decorativa */}
                <Quote
                  className="absolute right-7 top-7 size-12 opacity-20"
                  style={{ color: accent.solid }}
                  strokeWidth={1.4}
                />

                <div className="relative">
                  {/* estrellas */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="size-4"
                        style={{ color: accent.solid, fill: accent.solid }}
                      />
                    ))}
                  </div>

                  <blockquote className="mt-5 text-pretty font-serif text-lg leading-relaxed text-fg sm:text-xl">
                    “{t.quote}”
                  </blockquote>

                  <figcaption className="mt-8 flex items-center gap-4">
                    <span
                      className="grid size-12 shrink-0 place-items-center rounded-full text-sm font-bold text-white shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                      }}
                    >
                      {initials(t.name)}
                    </span>
                    <span className="text-left">
                      <span className="block text-sm font-semibold text-fg">
                        {t.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">
                        {t.role}
                      </span>
                    </span>
                  </figcaption>
                </div>
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
                className="block h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 28 : 6,
                  background:
                    i === index
                      ? `linear-gradient(90deg, ${ACCENTS[i % ACCENTS.length].from}, ${ACCENTS[i % ACCENTS.length].to})`
                      : "var(--color-border)",
                }}
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
