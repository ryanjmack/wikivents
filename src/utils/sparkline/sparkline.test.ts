/*
 * Copyright (c) 2026 Ryan Mack. GPL-3.0-or-later.
 */
import {describe, expect, it} from 'vitest';

import {toPoints} from './sparkline.ts';

describe('toPoints', () => {
  it('maps values to canvas coordinates', () => {
    const pts = toPoints([0, 50, 100], 200, 100);

    expect(pts[0]).toEqual({x: 0, y: 100});
    expect(pts[1]).toEqual({x: 100, y: 50});
    expect(pts[2]).toEqual({x: 200, y: 0});
  });

  it('scales relative to max', () => {
    const pts = toPoints([50, 100], 100, 100);

    expect(pts[0]?.y).toBe(50);
    expect(pts[1]?.y).toBe(0);
  });

  it('single point maps to top-left (sole value === max, so y = h - h = 0; canvas y=0 is top)', () => {
    const pts = toPoints([42], 100, 100);

    expect(pts[0]).toEqual({x: 0, y: 0});
  });
});
