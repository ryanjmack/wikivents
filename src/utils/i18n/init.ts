/*
 * Copyright (c) 2026 Ryan Mack. GPL-3.0-or-later.
 */

import {en, type Messages} from './en.ts';
import {t} from './index.ts';

// data-i18n="key"           → el.textContent
// data-i18n-[attr]="key"    → el.setAttribute(attr, ...)
// supported attrs cover all a11y string targets; state attrs (aria-pressed etc.) are excluded
const ATTR_TARGETS = [
  'aria-label',
  'aria-description',
  'aria-placeholder',
  'placeholder',
  'title',
  'alt',
] as const;

function isMessageKey(key: string): key is keyof Messages {
  return key in en;
}

function apply(el: HTMLElement, key: string, attr: string | null): void {
  if (!isMessageKey(key)) {
    return;
  }

  if (attr === null) {
    el.textContent = t(key);
  } else {
    el.setAttribute(attr, t(key));
  }
}

export function hydrateI18n(): void {
  for (const el of document.querySelectorAll<HTMLElement>('[data-i18n]')) {
    const key = el.getAttribute('data-i18n');

    if (key !== null) {
      apply(el, key, null);
    }
  }

  for (const attr of ATTR_TARGETS) {
    for (const el of document.querySelectorAll<HTMLElement>(`[data-i18n-${attr}]`)) {
      const key = el.getAttribute(`data-i18n-${attr}`);

      if (key !== null) {
        apply(el, key, attr);
      }
    }
  }
}
