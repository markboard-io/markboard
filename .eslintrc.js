module.exports = {
  globals: {
    Package: 'readonly',
    MultiFileCachingCompiler: 'readonly',
    Npm: 'readonly'
  },
  ignorePatterns: ['packages/meteor-files/*.js'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['ObjectExpression']
      }
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unnecessary-type-constraint': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    'no-misleading-character-class': ['off'],
    '@typescript-eslint/no-unused-vars': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/no-extra-semi': ['off'],
    'react/prop-types': ['off'],
    'react/no-unescaped-entities': ['off'],
    'react/jsx-no-target-blank': ['off'],
    'prefer-const': ['off'],
    'no-async-promise-executor': ['off'],
    'no-prototype-builtins': ['off'],
    '@typescript-eslint/ban-types': ['off'],
    'no-case-declarations': ['off'],
    'no-empty': ['off'],
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-useless-catch': ['off'],
    'react/display-name': ['off'],
    'no-debugger': ['off'],
    '@typescript-eslint/no-namespace': ['off']
  }
}
