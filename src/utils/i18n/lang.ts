/*
 * Copyright (c) 2026 Ryan Mack. GPL-3.0-or-later.
 */

import {en, type Messages} from './en.ts';
import {es} from './es.ts';
import {createFormatters, formatters, setLocale} from './index.ts';
import {hydrateI18n} from './init.ts';

const BUNDLES: Record<string, Messages> = {en, es};
const LOCALE_TAGS: Record<string, string> = {en: 'en', es: 'es-419'};
const STORAGE_KEY = 'wikivents:lang';

function applyLang(lang: string): void {
  const bundle = BUNDLES[lang] ?? en;
  setLocale(bundle);
  Object.assign(formatters, createFormatters(LOCALE_TAGS[lang] ?? 'en'));
  hydrateI18n();
  localStorage.setItem(STORAGE_KEY, lang);
  const select = document.getElementById('lang-select') as HTMLSelectElement | null;

  if (select !== null) {
    select.value = lang;
  }
}

export function initLang(): void {
  const stored = localStorage.getItem(STORAGE_KEY) ?? 'en';
  applyLang(stored);
  document.getElementById('lang-select')?.addEventListener('change', (e) => {
    applyLang((e.currentTarget as HTMLSelectElement).value);
  });
}
