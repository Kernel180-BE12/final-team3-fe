import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  server: {
    host: 'localhost',
    port: 5173,
    open: true,  // 브라우저 자동 열기
    hmr: {
      host: 'localhost',
      port: 5173  // HMR 포트도 명시적으로 지정
    }
  }
})
