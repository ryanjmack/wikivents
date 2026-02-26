import type {Config} from 'stylelint';

const config: Config = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  rules: {
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
