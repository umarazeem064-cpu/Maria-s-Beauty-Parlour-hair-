export type ThemeModeId = 'white' | 'obsidian' | 'rose' | 'emerald' | 'sapphire' | 'plum';

export type CurrencyCode = 'PKR' | 'USD' | 'GBP';

export interface ThemePreset {
  id: ThemeModeId;
  name: string;
  shortLabel: string;
  isDark: boolean;
  canvasPreview: string;
  accentPreview: string;
  description: string;
}

export interface AccentSwatch {
  id: string;
  name: string;
  lightHex: string;
  lightHoverHex: string;
  lightSoftHex: string;
  darkHex: string;
  darkHoverHex: string;
  darkSoftHex: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategoryId;
  categoryLabel: string;
  description: string;
  duration: string;
  pricePkr: number;
  featured?: boolean;
}

export type ServiceCategoryId =
  | 'hair'
  | 'skincare'
  | 'bridal'
  | 'nails'
  | 'grooming';

export interface TeamMember {
  id: string;
  name: string;
  firstName: string;
  role: string;
  experienceYears: number;
  specialty: string;
  bio: string;
  image: string;
  imageAlt: string;
  instagram: string;
  whatsapp: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Hair Artistry' | 'Bridal & Glam' | 'Skin & Spa' | 'Salon Interior';
  caption: string;
  image: string;
  alt: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  location: string;
  service: string;
  rating: number;
  dateLabel: string;
  quote: string;
  outcome: string;
  image: string;
  alt: string;
}

/**
 * Verified business details extracted directly from the Google Maps listing:
 * https://maps.app.goo.gl/nWFANEWGDYZW9jKy9
 * Place: Maria's Beauty Parlour hair & skin care (Gulshan-e-Iqbal, Karachi)
 */
export const SALON_INFO = {
  brandName: "Maria's Beauty Parlour",
  brandTagline: 'Hair & Skin Care Studio',
  fullName: "Maria's Beauty Parlour — Hair & Skin Care",
  shortAddress: 'Shop 64, Moon Garden, Block 11, Gulshan-e-Iqbal, Karachi',
  fullAddress:
    'Shop No. 64, Moon Garden Apartments, Block 10-A / Block 11, Gulshan-e-Iqbal, Karachi, Pakistan',
  landmark: 'Moon Garden Street, near University Road, Gulshan-e-Iqbal',
  coordinates: '24.9144° N, 67.1103° E',
  googleMapsUrl: 'https://maps.app.goo.gl/nWFANEWGDYZW9jKy9',
  primaryPhoneDisplay: '+92 334 8592187',
  primaryPhoneLocal: '0334-8592187',
  primaryPhoneHref: 'tel:+923348592187',
  secondaryPhoneDisplay: '+92 332 9389293',
  secondaryPhoneLocal: '0332-9389293',
  secondaryPhoneHref: 'tel:+923329389293',
  whatsappNumber: '923348592187',
  whatsappLink:
    'https://wa.me/923348592187?text=Assalam-o-Alaikum%20Maria%27s%20Beauty%20Parlour%2C%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment.',
  hoursSummary: 'Monday – Sunday: 10:00 AM – 10:00 PM',
  hoursShort: 'Open Daily · 10:00 AM – 10:00 PM',
  googleRating: '4.9',
  reviewCount: '150+',
  yearsExperience: '12+',
  email: 'appointments@mariasbeautykarachi.pk',
  socials: {
    instagram: 'https://instagram.com/mariasbeautyparlour.khi',
    facebook: 'https://facebook.com/mariasbeautyparlourkarachi',
    tiktok: 'https://tiktok.com/@mariasbeautykarachi',
    whatsapp: 'https://wa.me/923348592187',
  },
} as const;

