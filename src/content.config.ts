import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    slug: z.string(),
    draft: z.boolean().optional(),
  }),
});

const fieldNotes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/field-notes' }),
  schema: z.object({
    title: z.string(),
    lastUpdated: z.string(),
    quote: z.string(),
  }),
});

export const collections = { essays, 'field-notes': fieldNotes };
