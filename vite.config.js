import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Output to docs/ so GitHub Pages (root repo) can serve it directly.
    outDir: 'docs',
    emptyOutDir: true,
  },
})
