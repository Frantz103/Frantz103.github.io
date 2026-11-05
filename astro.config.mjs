import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';

export default defineConfig({
  site: 'https://frantzaugustin.com',
  output: 'static',
  compressHTML: true,
  markdown: {
    processor: unified(),
  },
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
      postcss: '.',
    },
  },
});
