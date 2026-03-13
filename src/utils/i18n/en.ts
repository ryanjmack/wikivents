/*
 * Copyright (c) 2026 Ryan Mack. GPL-3.0-or-later.
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
  langSelectLabel: 'Language',
  // feed
  filterPlaceholder: 'type + enter...',
  filterAriaLabel: 'Filter events',
  colTitle: 'Title',
  colUser: 'User',
  colBot: 'Bot',
  colType: 'Type',
  colChange: 'Change',
  colTime: 'Time',
  // inspector
  sectionInspector: 'Inspector',
  // details
  sectionDetails: 'Details',
  detailTitle: 'Title',
  detailUser: 'User',
  detailType: 'Type',
  detailChange: 'Change',
  detailTime: 'Time',
  detailSummary: 'Summary',
  detailMinorEdit: 'Minor edit',
  detailPatrolled: 'Patrolled',
  detailWiki: 'Wiki',
  detailNamespace: 'Namespace',
  detailRevision: 'Revision',
  detailDiff: 'Diff',
  detailDomain: 'Domain',
  detailPageUrl: 'Page URL',
  detailSize: 'Size',
  detailSchema: 'Schema',
  detailEventId: 'Event ID',
  detailStream: 'Stream',
  detailTopic: 'Topic',
  detailPartition: 'Partition',
  detailOffset: 'Offset',
  detailOpenDiff: 'open diff ↗',
  // values
  valYes: 'yes',
  valNo: 'no',
  typeEdit: 'edit',
  typeNew: 'new',
  typeLog: 'log',
  typeCategorize: 'categorize',
  // hot pages
  sectionHotpages: 'Hot pages (60s)',
  sectionHotusers: 'Hot users (60s)',
  sectionLargestDeltas: 'Largest deltas',
  sectionHotTypes: 'Hot types (60s)',
  sectionHotLogActions: 'Hot log actions (60s)',
  // hud
  hudFps: 'FPS',
  hudLongtasks: 'longtasks',
  hudQueue: 'queue',
  hudDropped: 'dropped',
} as const;

// keys derived from en; values typed as string so other locales can use any string
export type Messages = Record<keyof typeof en, string>;
