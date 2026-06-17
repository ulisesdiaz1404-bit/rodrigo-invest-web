// Procesa el logo provisto (public/brand/logo.png):
//  - vuelve transparente el fondo claro (key por brillo, conserva el dorado)
//  - recorta el espacio sobrante (trim)
//  - genera el monograma transparente (logo-mark.png) y el favicon cuadrado.
// Uso:  node scripts/process-logo.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const brand = join(__dirname, "..", "public", "brand");
const src = join(brand, "logo.png");

// 1) Leer píxeles y quitar el fondo claro -> alpha 0
const img = sharp(src).ensureAlpha();
const { data, info } = await img
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  // Fondo = píxel claro y poco saturado (blanco/gris). El dorado tiene el
  // canal azul claramente más bajo, así que sobrevive al filtro.
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  if (min > 200 && max - min < 28) {
    data[i + 3] = 0; // transparente
  }
}

const keyed = sharp(data, { raw: { width, height, channels } }).png();

// 2) Monograma transparente y recortado
await keyed
  .clone()
  .trim({ threshold: 1 })
  .toFile(join(brand, "logo-mark.png"));

// 3) Favicon cuadrado (monograma centrado sobre transparente)
await keyed
  .clone()
  .trim({ threshold: 1 })
  .resize(96, 96, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .toFile(join(brand, "favicon.png"));

console.log("Logo procesado -> logo-mark.png + favicon.png (fondo transparente)");
