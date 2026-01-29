import { defineConfig } from 'vite';

export default defineConfig({
  base: '/improved-octo-adventure/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
