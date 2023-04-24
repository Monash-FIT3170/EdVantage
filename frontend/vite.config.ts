import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base:"/EdVantage/",
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  }
})
