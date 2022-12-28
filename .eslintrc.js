module.exports = {
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
  plugins: ['react', '@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unnecessary-type-constraint': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    'no-misleading-character-class': ['off'],
    '@typescript-eslint/no-unused-vars': ['off'],
    'react/prop-types': ['off'],
    'react/no-unescaped-entities': ['off'],
    'react/jsx-no-target-blank': ['off']
  }
}
