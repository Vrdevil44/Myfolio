import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  plugins: [qwikVite(), qwikCity()],
  build: {
    outDir: 'dist',
  },
}));
