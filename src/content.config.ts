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

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
  }),
});

// Italian translations of the portfolio/about markdown bodies. Kept as
// separate collections (matched by entry id) rather than extra frontmatter
// fields so the Italian text stays real markdown, rendered the same way as
// the English body.
const portfolioIt = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio-it' }),
  schema: z.object({
    title: z.string(),
  }),
});

const aboutIt = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about-it' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { portfolio, about, portfolioIt, aboutIt };
