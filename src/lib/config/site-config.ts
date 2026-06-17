import type { FaqItem, SocialLink, Step, Testimonial } from "@/lib/types/content";

/* ============================================================
   MERIDIANO — Configuración central
   Editá AQUÍ el número de WhatsApp, el mensaje prellenado, el
   copy de cada sección y las redes. Ningún componente hardcodea
   estos datos. Ver README.md para una guía rápida.
   ============================================================ */

export const siteConfig = {
  whatsapp: {
    // Formato internacional, SIN espacios ni símbolos extra.
    // +54 9 11 2155-5695  ->  +5491121555695
    phoneNumber: "+5491121555695",
    defaultMessage:
      "Hola, quiero más información sobre el informe de mercado de Rodrigo.invest.",
  },

  brand: {
    name: "Rodrigo.invest",
    // Sufijo opcional usado junto al logo y en la metadata.
    suffix: "Research de mercado",
    tagline: "Informes de mercado claros, listos para compartir con tus clientes",
    // URL pública (para metadata / Open Graph). Cambiar al dominio real.
    url: "https://rodrigoinvest.example.com",
  },

  seo: {
    title: "Rodrigo.invest · Informe de Mercado para asesores financieros",
    description:
      "Un informe de mercado profesional, claro y listo para reenviar a tus clientes. Quedás como el asesor que siempre está al día, sin tener que producir el contenido. Coordinamos todo por WhatsApp.",
    keywords: [
      "informe de mercado",
      "newsletter financiero",
      "asesores financieros",
      "research de mercado",
      "contenido para clientes",
    ],
    locale: "es_AR",
  },

  // Redes sociales (el ícono y el color de glow se resuelven en el componente).
  social: {
    instagram: { handle: "@rodrigomcabot", url: "https://instagram.com/rodrigomcabot" },
    tiktok: { handle: "@ElProfeDeFinanzas", url: "https://www.tiktok.com/@elprofedefinanzas" },
    // El link de WhatsApp se arma siempre con getWhatsappLink().
  },
} as const;

/**
 * Construye el link wa.me con el mensaje prellenado.
 * Todos los CTA de la web deben usar esta función.
 */
export function getWhatsappLink(customMessage?: string): string {
  const message = encodeURIComponent(
    customMessage ?? siteConfig.whatsapp.defaultMessage,
  );
  return `https://wa.me/${siteConfig.whatsapp.phoneNumber.replace(/[^0-9]/g, "")}?text=${message}`;
}

/* ----------------------- Copy de secciones ----------------------- */

export const heroContent = {
  eyebrow: "Para asesores financieros",
  title: "El informe de mercado que tus clientes esperan recibir",
  highlight: "que tus clientes esperan recibir",
  subtitle:
    "Research profesional, claro y listo para reenviar. Quedás impecable ante tus clientes sin tener que producir el contenido vos mismo.",
  primaryCta: "Quiero el informe",
  secondaryCta: "Ver cómo funciona",
} as const;

export const valueProposition = {
  eyebrow: "Qué es Rodrigo.invest",
  title: "Vos asesorás. Del contenido nos encargamos nosotros.",
  body: "Rodrigo.invest es un informe de mercado periódico, pensado para que lo reenvíes a tus clientes con tu sello. Lo escribimos en lenguaje claro —sin jerga innecesaria— para que cualquier cliente, tenga o no formación financiera, lo entienda. Vos te quedás con el mérito de mantenerlos informados; nosotros hacemos el trabajo pesado de research y redacción.",
} as const;

export const benefits: { iconKey: string; title: string; description: string }[] = [
  {
    iconKey: "Clock",
    title: "Ahorrás horas cada semana",
    description:
      "Dejás de buscar, leer y resumir noticias de mercado. Recibís el análisis terminado y usás tu tiempo en lo que importa: tus clientes.",
  },
  {
    iconKey: "Send",
    title: "Listo para reenviar",
    description:
      "Llega en un formato cuidado que podés compartir tal cual o sumarle tu comentario. Tu marca presente, sin diseño ni edición de por medio.",
  },
  {
    iconKey: "CalendarCheck",
    title: "Periodicidad definida",
    description:
      "Acordamos la frecuencia que te sirve —semanal, quincenal o mensual— y cumplimos. Tus clientes reciben contenido constante y previsible.",
  },
  {
    iconKey: "MessageSquareText",
    title: "Lenguaje accesible",
    description:
      "Explicamos el mercado en palabras simples. Tus clientes entienden el contexto sin sentirse perdidos, y te ven como su referente.",
  },
];

