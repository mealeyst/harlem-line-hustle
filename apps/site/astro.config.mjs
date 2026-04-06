import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';

export default defineConfig({
  integrations: [
    react(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],
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
