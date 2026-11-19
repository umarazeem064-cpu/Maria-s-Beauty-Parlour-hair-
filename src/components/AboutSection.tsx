import { SALON_IMAGES, SALON_INFO } from '../data/salonData';
import { SalonImage } from './SalonImage';

const SALON_STANDARDS = [
  {
    index: '01.',
    title: 'Hospital-Grade Sterilization & Hygiene',
    detail:
      'Every stainless cuticle tool, scissor, comb, and brush undergoes UV and autoclave sanitization between clients. Freshly laundered Egyptian cotton towels and sealed single-use disposables are standard for every facial and mani-pedi.',
  },
  {
    index: '02.',
    title: '12+ Years of Master Stylist Expertise',
    detail:
      'Led by founder Maria Siddiqui alongside senior specialists averaging 9 to 14 years of salon practice, every haircut, corrective balayage, and dermal facial starts with a thoughtful one-on-one texture and undertone assessment.',
  },
  {
    index: '03.',
    title: 'Authentic International Formulations',
    detail:
      'We source exclusively verified salon-grade lines including L’Oréal Professionnel, Olaplex, Janssen Cosmetics, Dermalogica, MAC, and Huda Beauty—protecting hair integrity and sensitive South Asian skin in Karachi’s coastal climate.',
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[var(--bg-surface)] border-b border-[var(--border-hairline)] py-20 lg:py-28"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Editorial Suite Photography (.jpg) */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[340px] lg:min-h-[540px] overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
              <SalonImage
                src={SALON_IMAGES.aboutSuite}
                alt="Minimalist white marble skincare suite at Maria’s Beauty Parlour stocked with amber glass botanical serums, crisp cotton towels, and sterilized salon instruments"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Salon Story & Standards */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[var(--accent)]">
                Our Story · Established in Gulshan-e-Iqbal
              </p>

              <h2
                className="font-display font-semibold tracking-tight text-[var(--text-primary)] mt-3 text-balance leading-[1.12]"
                style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)' }}
              >
                Thoughtful Beauty Care Grounded in Hygiene, Craft &amp; Warmth
              </h2>

              <p className="mt-5 text-base leading-relaxed text-[var(--text-secondary)] max-w-[64ch]">
                Founded over a decade ago by Maria Siddiqui at Moon Garden
                Apartments in Gulshan-e-Iqbal, {SALON_INFO.brandName} was built
                around a simple conviction: neighborhood accessibility should
                never mean compromising on clinical cleanliness, authentic
                cosmetics, or unhurried artistry.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] max-w-[64ch]">
                Whether you visit us for a restorative Brazilian keratin ritual,
                a calming Janssen collagen facial, or your Barat and Valima
                bridal transformation, our private, serene rooms allow you to
                unwind while seasoned experts care for your hair and skin with
                patience and precision.
              </p>
            </div>

            {/* Editorial Numbered Standards List */}
            <div className="mt-10 border-t border-[var(--border-hairline)] divide-y divide-[var(--border-hairline)]">
              {SALON_STANDARDS.map((item) => (
                <div
                  key={item.index}
                  className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6"
                >
                  <div className="sm:col-span-4 flex items-baseline gap-2.5">
                    <span className="font-display text-lg font-semibold text-[var(--accent)] tabular-nums">
                      {item.index}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="sm:col-span-8 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
