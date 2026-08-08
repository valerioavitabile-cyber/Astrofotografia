export const site = {
  title: 'Valerio Avitabile',
  tagline: 'Astrophotography',
  description:
    'Astrophotography portfolio by Valerio Avitabile: galaxies, nebulae, star clusters and deep-sky objects captured from a home terrace, plus courses, tutorials and tools.',
  url: 'https://valerioavitabile-astrophotography.it',
  email: 'valerio.avitabile@gmail.com',
  social: {
    facebook: 'https://www.facebook.com/valerioavitabileastrophotography/',
    youtube: 'https://www.youtube.com/@valerioavitabile-astrophot2899',
    instagram: 'https://www.instagram.com/v_a_astrophotography/',
  },
};

export type CategorySlug =
  | 'galassie'
  | 'nebuloseluminose'
  | 'wolf-rayet'
  | 'ammassi'
  | 'hubblepalette'
  | 'dark'
  | 'supernova'
  | 'planetarie';

export const categories: Record<CategorySlug, { title: string; slug: string; blurb: string }> = {
  galassie: { title: 'Galaxies', slug: 'galaxies', blurb: 'Distant island universes of stars, gas and dust.' },
  nebuloseluminose: { title: 'Bright Nebulae', slug: 'bright-nebulae', blurb: 'Glowing stellar nurseries lit from within.' },
  'wolf-rayet': { title: 'Wolf-Rayet', slug: 'wolf-rayet', blurb: 'Massive, short-lived stars shedding their outer layers.' },
  ammassi: { title: 'Star Clusters', slug: 'star-clusters', blurb: 'Gravitationally bound families of stars.' },
  hubblepalette: { title: 'Hubble Palette', slug: 'hubble-palette', blurb: 'Narrowband imaging in false Hubble colors.' },
  dark: { title: 'Dark Nebulae', slug: 'dark-nebulae', blurb: 'Cold clouds of dust silhouetted against starlight.' },
  supernova: { title: 'Supernova Remnants', slug: 'supernova-remnants', blurb: 'The expanding wreckage of dying stars.' },
  planetarie: { title: 'Planetary Nebulae', slug: 'planetary-nebulae', blurb: 'The delicate final breaths of Sun-like stars.' },
};

export const categoryBySlug = Object.fromEntries(
  Object.entries(categories).map(([id, c]) => [c.slug, id as CategorySlug])
);

export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Courses', href: '/courses/' },
  { label: 'Videos & Tutorials', href: '/videos/' },
  { label: 'Utility', href: '/utility/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];
