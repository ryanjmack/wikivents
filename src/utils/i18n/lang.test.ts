/*
 * Copyright (c) 2026 Ryan Mack. GPL-3.0-or-later.
 */

/**
 * @vitest-environment jsdom
 */

import {beforeEach, describe, expect, it} from 'vitest';

import {en} from './en.ts';
import {createFormatters, formatters, setLocale, t} from './index.ts';
import {initLang} from './lang.ts';

function makeLangSelect(): HTMLSelectElement {
  document.body.innerHTML = `
    <select id="lang-select">
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  `;
  return document.getElementById('lang-select') as HTMLSelectElement;
}

beforeEach(() => {
  setLocale(en);
  Object.assign(formatters, createFormatters('en'));
  localStorage.clear();
  document.body.innerHTML = '';
});

describe('initLang', () => {
  it('defaults to en with no stored preference', () => {
    makeLangSelect();
    initLang();
    expect(t('pause')).toBe('Pause');
    expect(localStorage.getItem('wikivents:lang')).toBe('en');
  });

  it('restores Spanish from localStorage', () => {
    localStorage.setItem('wikivents:lang', 'es');
    makeLangSelect();
    initLang();
    expect(t('pause')).toBe('Pausar');
    expect(t('epsLabel')).toBe('eventos/seg');
  });

  it('sets select value to match stored lang', () => {
    localStorage.setItem('wikivents:lang', 'es');
    const select = makeLangSelect();
    initLang();
    expect(select.value).toBe('es');
  });

  it('unknown lang code falls back to en bundle', () => {
    localStorage.setItem('wikivents:lang', 'fr');
    makeLangSelect();
    initLang();
    expect(t('pause')).toBe('Pause');
  });

  it('updates locale and localStorage when select changes', () => {
    const select = makeLangSelect();
    initLang();
    select.value = 'es';
    select.dispatchEvent(new Event('change'));
    expect(t('pause')).toBe('Pausar');
    expect(localStorage.getItem('wikivents:lang')).toBe('es');
  });

  it('updates select value when select changes', () => {
    const select = makeLangSelect();
    initLang();
    select.value = 'es';
    select.dispatchEvent(new Event('change'));
    expect(select.value).toBe('es');
  });

  it('updates Intl formatters when locale changes', () => {
    const select = makeLangSelect();
    initLang();
    select.value = 'es';
    select.dispatchEvent(new Event('change'));
    expect(formatters.number).toBeInstanceOf(Intl.NumberFormat);
    expect(formatters.reltime).toBeInstanceOf(Intl.RelativeTimeFormat);
  });

  it('does not throw when lang-select is absent', () => {
    expect(() => {
      initLang();
    }).not.toThrow();
    expect(t('pause')).toBe('Pause');
  });

  it('switching back to en restores English', () => {
    const select = makeLangSelect();
    localStorage.setItem('wikivents:lang', 'es');
    initLang();
    expect(t('pause')).toBe('Pausar');
    select.value = 'en';
    select.dispatchEvent(new Event('change'));
    expect(t('pause')).toBe('Pause');
    expect(localStorage.getItem('wikivents:lang')).toBe('en');
  });
});
