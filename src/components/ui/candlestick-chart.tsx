"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo del hero: gráfico de velas (candlestick) animado en bucle.
 * Las velas se desplazan continuamente; verde cuando el precio sube,
 * rojo cuando baja. Canvas 2D (liviano, sin three.js).
 * Respeta prefers-reduced-motion (dibuja un cuadro estático).
 */

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

const UP = "#22c55e";
const UP_WICK = "rgba(34,197,94,0.8)";
const DOWN = "#ef4444";
const DOWN_WICK = "rgba(239,68,68,0.8)";

export function CandlestickChart({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const spacing = 22; // px entre centros de velas
    const bodyW = 11;
    const speed = 0.45; // px por frame

    let width = 0;
    let height = 0;
    let dpr = 1;
    let candles: Candle[] = [];
    let scrollX = 0;
    let lastClose = 50;
    // rango de precio visible (auto-escala suavizada)
    let viewMin = 0;
    let viewMax = 100;
    let rafId = 0;

    const nextCandle = (): Candle => {
      const open = lastClose;
      // caminata aleatoria con leve sesgo a media (mantiene rango)
      const drift = (50 - open) * 0.01;
      const close = open + (Math.random() - 0.5) * 10 + drift;
      const high = Math.max(open, close) + Math.random() * 4;
      const low = Math.min(open, close) - Math.random() * 4;
      lastClose = close;
      return { open, close, high, low };
    };

    const countNeeded = () => Math.ceil(width / spacing) + 3;

    const seed = () => {
      candles = [];
      lastClose = 50;
      for (let i = 0; i < countNeeded(); i++) candles.push(nextCandle());
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (candles.length < countNeeded()) seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // auto-escala suavizada al rango visible
      let lo = Infinity;
      let hi = -Infinity;
      for (const c of candles) {
        if (c.low < lo) lo = c.low;
        if (c.high > hi) hi = c.high;
      }
      const pad = (hi - lo) * 0.15 || 10;
      viewMin += (lo - pad - viewMin) * 0.05;
      viewMax += (hi + pad - viewMax) * 0.05;

      const padTop = height * 0.12;
      const padBottom = height * 0.16;
      const usable = height - padTop - padBottom;
      const yOf = (price: number) =>
        padTop + (1 - (price - viewMin) / (viewMax - viewMin || 1)) * usable;

      // líneas de cuadrícula tenues
      ctx.strokeStyle = "rgba(157,184,214,0.06)";
      ctx.lineWidth = 1;
      for (let g = 0; g <= 4; g++) {
        const y = padTop + (usable / 4) * g;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      for (let i = 0; i < candles.length; i++) {
        const c = candles[i];
        const x = i * spacing - scrollX;
        if (x < -spacing || x > width + spacing) continue;
        const up = c.close >= c.open;

        // mecha
        ctx.strokeStyle = up ? UP_WICK : DOWN_WICK;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, yOf(c.high));
        ctx.lineTo(x, yOf(c.low));
        ctx.stroke();

        // cuerpo
        const yOpen = yOf(c.open);
        const yClose = yOf(c.close);
        const top = Math.min(yOpen, yClose);
        const h = Math.max(2, Math.abs(yClose - yOpen));
        ctx.fillStyle = up ? UP : DOWN;
        ctx.globalAlpha = 0.92;
        ctx.fillRect(x - bodyW / 2, top, bodyW, h);
        ctx.globalAlpha = 1;
      }
    };

    const tick = () => {
      scrollX += speed;
      while (scrollX >= spacing) {
        scrollX -= spacing;
        candles.shift();
        candles.push(nextCandle());
      }
      draw();
      rafId = requestAnimationFrame(tick);
    };

    resize();
    if (reduceMotion) {
      draw();
    } else {
      rafId = requestAnimationFrame(tick);
    }
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? "absolute inset-0 block h-full w-full"}
    />
  );
}
