import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SalonImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
}

/**
 * Resilient editorial image component following the Zero-Broken-Image Policy.
 * Uses strictly verified .jpg image paths with referrerPolicy="no-referrer"
 * and a refined fallback surface if an asset ever fails to load.
 */
export function SalonImage({
  src,
  alt,
  className = '',
  aspectClass = '',
  priority = false,
}: SalonImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-hairline)] p-6 text-center ${aspectClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="w-5 h-5 mb-2 text-[var(--accent)]" aria-hidden="true" />
        <span className="font-display text-lg text-[var(--text-primary)]">
          Maria&apos;s Beauty Parlour
        </span>
        <span className="text-xs mt-1 max-w-[24ch]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
