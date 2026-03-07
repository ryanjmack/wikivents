/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */
import type {UserConfig} from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'perf', 'chore', 'refactor', 'docs', 'test']],
    'scope-empty': [2, 'always'],
  },
};

export default config;
