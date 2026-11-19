/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import {
  ACCENT_SWATCHES,
  SERVICES,
  THEME_PRESETS,
  type ServiceItem,
  type TeamMember,
  type ThemeModeId,
} from './data/salonData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { TeamSection } from './components/TeamSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';

/**
 * Computes perceived relative luminance for any hex color to ensure
 * accessible foreground text contrast when users select custom colors.
 */
function getReadableTextColor(hex: string): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return '#FFFFFF';
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.52 ? '#111111' : '#FFFFFF';
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return `rgba(140, 105, 58, ${alpha})`;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function App() {
  // Pure White Mode is always the clean default experience
  const [themeId, setThemeId] = useState<ThemeModeId>('white');
  const [accentId, setAccentId] = useState<string>('default');
  const [customAccentHex, setCustomAccentHex] = useState<string | null>(null);

  const [preselectedServiceId, setPreselectedServiceId] = useState<string>(
    SERVICES[0].id
  );
  const [preselectedStylistId, setPreselectedStylistId] =
    useState<string>('any');
  const [bookingFocusSignal, setBookingFocusSignal] = useState<number>(0);

  // Synchronize semantic CSS variables and Tailwind .dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    const preset =
      THEME_PRESETS.find((t) => t.id === themeId) ?? THEME_PRESETS[0];

    root.setAttribute('data-theme', preset.id);
    if (preset.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply custom spectrum accent if selected, otherwise restore theme preset accent
    if (customAccentHex) {
      root.style.setProperty('--accent', customAccentHex);
      root.style.setProperty('--accent-hover', customAccentHex);
      root.style.setProperty(
        '--accent-soft',
        hexToRgba(customAccentHex, preset.isDark ? 0.18 : 0.1)
      );
      root.style.setProperty('--accent-on', getReadableTextColor(customAccentHex));
      root.style.setProperty('--bg-inverse', customAccentHex);
      root.style.setProperty('--bg-inverse-hover', customAccentHex);
      root.style.setProperty(
        '--text-on-inverse',
        getReadableTextColor(customAccentHex)
      );
    } else if (accentId !== 'default') {
      const swatch = ACCENT_SWATCHES.find((s) => s.id === accentId);
      if (swatch) {
        const primaryHex = preset.isDark ? swatch.darkHex : swatch.lightHex;
        const hoverHex = preset.isDark
          ? swatch.darkHoverHex
          : swatch.lightHoverHex;
        const softHex = preset.isDark ? swatch.darkSoftHex : swatch.lightSoftHex;

        root.style.setProperty('--accent', primaryHex);
        root.style.setProperty('--accent-hover', hoverHex);
        root.style.setProperty('--accent-soft', softHex);
        root.style.setProperty('--accent-on', getReadableTextColor(primaryHex));
        root.style.setProperty('--bg-inverse', primaryHex);
        root.style.setProperty('--bg-inverse-hover', hoverHex);
        root.style.setProperty(
          '--text-on-inverse',
          getReadableTextColor(primaryHex)
        );
      }
    } else {
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-hover');
      root.style.removeProperty('--accent-soft');
      root.style.removeProperty('--accent-on');
      root.style.removeProperty('--bg-inverse');
      root.style.removeProperty('--bg-inverse-hover');
      root.style.removeProperty('--text-on-inverse');
    }
  }, [themeId, accentId, customAccentHex]);

  function scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleSelectTheme(id: ThemeModeId) {
    setThemeId(id);
    setAccentId('default');
    setCustomAccentHex(null);
  }

  function handleSelectAccent(id: string) {
    setAccentId(id);
    setCustomAccentHex(null);
  }

  function handleSelectCustomHex(hex: string) {
    setCustomAccentHex(hex);
  }

  function handleResetWhite() {
    setThemeId('white');
    setAccentId('default');
    setCustomAccentHex(null);
  }

  function handleBookService(service: ServiceItem) {
    setPreselectedServiceId(service.id);
    setBookingFocusSignal((n) => n + 1);
    scrollToSection('booking');
  }

  function handleBookWithStylist(member: TeamMember) {
    setPreselectedStylistId(member.id);
    setBookingFocusSignal((n) => n + 1);
    scrollToSection('booking');
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <Header
        themeId={themeId}
        accentId={accentId}
        customAccentHex={customAccentHex}
        onSelectTheme={handleSelectTheme}
        onSelectAccent={handleSelectAccent}
        onSelectCustomHex={handleSelectCustomHex}
        onResetWhite={handleResetWhite}
        onBookNowClick={() => scrollToSection('booking')}
      />

      <main className="flex-1">
        <HeroSection
          onBookAppointment={() => scrollToSection('booking')}
          onExploreServices={() => scrollToSection('services')}
        />

        <AboutSection />

        <ServicesSection onBookService={handleBookService} />

        <TeamSection onBookWithStylist={handleBookWithStylist} />

        <GallerySection />

        <TestimonialsSection />

        <BookingSection
          preselectedServiceId={preselectedServiceId}
          preselectedStylistId={preselectedStylistId}
          bookingFocusSignal={bookingFocusSignal}
        />
      </main>

      <Footer themeId={themeId} onSelectTheme={handleSelectTheme} />
    </div>
  );
}
