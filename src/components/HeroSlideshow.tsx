import { useEffect, useState } from 'react';

type Slide = { src: string; alt: string };

const INTERVAL_MS = 4000;

export default function HeroSlideshow({ slides }: { slides: Slide[] }) {
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
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[3200ms] ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
    </div>
  );
}
