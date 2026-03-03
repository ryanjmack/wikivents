/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */

export const en = {
  // header
  epsLabel: 'events/sec',
  connectionConnected: 'connected',
  connectionDisconnected: 'disconnected',
  pause: 'Pause',
  resume: 'Resume',
  fontSizeGroupLabel: 'Font size',
  fontSizeSmall: 'Small font',
  fontSizeMedium: 'Medium font',
  fontSizeLarge: 'Large font',
  themeSelectLabel: 'Theme',
  // feed
  filterPlaceholder: 'type + enter...',
  filterAriaLabel: 'Filter events',
  colTitle: 'Title',
  colUser: 'User',
  colBot: 'Bot',
  colType: 'Type',
  colChange: 'Change',
  colTime: 'Time',
  // details
  sectionDetails: 'Details',
  detailTitle: 'Title',
  detailUser: 'User',
  detailType: 'Type',
  detailChange: 'Change',
  detailTime: 'Time',
  detailSummary: 'Summary',
  // hot pages
  sectionHotpages: 'Hot pages (60s)',
  // hud
  hudFps: 'FPS',
  hudLongtasks: 'longtasks',
  hudQueue: 'queue',
  hudDropped: 'dropped',
} as const;

// keys derived from en; values typed as string so other locales can use any string
export type Messages = Record<keyof typeof en, string>;
