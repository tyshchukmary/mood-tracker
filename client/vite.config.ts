import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Видаляємо блок build.minify, щоб Vite сам обрав найкращий варіант
})