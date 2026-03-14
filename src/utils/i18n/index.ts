/*
 * Copyright (c) 2026 Ryan Mack. GPL-3.0-or-later.
 */

import {en, type Messages} from './en.ts';

let active: Messages = en;

export const t = (key: keyof Messages): string => active[key];

export const setLocale = (bundle: Messages): void => {
  active = bundle;
};

export interface Formatters {
  number: Intl.NumberFormat; // byte diffs, counts (V3)
  reltime: Intl.RelativeTimeFormat; // relative ages (V2)
}

export const createFormatters = (locale: string): Formatters => ({
  number: new Intl.NumberFormat(locale, {signDisplay: 'always'}),
  reltime: new Intl.RelativeTimeFormat(locale, {numeric: 'auto'}),
});

// replaced by setLocale() + createFormatters() when switching locales
export const formatters: Formatters = createFormatters('en');
