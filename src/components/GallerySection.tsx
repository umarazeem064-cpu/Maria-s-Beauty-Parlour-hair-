import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_ITEMS, type GalleryItem } from '../data/salonData';
import { SalonImage } from './SalonImage';

type GalleryFilter = 'All' | GalleryItem['category'];

const GALLERY_FILTERS: GalleryFilter[] = [
  'All',
  'Bridal & Glam',
  'Hair Artistry',
  'Skin & Spa',
  'Salon Interior',
];

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems =
    activeFilter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleItems.length
        );
      } else if (event.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visibleItems.length) % visibleItems.length
        );
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, visibleItems.length]);

  const activeLightboxItem =
    lightboxIndex !== null ? visibleItems[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)] py-20 lg:py-28"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header + Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--border-hairline)]">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium text-[var(--accent)]">
              Studio Transformations &amp; Ambiance
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-[var(--text-primary)] mt-2.5 text-balance leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 3.4vw, 3.15rem)' }}
            >
              Gallery &amp; Portfolio
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Explore recent hair color work, Nikkah and Barat bridal artistry,
              clinical facial treatments, and our sunlit Gulshan-e-Iqbal studio.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter gallery photos"
            className="flex items-center gap-2 overflow-x-auto pb-1"
          >
            {GALLERY_FILTERS.map((filter) => {
              const isSelected = activeFilter === filter;
              return (
                <button
                  key={filter}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveFilter(filter);
                    setLightboxIndex(null);
                  }}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--bg-inverse)] text-[var(--text-on-inverse)] border-[var(--bg-inverse)]'
                      : 'bg-transparent text-[var(--text-secondary)] border-[var(--border-hairline)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Uniform Aspect Editorial Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {visibleItems.map((item, idx) => (
            <figure
              key={item.id}
              className="group overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)]"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Inspect ${item.title}`}
                className="relative block w-full aspect-[4/3] overflow-hidden text-left cursor-pointer"
              >
                <SalonImage
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-200 flex flex-col justify-end p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-medium text-white/80">
                        {item.category}
                      </p>
                      <p className="font-display text-xl font-medium text-white mt-0.5 leading-snug">
                        {item.title}
                      </p>
                    </div>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-white/15 text-white backdrop-blur-sm shrink-0">
                      <Expand className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>
              <figcaption className="px-5 py-4 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] bg-[var(--bg-surface-elevated)] border-t border-[var(--border-hairline)]">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Keyboard-Accessible Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxItem.title}
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] rounded-lg overflow-hidden"
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[var(--border-hairline)]">
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-primary)]">
                  {activeLightboxItem.title}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeLightboxItem.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {lightboxIndex + 1} / {visibleItems.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close photo viewer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[var(--border-hairline)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-black">
              <SalonImage
                src={activeLightboxItem.image}
                alt={activeLightboxItem.alt}
                className="w-full h-full object-contain"
              />

              {visibleItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + visibleItems.length) %
                          visibleItems.length
                      )
                    }
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % visibleItems.length)
                    }
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="px-5 py-4 text-sm text-[var(--text-secondary)] border-t border-[var(--border-hairline)]">
              {activeLightboxItem.caption}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