export const steps: Step[] = [
  {
    number: "01",
    title: "Contactás por WhatsApp",
    description:
      "Nos escribís y nos contás a qué tipo de clientes asesorás. Sin formularios ni vueltas.",
  },
  {
    number: "02",
    title: "Coordinamos plan y frecuencia",
    description:
      "Definimos juntos el enfoque, el tono y cada cuánto querés recibir el informe. Todo a tu medida.",
  },
  {
    number: "03",
    title: "Recibís el informe listo",
    description:
      "Te llega puntual, listo para reenviar a tus clientes. Vos te quedás con el crédito de estar siempre al día.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Mis clientes me empezaron a responder los mensajes con preguntas, no con silencio. El informe me posiciona como alguien que de verdad los acompaña.",
    name: "Asesor financiero independiente",
    role: "Buenos Aires · testimonio de ejemplo",
  },
  {
    quote:
      "Antes tardaba toda una mañana en armar un resumen de mercado. Ahora lo reenvío en dos minutos y queda mejor que lo que hacía yo.",
    name: "Productora de seguros e inversiones",
    role: "Córdoba · testimonio de ejemplo",
  },
  {
    quote:
      "Lo mejor es que mis clientes lo entienden. No es un PDF lleno de tecnicismos: es claro y eso me hace quedar bien.",
    name: "Agente de inversiones",
    role: "Rosario · testimonio de ejemplo",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "¿Con qué frecuencia se entrega el informe?",
    answer:
      "Vos elegís. Trabajamos con frecuencia semanal, quincenal o mensual según lo que mejor le sirva a tu cartera de clientes. Lo definimos juntos por WhatsApp antes de empezar.",
  },
  {
    question: "¿Qué nivel de personalización tiene?",
    answer:
      "El informe se adapta al perfil de tus clientes y, según el plan, puede llevar tu nombre o tu marca. Coordinamos el tono y el enfoque para que se sienta una extensión natural de tu asesoramiento.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "El informe tiene un valor de USD 50. Según la frecuencia y el nivel de personalización que necesites podemos armar un plan a tu medida: escribinos por WhatsApp y coordinamos los detalles, sin compromiso.",
  },
  {
    question: "¿En qué formato lo recibo?",
    answer:
      "Lo recibís en un formato cuidado y listo para compartir —pensado para que lo reenvíes por mail o mensajería a tus clientes sin tener que editar nada—. Los detalles los acordamos al definir tu plan.",
  },
  {
    question: "¿Es confidencial? ¿Comparten mis datos?",
    answer:
      "Todo el proceso es privado y se maneja por WhatsApp. No publicamos tu cartera ni compartimos tus datos con terceros. El informe que reenviás lleva tu sello, no el nuestro.",
  },
  {
    question: "¿Necesito saber de finanzas para usarlo?",
    answer:
      "No. El informe está escrito para que tanto vos como tus clientes lo entiendan sin esfuerzo. Justamente esa claridad es lo que te hace quedar bien frente a quienes asesorás.",
  },
];

export const finalCta = {
  eyebrow: "Empezá hoy",
  title: "Quedá como el asesor que siempre está al día",
  body: "Sumá un informe de mercado profesional a tu relación con los clientes. Coordinamos todo por WhatsApp, de forma privada y sin compromiso.",
  cta: "Hablar por WhatsApp",
} as const;

export const socialSection = {
  eyebrow: "Seguinos",
  title: "Mercado, en simple, todos los días",
  body: "Análisis y contexto financiero sin vueltas. Seguinos en redes o escribinos directo por WhatsApp.",
} as const;

/** Construye la lista de redes para el componente social. */
export function getSocialLinks(): SocialLink[] {
  return [
    {
      network: "instagram",
      label: "Instagram",
      handle: siteConfig.social.instagram.handle,
      url: siteConfig.social.instagram.url,
    },
    {
      network: "tiktok",
      label: "TikTok",
      handle: siteConfig.social.tiktok.handle,
      url: siteConfig.social.tiktok.url,
    },
    {
      network: "whatsapp",
      label: "WhatsApp",
      handle: "Escribinos",
      url: getWhatsappLink(),
    },
  ];
}
