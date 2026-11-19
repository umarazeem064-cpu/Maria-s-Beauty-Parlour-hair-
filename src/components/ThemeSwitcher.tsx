import { useEffect, useRef, useState } from 'react';
import { Check, Palette, RotateCcw, Sun, Moon } from 'lucide-react';
import {
  ACCENT_SWATCHES,
  THEME_PRESETS,
  type ThemeModeId,
} from '../data/salonData';

interface ThemeSwitcherProps {
  themeId: ThemeModeId;
  accentId: string;
  customAccentHex: string | null;
  onSelectTheme: (id: ThemeModeId) => void;
  onSelectAccent: (id: string) => void;
  onSelectCustomHex: (hex: string) => void;
  onResetWhite: () => void;
  align?: 'left' | 'right';
}

export function ThemeSwitcher({
  themeId,
  accentId,
  customAccentHex,
  onSelectTheme,
  onSelectAccent,
  onSelectCustomHex,
  onResetWhite,
  align = 'right',
}: ThemeSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activePreset =
    THEME_PRESETS.find((t) => t.id === themeId) ?? THEME_PRESETS[0];

  useEffect(() => {
    if (!open) return;
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Choose color theme mode"
        className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-hairline)] bg-[var(--bg-surface-elevated)] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
      >
        <Palette className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
        <span>Mode: {activePreset.name}</span>
        <span
          className="w-3 h-3 rounded-full border border-[var(--border-strong)] shrink-0"
          style={{ backgroundColor: customAccentHex ?? 'var(--accent)' }}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Color Mode Studio"
          className={`absolute top-full mt-2 z-50 w-80 sm:w-96 p-5 bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] rounded-lg text-[var(--text-primary)] ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
          style={{ boxShadow: 'var(--shadow-elevated)' }}
        >
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-[var(--border-hairline)]">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                Color Mode &amp; Palette
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Pure White default or switch to any color theme
              </p>
            </div>
            <button
              type="button"
              onClick={onResetWhite}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-hairline)] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Reset to Pure White Mode"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              <span>Pure White</span>
            </button>
          </div>

          {/* Curated Surface + Palette Themes */}
          <div className="mt-4">
            <p className="text-xs font-medium text-[var(--text-muted)] mb-2.5">
              Surface Themes (Light &amp; Dark)
            </p>
            <div className="grid grid-cols-2 gap-2">
              {THEME_PRESETS.map((preset) => {
                const isSelected = preset.id === themeId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onSelectTheme(preset.id)}
                    aria-pressed={isSelected}
                    className={`flex items-center justify-between gap-2 px-3 py-2 text-left text-xs rounded-md border transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)] font-semibold'
                        : 'border-[var(--border-hairline)] hover:border-[var(--border-strong)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-4 h-4 rounded-full border border-black/15 shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: preset.canvasPreview }}
                        aria-hidden="true"
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: preset.accentPreview }}
                        />
                      </span>
                      <span className="truncate">{preset.name}</span>
                    </span>
                    <span className="shrink-0 text-[var(--text-muted)]">
                      {preset.isDark ? (
                        <Moon className="w-3 h-3" aria-hidden="true" />
                      ) : (
                        <Sun className="w-3 h-3" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* All-Colors Accent Spectrum */}
          <div className="mt-4 pt-4 border-t border-[var(--border-hairline)]">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-xs font-medium text-[var(--text-muted)]">
                Accent Color Spectrum
              </p>
              <label className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                <span>Custom color</span>
                <input
                  type="color"
                  value={customAccentHex ?? activePreset.accentPreview}
                  onChange={(e) => onSelectCustomHex(e.target.value)}
                  aria-label="Pick any custom accent color"
                  className="w-5 h-5 rounded border border-[var(--border-strong)] bg-transparent cursor-pointer p-0"
                />
              </label>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {ACCENT_SWATCHES.map((swatch) => {
                const isSelected = !customAccentHex && accentId === swatch.id;
                const displayColor = activePreset.isDark
                  ? swatch.darkHex
                  : swatch.lightHex;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    onClick={() => onSelectAccent(swatch.id)}
                    aria-pressed={isSelected}
                    className={`flex items-center gap-1.5 px-2 py-1.5 text-[11px] rounded-md border transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)] font-semibold'
                        : 'border-[var(--border-hairline)] hover:border-[var(--border-strong)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: displayColor }}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <Check
                          className="w-2 h-2 text-white mix-blend-difference"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span className="truncate">{swatch.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
