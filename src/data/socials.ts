import { site } from './site';

export const socials = [
  {
    label: 'Email',
    href: `mailto:${site.email}`,
    color: '#fbbf24',
    external: false,
    icon: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm.5 1L12 13l8.5-7',
    viewBox: '0 0 24 24',
    stroke: true,
  },
  {
    label: 'Facebook',
    href: site.social.facebook,
    color: '#1877f2',
    external: true,
    icon: 'M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9v2.18H7.9v2.96h2.56V21h3.04Z',
    viewBox: '0 0 24 24',
    stroke: false,
  },
  {
    label: 'YouTube',
    href: site.social.youtube,
    color: '#ff0000',
    external: true,
    icon: 'M21.6 7.6a2.9 2.9 0 0 0-2.05-2.06C17.8 5.1 12 5.1 12 5.1s-5.8 0-7.55.44A2.9 2.9 0 0 0 2.4 7.6 30.4 30.4 0 0 0 2 12a30.4 30.4 0 0 0 .4 4.4 2.9 2.9 0 0 0 2.05 2.06c1.75.44 7.55.44 7.55.44s5.8 0 7.55-.44a2.9 2.9 0 0 0 2.05-2.06A30.4 30.4 0 0 0 22 12a30.4 30.4 0 0 0-.4-4.4ZM10 15V9l5.2 3-5.2 3Z',
    viewBox: '0 0 24 24',
    stroke: false,
  },
  {
    label: 'Instagram',
    href: site.social.instagram,
    color: '#e1306c',
    external: true,
    icon: null,
    viewBox: '0 0 24 24',
    stroke: true,
  },
];
