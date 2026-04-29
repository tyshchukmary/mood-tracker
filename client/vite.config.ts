import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // Додай цей імпорт

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Це налаштування виправить помилку з "@/"
      "@": path.resolve(__dirname, "./src"),
    },
  },
})