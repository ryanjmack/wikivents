/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */
import '../styles/globals.css';
import {drawSparkline} from '../utils/sparkline/sparkline.ts';

const canvas = document.getElementById('sparkline') as HTMLCanvasElement;
const header = canvas.closest('header');
const ctx = canvas.getContext('2d');

if (!ctx) {
  throw new Error('canvas 2d context unavailable');
}

// defer until after first layout
requestAnimationFrame(() => {
  if (!header) {
    throw new Error('header element not found');
  }

  const headerStyle = getComputedStyle(header);
  const paddingTop = parseFloat(headerStyle.paddingTop);
  const paddingBottom = parseFloat(headerStyle.paddingBottom);
  const contentHeight = Math.round(header.clientHeight - paddingTop - paddingBottom);

  const canvasStyle = getComputedStyle(canvas);
  const paddingLeft = parseFloat(canvasStyle.paddingLeft);
  const paddingRight = parseFloat(canvasStyle.paddingRight);
  const contentWidth = Math.round(canvas.offsetWidth - paddingLeft - paddingRight);

  canvas.width = contentWidth;
  canvas.height = contentHeight;

  drawSparkline(ctx);
});
