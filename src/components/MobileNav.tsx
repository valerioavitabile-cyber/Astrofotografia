import { useState } from 'react';

type NavItem = { label: string; href: string };

export default function MobileNav({ items, currentPath }: { items: NavItem[]; currentPath: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-0.5 w-6 bg-white transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
        />
        <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
        <span
          className={`h-0.5 w-6 bg-white transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
        />
      </button>

      {open && (
        <nav className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-ink/98 backdrop-blur">
          {items.map((item) => {
            const active = currentPath === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-2xl font-semibold uppercase tracking-wide ${
                  active ? 'text-accent' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      )}
    </div>
  );
}
