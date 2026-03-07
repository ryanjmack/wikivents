/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */

export function toPoints(data: number[], w: number, h: number): {x: number; y: number}[] {
  const max = Math.max(...data);
  const step = data.length > 1 ? w / (data.length - 1) : 0;

  return data.map((v, i) => ({
    x: i * step,
    y: h - (v / max) * h,
  }));
}

export function drawSparkline(
  ctx: CanvasRenderingContext2D,
  data: number[] = makeDemoData(),
): void {
  const {canvas} = ctx;
  const {width: w, height: h} = canvas;
  const style = getComputedStyle(canvas);

  ctx.clearRect(0, 0, w, h);

  const points = toPoints(data, w, h);

  ctx.beginPath();

  points.forEach(({x, y}, i) => {
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.strokeStyle = style.getPropertyValue('--color-sparkline').trim();
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function makeDemoData(): number[] {
  return Array.from({length: 60}, (_, i) => {
    if (i >= 31 && i <= 40) {
      return 200 + Math.random() * 300;
    }

    if (i > 40 && i <= 50) {
      return 800 + Math.random() * 400;
    }

    return 50 + Math.random() * 100;
  });
}
