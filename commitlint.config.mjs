export default {
  defaultIgnores: false,
  parserPreset: {
    parserOpts: {
      // Umi's default types and message pattern, expressed through Commitlint's
      // built-in parser. Preserve its case-insensitive matching and merge headers.
      headerPattern:
        /^\s*((?:feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release|dep|deps|example|examples|merge|revert)(?:\(.+\))?:|Merge|Revert|Version) (.{1,50})/i,
      headerCorrespondence: ['type', 'subject'],
      commentChar: '#',
    },
  },
  rules: {
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
};
