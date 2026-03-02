/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */
import '../styles/globals.css';
import {initFontScale} from '../utils/preferences/font-scale.ts';
import {drawSparkline} from '../utils/sparkline/sparkline.ts';

const canvas = document.getElementById('sparkline') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (!ctx) {
  throw new Error('canvas 2d context unavailable');
}

// TS doesn't carry narrowing into closures -- rebind so closures see non-nullable types.
const renderCtx = ctx;

function resizeAndDraw(): void {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  drawSparkline(renderCtx);
}

new ResizeObserver(resizeAndDraw).observe(canvas);

initFontScale();
