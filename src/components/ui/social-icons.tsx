import type { SVGProps } from "react";

/* Íconos de marca como SVG (trazo simple). TikTok no existe en lucide,
   así que va su glifo oficial. Instagram y WhatsApp también en SVG para
   poder controlar el glow de hover por color. */

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.5 3c.3 2.06 1.46 3.43 3.5 3.6v2.4c-1.18.12-2.21-.27-3.41-.99v4.62c0 4.7-3.12 6.37-5.5 6.37-2.61 0-4.6-1.94-4.6-4.46 0-2.63 2.06-4.46 4.5-4.46.41 0 .79.05 1.16.16v2.5a2.04 2.04 0 0 0-1.2-.39c-1.08 0-1.96.84-1.96 1.96 0 1.13.88 1.97 1.96 1.97 1.18 0 2.05-.82 2.05-2.6V3h3.5Z" />
    </svg>
  );
}

export function WhatsAppGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.05 8.05 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.12-1.13l-.3-.18-3.12.82.83-3.04-.19-.31a8.05 8.05 0 0 1-1.26-4.33c0-4.46 3.64-8.09 8.1-8.09Zm-4.66 4.4c-.22 0-.58.08-.88.41-.3.33-1.15 1.13-1.15 2.75 0 1.62 1.18 3.19 1.34 3.41.17.22 2.32 3.54 5.62 4.96.78.34 1.39.54 1.87.69.78.25 1.5.21 2.06.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.13-.3-.21-.63-.38-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.74.17-.22.33-.85 1.06-1.04 1.28-.19.22-.38.25-.71.08-.33-.16-1.39-.51-2.65-1.63-.98-.87-1.64-1.95-1.83-2.28-.19-.33-.02-.5.15-.67.15-.15.33-.38.49-.58.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.58-.08-.16-.74-1.78-1.01-2.43-.27-.64-.54-.55-.74-.56l-.63-.01Z" />
    </svg>
  );
}
