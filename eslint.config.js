import eslint from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    // extends: [
    //   'airbnb',
    //   'airbnb/hooks',
    // ],
    ignores: ['dist', '.eslintrc.cjs'],
    plugins: {
      react,
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/button-has-type': 'off',
      'react/no-danger': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
];
