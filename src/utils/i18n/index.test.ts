/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */

import {afterEach, describe, expect, it} from 'vitest';

import {en} from './en.ts';
import {es} from './es.ts';
import {createFormatters, formatters, setLocale, t} from './index.ts';

afterEach(() => {
  setLocale(en);
});

describe('t', () => {
  it('returns English string by default', () => {
    expect(t('pause')).toBe('Pause');
    expect(t('epsLabel')).toBe('events/sec');
  });

  it('returns translated string after setLocale', () => {
    setLocale(es);
    expect(t('pause')).toBe('Pausar');
    expect(t('epsLabel')).toBe('eventos/seg');
  });

  it('switching back to en restores English', () => {
    setLocale(es);
    setLocale(en);
    expect(t('pause')).toBe('Pause');
  });
});

describe('createFormatters', () => {
  it('returns Intl.NumberFormat and Intl.RelativeTimeFormat instances', () => {
    const f = createFormatters('en');
    expect(f.number).toBeInstanceOf(Intl.NumberFormat);
    expect(f.reltime).toBeInstanceOf(Intl.RelativeTimeFormat);
  });

  it('number formatter always shows sign', () => {
    const f = createFormatters('en');
    expect(f.number.format(42)).toBe('+42');
    expect(f.number.format(-5)).toBe('-5');
    expect(f.number.format(0)).toBe('+0');
  });

  it('reltime formatter uses auto numeric', () => {
    const f = createFormatters('en');
    expect(f.reltime.format(-1, 'day')).toBe('yesterday');
    expect(f.reltime.format(0, 'day')).toBe('today');
  });

  it('accepts es-419 locale without throwing', () => {
    expect(() => createFormatters('es-419')).not.toThrow();
    const f = createFormatters('es-419');
    expect(f.number).toBeInstanceOf(Intl.NumberFormat);
    expect(f.reltime).toBeInstanceOf(Intl.RelativeTimeFormat);
  });
});

describe('formatters', () => {
  it('is initialized with en number formatting', () => {
    expect(formatters.number.format(1)).toBe('+1');
  });

  it('can be mutated via Object.assign to switch locale', () => {
    Object.assign(formatters, createFormatters('es-419'));
    expect(formatters.number).toBeInstanceOf(Intl.NumberFormat);
    // reset
    Object.assign(formatters, createFormatters('en'));
  });
});
