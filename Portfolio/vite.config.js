import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The lazy-loaded three.js hero chunk is ~950 KB (~250 KB gzipped) and never blocks first paint.
  build: { chunkSizeWarningLimit: 1000 },
})
