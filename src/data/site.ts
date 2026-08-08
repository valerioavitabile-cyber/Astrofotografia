export const site = {
  title: 'Valerio Avitabile',
  tagline: 'Astrophotography',
  description:
    'Astrophotography portfolio by Valerio Avitabile: galaxies, nebulae, star clusters and deep-sky objects captured from a home terrace, plus courses, tutorials and tools.',
  descriptionIt:
    'Portfolio di astrofotografia di Valerio Avitabile: galassie, nebulose, ammassi stellari e oggetti del profondo cielo catturati da una terrazza di casa, oltre a corsi, tutorial e strumenti.',
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

export const categories: Record<
  CategorySlug,
  { title: string; titleIt: string; slug: string; blurb: string; blurbIt: string }
> = {
  galassie: {
    title: 'Galaxies',
    titleIt: 'Galassie',
    slug: 'galaxies',
    blurb: 'Distant island universes of stars, gas and dust.',
    blurbIt: 'Lontani universi isola di stelle, gas e polvere.',
  },
  nebuloseluminose: {
    title: 'Bright Nebulae',
    titleIt: 'Nebulose Luminose',
    slug: 'bright-nebulae',
    blurb: 'Glowing stellar nurseries lit from within.',
    blurbIt: 'Nursery stellari luminose, illuminate dall’interno.',
  },
  'wolf-rayet': {
    title: 'Wolf-Rayet',
    titleIt: 'Wolf-Rayet',
    slug: 'wolf-rayet',
    blurb: 'Massive, short-lived stars shedding their outer layers.',
    blurbIt: 'Stelle massicce e di vita breve che espellono i loro strati esterni.',
  },
  ammassi: {
    title: 'Star Clusters',
    titleIt: 'Ammassi Stellari',
    slug: 'star-clusters',
    blurb: 'Gravitationally bound families of stars.',
    blurbIt: 'Famiglie di stelle legate gravitazionalmente.',
  },
  hubblepalette: {
    title: 'Hubble Palette',
    titleIt: 'Hubble Palette',
    slug: 'hubble-palette',
    blurb: 'Narrowband imaging in false Hubble colors.',
    blurbIt: 'Imaging in banda stretta con falsi colori Hubble.',
  },
  dark: {
    title: 'Dark Nebulae',
    titleIt: 'Nebulose Oscure',
    slug: 'dark-nebulae',
    blurb: 'Cold clouds of dust silhouetted against starlight.',
    blurbIt: 'Fredde nubi di polvere stagliate contro la luce delle stelle.',
  },
  supernova: {
    title: 'Supernova Remnants',
    titleIt: 'Resti di Supernova',
    slug: 'supernova-remnants',
    blurb: 'The expanding wreckage of dying stars.',
    blurbIt: 'I relitti in espansione di stelle morenti.',
  },
  planetarie: {
    title: 'Planetary Nebulae',
    titleIt: 'Nebulose Planetarie',
    slug: 'planetary-nebulae',
    blurb: 'The delicate final breaths of Sun-like stars.',
    blurbIt: 'Gli ultimi, delicati respiri di stelle simili al Sole.',
  },
};

export const categoryBySlug = Object.fromEntries(
  Object.entries(categories).map(([id, c]) => [c.slug, id as CategorySlug])
);

export const mainNav = [
  { label: 'Home', labelIt: 'Home', href: '/' },
  { label: 'Portfolio', labelIt: 'Portfolio', href: '/#portfolio' },
  { label: 'Courses', labelIt: 'Corsi', href: '/courses/' },
  { label: 'Videos & Tutorials', labelIt: 'Video & Tutorial', href: '/videos/' },
  { label: 'Utility', labelIt: 'Utility', href: '/utility/' },
  { label: 'About', labelIt: 'Chi sono', href: '/about/' },
  { label: 'Contact', labelIt: 'Contatti', href: '/contact/' },
];
