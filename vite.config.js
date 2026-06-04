import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Vercel ke liye build optimization
  build: {
    rollupOptions: {
      external: [], // Ensure @tailwindcss/vite is NOT marked as external
    },
  },
})