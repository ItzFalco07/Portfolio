import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';  // Or Vue if using Vue.js
import { ViteSSG } from 'vite-ssg';

export default defineConfig({
  plugins: [
    react(),
    ViteSSG()
  ],
});
