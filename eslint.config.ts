import eslint from '@eslint/js';
import jsoncPlugin from 'eslint-plugin-jsonc';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import {defineConfig} from 'eslint/config';

export default defineConfig(
  {
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  prettier,
  {
    // rules that must survive prettier's overrides
    files: ['**/*.ts'],
    rules: {
      curly: ['error', 'all'],
    },
  },
  ...jsoncPlugin.configs['flat/base'],
  {
    files: ['package.json'],
    rules: {
      'jsonc/sort-keys': [
        'error',
        {
          pathPattern: '^(scripts|dependencies|devDependencies|peerDependencies|optionalDependencies)$',
          order: {type: 'asc'},
        },
      ],
    },
  },
  {
    ignores: ['dist/'],
  },
);
