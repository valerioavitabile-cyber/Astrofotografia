import { useEffect, useState } from 'react';

type Slide = { src: string; alt: string };

const INTERVAL_MS = 4000;
const SLIDE_COUNT = 6;

function pickRandom(pool: Slide[], count: number): Slide[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// `pool` holds every image available for the hero; the 6 shown are picked at
// random on every real page load (the site is statically built, so this
// can't happen per-request server-side — it has to be a client decision).
// Doing the pick directly in the initializer, instead of a later
// useEffect, means the very first client render already reflects it: the
// static/server-rendered HTML (fixed to whatever pool order the last build
// used) will still paint first for as long as the page's JS takes to load
// and hydrate — unavoidable for a static site with no per-request
// randomness — but nothing here adds any further delay on top of that.
// This intentionally mismatches the server-rendered slide order (React logs
// a hydration warning in dev; harmless, expected, and the point).
export default function HeroSlideshow({ pool }: { pool: Slide[] }) {
  const [slides] = useState(() => pickRandom(pool, SLIDE_COUNT));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="absolute inset-0">
      {/* One-shot: plays once on mount (page load/navigation) and never
          replays on scroll — no re-entry observer bumping a remount key. */}
      <div className="absolute inset-0 hero-blur-in">
        {slides.map((slide, i) => (
          <img
            // Keyed by position, not by src: on hydration the client's
            // randomly-picked slides differ from the server-rendered ones,
            // and a src-based key would force React to unmount/remount
            // every <img> to reconcile them — discarding and recreating DOM
            // nodes for no visual benefit. Keying by position instead lets
            // React just patch the `src` attribute on the same nodes.
            key={i}
            src={slide.src}
            alt={slide.alt}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[3200ms] ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding={i === 0 ? 'sync' : 'async'}
            fetchPriority={i === 0 ? 'high' : 'low'}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
    </div>
  );
}
