import {describe, expect, it} from 'vitest';
import {formatTime} from './formatTime.ts';

describe('formatTime', () => {
  it('formats midnight', () => {
    expect(formatTime(new Date(2024, 0, 1, 0, 0, 0))).toMatch(/^00:00:00 \(.+\)$/);
  });
  it('formats afternoon', () => {
    expect(formatTime(new Date(2024, 0, 1, 14, 30, 45))).toMatch(/^14:30:45 \(.+\)$/);
  });
  it('pads single digits', () => {
    expect(formatTime(new Date(2024, 0, 1, 9, 5, 3))).toMatch(/^09:05:03 \(.+\)$/);
  });
});
