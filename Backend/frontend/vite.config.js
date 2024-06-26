import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    proxy: {
      'api/auth/user' : {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    },
        watch: {
      usePolling: true
    }
  }


})
