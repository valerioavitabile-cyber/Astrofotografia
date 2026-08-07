import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum([
        'galassie',
        'nebuloseluminose',
        'wolf-rayet',
        'ammassi',
        'hubblepalette',
        'dark',
        'supernova',
        'planetarie',
      ]),
      image: image(),
      astrobinLink: z.string().url().optional(),
    }),
});

export const collections = { portfolio };
