import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  output: 'static',
  vite: {
    resolve: {
      // Follow symlinks so workspace package CSS Modules are processed as source
      preserveSymlinks: false,
    },
    optimizeDeps: {
      exclude: ['@harlem-line-hustle/ui'],
    },
  },
});
