/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */
import eslint from '@eslint/js';
import jsoncPlugin from 'eslint-plugin-jsonc';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import {defineConfig} from 'eslint/config';
import type {Rule} from 'eslint';

const COPYRIGHT = '/*\n * Copyright (c) 2026 Ryan Mack. MIT License.\n */';

const fileHeader: Rule.RuleModule = {
  meta: {type: 'layout', fixable: 'code'},
  create(context) {
    return {
      Program(node) {
        const src = context.sourceCode;
        const text = src.getText();

        if (text.startsWith(COPYRIGHT)) {
          return;
        }

        const first = src.getFirstToken(node);

        if (!first) {
          return;
        }

        context.report({
          loc: {line: 1, column: 0},
          message: 'File must begin with copyright header.',
          fix(fixer) {
            const newlineIdx = text.indexOf('\n');
            const line1 = newlineIdx >= 0 ? text.slice(0, newlineIdx) : text;

            if (line1.startsWith('//')) {
              return fixer.replaceTextRange(
                [0, newlineIdx >= 0 ? newlineIdx : text.length],
                COPYRIGHT,
              );
            }

            if (line1.startsWith('/*')) {
              const closeIdx = text.indexOf('*/');
              const end = closeIdx >= 0 ? closeIdx + 2 : newlineIdx >= 0 ? newlineIdx : text.length;

              return fixer.replaceTextRange([0, end], COPYRIGHT);
            }

            return fixer.insertTextBefore(first, COPYRIGHT + '\n');
          },
        });
      },
    };
  },
};

export default defineConfig(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
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
    plugins: {local: {rules: {'file-header': fileHeader}}},
    rules: {
      'local/file-header': 'error',
      curly: ['error', 'all'],
      '@typescript-eslint/restrict-template-expressions': ['error', {allowNumber: true}],
      '@typescript-eslint/consistent-type-imports': 'error',
      'padding-line-between-statements': [
        'error',
        {blankLine: 'always', prev: '*', next: 'if'},
        {blankLine: 'always', prev: 'import', next: '*'},
        {blankLine: 'any', prev: 'import', next: 'import'},
      ],
    },
  },
  ...jsoncPlugin.configs['flat/base'],
  {
    files: ['package.json'],
    rules: {
      'jsonc/sort-keys': [
        'error',
        {
          pathPattern:
            '^(scripts|dependencies|devDependencies|peerDependencies|optionalDependencies)$',
          order: {type: 'asc'},
        },
      ],
    },
  },
  {
    ignores: ['dist/'],
  },
);
