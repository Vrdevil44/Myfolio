import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  base: '/Myfolio',
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
  },
});
