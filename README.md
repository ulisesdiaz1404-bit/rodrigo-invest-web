# Meridiano · Informe de Mercado — Landing

Landing page de una sola página para vender un newsletter / informe de mercado dirigido a
**asesores financieros**. La web **no vende ni cobra online**: el único canal de conversión es
**WhatsApp**. Todo el proceso comercial ocurre de forma privada por fuera de la web.

## Stack

- **Next.js 16** (App Router, React Server Components) · **TypeScript strict**
- **Tailwind CSS v4** (tokens CSS-first en `src/app/globals.css`)
- **shadcn/ui** (Accordion para FAQ) · **lucide-react** (íconos)
- **three.js** (shader del hero) · **Framer Motion** (animaciones de scroll)
- **Lenis** (scroll suave global)

## Puesta en marcha

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

Otros scripts: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm type-check`.

## Dónde se edita TODO el contenido

Un único archivo concentra el número de WhatsApp, el mensaje prellenado, las redes y el copy
de cada sección:

**`src/lib/config/site-config.ts`**

### Cambiar el número de WhatsApp

```ts
whatsapp: {
  phoneNumber: "+5491121555695", // formato internacional, SIN espacios
  defaultMessage: "Hola, quiero más información sobre el informe de mercado de Meridiano.",
}
```

- `phoneNumber`: en formato internacional. Ej.: `+54 9 11 2155-5695` → `+5491121555695`.
- `defaultMessage`: texto que aparece prellenado al abrir WhatsApp.
- Todos los CTA usan la función `getWhatsappLink()`, así que con cambiar el número acá se
  actualiza la web entera (header, hero, botón flotante, CTA final, sección de redes y footer).

### Cambiar el mensaje de un CTA puntual

Cada CTA puede llevar su propio mensaje sin tocar el global:

```tsx
<WhatsAppCta label="Quiero el informe" message="Hola, vi la sección de beneficios y quiero saber más." />
```

### Cambiar las redes sociales

```ts
social: {
  instagram: { handle: "@rodrigomcabot", url: "https://instagram.com/rodrigomcabot" },
  tiktok:    { handle: "@ElProfeDeFinanzas", url: "https://www.tiktok.com/@elprofedefinanzas" },
}
```

El brillo (glow) de cada logo al pasar el cursor se controla en
`src/components/sections/social.tsx` (objeto `NETWORK_META`).

### Cambiar la marca y el SEO

```ts
brand: { name: "Meridiano", suffix: "Informe de Mercado", tagline: "...", url: "https://..." },
seo:   { title: "...", description: "...", keywords: [...] },
```

> El nombre **"Meridiano"** es un placeholder elegante: reemplazalo por el nombre real del
> informe cuando lo definas.

### Cambiar el copy de cada sección

En el mismo archivo están exportados como objetos/arrays fáciles de editar:

| Sección | Variable |
|---|---|
| Hero | `heroContent` |
| Propuesta de valor | `valueProposition` |
| Beneficios | `benefits` |
| Cómo funciona | `steps` |
| Testimonios | `testimonials` |
| Redes | `socialSection` |
| FAQ | `faqItems` |
| CTA final | `finalCta` |

## Estructura

```
src/
├── app/                # layout (SEO, fonts, botón flotante), page (composición), globals.css
├── components/
│   ├── sections/       # cada bloque de la landing
│   ├── layout/         # header y footer
│   ├── whatsapp/       # botón flotante, ícono y CTA reutilizable
│   ├── motion/         # reveal (Framer Motion) y smooth-scroll (Lenis)
│   └── ui/             # shader, liquid button, accordion, íconos de redes
└── lib/
    ├── config/site-config.ts   # ← TODO el contenido editable
    ├── types/content.ts
    └── utils.ts
```

## Notas de diseño

- Paleta navy/dorado (banca privada en modo oscuro). El verde de WhatsApp (`#25D366`) se usa
  **solo** en el botón flotante.
- Tipografías: **Fraunces** (serif editorial, titulares) + **Inter** (cuerpo).
- Animaciones sutiles (fade/slide-up) que respetan `prefers-reduced-motion`.
- Sin backend: no hay formularios, base de datos ni captura de email.