export const SALON_IMAGES = {
  heroInterior: '/src/assets/images/hero_salon_interior_1795086390072.jpg',
  aboutSuite: '/src/assets/images/about_salon_craft_1795086389997.jpg',
  hairStyling: '/src/assets/images/gallery_hair_styling_1795086390431.jpg',
  bridalGlam: '/src/assets/images/gallery_bridal_glam_1795086390790.jpg',
  skincareFacial: '/src/assets/images/gallery_skincare_facial_1795086390642.jpg',
  manicureSpa: '/src/assets/images/gallery_manicure_spa_1795086390980.jpg',
  teamMaria: '/src/assets/images/team_maria_siddiqui_1795086389354.jpg',
  teamSana: '/src/assets/images/team_sana_tariq_1795086390406.jpg',
  teamHina: '/src/assets/images/team_hina_kamran_1795086390649.jpg',
  teamZainab: '/src/assets/images/team_zainab_raza_1795086391018.jpg',
  clientAyesha: '/src/assets/images/client_portrait_ayesha_1795086390789.jpg',
  clientFatima: '/src/assets/images/client_portrait_fatima_1795086391023.jpg',
  clientMaham: '/src/assets/images/client_portrait_maham_1795086390546.jpg',
} as const;

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'white',
    name: 'Pure White',
    shortLabel: 'White',
    isDark: false,
    canvasPreview: '#FFFFFF',
    accentPreview: '#8C693A',
    description: 'High-contrast crisp white editorial canvas with warm champagne gold',
  },
  {
    id: 'obsidian',
    name: 'Obsidian Gold',
    shortLabel: 'Obsidian',
    isDark: true,
    canvasPreview: '#0D0D0F',
    accentPreview: '#D4AF6A',
    description: 'Evening black marble canvas with luminous champagne gold accents',
  },
  {
    id: 'rose',
    name: 'Rose Atelier',
    shortLabel: 'Rose',
    isDark: false,
    canvasPreview: '#FFFDFD',
    accentPreview: '#8E2D4C',
    description: 'Soft porcelain blush surfaces paired with deep couture burgundy rose',
  },
  {
    id: 'emerald',
    name: 'Emerald Silk',
    shortLabel: 'Emerald',
    isDark: false,
    canvasPreview: '#FCFFFD',
    accentPreview: '#145B47',
    description: 'Clean botanical white canvas with deep emerald wellness accents',
  },
  {
    id: 'sapphire',
    name: 'Royal Sapphire',
    shortLabel: 'Sapphire',
    isDark: false,
    canvasPreview: '#FDFEFF',
    accentPreview: '#1D428A',
    description: 'Cool architectural white canvas paired with deep sapphire navy',
  },
  {
    id: 'plum',
    name: 'Velvet Plum',
    shortLabel: 'Plum',
    isDark: true,
    canvasPreview: '#130E17',
    accentPreview: '#E3B7CA',
    description: 'Deep evening plum dark mode illuminated by soft champagne rose',
  },
];

export const ACCENT_SWATCHES: AccentSwatch[] = [
  {
    id: 'default',
    name: 'Theme Default',
    lightHex: '#8C693A',
    lightHoverHex: '#71532C',
    lightSoftHex: '#F5EFE6',
    darkHex: '#D4AF6A',
    darkHoverHex: '#E2C285',
    darkSoftHex: '#252019',
  },
  {
    id: 'obsidian-ink',
    name: 'Obsidian Ink',
    lightHex: '#18181B',
    lightHoverHex: '#09090B',
    lightSoftHex: '#F1F1F3',
    darkHex: '#F4F4F5',
    darkHoverHex: '#FFFFFF',
    darkSoftHex: '#27272A',
  },
  {
    id: 'couture-rose',
    name: 'Couture Rose',
    lightHex: '#9D2B4C',
    lightHoverHex: '#7D203B',
    lightSoftHex: '#FCECF1',
    darkHex: '#F29CB5',
    darkHoverHex: '#F7B4C7',
    darkSoftHex: '#331A23',
  },
  {
    id: 'emerald-botanical',
    name: 'Emerald',
    lightHex: '#145B47',
    lightHoverHex: '#0E4535',
    lightSoftHex: '#E6F4EE',
    darkHex: '#6EE7B7',
    darkHoverHex: '#8EF0C8',
    darkSoftHex: '#122E25',
  },
  {
    id: 'royal-sapphire',
    name: 'Sapphire',
    lightHex: '#1D428A',
    lightHoverHex: '#153169',
    lightSoftHex: '#E9F0FB',
    darkHex: '#8AB4F8',
    darkHoverHex: '#A7C7FA',
    darkSoftHex: '#16243D',
  },
  {
    id: 'imperial-plum',
    name: 'Amethyst Plum',
    lightHex: '#6B2D7A',
    lightHoverHex: '#532060',
    lightSoftHex: '#F5EBF8',
    darkHex: '#D8A2E8',
    darkHoverHex: '#E4BBF0',
    darkSoftHex: '#2B1B33',
  },
  {
    id: 'bronze-amber',
    name: 'Burnished Bronze',
    lightHex: '#9A4A23',
    lightHoverHex: '#7C3919',
    lightSoftHex: '#FBF0EA',
    darkHex: '#E8A782',
    darkHoverHex: '#F0BC9E',
    darkSoftHex: '#312018',
  },
  {
    id: 'deep-teal',
    name: 'Aegean Teal',
    lightHex: '#115E6B',
    lightHoverHex: '#0C4852',
    lightSoftHex: '#E7F5F7',
    darkHex: '#74D2DF',
    darkHoverHex: '#93DFE9',
    darkSoftHex: '#142D32',
  },
  {
    id: 'crimson-velvet',
    name: 'Velvet Crimson',
    lightHex: '#991B2D',
    lightHoverHex: '#7A1422',
    lightSoftHex: '#FCECEE',
    darkHex: '#F497A3',
    darkHoverHex: '#F8B1BA',
    darkSoftHex: '#33171D',
  },
];

