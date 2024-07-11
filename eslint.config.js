import eslint from '@eslint/js';
import tsEslintParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    // extends: [
    //   'airbnb',
    //   'airbnb/hooks',
    // ],
    ignores: ['dist', '.eslintrc.cjs'],
    plugins: { react },
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/button-has-type': 'off',
      'react/no-danger': 'off',
      'no-use-before-define': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/ban-types': 'off',
    },
  },
];
