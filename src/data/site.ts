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
    description: string;
    descriptionIt: string;
  }
> = {
  // Per ogni categoria, incolla il testo descrittivo qui sotto tra i backtick (`...`).
  // Con i backtick puoi incollare apici, virgolette e a capo senza modificarli: copia-incolla diretto.
  galassie: {
    title: 'Galaxies',
    titleIt: 'Galassie',
    slug: 'galaxies',
    blurb: 'Distant island universes of stars, gas and dust.',
    blurbIt: 'Lontani universi isola di stelle, gas e polvere.',
    description: `Galaxies are immense structures of stars, gas, dust and dark matter held together by gravity: they can contain from millions to trillions of them, along with planetary systems, nebulae and black holes. They are the fundamental building blocks of the observable universe and come in very different shapes and sizes (spiral, elliptical, irregular). Our galaxy, the Milky Way, is a barred spiral: besides the classic spiral arms, it has a central bar of stars — mostly ancient — crossing the nucleus. This bar acts as a "channel" funnelling gas and dust toward the galactic centre, fuelling both the formation of new stars and the activity of the supermassive black hole that resides there.`,
    descriptionIt: `Le galassie sono immense strutture di stelle, gas, polvere e materia oscura tenute insieme dalla gravità: possono contenerne da milioni a migliaia di miliardi, insieme a sistemi planetari, nebulose e buchi neri. Sono i mattoni fondamentali dell'universo osservabile e si presentano in forme e dimensioni molto diverse tra loro (spirali, ellittiche, irregolari). La nostra galassia, la Via Lattea, è una spirale barrata: oltre ai classici bracci a spirale, possiede una barra centrale di stelle — perlopiù antiche — che attraversa il nucleo. Questa barra funge da "canale" che convoglia gas e polveri verso il centro galattico, alimentando sia la formazione di nuove stelle sia l'attività del buco nero supermassiccio che vi risiede.`,
  },
  nebuloseluminose: {
    title: 'Bright Nebulae',
    titleIt: 'Nebulose Luminose',
    slug: 'bright-nebulae',
    blurb: 'Glowing stellar nurseries lit from within.',
    blurbIt: 'Nursery stellari luminose, illuminate dall’interno.',
    description: `Nebulae are vast interstellar clouds composed primarily of hydrogen, helium, cosmic dust, and ionized gas (plasma). They are divided into different categories based on their physical properties and illumination mechanisms: reflection nebulae do not emit their own radiation, but reflect and scatter the light of nearby stars; emission nebulae, on the other hand, are ionized by ultraviolet radiation from high-energy stars and radiate their own light.

The visible color spectrum depends on the chemical composition and energy state of the gases: red emissions are typical of ionized hydrogen (H-alpha line at 656.3 nm), while blue-green hues arise primarily from doubly ionized oxygen ([O III]). Under the influence of gravitational pull, these dense regions of gas and dust progressively collapse, giving rise to star formation processes.`,
    descriptionIt: `Le nebulose sono vaste nubi interstellari composte prevalentemente da idrogeno, elio, polveri cosmiche e gas ionizzato (plasma). Si dividono in diverse categorie in base alle loro proprietà fisiche e al meccanismo di illuminazione: le nebulose a riflessione non emettono radiazione propria, ma riflettono e diffondono la luce delle stelle vicine; quelle a emissione, al contrario, sono ionizzate dalla radiazione ultravioletta di stelle ad alta energia e irradiano luce propria.

Lo spettro cromatico visibile dipende dalla composizione chimica e dallo stato energetico dei gas: le emissioni rosse sono tipiche dell'idrogeno ionizzato (linea H-alfa a 656,3 nm), mentre le sfumature blu-verdi derivano principalmente dall'ossigeno doppiamente ionizzato ([O III]). Sotto la spinta delle attrazioni gravitazionali, queste regioni dense di gas e polveri collassano progressivamente, dando origine ai processi di formazione stellare.`,
  },
  'wolf-rayet': {
    title: 'Wolf-Rayet',
    titleIt: 'Wolf-Rayet',
    slug: 'wolf-rayet',
    blurb: 'Massive, short-lived stars shedding their outer layers.',
    blurbIt: 'Stelle massicce e di vita breve che espellono i loro strati esterni.',
    description: `Wolf-Rayet stars (WRs), identified in 1867 by astronomers Charles Wolf and Georges Rayet, represent the advanced evolutionary stage of objects with masses ranging from 5 to over 20 solar masses. Characterized by high surface temperatures, they emit radiation primarily in the ultraviolet range.
Following the depletion of hydrogen in the core, nuclear fusion continues towards heavier elements such as helium and carbon. The high radiative flux triggers stellar winds with speeds of thousands of kilometers per second, resulting in intense mass loss that fuels the formation of circumstellar nebulae of gas and dust.`,
    descriptionIt: `Le stelle di Wolf-Rayet (WR), identificate nel 1867 dagli astronomi Charles Wolf e Georges Rayet, rappresentano la fase evolutiva avanzata di oggetti con masse comprese tra 5 e oltre 20 masse solari. Caratterizzate da elevate temperature superficiali, emettono radiazione prevalentemente nella banda ultravioletta.
In seguito all'esaurimento dell'idrogeno nel nucleo, la fusione nucleare prosegue verso elementi più pesanti come elio e carbonio. L'elevato flusso radiativo innesca venti stellari con velocità di migliaia di chilometri al secondo, determinando un'intensa perdita di massa che alimenta la formazione di nebulose circumstellari di gas e polveri.`,
  },
  ammassi: {
    title: 'Star Clusters',
    titleIt: 'Ammassi Stellari',
    slug: 'star-clusters',
    blurb: 'Gravitationally bound families of stars.',
    blurbIt: 'Famiglie di stelle legate gravitazionalmente.',
    description: `Star clusters are gravitationally bound systems formed by the fragmentation of a single giant molecular cloud and composed of coeval stars with identical initial chemical compositions. They are classified as open clusters and globular clusters.
Open clusters are distributed throughout the disk and along the galactic spiral arms. As young stellar populations (Population I, less than a billion years old), they comprise from a hundred to a few thousand components with asymmetric morphology and low central density; the Pleiades and Hyades are typical examples. Their weak gravitational bond causes their progressive dispersion due to galactic tidal forces and interactions with other interstellar clouds.
Globular clusters, such as Omega Centauri or M13, are distributed primarily in the halo and galactic bulge. They host hundreds of thousands to over a million ancient stars (Population II), with ages ranging from 10 to 13 billion years. The strong spherical symmetry and the high central mass density guarantee sufficient dynamical stability to preserve its structure over cosmological timescales.`,
    descriptionIt: `Gli ammassi stellari sono sistemi legati gravitazionalmente, originatisi dal frammentamento di una singola nube molecolare gigante e costituiti da stelle coeve con identica composizione chimica iniziale. Vengono classificati in ammassi aperti e ammassi globulari.
Gli ammassi aperti si distribuiscono nel disco e lungo i bracci di spirale galattici. Trattandosi di popolazioni stellari giovani (Popolazione I, con età inferiori a un miliardo di anni), comprendono da un centinaio a poche migliaia di componenti con morfologia asimmetrica e bassa densità centrale; le Pleiadi e le Iadi ne costituiscono esempi tipici. Il debole legame gravitazionale ne causa la progressiva dispersione a opera delle forze di marea galattiche e delle interazioni con altre nubi interstellari.
Gli ammassi globulari, come Omega Centauri o M13, sono distribuiti prevalentemente nell'alone e nel bulge galattico. Ospitano da centinaia di migliaia a oltre un milione di stelle antiche (Popolazione II), con età comprese tra 10 e 13 miliardi di anni. La spiccata simmetria sferica e l'elevata densità di massa centrale garantiscono una stabilità dinamica sufficiente a preservarne la struttura lungo tempi scala cosmologici.`,
  },
  hubblepalette: {
    title: 'Hubble Palette',
    titleIt: 'Hubble Palette',
    slug: 'hubble-palette',
    blurb: 'Narrowband imaging in false Hubble colors.',
    blurbIt: 'Imaging in banda stretta con falsi colori Hubble.',
    description: `Hubble Palette is a false-color mapping technique created by NASA to highlight the chemical structure and morphology of celestial objects. Using narrow-band filters, the method assigns the red channel to emissions from ionized sulfur ([S II]), green to hydrogen-alpha (Hα), and blue to doubly ionized oxygen ([O III]).
It is best known for Hubble Space Telescope images, such as those of the Pillars of Creation. This color combination does not reproduce the colors perceptible to the human eye, but it increases the contrast between the gaseous components within nebulae. The technique is used both in scientific research and in amateur astrophotography.`,
    descriptionIt: `La Hubble Palette è una tecnica di mappatura in falsi colori creata dalla NASA per evidenziare la struttura chimica e la morfologia degli oggetti celesti. Attraverso filtri a banda stretta, il metodo assegna il canale rosso alle emissioni dello zolfo ionizzato ([S II]), il verde all'idrogeno-alfa (Hα) e il blu all'ossigeno doppiamente ionizzato ([O III]).
Resta nota per le riprese del telescopio spaziale Hubble, come quelle delle Colonne della Creazione. Questa combinazione cromatica non restituisce i colori percepibili dall'occhio umano, ma aumenta il contrasto tra i componenti gassosi all'interno delle nebulose. La tecnica è usata sia nella ricerca scientifica sia nell'astrofotografia amatoriale.`,
  },
  dark: {
    title: 'Dark Nebulae',
    titleIt: 'Nebulose Oscure',
    slug: 'dark-nebulae',
    blurb: 'Cold clouds of dust silhouetted against starlight.',
    blurbIt: 'Fredde nubi di polvere stagliate contro la luce delle stelle.',
    description: `Dark nebulae, or molecular clouds, are cold interstellar structures composed primarily of gas and a small fraction of dust. The dust absorbs background starlight—especially shorter wavelengths in the blue spectrum—causing the cloud to appear opaque against luminous backgrounds. Among the coldest environments in the universe, these irregularly shaped clouds are often visible to the naked eye as dark silhouettes against the Milky Way. The largest variants, giant molecular clouds, can reach masses up to a million times that of the Sun.`,
    descriptionIt: `Le nebulose oscure, o nubi molecolari, sono fredde strutture interstellari composte principalmente da gas e da una piccola frazione di polvere. La polvere assorbe la luce stellare circostante, soprattutto le lunghezze d'onda più corte dello spettro blu, facendo apparire la nube opaca rispetto agli sfondi luminosi. Tra gli ambienti più freddi dell'universo, queste nubi dalla forma irregolare sono spesso visibili a occhio nudo come sagome scure sullo sfondo della Via Lattea. Le varianti più grandi, le nubi molecolari giganti, possono raggiungere masse fino a un milione di volte quella del Sole.`,
  },
  supernova: {
    title: 'Supernova Remnants',
    titleIt: 'Resti di Supernova',
    slug: 'supernova-remnants',
    blurb: 'The expanding wreckage of dying stars.',
    blurbIt: 'I relitti in espansione di stelle morenti.',
    description: `A supernova remnant consists of material expelled during the final explosion of a star. This event occurs following the gravitational collapse of a massive star at the end of its life cycle, or when a white dwarf accretes matter from a companion star to the point of exceeding its stability.
The high-velocity expulsion of the outer stellar layers generates an expanding structure of gas and dust, while the residual core can collapse to form a compact object, such as a neutron star or a black hole. Although the gaseous component gradually dissipates over timescales of thousands of years, the compact central remnant persists indefinitely.`,
    descriptionIt: `Un resto di supernova è costituito dal materiale espulso durante l'esplosione finale di una stella. L'evento si verifica a seguito del collasso gravitazionale di una stella massiccia giunta al termine del ciclo vitale, oppure quando una nana bianca accresce materia da una stella compagna fino a superare il limite di stabilità.
L'espulsione ad alta velocità degli strati stellari esterni genera una struttura in espansione composta da gas e polveri, mentre il nucleo residuo può collassare originando un oggetto compatto, come una stella di neutroni o un buco nero. Sebbene la componente gassosa si dissipi progressivamente su scale temporali di migliaia di anni, il resto compatto centrale persiste indefinitamente.`,
  },
  planetarie: {
    title: 'Planetary Nebulae',
    titleIt: 'Nebulose Planetarie',
    slug: 'planetary-nebulae',
    blurb: 'The delicate final breaths of Sun-like stars.',
    blurbIt: 'Gli ultimi, delicati respiri di stelle simili al Sole.',
    description: `Planetary nebulae represent the final evolutionary stage of low- and medium-mass stars. They form when the star's outer atmospheric layers are expelled, exposing a dense, high-temperature core destined to evolve into a white dwarf.
The ultraviolet radiation emitted by the core ionizes the surrounding gas, stimulating the spectral emission of elements such as hydrogen and oxygen. Despite their historical name, these objects have no correlation with planets. Over timescales of tens of thousands of years, the dispersal of these structures enriches the interstellar medium with heavy elements destined for subsequent stellar generations; a process that will also affect the Sun in about 5 billion years.`,
    descriptionIt: `Le nebulose planetarie costituiscono la fase evolutiva conclusiva delle stelle di massa piccola e media. Si formano con l'espulsione degli strati atmosferici esterni dell'astro, che lascia scoperto un nucleo denso e ad alta temperatura destinato a evolvere in nana bianca.
La radiazione ultravioletta emessa dal nucleo ionizza il gas circostante, stimolando l'emissione spettrale di elementi come idrogeno e ossigeno. A dispetto della denominazione storica, questi oggetti non presentano alcuna correlazione con i pianeti. Con scale temporali dell'ordine di decine di migliaia di anni, la dispersione di queste strutture arricchisce il mezzo interstellare di elementi pesanti destinati alle successive generazioni stellari; processo che interesserà anche il Sole tra circa 5 miliardi di anni.`,
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
