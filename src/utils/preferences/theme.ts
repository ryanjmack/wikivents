/*
 * Copyright (c) 2026 Ryan Mack. GPL-3.0-or-later.
 */

const THEME_KEY = 'wikivents:theme';

export const THEMES = [
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

const THEME_PAIRS: Partial<Record<Theme, Theme>> = (
  [
    ['dracula', 'alucard'],
    ['matrix', 'matrix-light'],
    ['modus-vivendi', 'modus-operandi'],
    ['modus-vivendi-tinted', 'modus-operandi-tinted'],
    ['modus-vivendi-deuteranopia', 'modus-operandi-deuteranopia'],
    ['modus-vivendi-tritanopia', 'modus-operandi-tritanopia'],
  ] satisfies [Theme, Theme][]
).reduce<Partial<Record<Theme, Theme>>>(
  (acc, [dark, light]) => ({...acc, [dark]: light, [light]: dark}),
  {},
);

const THEME_SCHEMES: Record<Theme, 'light' | 'dark'> = {
  dracula: 'dark',
  alucard: 'light',
  matrix: 'dark',
  'matrix-light': 'light',
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
    const paired = isTheme(current) ? THEME_PAIRS[current] : undefined;
    const next =
      paired !== undefined && THEME_SCHEMES[paired] === scheme
        ? paired
        : THEMES.find((t) => THEME_SCHEMES[t] === scheme);

    if (next !== undefined) {
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
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
