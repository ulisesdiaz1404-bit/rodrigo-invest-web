// Genera el logo de marca (PNG) a partir de un SVG vectorial elegante.
// Uso:  node scripts/make-logo.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "brand");

// Marca: monograma "RC" dorado dentro de un anillo fino.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <defs>
    <linearGradient id="g" x1="30" y1="170" x2="170" y2="30" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#9a6a22"/>
      <stop offset="0.45" stop-color="#e6c576"/>
      <stop offset="1" stop-color="#fbeec6"/>
    </linearGradient>
  </defs>

  <!-- anillo fino -->
  <circle cx="100" cy="100" r="92" stroke="url(#g)" stroke-width="6" opacity="0.55"/>

  <!-- monograma RC -->
  <text x="100" y="136" text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif" font-size="100" font-weight="600"
    letter-spacing="-6" fill="url(#g)">RC</text>
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
