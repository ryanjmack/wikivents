export function formatTime(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes): string => parts.find((p) => p.type === type)?.value ?? '';

  return `${get('hour')}:${get('minute')}:${get('second')} (${get('timeZoneName')})`;
}
