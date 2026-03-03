/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */

const SCALE_KEY = 'wikivents:font-scale';

export const SCALES = ['sm', 'md', 'lg'] as const;
export type FontScale = (typeof SCALES)[number];

export function isScale(value: string | null): value is FontScale {
  return value !== null && SCALES.some((s) => s === value);
}

export function applyScale(scale: FontScale): void {
  // 'md' is the baseline — remove the attr rather than setting it to ''.
  // CSS only keys off [data-font-scale='sm'] and [data-font-scale='lg'].
  if (scale === 'md') {
    delete document.documentElement.dataset['fontScale'];
  } else {
    document.documentElement.dataset['fontScale'] = scale;
  }
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
