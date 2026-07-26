import js from '@eslint/js';
import globals from 'globals';

import tseslint from 'typescript-eslint';

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'dist',
      'node_modules',
      'vite.config.ts',
      'src/vite-env.d.ts',
      'cypress',
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
      '@typescript-eslint': tseslint.plugin,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      /*
       * JavaScript
       */
      'prefer-const': 'error',
      curly: ['error', 'all'],
      'max-len': [
        'error',
        {
          ignoreComments: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'no-console': 'error',
      'brace-style': ['error', '1tbs'],
      'arrow-body-style': 'off',
      'arrow-parens': 'off',
      'no-param-reassign': ['error', { props: true }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
      ],

      /*
       * React
       */
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/destructuring-assignment': 'off',
      'react/jsx-props-no-spreading': 'off',

      /*
       * React Hooks
       */
      ...reactHooks.configs.recommended.rules,

      /*
       * React Refresh
       */
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],

      /*
       * TypeScript
       */
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      /*
       * Prettier
       */
      'prettier/prettier': 'error',
    },
  },

  prettierConfig,
];
