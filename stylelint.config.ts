/*
 * Copyright (c) 2026 Ryan Mack. MIT License.
 */
import stylelint from 'stylelint';
import type {PostcssResult} from 'stylelint';
import type {Config} from 'stylelint';
import type {Root} from 'postcss';

const ruleName = 'local/file-header';

const messages = stylelint.utils.ruleMessages(ruleName, {
  missing: 'File must begin with copyright header.',
});

// PostCSS 8 splits comment content into three parts:
//   comment.text       = trimmed inner content (no surrounding whitespace)
//   comment.raws.left  = whitespace between /* and text
//   comment.raws.right = whitespace between text and */
// Stringifier outputs: /* + raws.left + text + raws.right + */
const COPYRIGHT_TEXT = '* Copyright (c) 2026 Ryan Mack. MIT License.';
const COPYRIGHT_LEFT = '\n ';
const COPYRIGHT_RIGHT = '\n ';

function fileHeaderRule(primary: boolean) {
  return (root: Root, result: PostcssResult): void => {
    if (!primary) {
      return;
    }

    const first = root.first;

    if (
      first?.type === 'comment' &&
      first.text === COPYRIGHT_TEXT &&
      (first.raws.left ?? ' ') === COPYRIGHT_LEFT &&
      (first.raws.right ?? ' ') === COPYRIGHT_RIGHT
    ) {
      return;
    }

    stylelint.utils.report({
      ruleName,
      result,
      node: root,
      message: messages.missing,
      fix() {
        if (first?.type === 'comment') {
          first.text = COPYRIGHT_TEXT;
          first.raws.left = COPYRIGHT_LEFT;
          first.raws.right = COPYRIGHT_RIGHT;
        } else {
          root.prepend(`/*${COPYRIGHT_LEFT}${COPYRIGHT_TEXT}${COPYRIGHT_RIGHT}*/`);
        }
      },
    });
  };
}

fileHeaderRule.ruleName = ruleName;
fileHeaderRule.messages = messages;
fileHeaderRule.meta = {fixable: true, url: ''};

const fileHeader = stylelint.createPlugin(
  ruleName,
  fileHeaderRule as Parameters<typeof stylelint.createPlugin>[1],
);

const config: Config = {
  plugins: [fileHeader],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-recess-order',
  ],
  rules: {
    'local/file-header': true,

    // stylelint-config-standard enforces kebab-case -- CSS Modules uses camelCase
    'selector-class-pattern': null,

    // grid-template shorthand is cryptic for multi-area layouts
    // Explicit grid-template-rows/columns/areas is clearer and easier to diff
    'declaration-block-no-redundant-longhand-properties': null,

    // String notation (@import 'foo') is standard for CSS @imports
    'import-notation': 'string',
  },
};

export default config;
