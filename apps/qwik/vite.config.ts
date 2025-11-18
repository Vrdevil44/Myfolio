import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig } from 'vite';

const basePath = '/Myfolio/qwik/';

export default defineConfig(() => ({
  base: basePath,
  plugins: [qwikCity({ basePathname: basePath }), qwikVite()],
  build: {
    outDir: 'dist',
  },
}));
