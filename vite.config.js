import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'assets',   // serves /assets/* files at root URL (e.g. /logo.png, /profile.jpeg)
  resolve: {
    alias: { '@': '/src' }
  }
})
