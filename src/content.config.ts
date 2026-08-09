import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each entry carries both languages in the markdown body itself: Italian
// text first, then a `---` divider, then English text — see
// [object].astro / about/index.astro for how the body is split and
// rendered via data-lang-en/data-lang-it.
const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      astrobinLink: z.string().url().optional(),
    }),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
    titleIt: z.string(),
  }),
});

// Long-form section descriptions (e.g. portfolio category intros). Body
// carries both languages: Italian text first, then a `---` divider, then
// English text — see [category]/index.astro for how it's split and rendered.
const categories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categories' }),
  schema: z.object({}),
});

export const collections = { portfolio, about, categories };
