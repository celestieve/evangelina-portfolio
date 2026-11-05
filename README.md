# Evangelina Le · Portfolio

Sketchbook-style portfolio, converted from the Claude Design "Portfolio Scrapbook" page to a standard **React + Vite** site.

## Run it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).
The dev server also prints a **Network** address: open that on your phone (same Wi-Fi) to try the site on a real device.

## Where things live

| What | File |
| --- | --- |
| All copy, case studies, links, skills, page order | `src/data.js` |
| Layout & styling (colors are CSS variables at the top) | `src/styles.css` |
| Book logic: routing, cover animation, page turns | `src/App.jsx` |
| Left/right page layouts | `src/components/LeftPage.jsx`, `RightPage.jsx` |
| Before/after slider, image galleries | `src/components/CompareSlider.jsx`, `FullSpread.jsx` |
| Images, resume PDF, favicon | `public/assets/`, `public/favicon.svg` |

### To-dos before going live

- The 8 **studio art** frames show "artwork coming soon". Drop images into `public/assets/` and set `src: asset('your-file.jpg')` on each item in `STUDIO_ART` in `src/data.js`.
- Optional: set `ALWAYS_INTRO = false` in `src/App.jsx` to skip the cover animation for returning visitors.

## Pages (hash routes)

`#/` contents · `#/work/<id>` case study (`/2` slider, `/3` gallery) · `#/studio` graphics · `#/about`.
Arrow keys ← → turn pages. Hash routes mean any static host works with no redirect setup.

## Testing responsiveness

**Quick check in the browser:** open the dev site in Chrome, press `F12` (or `Cmd+Option+I`), then click the device toolbar icon (`Cmd+Shift+M` / `Ctrl+Shift+M`) and try iPhone, iPad and a free-resize width.

Layouts to know about:
- **Wider than 760px (landscape):** two-page spread that fills the window.
- **Phones, and tablets held upright (≤1100px portrait):** pages stack and scroll; galleries become separate pages; nav sits above the book.

**Automated screenshots** (6 widths × 10 pages, plus a check for sideways scrolling):

```bash
npm i -D playwright
npx playwright install chromium
npm run dev            # keep running
npm run screenshots    # in a second terminal → ./screenshots/
```

Point it at the live site later with `npm run screenshots -- https://your-domain.com`.

## Deploy

```bash
npm run build      # outputs ./dist
npm run preview    # check the production build locally
```

- **Vercel / Netlify:** import the GitHub repo; framework "Vite", build `npm run build`, output `dist`. No other settings needed.
- **GitHub Pages:** works as-is (asset paths are relative); publish the `dist` folder.
