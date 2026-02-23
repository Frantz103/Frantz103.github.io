import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://frantzaugustin.com',
  output: 'static',
  outDir: 'docs',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('contact-success'),
    }),
  ],
  vite: {
    css: {
      postcss: './postcss.config.js',
    },
  },
});