export const SERVICE_CATEGORIES: { id: 'all' | ServiceCategoryId; label: string }[] = [
  { id: 'all', label: 'All Services' },
  { id: 'hair', label: 'Hair Styling & Cuts' },
  { id: 'skincare', label: 'Skincare & Facials' },
  { id: 'bridal', label: 'Bridal & Party Makeup' },
  { id: 'nails', label: 'Manicure & Pedicure' },
  { id: 'grooming', label: 'Grooming & Spa' },
];

export const SERVICES: ServiceItem[] = [
  // Hair Styling & Cuts
  {
    id: 'signature-haircut',
    name: 'Signature Precision Haircut & Style',
    category: 'hair',
    categoryLabel: 'Hair Styling & Cuts',
    description:
      'Tailored consultation, relaxing scalp wash, precision layered or bob cut shaped to your bone structure, finished with a smooth blowout.',
    duration: '45 mins',
    pricePkr: 2500,
    featured: true,
  },
  {
    id: 'volume-blowout',
    name: 'Silk Blowout & Thermal Waves',
    category: 'hair',
    categoryLabel: 'Hair Styling & Cuts',
    description:
      'Humidity-shielded wash and round-brush blowout crafted for lasting bounce, mirror shine, and natural movement suited to Karachi weather.',
    duration: '40 mins',
    pricePkr: 1800,
  },
  {
    id: 'global-hair-color',
    name: 'Ammonia-Free Global Hair Coloring',
    category: 'hair',
    categoryLabel: 'Hair Styling & Cuts',
    description:
      'Rich, even root-to-tip coverage using authentic L’Oréal Professionnel INOA or Majirel formulas paired with a bond-sealing conditioning mask.',
    duration: '90 mins',
    pricePkr: 7500,
  },
  {
    id: 'dimensional-highlights',
    name: 'Dimensional Balayage & Highlights',
    category: 'hair',
    categoryLabel: 'Hair Styling & Cuts',
    description:
      'Hand-painted caramel, hazelnut, or ash ribbons blended seamlessly into dark South Asian hair, toned and finished with Olaplex care.',
    duration: '150 mins',
    pricePkr: 14500,
    featured: true,
  },
  {
    id: 'keratin-treatment',
    name: 'Brazilian Keratin & Protein Smoothing',
    category: 'hair',
    categoryLabel: 'Hair Styling & Cuts',
    description:
      'Formaldehyde-free restorative keratin infusion that eliminates coastal frizz, repairs heat damage, and delivers sleek softness for up to 5 months.',
    duration: '180 mins',
    pricePkr: 18000,
    featured: true,
  },

  // Skincare & Facials
  {
    id: 'deep-cleansing-facial',
    name: 'Deep Cleansing & Pore Detox Facial',
    category: 'skincare',
    categoryLabel: 'Skincare & Facials',
    description:
      'Thorough ultrasonic exfoliation, gentle steam extraction, soothing botanical clay mask, and barrier-repair hydration for visibly clear skin.',
    duration: '60 mins',
    pricePkr: 4000,
  },
  {
    id: 'anti-aging-treatment',
    name: 'Clinical Anti-Aging Collagen Therapy',
    category: 'skincare',
    categoryLabel: 'Skincare & Facials',
    description:
      'Janssen Cosmetics peptide infusion with sculptural lymphatic drainage massage and firming hydro-jelly mask to restore elasticity and tone.',
    duration: '75 mins',
    pricePkr: 7500,
    featured: true,
  },
  {
    id: 'gold-radiance-facial',
    name: '24K Gold Radiance Bridal Facial',
    category: 'skincare',
    categoryLabel: 'Skincare & Facials',
    description:
      'Illuminating pre-event facial combining brightening enzyme polish, 24K gold leaf serum ampoule, and micro-circulation massage for glass-skin glow.',
    duration: '75 mins',
    pricePkr: 6500,
  },
  {
    id: 'hydra-skin-polish',
    name: 'Hydra-Glow Face & Neck Skin Polish',
    category: 'skincare',
    categoryLabel: 'Skincare & Facials',
    description:
      'Gentle dermatological skin polish that lifts tan and dullness across face, neck, and décolletage without irritation or redness.',
    duration: '45 mins',
    pricePkr: 2800,
  },

  // Bridal & Party Makeup
  {
    id: 'full-bridal-makeup',
    name: 'Signature Barat / Valima Bridal Makeup',
    category: 'bridal',
    categoryLabel: 'Bridal & Party Makeup',
    description:
      'Full HD airbrush or satin-skin bridal glam by Senior Artist Maria using MAC, Dior & Huda Beauty, including couture hairstyling, lashes, and dupatta pinning.',
    duration: '180 mins',
    pricePkr: 35000,
    featured: true,
  },
  {
    id: 'engagement-look',
    name: 'Engagement & Nikkah Soft-Glam Look',
    category: 'bridal',
    categoryLabel: 'Bridal & Party Makeup',
    description:
      'Luminous, camera-ready soft glam tailored to pastel daytime or evening ensembles, paired with romantic waves or an architectural low bun.',
    duration: '120 mins',
    pricePkr: 18500,
  },
  {
    id: 'party-styling',
    name: 'Couture Party Makeup & Hair Styling',
    category: 'bridal',
    categoryLabel: 'Bridal & Party Makeup',
    description:
      'Long-wear evening complexion, customized eye artistry, and your choice of sleek straight, textured waves, or classic braided styling.',
    duration: '90 mins',
    pricePkr: 8500,
  },

  // Manicure & Pedicure
  {
    id: 'classic-mani-pedi',
    name: 'Classic Manicure & Pedicure Duo',
    category: 'nails',
    categoryLabel: 'Manicure & Pedicure',
    description:
      'Warm rose-salt soak, sterilized cuticle detailing, gentle sugar exfoliation, tension-relieving hand and foot massage, and precision polish.',
    duration: '75 mins',
    pricePkr: 3500,
  },
  {
    id: 'gel-polish-studio',
    name: 'Chip-Free UV Gel Polish Application',
    category: 'nails',
    categoryLabel: 'Manicure & Pedicure',
    description:
      'Nail plate preparation, nourishing base coat, two coats of high-gloss salon gel color cured under LED light for up to 3 weeks of pristine wear.',
    duration: '45 mins',
    pricePkr: 2800,
  },
  {
    id: 'spa-foot-treatment',
    name: 'Luxury Aromatherapy Spa Foot Treatment',
    category: 'nails',
    categoryLabel: 'Manicure & Pedicure',
    description:
      'Intensive cracked-heel resurfacing, warm paraffin wax hydration wrap, eucalyptus hot-towel compress, and soothing reflexology massage.',
    duration: '60 mins',
    pricePkr: 3200,
  },

  // Grooming & Hot-Towel Spa
  {
    id: 'hot-towel-spa',
    name: 'Aromatic Hot-Towel Scalp & Neck Ritual',
    category: 'grooming',
    categoryLabel: 'Grooming & Spa',
    description:
      'Warm organic argan & rosemary oil infusion followed by steamed herbal hot-towel wraps and deep acupressure to ease tension and revive hair roots.',
    duration: '45 mins',
    pricePkr: 2600,
  },
  {
    id: 'brow-facial-grooming',
    name: 'Precision Brow Architecture & Facial Threading',
    category: 'grooming',
    categoryLabel: 'Grooming & Spa',
    description:
      'Symmetrical eyebrow mapping, delicate organic cotton threading, soothing aloe cooling mist, and gentle chamomile finish.',
    duration: '25 mins',
    pricePkr: 900,
  },
  {
    id: 'executive-groom-suite',
    name: 'Pre-Wedding Groom Express Beard & Hot-Towel Care',
    category: 'grooming',
    categoryLabel: 'Grooming & Spa',
    description:
      'By private family appointment only: classic beard sculpting, mustache detailing, charcoal detox cleanse, and calming steamed hot-towel finish.',
    duration: '45 mins',
    pricePkr: 2500,
  },
];

