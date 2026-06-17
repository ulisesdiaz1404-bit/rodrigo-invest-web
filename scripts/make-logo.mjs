// Genera el logo de marca (PNG) a partir de un SVG vectorial elegante.
// Uso:  node scripts/make-logo.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "brand");

// Marca: anillo fino + línea ascendente (invest) con nodo en el ápice.
// Paleta platino frío / azul acero (sin dorado).
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <defs>
    <linearGradient id="g" x1="20" y1="180" x2="180" y2="20" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#7f9fcb"/>
      <stop offset="0.55" stop-color="#aec6e6"/>
      <stop offset="1" stop-color="#e2ecf8"/>
    </linearGradient>
    <filter id="s" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#9db8da" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- anillo fino -->
  <circle cx="100" cy="100" r="90" stroke="url(#g)" stroke-width="2.5" opacity="0.45"/>

  <!-- línea ascendente -->
  <polyline points="50,140 84,112 116,124 150,62"
    stroke="url(#g)" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"
    filter="url(#s)"/>

  <!-- nodos -->
  <circle cx="50" cy="140" r="4.5" fill="#8fb0dc"/>
  <circle cx="116" cy="124" r="4.5" fill="#aec6e6"/>
  <circle cx="150" cy="62" r="8.5" fill="#e2ecf8" filter="url(#s)"/>
</svg>`;

await mkdir(outDir, { recursive: true });

const render = (size, name) =>
  sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(join(outDir, name));

await Promise.all([
  render(512, "logo-mark.png"),
  render(96, "logo-mark@96.png"),
  render(48, "favicon.png"),
]);

console.log("Logo PNG generado en public/brand/");
