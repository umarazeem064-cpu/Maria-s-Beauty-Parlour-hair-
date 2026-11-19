import { type FormEvent, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  SALON_INFO,
  THEME_PRESETS,
  type ThemeModeId,
} from '../data/salonData';

interface FooterProps {
  themeId: ThemeModeId;
  onSelectTheme: (id: ThemeModeId) => void;
}

export function Footer({ themeId, onSelectTheme }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailError(null);
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    setEmail('');
  }

  return (
    <footer
      id="contact"
      className="bg-[var(--bg-surface)] text-[var(--text-secondary)]"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Brand & Address */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)]"
            >
              {SALON_INFO.brandName}
            </a>
            <p className="mt-1 text-xs font-medium text-[var(--accent)]">
              {SALON_INFO.brandTagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] max-w-sm">
              A quiet, hygiene-first hair artistry, skincare, and bridal makeup
              sanctuary serving Gulshan-e-Iqbal and Karachi with over a decade
              of trusted studio craft.
            </p>

            {/* Quick All-Colors Theme Switcher Strip */}
            <div className="mt-6">
              <p className="text-xs font-medium text-[var(--text-muted)] mb-2">
                Website Color Mode
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                {THEME_PRESETS.map((preset) => {
                  const isActive = preset.id === themeId;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => onSelectTheme(preset.id)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                        isActive
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)] font-semibold'
                          : 'border-[var(--border-hairline)] bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20"
                        style={{ backgroundColor: preset.accentPreview }}
                        aria-hidden="true"
                      />
                      <span>{preset.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Contact, Address & Opening Hours */}
          <div className="lg:col-span-4 space-y-4 text-sm">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Visit &amp; Direct Contact
            </h3>

            <div className="flex items-start gap-2.5">
              <MapPin
                className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="leading-relaxed text-[var(--text-secondary)]">
                  {SALON_INFO.fullAddress}
                </p>
                <a
                  href={SALON_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
                >
                  <span>Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone
                className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div className="tabular-nums space-y-1">
                <p>
                  <a
                    href={SALON_INFO.primaryPhoneHref}
                    className="hover:text-[var(--text-primary)] transition-colors"
                  >
                    {SALON_INFO.primaryPhoneDisplay} (Primary)
                  </a>
                </p>
                <p>
                  <a
                    href={SALON_INFO.secondaryPhoneHref}
                    className="hover:text-[var(--text-primary)] transition-colors"
                  >
                    {SALON_INFO.secondaryPhoneDisplay} (Appointments)
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock
                className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-[var(--text-primary)] font-medium tabular-nums">
                  {SALON_INFO.hoursSummary}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  Open all 7 days including weekends
                </p>
              </div>
            </div>

            <div className="pt-1">
              <a
                href={SALON_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[var(--bg-inverse)] text-[var(--text-on-inverse)] hover:bg-[var(--bg-inverse-hover)] rounded-md transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Chat on WhatsApp Support</span>
              </a>
            </div>
          </div>

          {/* Column 3: Newsletter & Social Links */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Seasonal Care Notes &amp; Private Offers
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
              Receive Karachi climate hair-care tips, early bridal booking
              windows, and seasonal facial packages directly in your inbox.
            </p>

            {subscribed ? (
              <div
                role="status"
                className="mt-4 p-3.5 rounded-md border flex items-center gap-2.5 text-xs sm:text-sm"
                style={{
                  backgroundColor: 'var(--success-bg)',
                  borderColor: 'var(--success-border)',
                  color: 'var(--success-text)',
                }}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  You&apos;re subscribed to Maria&apos;s Beauty Parlour seasonal
                  updates.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate className="mt-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 min-w-0 px-3.5 py-2.5 text-sm bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-strong)] rounded-md focus:border-[var(--accent)] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-[var(--bg-inverse)] text-[var(--text-on-inverse)] hover:bg-[var(--bg-inverse-hover)] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
                {emailError && (
                  <p
                    role="alert"
                    className="mt-2 text-xs"
                    style={{ color: 'var(--error-text)' }}
                  >
                    {emailError}
                  </p>
                )}
              </form>
            )}

            {/* Social Media Links */}
            <div className="mt-7 pt-5 border-t border-[var(--border-hairline)]">
              <p className="text-xs font-medium text-[var(--text-muted)] mb-3">
                Follow Maria&apos;s Beauty Parlour
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
                <a
                  href={SALON_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
                <a
                  href={SALON_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={SALON_INFO.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  TikTok
                </a>
                <a
                  href={SALON_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Navigation Mirror */}
        <div className="mt-14 pt-6 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>
            © {new Date().getFullYear()} {SALON_INFO.fullName}. All rights
            reserved.
          </p>
          <p>
            Website crafted for {SALON_INFO.brandName}, Gulshan-e-Iqbal, Karachi
          </p>
        </div>
      </div>
    </footer>
  );
}
