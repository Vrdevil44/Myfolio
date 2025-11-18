import { qwikCity } from '@builder.io/qwik-city/vite';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  plugins: [qwikCity()],
  build: {
    outDir: 'dist'
  }
}));
