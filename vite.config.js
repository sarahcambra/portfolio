import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Local dev: base is '/'. For GitHub Pages at /<repo>/ you **must** ship a build
// created with `npm run build:gh-pages` (or `npm run deploy`) — plain `vite build`
// breaks asset URLs and React Router basename on https://<user>.github.io/<repo>/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
