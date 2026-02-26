import '../styles/globals.css';
import styles from './app.module.css';
import {formatTime} from '../utils/formatTime.ts';

const timeEl = document.getElementById('time');

if (!timeEl) {
  throw new Error('#time not found');
}

const time: HTMLElement = timeEl;

time.className = styles['time'] ?? '';

function tick(): void {
  time.textContent = formatTime(new Date());
}

tick();
setInterval(tick, 1000);
