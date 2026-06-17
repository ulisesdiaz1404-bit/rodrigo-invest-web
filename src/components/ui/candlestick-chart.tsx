"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo del hero: mercado financiero animado.
 * Velas (candlestick) que se desplazan + dos líneas de tendencia onduladas
 * (verde y roja) que fluyen y mutan de forma aleatoria, con flechas en los
 * extremos. Cada carga es distinta (random walk con parámetros aleatorios).
 * Canvas 2D, liviano. Respeta prefers-reduced-motion (cuadro estático).
 */

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

const UP = "#22c55e";
const UP_WICK = "rgba(34,197,94,0.85)";
const DOWN = "#ef4444";
const DOWN_WICK = "rgba(239,68,68,0.85)";
const GREEN_LINE = "#22c55e";
const RED_LINE = "#ef4444";

interface Wave {
  base: number; // posición vertical (fracción de alto)
  baseV: number;
  amp: number; // amplitud (fracción de alto)
  ampV: number;
  freq: number;
  phase: number;
  speed: number; // sentido/velocidad de flujo
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

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
    const speed = 0.45; // px por frame (scroll de velas)

    let width = 0;
    let height = 0;
    let dpr = 1;
    let candles: Candle[] = [];
    let scrollX = 0;
    let lastClose = 50;
    let viewMin = 0;
    let viewMax = 100;
    let rafId = 0;
    let t = 0;

    const makeWave = (base: number, flow: number): Wave => ({
      base,
      baseV: 0,
      amp: rand(0.08, 0.15),
      ampV: 0,
      freq: rand(0.009, 0.015),
      phase: rand(0, Math.PI * 2),
      speed: flow,
    });

    // Parámetros aleatorios → cada visita se ve distinta.
    let greenWave = makeWave(rand(0.5, 0.66), rand(0.4, 0.8));
    let redWave = makeWave(rand(0.34, 0.5), -rand(0.4, 0.8));

    const nextCandle = (): Candle => {
      const open = lastClose;
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

    // Evolución lenta y aleatoria de cada onda (random walk amortiguado).
    const evolveWave = (w: Wave) => {
      w.baseV += rand(-0.0009, 0.0009);
      w.baseV *= 0.95;
      w.base = clamp(w.base + w.baseV, 0.22, 0.78);
      w.ampV += rand(-0.0004, 0.0004);
      w.ampV *= 0.95;
      w.amp = clamp(w.amp + w.ampV, 0.05, 0.19);
      w.phase += w.speed * 0.012;
    };

    const waveY = (w: Wave, x: number) =>
      (w.base +
        Math.sin(x * w.freq + w.phase) * w.amp +
        Math.sin(x * w.freq * 0.5 + w.phase * 1.3) * w.amp * 0.35) *
      height;

    const triangle = (x: number, y: number, up: boolean, color: string) => {
      const s = 7;
      ctx.save();
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.globalAlpha = 0.95;
      ctx.beginPath();
      if (up) {
        ctx.moveTo(x, y - s);
        ctx.lineTo(x - s, y + s);
        ctx.lineTo(x + s, y + s);
      } else {
        ctx.moveTo(x, y + s);
        ctx.lineTo(x - s, y - s);
        ctx.lineTo(x + s, y - s);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawWave = (w: Wave, color: string, up: boolean) => {
      let extX = 0;
      let extY = up ? Infinity : -Infinity; // y mínimo (arriba) para flecha up
      ctx.save();
      ctx.setLineDash([10, 9]);
      ctx.lineDashOffset = -t * 0.9 * Math.sign(w.speed || 1);
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 7) {
        const y = waveY(w, x);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        if (up ? y < extY : y > extY) {
          extY = y;
          extX = x;
        }
      }
      ctx.stroke();
      ctx.restore();
      // flecha en el extremo (verde sube ▲ en su punto más bajo de precio /
      // alto en pantalla; roja baja ▼ en su pico).
      triangle(extX, extY, up, color);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // auto-escala suavizada del rango de precios visible
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

      // cuadrícula tenue
      ctx.strokeStyle = "rgba(157,184,214,0.06)";
      ctx.lineWidth = 1;
      for (let g = 0; g <= 4; g++) {
        const y = padTop + (usable / 4) * g;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // velas
      for (let i = 0; i < candles.length; i++) {
        const c = candles[i];
        const x = i * spacing - scrollX;
        if (x < -spacing || x > width + spacing) continue;
        const up = c.close >= c.open;

        ctx.strokeStyle = up ? UP_WICK : DOWN_WICK;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, yOf(c.high));
        ctx.lineTo(x, yOf(c.low));
        ctx.stroke();

        const yOpen = yOf(c.open);
        const yClose = yOf(c.close);
        const top = Math.min(yOpen, yClose);
        const h = Math.max(2, Math.abs(yClose - yOpen));
        ctx.fillStyle = up ? UP : DOWN;
        ctx.globalAlpha = 0.9;
        ctx.fillRect(x - bodyW / 2, top, bodyW, h);
        ctx.globalAlpha = 1;
      }

      // líneas de tendencia onduladas (encima de las velas)
      drawWave(greenWave, GREEN_LINE, true);
      drawWave(redWave, RED_LINE, false);
    };

    const tick = () => {
      t += 1;
      scrollX += speed;
      while (scrollX >= spacing) {
        scrollX -= spacing;
        candles.shift();
        candles.push(nextCandle());
      }
      evolveWave(greenWave);
      evolveWave(redWave);
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
