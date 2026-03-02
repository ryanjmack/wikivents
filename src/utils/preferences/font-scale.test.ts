/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */

import {describe, expect, it} from 'vitest';

import {isScale, SCALES} from './font-scale.ts';

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
