/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */

const SCALE_KEY = 'wikivents:font-scale';

export const SCALES = ['sm', 'md', 'lg'] as const;
export type FontScale = (typeof SCALES)[number];

export function isScale(value: string | null): value is FontScale {
  return value !== null && (SCALES as readonly string[]).includes(value);
}

export function applyScale(scale: FontScale): void {
  document.documentElement.dataset['fontScale'] = scale === 'md' ? '' : scale;
  for (const s of SCALES) {
    document.getElementById(`font-scale-${s}`)?.setAttribute('aria-pressed', String(s === scale));
  }
}

export function initFontScale(): void {
  const stored = localStorage.getItem(SCALE_KEY);
  applyScale(isScale(stored) ? stored : 'md');

  for (const s of SCALES) {
    document.getElementById(`font-scale-${s}`)?.addEventListener('click', () => {
      localStorage.setItem(SCALE_KEY, s);
      applyScale(s);
    });
  }
}
