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
  {
    title: string;
    titleIt: string;
    slug: string;
    blurb: string;
    blurbIt: string;
    description?: string;
    descriptionIt?: string;
  }
> = {
  galassie: {
    title: 'Galaxies',
    titleIt: 'Galassie',
    slug: 'galaxies',
    blurb: 'Distant island universes of stars, gas and dust.',
    blurbIt: 'Lontani universi isola di stelle, gas e polvere.',
    description:
      "Galaxies are immense structures of stars, gas, dust and dark matter held together by gravity: they can contain from millions to trillions of them, along with planetary systems, nebulae and black holes. They are the fundamental building blocks of the observable universe and come in very different shapes and sizes (spiral, elliptical, irregular). Our galaxy, the Milky Way, is a barred spiral: besides the classic spiral arms, it has a central bar of stars — mostly ancient — crossing the nucleus. This bar acts as a \"channel\" funnelling gas and dust toward the galactic centre, fuelling both the formation of new stars and the activity of the supermassive black hole that resides there.",
    descriptionIt:
      "Le galassie sono immense strutture di stelle, gas, polvere e materia oscura tenute insieme dalla gravità: possono contenerne da milioni a migliaia di miliardi, insieme a sistemi planetari, nebulose e buchi neri. Sono i mattoni fondamentali dell'universo osservabile e si presentano in forme e dimensioni molto diverse tra loro (spirali, ellittiche, irregolari). La nostra galassia, la Via Lattea, è una spirale barrata: oltre ai classici bracci a spirale, possiede una barra centrale di stelle — perlopiù antiche — che attraversa il nucleo. Questa barra funge da \"canale\" che convoglia gas e polveri verso il centro galattico, alimentando sia la formazione di nuove stelle sia l'attività del buco nero supermassiccio che vi risiede.",
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
