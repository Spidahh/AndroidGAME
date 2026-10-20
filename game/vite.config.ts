import { defineConfig } from 'vite';

export default defineConfig({
  // percorsi relativi: la stessa build funziona su /, /beta/ e dentro l'app Android
  base: './',
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 6000,
  },
  server: { host: true, port: 5173 },
});
