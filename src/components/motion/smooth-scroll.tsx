"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Provider de scroll suave global (Lenis). Liviano y desactivado
 * automáticamente cuando el usuario prefiere menos movimiento.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      // lerp bajo = inercia larga y muy suave; gestos finos
      lerp: 0.075,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      smoothWheel: true,
      syncTouch: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
