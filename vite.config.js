import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  root: ".",
  build: {
  outDir: "dist"
  },
  plugins: [react()],
  define: {
    global: 'window',
    
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
    },
  },
});

