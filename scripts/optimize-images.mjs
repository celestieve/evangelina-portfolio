// Converts the originals in images/ into web-ready WebP files in public/assets/.
//   npm run images
// Each image gets a full-size version (used by the lightbox) and, when it's
// wide enough, an 800px "-800.webp" version for phones and small galleries.
// Sizes are written to src/image-sizes.json so <Img> can reserve space while loading.
import { copyFile, mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'images';
const OUT = 'public/assets';
const MAX = 1600; // full-size width cap
const SMALL = 800;
// The screenshots carry a fine dither pattern; q70 + max effort keeps text crisp
// at well under half the size.
const WEBP = { quality: 70, effort: 6 };

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
const sizes = {};
let before = 0, after = 0;

for (const file of files) {
  const name = file.replace(/\.[^.]+$/, '');
  const input = sharp(path.join(SRC, file));
  const { width, height } = await input.metadata();
  const srcSize = (await stat(path.join(SRC, file))).size;
  before += srcSize;

  const dest = path.join(OUT, `${name}.webp`);
  let full = await input.clone().resize({ width: MAX, withoutEnlargement: true }).webp(WEBP).toFile(dest);
  // Already-compressed WebP that re-encoding can't shrink: keep the original bytes
  if (/\.webp$/i.test(file) && width <= MAX && full.size >= srcSize) {
    await copyFile(path.join(SRC, file), dest);
    full = { width, height, size: srcSize };
  }
  after += full.size;
  sizes[name] = { width: full.width, height: full.height };

  if (width > SMALL * 1.25) {
    const small = await input.clone().resize({ width: SMALL })
      .webp(WEBP).toFile(path.join(OUT, `${name}-${SMALL}.webp`));
    sizes[name].small = SMALL;
    after += small.size;
  }
  console.log(`${file.padEnd(22)} ${width}×${height}`);
}

await writeFile('src/image-sizes.json', JSON.stringify(sizes, null, 2) + '\n');
const mb = (n) => (n / 1024 / 1024).toFixed(1) + ' MB';
console.log(`\n${files.length} images: ${mb(before)} → ${mb(after)} (all sizes)`);
