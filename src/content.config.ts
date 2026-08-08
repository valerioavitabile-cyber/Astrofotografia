import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each entry carries both languages: the markdown body is the English text,
// and `bodyIt` (frontmatter) holds the Italian markdown. One file, one photo,
// both languages — see [object].astro / about/index.astro for how bodyIt is
// rendered and switched via data-lang-en/data-lang-it.
const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      astrobinLink: z.string().url().optional(),
      bodyIt: z.string(),
    }),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
    titleIt: z.string(),
    bodyIt: z.string(),
  }),
});

export const collections = { portfolio, about };
