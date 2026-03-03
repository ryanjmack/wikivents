/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */

const THEME_KEY = 'wikivents:theme';

export const THEMES = [
  'tokyonight',
  'tokyonight-light',
  'dracula',
  'alucard',
  'matrix',
  'matrix-light',
  'modus-operandi',
  'modus-vivendi',
  'modus-operandi-tinted',
  'modus-vivendi-tinted',
  'modus-operandi-deuteranopia',
  'modus-vivendi-deuteranopia',
  'modus-operandi-tritanopia',
  'modus-vivendi-tritanopia',
] as const;
export type Theme = (typeof THEMES)[number];

const THEME_SCHEMES: Record<Theme, 'light' | 'dark'> = {
  tokyonight: 'dark',
  'tokyonight-light': 'light',
  dracula: 'dark',
  alucard: 'light',
  matrix: 'dark',
  'matrix-light': 'dark',
  'modus-operandi': 'light',
  'modus-vivendi': 'dark',
  'modus-operandi-tinted': 'light',
  'modus-vivendi-tinted': 'dark',
  'modus-operandi-deuteranopia': 'light',
  'modus-vivendi-deuteranopia': 'dark',
  'modus-operandi-tritanopia': 'light',
  'modus-vivendi-tritanopia': 'dark',
};

export function isTheme(value: string | null): value is Theme {
  return value !== null && THEMES.some((t) => t === value);
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset['theme'] = theme;
  const el = document.getElementById('theme-select');

  if (el instanceof HTMLSelectElement) {
    el.value = theme;
  }
}

function syncSelect(scheme: 'light' | 'dark'): void {
  const el = document.getElementById('theme-select');

  if (!(el instanceof HTMLSelectElement)) {
    return;
  }

  for (const option of el.options) {
    if (isTheme(option.value)) {
      option.hidden = THEME_SCHEMES[option.value] !== scheme;
    }
  }
}

function syncSchemeButtons(scheme: 'light' | 'dark'): void {
  document.getElementById('scheme-light')?.setAttribute('aria-pressed', String(scheme === 'light'));
  document.getElementById('scheme-dark')?.setAttribute('aria-pressed', String(scheme === 'dark'));
}

export function applyScheme(scheme: 'light' | 'dark'): void {
  syncSelect(scheme);
  syncSchemeButtons(scheme);

  const current = document.documentElement.dataset['theme'] ?? null;

  if (!isTheme(current) || THEME_SCHEMES[current] !== scheme) {
    const first = THEMES.find((t) => THEME_SCHEMES[t] === scheme);

    if (first) {
      localStorage.setItem(THEME_KEY, first);
      applyTheme(first);
    }
  }
}

export function initTheme(): void {
  const stored = localStorage.getItem(THEME_KEY);
  const theme = isTheme(stored) ? stored : 'dracula';
  applyTheme(theme);

  const scheme = THEME_SCHEMES[theme];
  syncSelect(scheme);
  syncSchemeButtons(scheme);

  document.getElementById('theme-select')?.addEventListener('change', (e) => {
    if (!(e.target instanceof HTMLSelectElement)) {
      return;
    }

    const value = e.target.value;

    if (isTheme(value)) {
      localStorage.setItem(THEME_KEY, value);
      applyTheme(value);
    }
  });
}

export function initColorScheme(): void {
  document.getElementById('scheme-light')?.addEventListener('click', () => {
    applyScheme('light');
  });
  document.getElementById('scheme-dark')?.addEventListener('click', () => {
    applyScheme('dark');
  });
}
