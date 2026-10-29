// Prepares the original files in /Assets for the website.
// Run with: node scripts/optimize-images.mjs
// Re-run it whenever you replace the logo or hero images in /Assets.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public/images/hero", { recursive: true });

// Hero photos: 1920px wide WebP, small enough for slower connections.
const hero = [
  ["Assets/justice_mediation_family_dialogue_01.jpg", "public/images/hero/hero-1.webp"],
  ["Assets/justice_mediation_family_dialogue_02.jpg", "public/images/hero/hero-2.webp"],
  ["Assets/justice_mediation_family_dialogue_04_4k.png", "public/images/hero/hero-3.webp"],
];
for (const [input, output] of hero) {
  const info = await sharp(input).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 72 }).toFile(output);
  console.log(output, `${Math.round(info.size / 1024)} KB`);
}

// Logo: trim the empty white margins.
const logo = await sharp("Assets/logo.png").trim({ threshold: 10 }).png({ compressionLevel: 9 }).toFile("public/logo.png");
console.log("public/logo.png", `${logo.width}x${logo.height}`);

// Browser-tab and home-screen icons: the circular emblem on the left of the logo.
const emblem = sharp("Assets/logo.png").extract({ left: 66, top: 36, width: 368, height: 368 });
await emblem.clone().resize(256, 256).png().toFile("src/app/icon.png");
await emblem.clone().resize(180, 180).flatten({ background: "#ffffff" }).png().toFile("src/app/apple-icon.png");
console.log("src/app/icon.png, src/app/apple-icon.png");
