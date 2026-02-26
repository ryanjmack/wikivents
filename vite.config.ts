import {defineConfig} from 'vitest/config';

export default defineConfig({
  css: {
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