export const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rateFromPkr: number; label: string }> = {
  PKR: { symbol: 'PKR ', rateFromPkr: 1, label: 'PKR' },
  USD: { symbol: '$', rateFromPkr: 1 / 278, label: 'USD' },
  GBP: { symbol: '£', rateFromPkr: 1 / 352, label: 'GBP' },
};

export function formatPrice(pricePkr: number, currency: CurrencyCode): string {
  const { symbol, rateFromPkr } = CURRENCY_RATES[currency];
  if (currency === 'PKR') {
    return `${symbol}${pricePkr.toLocaleString('en-PK')}`;
  }
  const converted = Math.max(3, Math.round(pricePkr * rateFromPkr));
  return `${symbol}${converted}`;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'maria-siddiqui',
    name: 'Maria Siddiqui',
    firstName: 'Maria',
    role: 'Founder & Creative Director',
    experienceYears: 14,
    specialty: 'Couture Bridal Makeup & Skin Care Consultation',
    bio: 'Founder of Maria’s Beauty Parlour in Gulshan-e-Iqbal. Trained in clinical esthetics and timeless South Asian bridal artistry, Maria personally oversees every signature bridal booking and bespoke skin plan.',
    image: SALON_IMAGES.teamMaria,
    imageAlt: 'Maria Siddiqui, Founder and Creative Director at Maria’s Beauty Parlour in an ivory tailored blazer',
    instagram: 'https://instagram.com/mariasbeautyparlour.khi',
    whatsapp: 'https://wa.me/923348592187?text=Hello%20Maria%2C%20I%20would%20like%20to%20book%20a%20consultation.',
  },
  {
    id: 'sana-tariq',
    name: 'Sana Tariq',
    firstName: 'Sana',
    role: 'Senior Hair Stylist & Colorist',
    experienceYears: 10,
    specialty: 'Precision Cuts, Balayage & Keratin Recovery',
    bio: 'Specialist in corrective hair color, dimensional caramel highlights, and humidity-resistant Brazilian keratin treatments designed specifically for coarse and chemically treated hair textures.',
    image: SALON_IMAGES.teamSana,
    imageAlt: 'Sana Tariq, Senior Hair Stylist and Colorist smiling in the sunlit studio',
    instagram: 'https://instagram.com/mariasbeautyparlour.khi',
    whatsapp: 'https://wa.me/923348592187?text=Hello%2C%20I%20would%20like%20to%20book%20a%20hair%20appointment%20with%20Sana.',
  },
  {
    id: 'hina-kamran',
    name: 'Hina Kamran',
    firstName: 'Hina',
    role: 'Lead Dermal Aesthetician',
    experienceYears: 9,
    specialty: 'Clinical Facials, Anti-Aging & Barrier Repair',
    bio: 'Certified dermal therapist known for gentle, results-focused Janssen and Hydra-Glow protocols that address pigmentation, dehydration, and pre-bridal skin luminosity without harsh downtime.',
    image: SALON_IMAGES.teamHina,
    imageAlt: 'Hina Kamran, Lead Dermal Aesthetician in a crisp white clinical spa tunic',
    instagram: 'https://instagram.com/mariasbeautyparlour.khi',
    whatsapp: 'https://wa.me/923348592187?text=Hello%2C%20I%20would%20like%20to%20book%20a%20facial%20with%20Hina.',
  },
  {
    id: 'zainab-raza',
    name: 'Zainab Raza',
    firstName: 'Zainab',
    role: 'Makeup Artist & Nail Studio Lead',
    experienceYears: 7,
    specialty: 'Soft-Glam Nikkah Looks & Spa Gel Artistry',
    bio: 'Beloved by younger brides and party clients for breathable skin-first makeup, effortless Hollywood waves, and meticulous sterile manicure and UV gel nail artistry.',
    image: SALON_IMAGES.teamZainab,
    imageAlt: 'Zainab Raza, Makeup Artist and Nail Studio Lead holding a contour brush in soft window light',
    instagram: 'https://instagram.com/mariasbeautyparlour.khi',
    whatsapp: 'https://wa.me/923348592187?text=Hello%2C%20I%20would%20like%20to%20book%20a%20session%20with%20Zainab.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-bridal',
    title: 'Ivory & Champagne Nikkah Bridal',
    category: 'Bridal & Glam',
    caption: 'Luminous satin complexion, defined kohl-soft eyes, and custom ivory dupatta draping by Maria Siddiqui.',
    image: SALON_IMAGES.bridalGlam,
    alt: 'Radiant Pakistani bride with luminous soft-glam bridal makeup and champagne gold embroidered dupatta',
  },
  {
    id: 'gal-hair',
    title: 'Caramel Balayage & Keratin Gloss',
    category: 'Hair Artistry',
    caption: 'Seamless warm caramel ribbons over natural espresso hair, sealed with protein gloss and signature blowout waves.',
    image: SALON_IMAGES.hairStyling,
    alt: 'Back three-quarter view of lustrous dark hair with warm caramel balayage highlights and glossy blowout waves',
  },
  {
    id: 'gal-facial',
    title: '24K Gold Botanical Infusion Facial',
    category: 'Skin & Spa',
    caption: 'Calm, sterilized private facial cabin using cold-pressed hydrating botanical serums for instant post-treatment radiance.',
    image: SALON_IMAGES.skincareFacial,
    alt: 'Relaxing client receiving a luminous 24K gold botanical serum facial in a spotless white spa room',
  },
  {
    id: 'gal-nails',
    title: 'Sheer Rose Almond Gel Manicure',
    category: 'Skin & Spa',
    caption: 'Precision cuticle care paired with chip-free sheer-rose UV gel polish and warm botanical oil finish.',
    image: SALON_IMAGES.manicureSpa,
    alt: 'Freshly manicured hands with sheer rose almond gel nails next to botanical oil and folded white spa towel',
  },
  {
    id: 'gal-interior',
    title: 'Main Styling Atelier — Moon Garden',
    category: 'Salon Interior',
    caption: 'Sunlit marble stations, arched brushed-brass mirrors, and serene private ambience in Gulshan-e-Iqbal.',
    image: SALON_IMAGES.heroInterior,
    alt: 'Wide architectural view of Maria’s Beauty Parlour sunlit white marble and brushed brass styling studio',
  },
  {
    id: 'gal-suite',
    title: 'Clinical Skincare & Sterilization Suite',
    category: 'Salon Interior',
    caption: 'Dedicated preparation counter stocked with authentic serums, freshly laundered linens, and sanitized instruments.',
    image: SALON_IMAGES.aboutSuite,
    alt: 'Spotless white travertine skincare consultation counter with amber glass serums and crisp white cotton towels',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-ayesha',
    clientName: 'Ayesha Farooq',
    location: 'Gulshan-e-Iqbal, Karachi',
    service: 'Brazilian Keratin & Precision Haircut',
    rating: 5,
    dateLabel: 'Verified Google Review',
    quote:
      'My hair had become dry and unmanageable from Karachi humidity and past box dyes. Sana took fifteen minutes just to assess porosity before starting. Four months after my keratin and layered cut, my hair still dries smooth in ten minutes with real bounce.',
    outcome: 'Frizz-free gloss lasting 4+ months with zero scalp irritation',
    image: SALON_IMAGES.clientAyesha,
    alt: 'Client Ayesha Farooq smiling with glossy dark blowout hair after her visit to Maria’s Beauty Parlour',
  },
  {
    id: 'rev-fatima',
    clientName: 'Fatima Javed',
    location: 'Block 10-A, Gulshan-e-Iqbal',
    service: 'Clinical Anti-Aging & Gold Facial',
    rating: 5,
    dateLabel: 'Verified Google Review',
    quote:
      'What sets Maria’s Beauty Parlour apart from other salons around Moon Garden is genuine hygiene. Fresh towels, sealed serums, and zero aggressive squeezing. Hina calmed my uneven skin tone over two visits before my sister’s wedding.',
    outcome: 'Visibly calmer, hydrated glow with zero post-facial redness',
    image: SALON_IMAGES.clientFatima,
    alt: 'Client Fatima Javed showing clear radiant skin after her clinical facial at Maria’s Beauty Parlour',
  },
  {
    id: 'rev-maham',
    clientName: 'Maham Sikandar',
    location: 'Gulistan-e-Johar, Karachi',
    service: 'Engagement Soft-Glam & Hair Styling',
    rating: 5,
    dateLabel: 'Verified Google Review',
    quote:
      'I wanted an engagement look that still looked like me—no grey cast or heavy caking. Maria and Zainab matched my exact undertone and pinned my dupatta so securely it did not budge for seven hours under stage lights.',
    outcome: 'Seamless 7-hour skin-like finish photographed beautifully in daylight & flash',
    image: SALON_IMAGES.clientMaham,
    alt: 'Client Maham Sikandar smiling with soft-glam engagement makeup and glossy waves',
  },
];

export const AVAILABLE_TIME_SLOTS = [
  '10:30 AM',
  '11:30 AM',
  '12:30 PM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
  '08:00 PM',
];
