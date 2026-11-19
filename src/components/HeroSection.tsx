import { ArrowRight, MessageCircle, Star } from 'lucide-react';
import { SALON_IMAGES, SALON_INFO } from '../data/salonData';
import { SalonImage } from './SalonImage';

interface HeroSectionProps {
  onBookAppointment: () => void;
  onExploreServices: () => void;
}

export function HeroSection({
  onBookAppointment,
  onExploreServices,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)]"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-12 lg:pt-14 lg:pb-16">
        {/* Balanced 2-Column Editorial Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Editorial Proposition */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[var(--accent)] tracking-wide">
                Gulshan-e-Iqbal, Karachi · Hair &amp; Skin Care Sanctuary
              </p>

              <h1
                className="font-display font-semibold tracking-tight text-[var(--text-primary)] mt-4 text-balance leading-[1.06]"
                style={{ fontSize: 'clamp(2.5rem, 4.4vw, 4.15rem)' }}
              >
                Refined Hair Artistry &amp; Clinical Skin Care
              </h1>

              <p className="mt-6 text-base sm:text-[17px] leading-relaxed text-[var(--text-secondary)] max-w-[46ch]">
                Step into a calm, sunlit beauty atelier at Moon Garden
                Apartments. Our senior hair stylists, dermal aestheticians, and
                bridal makeup artists deliver personalized transformations using
                authentic international formulations and hospital-grade hygiene.
              </p>

              {/* Two Prominent CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={onBookAppointment}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium bg-[var(--bg-inverse)] text-[var(--text-on-inverse)] hover:bg-[var(--bg-inverse-hover)] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Book Appointment Now</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onExploreServices}
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] bg-transparent border border-[var(--border-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Explore Services
                </button>
              </div>
            </div>

            {/* Quiet Direct Consultation Note */}
            <div className="mt-10 pt-6 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Star
                  className="w-4 h-4 fill-[var(--star-color)] text-[var(--star-color)] shrink-0"
                  aria-hidden="true"
                />
                <span className="font-semibold text-[var(--text-primary)] tabular-nums">
                  {SALON_INFO.googleRating} / 5.0
                </span>
                <span aria-hidden="true">·</span>
                <span>{SALON_INFO.reviewCount} Verified Local Reviews</span>
              </div>

              <a
                href={SALON_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Direct WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Right Full-Height Luxury Salon Interior (.jpg) */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-full min-h-[320px] sm:min-h-[420px] lg:min-h-[520px] overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
              <SalonImage
                src={SALON_IMAGES.heroInterior}
                alt="Sunlit interior of Maria’s Beauty Parlour featuring white Carrara marble stations, arched brushed brass mirrors, and cream leather styling chairs"
                priority
                className="w-full h-full object-cover object-left"
              />
              {/* Measured Contrast Scrim for Subtle Architectural Caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-6 py-5 flex flex-wrap items-end justify-between gap-3 text-white">
                <div>
                  <p className="text-xs text-white/80">
                    Shop No. 64, Moon Garden Apartments
                  </p>
                  <p className="font-display text-xl font-medium tracking-wide">
                    Gulshan-e-Iqbal Flagship Studio
                  </p>
                </div>
                <p className="text-xs text-white/90 tabular-nums">
                  Open Daily · 10:00 AM – 10:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Studio Credentials Strip (Unboxed Editorial Grid) */}
        <div className="mt-10 pt-8 border-t border-[var(--border-hairline)] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <p className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tabular-nums">
              {SALON_INFO.googleRating} / 5.0
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Rated across {SALON_INFO.reviewCount} Google &amp; BookMySpot reviews
            </p>
          </div>

          <div>
            <p className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tabular-nums">
              {SALON_INFO.yearsExperience} Years
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Master hair, bridal &amp; clinical skincare leadership
            </p>
          </div>

          <div>
            <p className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tabular-nums">
              10 AM – 10 PM
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Seven days a week, walk-in &amp; scheduled care
            </p>
          </div>

          <div>
            <p className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)]">
              100% Authentic
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              L&apos;Oréal, Janssen, MAC &amp; sterilized tools every visit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
