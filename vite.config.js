import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps asset paths relative, so the built site works on any host
// (Vercel, Netlify, GitHub Pages project sites, or a plain folder).
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { host: true }, // lets you open the dev server on your phone (same Wi-Fi)
});
