import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx}']
  },
  server: {
    port: 3000
  }
})
