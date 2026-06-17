/**
 * Isotipo (monograma) de la marca: las iniciales "RC" en degradé dorado.
 * Es solo el LOGO; el nombre "Rodrigo Madrid Cabot" se renderiza aparte
 * como texto, para poder colocar cada pieza por separado.
 * SVG inline → nítido a cualquier tamaño y sin pedir un archivo extra.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient
          id="brandmark-gold"
          x1="6"
          y1="42"
          x2="42"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#9a6a22" />
          <stop offset="0.45" stopColor="#e6c576" />
          <stop offset="1" stopColor="#fbeec6" />
        </linearGradient>
      </defs>

      {/* anillo fino */}
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke="url(#brandmark-gold)"
        strokeWidth="1.5"
        opacity="0.55"
      />

      {/* monograma RC en serif */}
      <text
        x="24"
        y="32.5"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="23"
        fontWeight="600"
        letterSpacing="-1.5"
        fill="url(#brandmark-gold)"
      >
        RC
      </text>
    </svg>
  );
}
