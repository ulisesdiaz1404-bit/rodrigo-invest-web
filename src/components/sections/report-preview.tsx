import Image from "next/image";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const STATS = [
  { label: "Renta variable", value: "+2,4%", up: true },
  { label: "Tipo de cambio", value: "Estable", up: true },
  { label: "Renta fija", value: "+0,8%", up: true },
];

export function ReportPreview() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
              Una muestra
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight text-fg sm:text-4xl">
              Así de claro es lo que reciben tus clientes
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Un documento prolijo, fácil de leer y con tu sello. Sin gráficos
              imposibles ni tecnicismos: contexto de mercado que cualquier
              cliente entiende de un vistazo.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="mt-8 space-y-3">
              {[
                "Resumen del mercado en lenguaje simple",
                "Datos clave destacados y explicados",
                "Listo para reenviar, sin editar nada",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-fg/90">
                  <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Mockup del informe (diseñado, sin foto de stock) */}
        <Reveal delay={0.1}>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(60%_60%_at_70%_20%,rgba(157,184,214,0.18),transparent)] blur-2xl"
            />
            {/* Página de respaldo, da profundidad */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 translate-x-4 translate-y-5 rounded-2xl border border-border/60 bg-surface/40"
            />
            <article className="animate-float relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
              {/* Header del informe */}
              <div className="flex items-center justify-between border-b border-border/70 px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/brand/logo-mark.png"
                    alt=""
                    width={24}
                    height={24}
                    className="size-6"
                  />
                  <span className="font-serif text-base text-fg">
                    Rodrigo<span className="text-accent">.invest</span>
                  </span>
                </div>
                <span className="text-[0.7rem] uppercase tracking-widest text-muted">
                  Informe semanal · Nº 48
                </span>
              </div>

              <div className="px-6 py-6">
                <p className="text-[0.7rem] uppercase tracking-widest text-accent">
                  Panorama de mercado
                </p>
                <h3 className="mt-1 font-serif text-2xl text-fg">
                  La semana en tres ideas
                </h3>

                {/* Gráfico de área (SVG) */}
                <div className="mt-5 rounded-xl border border-border/70 bg-bg/50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-muted">
                      <TrendingUp className="size-4 text-accent" />
                      Índice de referencia
                    </span>
                    <span className="text-xs font-medium text-accent">
                      +2,4% semanal
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 320 90"
                    className="h-24 w-full"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(157,184,214,0.35)" />
                        <stop offset="100%" stopColor="rgba(157,184,214,0)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 70 L40 64 L80 68 L120 50 L160 54 L200 36 L240 40 L280 22 L320 18 L320 90 L0 90 Z"
                      fill="url(#area)"
                    />
                    <path
                      d="M0 70 L40 64 L80 68 L120 50 L160 54 L200 36 L240 40 L280 22 L320 18"
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Líneas de texto simuladas */}
                <div className="mt-5 space-y-2.5">
                  <div className="h-2.5 w-full rounded-full bg-border/70" />
                  <div className="h-2.5 w-11/12 rounded-full bg-border/60" />
                  <div className="h-2.5 w-4/5 rounded-full bg-border/50" />
                </div>

                {/* Mini stats */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-lg border border-border/70 bg-bg/40 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-bg/70"
                    >
                      <p className="text-[0.65rem] uppercase tracking-wide text-muted">
                        {s.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-accent">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
