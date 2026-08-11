import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  src: string;
  fullSrc?: string;
  alt: string;
  width: number;
  height: number;
  thumbClassName?: string;
};

type Point = { x: number; y: number };

const ZOOM_SCALE = 3;
const MIN_SCALE = 1;
const MAX_SCALE = 6;
const CLICK_THRESHOLD = 5;

export default function Lightbox({ src, fullSrc, alt, width, height, thumbClassName }: Props) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState<Point>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const baseRectRef = useRef<DOMRect | null>(null);
  const dragStartRef = useRef<Point>({ x: 0, y: 0 });
  const posStartRef = useRef<Point>({ x: 0, y: 0 });
  const movedRef = useRef(false);
  const scaleRef = useRef(1);
  const posRef = useRef<Point>({ x: 0, y: 0 });
  // Active touch points, keyed by pointerId, so we can detect a second
  // finger landing and switch from single-finger pan to pinch-to-zoom.
  const pointersRef = useRef<Map<number, Point>>(new Map());
  const pinchStartRef = useRef<{ dist: number; scale: number; pos: Point; mid: Point } | null>(null);

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  const resetZoom = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };

  const handleClose = () => {
    setOpen(false);
    resetZoom();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const clamp = (value: number, limit: number) => Math.min(Math.max(value, -limit), limit);

  const clampPosRef = useRef<(next: Point, currentScale: number) => Point>();

  useEffect(() => {
    if (!open) return;
    const el = imgRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!baseRectRef.current) {
        baseRectRef.current = el.getBoundingClientRect();
      }
      const rect = baseRectRef.current;
      if (!rect) return;

      const oldScale = scaleRef.current;
      const factor = Math.exp(-e.deltaY * 0.0015);
      const newScale = Math.min(Math.max(oldScale * factor, MIN_SCALE), MAX_SCALE);
      if (newScale === oldScale) return;

      if (newScale <= MIN_SCALE) {
        resetZoom();
        return;
      }

      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      const oldPos = posRef.current;
      const ratio = newScale / oldScale;
      const newPos = {
        x: e.clientX - originX - ratio * (e.clientX - originX - oldPos.x),
        y: e.clientY - originY - ratio * (e.clientY - originY - oldPos.y),
      };

      setScale(newScale);
      setPos(clampPosRef.current ? clampPosRef.current(newPos, newScale) : newPos);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [open]);

  const clampPos = (next: Point, currentScale: number): Point => {
    const rect = baseRectRef.current;
    if (!rect) return next;
    const limitX = (rect.width * currentScale) / 2;
    const limitY = (rect.height * currentScale) / 2;
    return { x: clamp(next.x, limitX), y: clamp(next.y, limitY) };
  };

  useEffect(() => {
    clampPosRef.current = clampPos;
  });

  const getDistance = (p1: Point, p2: Point) => Math.hypot(p1.x - p2.x, p1.y - p2.y);
  const getMidpoint = (p1: Point, p2: Point) => ({ x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 });

  const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    if (!baseRectRef.current) {
      baseRectRef.current = imgRef.current?.getBoundingClientRect() ?? null;
    }
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2) {
      const [p1, p2] = Array.from(pointersRef.current.values());
      pinchStartRef.current = {
        dist: getDistance(p1, p2),
        scale: scaleRef.current,
        pos: posRef.current,
        mid: getMidpoint(p1, p2),
      };
      setDragging(false);
    } else if (pointersRef.current.size === 1) {
      movedRef.current = false;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      posStartRef.current = pos;
      setDragging(true);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2 && pinchStartRef.current) {
      const [p1, p2] = Array.from(pointersRef.current.values());
      const { dist: startDist, scale: startScale, pos: startPos, mid } = pinchStartRef.current;
      const dist = getDistance(p1, p2);
      const newScale = Math.min(Math.max(startScale * (dist / startDist), MIN_SCALE), MAX_SCALE);
      movedRef.current = true;

      if (newScale <= MIN_SCALE) {
        setScale(MIN_SCALE);
        setPos({ x: 0, y: 0 });
        return;
      }

      const rect = baseRectRef.current;
      if (!rect) return;
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      const ratio = newScale / startScale;
      const newPos = {
        x: mid.x - originX - ratio * (mid.x - originX - startPos.x),
        y: mid.y - originY - ratio * (mid.y - originY - startPos.y),
      };
      setScale(newScale);
      setPos(clampPos(newPos, newScale));
      return;
    }

    if (!dragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) + Math.abs(dy) > CLICK_THRESHOLD) movedRef.current = true;
    if (scale > 1 && movedRef.current) {
      const next = { x: posStartRef.current.x + dx, y: posStartRef.current.y + dy };
      setPos(clampPos(next, scale));
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    pointersRef.current.delete(e.pointerId);

    if (pointersRef.current.size >= 1) {
      // Still one finger down after a pinch: rebase the pan origin on it so
      // the image doesn't jump when the second finger lifts.
      pinchStartRef.current = null;
      const [remaining] = Array.from(pointersRef.current.values());
      dragStartRef.current = remaining;
      posStartRef.current = posRef.current;
      movedRef.current = true;
      setDragging(true);
      return;
    }

    pinchStartRef.current = null;
    setDragging(false);
    if (movedRef.current) return;

    if (scale > 1) {
      resetZoom();
      return;
    }

    const rect = baseRectRef.current ?? imgRef.current?.getBoundingClientRect() ?? null;
    if (rect) {
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      const target = {
        x: (e.clientX - originX) * (1 - ZOOM_SCALE),
        y: (e.clientY - originY) * (1 - ZOOM_SCALE),
      };
      setPos(clampPos(target, ZOOM_SCALE));
    }
    setScale(ZOOM_SCALE);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Zoom image: ${alt}`}
        className={thumbClassName ?? 'block w-full cursor-zoom-in'}
      >
        <img src={src} alt={alt} width={width} height={height} className="h-full w-full object-cover" />
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={handleClose}
            className="fixed inset-0 z-[2000] flex items-center justify-center overflow-hidden bg-black/90 p-4 backdrop-blur-sm"
          >
            <div className="absolute right-4 top-4 z-10 flex gap-2">
              {scale > 1 && (
                <button
                  type="button"
                  aria-label="Zoom out"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetZoom();
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14" strokeLinecap="round" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                aria-label="Close"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <img
              ref={imgRef}
              src={fullSrc ?? src}
              alt={alt}
              style={{
                transform: scale > 1 ? `translate(${pos.x}px, ${pos.y}px) scale(${scale})` : undefined,
                transition: dragging ? 'none' : 'transform 0.2s ease',
                touchAction: 'none',
              }}
              className={`max-h-full max-w-full select-none object-contain ${
                scale > 1 ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
              }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={(e) => {
                pointersRef.current.delete(e.pointerId);
                pinchStartRef.current = null;
                setDragging(false);
              }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </div>,
          document.body
        )}
    </>
  );
}
