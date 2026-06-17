"use client";

import {
  GlassFilter,
  liquidbuttonVariants,
} from "@/components/ui/liquid-glass-button";
import { WhatsAppGlyph } from "@/components/ui/social-icons";
import { getWhatsappLink } from "@/lib/config/site-config";
import { cn } from "@/lib/utils";

interface WhatsAppCtaProps {
  label: string;
  message?: string;
  size?: "lg" | "xl" | "xxl";
  className?: string;
}

/**
 * CTA primario con efecto liquid glass que abre WhatsApp.
 * Se construye como <a> autónomo (no usa LiquidButton+asChild, que
 * rompe con Radix Slot por tener múltiples hijos) reutilizando las
 * variantes y el filtro de vidrio del componente base.
 * Usa siempre getWhatsappLink() — nunca hardcodea el link.
 */
export function WhatsAppCta({
  label,
  message,
  size = "xl",
  className,
}: WhatsAppCtaProps) {
  return (
    <a
      href={getWhatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "relative",
        liquidbuttonVariants({ size }),
        "rounded-full border border-accent/40 font-medium text-fg shadow-[0_0_30px_-8px_rgba(157,184,214,0.5)] transition-transform duration-300 hover:scale-105",
        className,
      )}
    >
      <div
        className="absolute top-0 left-0 z-0 h-full w-full rounded-full
            shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]"
      />
      <div
        className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-full"
        style={{ backdropFilter: 'url("#container-glass")' }}
      />
      <span className="pointer-events-none relative z-10 flex items-center gap-2">
        <WhatsAppGlyph className="size-5" />
        {label}
      </span>
      <GlassFilter />
    </a>
  );
}
