/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */

/**
 * @vitest-environment jsdom
 */

import {afterEach, beforeEach, describe, expect, it} from 'vitest';

import {en} from './en.ts';
import {es} from './es.ts';
import {setLocale} from './index.ts';
import {hydrateI18n} from './init.ts';

beforeEach(() => {
  setLocale(en);
  document.body.innerHTML = '';
});

afterEach(() => {
  setLocale(en);
});

describe('hydrateI18n', () => {
  it('sets textContent for data-i18n elements', () => {
    document.body.innerHTML = '<span data-i18n="pause">old</span>';
    hydrateI18n();
    expect(document.querySelector('span')?.textContent).toBe('Pause');
  });

  it('updates textContent when locale is Spanish', () => {
    document.body.innerHTML = '<span data-i18n="pause">old</span>';
    setLocale(es);
    hydrateI18n();
    expect(document.querySelector('span')?.textContent).toBe('Pausar');
  });

  it('sets aria-label for data-i18n-aria-label elements', () => {
    document.body.innerHTML =
      '<select data-i18n-aria-label="themeSelectLabel" aria-label="old"></select>';
    hydrateI18n();
    expect(document.querySelector('select')?.getAttribute('aria-label')).toBe('Theme');
  });

  it('sets placeholder for data-i18n-placeholder elements', () => {
    document.body.innerHTML = '<input data-i18n-placeholder="filterPlaceholder" />';
    hydrateI18n();
    expect(document.querySelector('input')?.getAttribute('placeholder')).toBe('type + enter...');
  });

  it('sets title for data-i18n-title elements', () => {
    document.body.innerHTML = '<button data-i18n-title="pause" title="old"></button>';
    hydrateI18n();
    expect(document.querySelector('button')?.getAttribute('title')).toBe('Pause');
  });

  it('silently skips unknown keys', () => {
    document.body.innerHTML = '<span data-i18n="unknownKey">original</span>';
    hydrateI18n();
    expect(document.querySelector('span')?.textContent).toBe('original');
  });

  it('updates multiple elements in one pass', () => {
    document.body.innerHTML = `
      <span data-i18n="pause">old</span>
      <span data-i18n="resume">old</span>
    `;
    setLocale(es);
    hydrateI18n();
    const spans = document.querySelectorAll('span');
    expect(spans[0]?.textContent).toBe('Pausar');
    expect(spans[1]?.textContent).toBe('Reanudar');
  });

  it('handles elements with no matching data-i18n attribute gracefully', () => {
    document.body.innerHTML = '<span>no i18n</span>';
    expect(() => {
      hydrateI18n();
    }).not.toThrow();
  });
});
