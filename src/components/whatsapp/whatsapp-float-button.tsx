"use client";

import { getWhatsappLink } from "@/lib/config/site-config";
import { WhatsAppIcon } from "./whatsapp-icon";

/**
 * Botón flotante fijo de WhatsApp. Único lugar de la web donde se usa
 * el verde de WhatsApp (#25D366). Visible durante todo el scroll.
 */
export function WhatsAppFloatButton() {
  return (
    <div className="fixed bottom-4 right-4 z-[100] sm:bottom-6 sm:right-6">
      <a
        href={getWhatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] outline-none transition-transform duration-200 ease-out hover:scale-105 focus-visible:ring-4 focus-visible:ring-[#25D366]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-95 sm:h-[60px] sm:w-[60px]"
      >
        {/* Anillo de pulso discreto (cada ~4.5s, no permanente) */}
        <span className="wa-pulse-ring pointer-events-none absolute inset-0 rounded-full bg-[#25D366]" />

        <WhatsAppIcon className="relative z-10 h-7 w-7 sm:h-8 sm:w-8" />

        {/* Tooltip solo en desktop (con puntero fino) */}
        <span className="pointer-events-none absolute right-[calc(100%+12px)] hidden whitespace-nowrap rounded-lg bg-surface px-3 py-2 text-sm font-medium text-fg opacity-0 shadow-lg ring-1 ring-border transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(pointer:fine)]:block">
          Hablemos por WhatsApp
        </span>
      </a>
    </div>
  );
}
