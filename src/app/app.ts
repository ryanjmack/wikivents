/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */
import '../styles/globals.css';
import {initLang} from '../utils/i18n/lang.ts';
import {initFontScale} from '../utils/preferences/font-scale.ts';
import {initColorScheme, initTheme} from '../utils/preferences/theme.ts';
import {drawSparkline} from '../utils/sparkline/sparkline.ts';

const canvas = document.getElementById('sparkline') as HTMLCanvasElement;
const panel = document.getElementById('sparkline-panel');
const bar = document.getElementById('sparkline-bar');
const ctx = canvas.getContext('2d');

if (!ctx || !panel || !bar) {
  throw new Error('required elements missing');
}

// TS doesn't carry narrowing into closures -- rebind so closures see non-nullable types.
const renderCtx = ctx;
const renderPanel = panel;
const renderBar = bar;

function resizeAndDraw(entries: ResizeObserverEntry[]): void {
  const entry = entries[0];

  if (!entry) {
    return;
  }

  const gap = parseFloat(getComputedStyle(renderPanel).rowGap) || 0;
  canvas.width = Math.round(entry.contentRect.width);
  canvas.height = Math.round(entry.contentRect.height - renderBar.offsetHeight - gap);
  drawSparkline(renderCtx);
}

new ResizeObserver(resizeAndDraw).observe(renderPanel);

new MutationObserver(() => {
  drawSparkline(renderCtx);
}).observe(document.documentElement, {attributeFilter: ['data-theme']});

initLang();
initFontScale();
initTheme();
initColorScheme();
