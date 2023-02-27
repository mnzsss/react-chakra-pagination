module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'react-app',
    'react-app/jest',
    'plugin:jsx-a11y/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'eslint-plugin-import-helpers',
    'prettier',
    'unused-imports',
    'react-hooks',
    'jsx-a11y',
  ],
  rules: {
    'global-require': 0,
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'no-func-assign': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'warn',
    camelcase: 'off',
    'import/no-unresolved': 'error',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'all',
        argsIgnorePattern: '^_',
      },
    ],
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useMyCustomHook|useMyOtherCustomHook)',
      },
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/hooks/',
          '/components/',
          ['parent', 'sibling', 'index'],
          '/texts/',
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'no-use-before-define': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'react/no-unknown-property': ['error', { ignore: ['jsx'] }],
    'no-plusplus': 'off',
    'import/no-anonymous-default-export': 'off',
    'react/no-array-index-key': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/tabindex-no-positive': 'warn',
    'react/require-default-props': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    // [Deprecated] no-onchange (https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-onchange.md)
    'jsx-a11y/no-onchange': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/no-unused-prop-types': 'warn',
    'consistent-return': 'off',
    'no-continue': 'off',
    'no-new': 'off',
    'guard-for-in': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
};
