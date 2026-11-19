import { ExternalLink, Star } from 'lucide-react';
import { SALON_INFO, TESTIMONIALS } from '../data/salonData';
import { SalonImage } from './SalonImage';

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-[var(--bg-surface)] border-b border-[var(--border-hairline)] py-20 lg:py-28"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header + Verified Google Rating Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[var(--border-hairline)]">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium text-[var(--accent)]">
              Client Experiences · Google Maps &amp; BookMySpot Verified
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-[var(--text-primary)] mt-2.5 text-balance leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 3.4vw, 3.15rem)' }}
            >
              Trusted by Women Across Gulshan-e-Iqbal
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-3xl font-semibold text-[var(--text-primary)] tabular-nums">
                  {SALON_INFO.googleRating}
                </span>
                <div className="flex items-center gap-0.5" aria-label="4.9 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[var(--star-color)] text-[var(--star-color)]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Based on {SALON_INFO.reviewCount} local client ratings
              </p>
            </div>

            <a
              href={SALON_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border border-[var(--border-strong)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* 3 Attributable Editorial Client Reviews */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <article
              key={review.id}
              className="flex flex-col justify-between p-6 sm:p-7 bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] rounded-lg"
            >
              <div>
                {/* Rating & Metadata Line */}
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="flex items-center gap-0.5"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-[var(--star-color)] text-[var(--star-color)]"
                        aria-hidden="true"
                      />
                    ))}
                    <span className="ml-2 text-xs font-semibold text-[var(--text-primary)] tabular-nums">
                      5.0 / 5
                    </span>
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">
                    {review.dateLabel}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="mt-5 text-sm sm:text-[15px] leading-relaxed text-[var(--text-primary)]">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>

                {/* Concrete Outcome Line */}
                <p className="mt-4 pt-3 border-t border-[var(--border-hairline)] text-xs text-[var(--accent)] font-medium">
                  Result: {review.outcome}
                </p>
              </div>

              {/* Client Attribution with .jpg Photo */}
              <div className="mt-6 pt-5 border-t border-[var(--border-hairline)] flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[var(--border-hairline)] shrink-0 bg-[var(--bg-surface)]">
                  <SalonImage
                    src={review.image}
                    alt={review.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                    {review.clientName}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] truncate">
                    {review.service} · {review.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
