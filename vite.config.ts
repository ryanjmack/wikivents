/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
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
