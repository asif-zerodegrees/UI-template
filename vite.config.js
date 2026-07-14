import { defineConfig } from 'vite';
import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';

export default defineConfig({
  plugins: [
    vituum(),
    pug({
      root: './src',
    }),
  ],
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
