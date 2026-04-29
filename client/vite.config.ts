import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Додай цей імпорт

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Додай це в список плагінів
  ],
})