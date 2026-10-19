export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: [
    '**/node_modules/**',
    'dist/**',
    'adminBase/**',
    'dist-ssr/**',
    'framework/**',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    'public/pdfjs/**',
    '.pnpm-store/**',
    '**/*.min.css',
  ],
  overrides: [
    {
      files: ['src/index.css'],
      // Tailwind 编译器使用字符串形式解析包导入。
      rules: { 'import-notation': 'string' },
    },
    {
      files: ['**/*.less'],
      extends: ['stylelint-config-standard-less'],
      customSyntax: 'postcss-less',
      rules: { 'media-feature-range-notation': 'prefix' },
    },
  ],
  rules: {
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': true,
    'declaration-block-no-duplicate-properties': [
      true,
      { ignore: ['consecutive-duplicates-with-different-syntaxes'] },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'theme',
          'utility',
          'variant',
          'custom-variant',
          'source',
          'apply',
          'reference',
          'config',
          'plugin',
        ],
      },
    ],
  },
};
