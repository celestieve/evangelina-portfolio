// Responsive screenshot check.
//
//   1. npm run dev                      (in one terminal)
//   2. npm run screenshots              (in another)
//
// First time only:  npm i -D playwright && npx playwright install chromium
// Optional: pass a different URL, e.g.  npm run screenshots -- https://your-site.com
//
// Screenshots land in ./screenshots/<width>/<route>.png

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = (process.argv[2] || 'http://localhost:5173/').replace(/\/?$/, '/');

const VIEWPORTS = [
  { name: '360-phone-small', width: 360, height: 740 },
  { name: '390-phone', width: 390, height: 844 },
  { name: '768-tablet', width: 768, height: 1024 },
  { name: '1024-laptop-small', width: 1024, height: 700 },
  { name: '1440-desktop', width: 1440, height: 900 },
  { name: '1920-desktop-large', width: 1920, height: 1080 },
];

const ROUTES = [
  { name: '00-cover', hash: '', fresh: true },
  { name: '01-contents', hash: '#/' },
  { name: '02-case-intro', hash: '#/work/vtask' },
  { name: '03-case-slider', hash: '#/work/vtask/2' },
  { name: '04-case-gallery', hash: '#/work/vtask/3' },
  { name: '05-graphics', hash: '#/studio' },
  { name: '06-graphics-gallery', hash: '#/studio/2' },
  { name: '07-side-projects', hash: '#/studio/4' },
  { name: '08-studio-art', hash: '#/studio/5' },
  { name: '09-about', hash: '#/about' },
];

const browser = await chromium.launch();
const problems = [];

for (const vp of VIEWPORTS) {
  const dir = `screenshots/${vp.name}`;
  await mkdir(dir, { recursive: true });
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  for (const r of ROUTES) {
    await page.goto(BASE + r.hash, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    // Flag anything that makes the page scroll sideways.
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) problems.push(`${vp.name} ${r.name}: horizontal overflow of ${overflow}px`);
    await page.screenshot({ path: `${dir}/${r.name}.png`, fullPage: vp.width <= 760 });
  }
  await context.close();
  console.log(`✓ ${vp.name}`);
}

await browser.close();
console.log(problems.length ? `\nIssues:\n- ${problems.join('\n- ')}` : '\nNo horizontal overflow found.');
