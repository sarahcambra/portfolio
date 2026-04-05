import path from "node:path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Adiciona o suporte ao Tailwind v4
  ],
  resolve: {
    alias: {
      // Isso permite que você use "@/componentes" em vez de "../../componentes"
      "@": path.resolve(__dirname, "./src"),
    },
  },
})