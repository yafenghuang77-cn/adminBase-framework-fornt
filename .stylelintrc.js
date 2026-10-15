const tailwindAtRules = [
  'theme',
  'utility',
  'variant',
  'custom-variant',
  'source',
  'apply',
  'reference',
  'config',
  'plugin',
];

export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: [
    '**/node_modules/**',
    'dist/**',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    '.pnpm-store/**',
    '.rsbuild/**',
    '.rspack-profile-*/**',
    '.agents/**',
    '.codex/**',
    'public/pdfjs/**',
    '**/*.min.css',
  ],
  overrides: [
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
    // Tailwind CSS 使用字符串导入和自定义指令。
    'import-notation': 'string',
    'at-rule-no-unknown': [true, { ignoreAtRules: tailwindAtRules }],
    'at-rule-prelude-no-invalid': [true, { ignoreAtRules: tailwindAtRules }],
    'function-no-unknown': [true, { ignoreFunctions: ['theme', 'screen', /^--/] }],
    'declaration-property-value-no-unknown': [
      true,
      { ignoreProperties: { '/.*/': [/--[\w-]+\(/, /\b(?:theme|screen)\(/] } },
    ],
  },
};
