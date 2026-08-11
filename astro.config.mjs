// @ts-check
import { defineConfig } from 'astro/config';
import { execFileSync } from 'node:child_process';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// Rigenera src/data/astrobin.json prima che Astro legga il contenuto, cosi'
// un astrobinLink modificato in un .md viene ripreso sia in `astro dev` sia
// in `astro build` (uno script "prebuild" in package.json scatterebbe solo
// per npm run build, non per il dev server).
function astrobinSync() {
  return {
    name: 'astrobin-sync',
    hooks: {
      'astro:config:setup': () => {
        execFileSync('node', ['scripts/fetch-astrobin.mjs'], { stdio: 'inherit' });
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://valerioavitabile-cyber.github.io',
  base: '/Astrofotografia',
  vite: {
    plugins: [tailwindcss()]
  },

  redirects: {
    '/videos/': '/Astrofotografia/video-utility/#video',
    '/utility/': '/Astrofotografia/video-utility/#tools',
  },

  integrations: [react(), astrobinSync()]
});