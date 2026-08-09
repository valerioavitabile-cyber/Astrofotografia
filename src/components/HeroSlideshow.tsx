import { useEffect, useRef, useState } from 'react';

type Slide = { src: string; alt: string };

const INTERVAL_MS = 4000;
const SLIDE_COUNT = 6;

function pickRandom(pool: Slide[], count: number): Slide[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// `pool` holds every image available for the hero; the actual 6 shown are
// picked at random client-side on mount so the selection differs on every
// real browser refresh (the site is statically built, so this can't happen
// at build time). The initial render uses a deterministic slice of the pool
// so it matches the server-rendered HTML and avoids a hydration mismatch.
export default function HeroSlideshow({ pool }: { pool: Slide[] }) {
  const [slides, setSlides] = useState(() => pool.slice(0, SLIDE_COUNT));
  const [index, setIndex] = useState(0);
  const [playKey, setPlayKey] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSlides(pickRandom(pool, SLIDE_COUNT));
    setIndex(0);
    // Runs once per mount, i.e. once per real page load/refresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPlayKey((k) => k + 1);
          }
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0" ref={rootRef}>
      <div key={playKey} className="absolute inset-0 hero-blur-in">
        {slides.map((slide, i) => (
          <img
            key={slide.src}
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
