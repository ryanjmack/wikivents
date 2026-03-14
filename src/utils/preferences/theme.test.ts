/*
 * Copyright (c) 2026 Ryan Mack. GPL-3.0-or-later.
 */

/**
 * @vitest-environment jsdom
 */

import {afterEach, beforeEach, describe, expect, it} from 'vitest';

import {applyScheme, applyTheme, initColorScheme, initTheme, isTheme, THEMES} from './theme.ts';

describe('isTheme', () => {
  it('accepts all valid themes', () => {
    for (const t of THEMES) {
      expect(isTheme(t)).toBe(true);
    }
  });

  it('rejects null', () => {
    expect(isTheme(null)).toBe(false);
  });

  it('rejects unknown string', () => {
    expect(isTheme('solarized')).toBe(false);
  });
});

describe('applyTheme', () => {
  afterEach(() => {
    delete document.documentElement.dataset['theme'];
    document.body.innerHTML = '';
  });

  it('sets data-theme on documentElement', () => {
    applyTheme('dracula');
    expect(document.documentElement.dataset['theme']).toBe('dracula');
  });

  it('overwrites a previously applied theme', () => {
    applyTheme('dracula');
    applyTheme('matrix');
    expect(document.documentElement.dataset['theme']).toBe('matrix');
  });

  it('updates theme-select value', () => {
    document.body.innerHTML = `
      <select id="theme-select">
        <option value="dracula"></option>
        <option value="alucard"></option>
      </select>
    `;
    applyTheme('alucard');
    expect((document.getElementById('theme-select') as HTMLSelectElement).value).toBe('alucard');
  });

  it('does not throw when theme-select is absent', () => {
    expect(() => {
      applyTheme('matrix');
    }).not.toThrow();
  });
});

describe('applyScheme', () => {
  function makeSchemeDOM(currentTheme = 'dracula'): void {
    document.body.innerHTML = `
      <button id="scheme-light" aria-pressed="false"></button>
      <button id="scheme-dark" aria-pressed="true"></button>
      <select id="theme-select">
        <option value="dracula"></option>
        <option value="alucard"></option>
        <option value="matrix"></option>
        <option value="matrix-light"></option>
      </select>
    `;
    document.documentElement.dataset['theme'] = currentTheme;
  }

  afterEach(() => {
    delete document.documentElement.dataset['theme'];
    document.body.innerHTML = '';
    localStorage.clear();
  });

  it('sets scheme-light aria-pressed=true for light', () => {
    makeSchemeDOM();
    applyScheme('light');
    expect(document.getElementById('scheme-light')?.getAttribute('aria-pressed')).toBe('true');
    expect(document.getElementById('scheme-dark')?.getAttribute('aria-pressed')).toBe('false');
  });

  it('sets scheme-dark aria-pressed=true for dark', () => {
    makeSchemeDOM('alucard');
    applyScheme('dark');
    expect(document.getElementById('scheme-dark')?.getAttribute('aria-pressed')).toBe('true');
    expect(document.getElementById('scheme-light')?.getAttribute('aria-pressed')).toBe('false');
  });

  it('switches to paired theme when switching scheme', () => {
    makeSchemeDOM('dracula');
    applyScheme('light');
    expect(document.documentElement.dataset['theme']).toBe('alucard');
  });

  it('switches to paired theme going dark to light', () => {
    makeSchemeDOM('matrix');
    applyScheme('light');
    expect(document.documentElement.dataset['theme']).toBe('matrix-light');
  });

  it('does not switch theme when scheme already matches', () => {
    makeSchemeDOM('dracula'); // dracula is dark
    applyScheme('dark');
    expect(document.documentElement.dataset['theme']).toBe('dracula');
  });

  it('hides options that do not match the scheme', () => {
    makeSchemeDOM('dracula');
    applyScheme('light');
    const select = document.getElementById('theme-select') as HTMLSelectElement;
    const opt = (v: string) => Array.from(select.options).find((o) => o.value === v);
    expect(opt('dracula')?.hidden).toBe(true);
    expect(opt('alucard')?.hidden).toBe(false);
    expect(opt('matrix')?.hidden).toBe(true);
    expect(opt('matrix-light')?.hidden).toBe(false);
  });
});

describe('initTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset['theme'];
    document.body.innerHTML = `
      <select id="theme-select">
        <option value="dracula" selected></option>
        <option value="alucard"></option>
        <option value="matrix"></option>
      </select>
      <button id="scheme-light" aria-pressed="false"></button>
      <button id="scheme-dark" aria-pressed="false"></button>
    `;
  });

  afterEach(() => {
    delete document.documentElement.dataset['theme'];
    document.body.innerHTML = '';
    localStorage.clear();
  });

  it('defaults to dracula with no stored preference', () => {
    initTheme();
    expect(document.documentElement.dataset['theme']).toBe('dracula');
  });

  it('restores stored theme', () => {
    localStorage.setItem('wikivents:theme', 'matrix');
    initTheme();
    expect(document.documentElement.dataset['theme']).toBe('matrix');
  });

  it('ignores invalid stored value and defaults to dracula', () => {
    localStorage.setItem('wikivents:theme', 'solarized');
    initTheme();
    expect(document.documentElement.dataset['theme']).toBe('dracula');
  });

  it('select change applies and stores new theme', () => {
    initTheme();
    const select = document.getElementById('theme-select') as HTMLSelectElement;
    select.value = 'alucard';
    select.dispatchEvent(new Event('change', {bubbles: true}));
    expect(document.documentElement.dataset['theme']).toBe('alucard');
    expect(localStorage.getItem('wikivents:theme')).toBe('alucard');
  });
});

describe('initColorScheme', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="scheme-light" aria-pressed="false"></button>
      <button id="scheme-dark" aria-pressed="false"></button>
      <select id="theme-select">
        <option value="dracula"></option>
        <option value="alucard"></option>
      </select>
    `;
    document.documentElement.dataset['theme'] = 'dracula';
  });

  afterEach(() => {
    delete document.documentElement.dataset['theme'];
    document.body.innerHTML = '';
    localStorage.clear();
  });

  it('scheme-light click switches to a light theme', () => {
    initColorScheme();
    document.getElementById('scheme-light')?.click();
    expect(document.documentElement.dataset['theme']).toBe('alucard');
  });

  it('scheme-dark click keeps dark theme when already dark', () => {
    initColorScheme();
    document.getElementById('scheme-dark')?.click();
    expect(document.documentElement.dataset['theme']).toBe('dracula');
  });
});
