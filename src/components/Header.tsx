import { useState } from 'react';
import { MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { SALON_INFO, type ThemeModeId } from '../data/salonData';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  themeId: ThemeModeId;
  accentId: string;
  customAccentHex: string | null;
  onSelectTheme: (id: ThemeModeId) => void;
  onSelectAccent: (id: string) => void;
  onSelectCustomHex: (hex: string) => void;
  onResetWhite: () => void;
  onBookNowClick: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export function Header({
  themeId,
  accentId,
  customAccentHex,
  onSelectTheme,
  onSelectAccent,
  onSelectCustomHex,
  onResetWhite,
  onBookNowClick,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Slim Non-Sticky Top Direct Contact & Color Mode Utility Bar */}
      <div className="bg-[var(--bg-surface)] border-b border-[var(--border-hairline)] text-xs text-[var(--text-secondary)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a
              href={SALON_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" aria-hidden="true" />
              <span className="truncate max-w-[260px] sm:max-w-none">
                {SALON_INFO.shortAddress}
              </span>
            </a>
            <span className="hidden md:inline text-[var(--border-strong)]" aria-hidden="true">
              /
            </span>
            <a
              href={SALON_INFO.primaryPhoneHref}
              className="inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors tabular-nums whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" aria-hidden="true" />
              <span>{SALON_INFO.primaryPhoneDisplay}</span>
            </a>
            <span className="hidden lg:inline text-[var(--border-strong)]" aria-hidden="true">
              /
            </span>
            <a
              href={SALON_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeSwitcher
              themeId={themeId}
              accentId={accentId}
              customAccentHex={customAccentHex}
              onSelectTheme={onSelectTheme}
              onSelectAccent={onSelectAccent}
              onSelectCustomHex={onSelectCustomHex}
              onResetWhite={onResetWhite}
              align="right"
            />
          </div>
        </div>
      </div>

      {/* Primary Sticky Single-Row 3-Zone Header */}
      <header className="sticky top-0 z-40 bg-[var(--bg-canvas)]/95 backdrop-blur-md border-b border-[var(--border-hairline)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#home"
            className="font-display text-2xl sm:text-[26px] font-semibold tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0"
          >
            Maria&apos;s Beauty Parlour
          </a>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[var(--text-secondary)]"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1 hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 hover:after:w-full after:bg-[var(--accent)] after:transition-all after:duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onBookNowClick}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-[var(--bg-inverse)] text-[var(--text-on-inverse)] hover:bg-[var(--bg-inverse-hover)] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Now
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-[var(--border-hairline)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 sm:px-6 py-5">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-2 text-base font-medium text-[var(--text-primary)] hover:text-[var(--accent)] border-b border-[var(--border-hairline)] last:border-b-0 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-5 pt-4 border-t border-[var(--border-hairline)] flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookNowClick();
                }}
                className="w-full py-3 px-5 text-sm font-medium bg-[var(--bg-inverse)] text-[var(--text-on-inverse)] rounded-md transition-colors cursor-pointer"
              >
                Book Appointment Now
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={SALON_INFO.primaryPhoneHref}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium border border-[var(--border-strong)] rounded-md text-[var(--text-primary)] tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
                  <span>Call Salon</span>
                </a>
                <a
                  href={SALON_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium border border-[var(--accent)] text-[var(--accent)] rounded-md"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
