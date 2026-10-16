import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

const sourceFiles = ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'];
const typescriptFiles = ['**/*.{ts,tsx,cts,mts}'];

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.umi*/**',
      'dist/**',
      'dist-ssr/**',
      'framework/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      'public/pdfjs/**',
      '.husky/_/**',
      '.pnpm-store/**',
      '.swc/**',
      '.turbopack/**',
      '.tanstack/**',
      '**/*.min.js',
    ],
  },
  {
    files: sourceFiles,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        ...globals.es2022,
        ...globals.es2023,
      },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...js.configs.recommended.rules,
      // Preserve the independent rules previously inherited from Umi's preset.
      'array-callback-return': 'error',
      'guard-for-in': 'error',
      'no-eval': 'error',
      'no-global-assign': 'error',
      'no-inner-declarations': ['error', 'functions', { blockScopedFunctions: 'disallow' }],
      'no-constant-condition': ['error', { checkLoops: true }],
      'no-param-reassign': 'error',
      'no-promise-executor-return': 'error',
      'no-self-compare': 'error',
      'react/button-has-type': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-string-refs': 'error',
      'react/no-render-return-value': 'error',
      'react/no-unescaped-entities': 'error',
      'react/no-unknown-property': 'error',
      'react/require-render-return': 'error',
      'react-hooks/rules-of-hooks': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-debugger': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^react(?:$|/)', '^react-dom(?:$|/)'],
            ['^@?\\w'],
            ['^@/'],
            ['^\\.'],
            ['^.+\\u0000$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: typescriptFiles,
    languageOptions: { parser: tsParser },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs['eslint-recommended'].overrides[0].rules,
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': 'error',
      'no-loop-func': 'off',
      '@typescript-eslint/no-loop-func': 'error',
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      'no-invalid-this': 'error',
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { 'jsx-a11y': jsxA11y },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...jsxA11y.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/jsx-key': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/self-closing-comp': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    files: [
      'tests/setup.{ts,tsx,js,jsx}',
      'tests/unit/**/*.{ts,tsx,js,jsx}',
      'src/**/*.{test,spec}.{ts,tsx,js,jsx}',
      '**/*.test.{ts,tsx,js,jsx}',
    ],
    languageOptions: { globals: globals.jest },
    plugins: { jest },
    rules: jest.configs.recommended.rules,
  },
  {
    files: ['**/*.{cjs,cts}'],
    languageOptions: { sourceType: 'commonjs' },
  },
  prettier,
  {
    files: sourceFiles,
    // The old project explicitly required braces, including after the Prettier preset.
    rules: { curly: ['error', 'all'] },
  },
];
