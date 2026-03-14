/*
 * Copyright (c) 2026 Ryan Mack. GPL-3.0-or-later.
 */
import {defineConfig} from 'vitest/config';

export default defineConfig({
  css: {
    transformer: 'lightningcss',
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    sourcemap: true,
  },
  test: {
    environment: 'node',
  },
});
