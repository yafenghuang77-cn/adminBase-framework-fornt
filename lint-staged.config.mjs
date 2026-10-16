export default {
  '*.{js,jsx,ts,tsx,cjs,mjs,cts,mts}': [
    'eslint --fix --max-warnings=0 --no-warn-ignored --no-error-on-unmatched-pattern',
    'prettier --write --ignore-unknown',
  ],
  '*.{css,less}': [
    'stylelint --fix --max-warnings=0 --allow-empty-input',
    'prettier --write --ignore-unknown',
  ],
  '*.{json,jsonc,json5,md,mdx,yaml,yml,html}': 'prettier --write --ignore-unknown',
};
