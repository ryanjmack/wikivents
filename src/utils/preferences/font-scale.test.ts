/*
 * Copyright (c) 2026 Ryan Mack. GPL-3.0-or-later.
 */

/**
 * @vitest-environment jsdom
 */

import {afterEach, beforeEach, describe, expect, it} from 'vitest';

import {applyScale, initFontScale, isScale, SCALES} from './font-scale.ts';

describe('isScale', () => {
  it('accepts all valid scales', () => {
    for (const s of SCALES) {
      expect(isScale(s)).toBe(true);
    }
  });

  it('rejects null', () => {
    expect(isScale(null)).toBe(false);
  });

  it('rejects unknown string', () => {
    expect(isScale('xl')).toBe(false);
  });
});

describe('applyScale', () => {
  afterEach(() => {
    delete document.documentElement.dataset['fontScale'];
    document.body.innerHTML = '';
  });

  it('sets data-font-scale for sm', () => {
    applyScale('sm');
    expect(document.documentElement.dataset['fontScale']).toBe('sm');
  });

  it('sets data-font-scale for lg', () => {
    applyScale('lg');
    expect(document.documentElement.dataset['fontScale']).toBe('lg');
  });

  it('removes data-font-scale for md', () => {
    document.documentElement.dataset['fontScale'] = 'sm';
    applyScale('md');
    expect(document.documentElement.dataset['fontScale']).toBeUndefined();
  });

  it('updates aria-pressed on all scale buttons', () => {
    document.body.innerHTML = `
      <button id="font-scale-sm" aria-pressed="false"></button>
      <button id="font-scale-md" aria-pressed="true"></button>
      <button id="font-scale-lg" aria-pressed="false"></button>
    `;
    applyScale('sm');
    expect(document.getElementById('font-scale-sm')?.getAttribute('aria-pressed')).toBe('true');
    expect(document.getElementById('font-scale-md')?.getAttribute('aria-pressed')).toBe('false');
    expect(document.getElementById('font-scale-lg')?.getAttribute('aria-pressed')).toBe('false');
  });

  it('does not throw when buttons are absent', () => {
    expect(() => {
      applyScale('lg');
    }).not.toThrow();
  });
});

describe('initFontScale', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset['fontScale'];
    document.body.innerHTML = `
      <button id="font-scale-sm"></button>
      <button id="font-scale-md"></button>
      <button id="font-scale-lg"></button>
    `;
  });

  afterEach(() => {
    delete document.documentElement.dataset['fontScale'];
    document.body.innerHTML = '';
    localStorage.clear();
  });

  it('defaults to md when no stored preference', () => {
    initFontScale();
    expect(document.documentElement.dataset['fontScale']).toBeUndefined();
  });

  it('restores stored scale', () => {
    localStorage.setItem('wikivents:font-scale', 'lg');
    initFontScale();
    expect(document.documentElement.dataset['fontScale']).toBe('lg');
  });

  it('ignores invalid stored value and defaults to md', () => {
    localStorage.setItem('wikivents:font-scale', 'xl');
    initFontScale();
    expect(document.documentElement.dataset['fontScale']).toBeUndefined();
  });

  it('click applies scale and writes localStorage', () => {
    initFontScale();
    document.getElementById('font-scale-lg')?.click();
    expect(document.documentElement.dataset['fontScale']).toBe('lg');
    expect(localStorage.getItem('wikivents:font-scale')).toBe('lg');
  });

  it('click on md removes data-font-scale', () => {
    localStorage.setItem('wikivents:font-scale', 'sm');
    initFontScale();
    document.getElementById('font-scale-md')?.click();
    expect(document.documentElement.dataset['fontScale']).toBeUndefined();
    expect(localStorage.getItem('wikivents:font-scale')).toBe('md');
  });
});
