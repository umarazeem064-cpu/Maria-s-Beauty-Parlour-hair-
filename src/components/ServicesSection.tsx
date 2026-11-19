import { useState } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import {
  CURRENCY_RATES,
  formatPrice,
  SERVICE_CATEGORIES,
  SERVICES,
  type CurrencyCode,
  type ServiceCategoryId,
  type ServiceItem,
} from '../data/salonData';

interface ServicesSectionProps {
  onBookService: (service: ServiceItem) => void;
}

const CURRENCIES: CurrencyCode[] = ['PKR', 'USD', 'GBP'];

export function ServicesSection({ onBookService }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategoryId>('all');
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((service) => service.category === activeCategory);

  return (
    <section
      id="services"
      className="bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)] py-20 lg:py-28"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header + Currency Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--border-hairline)]">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium text-[var(--accent)]">
              Transparent Service Menu · Real Salon Pricing
            </p>
            <h2
              className="font-display font-semibold tracking-tight text-[var(--text-primary)] mt-2.5 text-balance leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 3.4vw, 3.15rem)' }}
            >
              Services &amp; Pricing
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Every service includes an initial hair or dermal consultation.
              Switch currency below for local Karachi (PKR) or overseas bridal
              guest estimates (USD / GBP).
            </p>
          </div>

          {/* Interactive Currency Switcher */}
          <div className="flex items-center gap-3 self-start lg:self-end shrink-0">
            <span className="text-xs font-medium text-[var(--text-muted)] whitespace-nowrap">
              Display Currency
            </span>
            <div
              role="group"
              aria-label="Select pricing currency"
              className="inline-flex items-center p-1 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-md"
            >
              {CURRENCIES.map((code) => {
                const isActive = currency === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code)}
                    aria-pressed={isActive}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[var(--bg-inverse)] text-[var(--text-on-inverse)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {CURRENCY_RATES[code].label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Service categories"
          className="mt-6 flex items-center gap-2 overflow-x-auto pb-2"
        >
          {SERVICE_CATEGORIES.map((category) => {
            const isSelected = activeCategory === category.id;
            const count =
              category.id === 'all'
                ? SERVICES.length
                : SERVICES.filter((s) => s.category === category.id).length;

            return (
              <button
                key={category.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--text-primary)]'
                    : 'bg-transparent border-[var(--border-hairline)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>{category.label}</span>
                <span className="text-[11px] text-[var(--text-muted)] tabular-nums">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Editorial 2-Column Service Ledger */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col justify-between p-6 bg-[var(--bg-surface-elevated)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] rounded-lg transition-colors"
            >
              <div>
                {/* Quiet Unboxed Metadata Line */}
                <div className="flex items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="truncate">{service.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap tabular-nums">
                      <Clock className="w-3 h-3 text-[var(--accent)]" aria-hidden="true" />
                      {service.duration}
                    </span>
                  </div>
                  {service.featured && (
                    <span className="text-[var(--accent)] font-medium whitespace-nowrap shrink-0">
                      Client Favorite
                    </span>
                  )}
                </div>

                {/* Title & Tabular Price */}
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)] leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-base sm:text-lg font-semibold text-[var(--text-primary)] tabular-nums whitespace-nowrap shrink-0">
                    {formatPrice(service.pricePkr, currency)}
                  </p>
                </div>

                <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {service.description}
                </p>
              </div>

              {/* Action Row */}
              <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between gap-4">
                <span className="text-xs text-[var(--text-muted)] tabular-nums">
                  Duration: {service.duration}
                </span>
                <button
                  type="button"
                  onClick={() => onBookService(service)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-strong)] hover:bg-[var(--bg-inverse)] hover:text-[var(--text-on-inverse)] hover:border-[var(--bg-inverse)] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Book This</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Helpful Package Consultation Note */}
        <div className="mt-10 pt-6 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-[var(--text-secondary)]">
          <p>
            Need a customized multi-day Bridal Deal (Mayun, Barat &amp; Valima)
            or family group booking? Contact our studio desk for private suite
            packages.
          </p>
          <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
            Prices include consultation &amp; sterile care
          </span>
        </div>
      </div>
    </section>
  );
}
