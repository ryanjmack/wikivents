/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */

import {describe, expect, it} from 'vitest';

import {isTheme, THEMES} from './theme.ts';

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
