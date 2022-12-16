module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'import/extensions': 0,
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 'off',
    // "prefer-const": "error",
    'react/function-component-definition': [
      2,
      { namedComponents: 'function-declaration' },
    ],
    '@typescript-eslint/naming-convention': 0,
    'react/require-default-props': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    radix: 0,
    'no-underscore-dangle': 0,
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      { destructuredArrayIgnorePattern: '^_' },
    ],
    'react/jsx-props-no-spreading': [
      1,
      {
        html: 'ignore',
        exceptions: ['DynamicTag'],
      },
    ],
  },
};
