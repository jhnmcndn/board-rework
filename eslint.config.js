import pluginJs from '@eslint/js';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    // extends: [
    //   'eslint:recommended',
    //   'plugin:@typescript-eslint/recommended',
    //   'airbnb',
    //   'airbnb/hooks',
    //   'plugin:react-hooks/recommended',
    // ],
    ignores: ['dist', '.eslintrc.cjs'],
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-uses-react': 0,
      'react/react-in-jsx-scope': 0,
      'react-hooks/exhaustive-deps': 'off',
      'react/button-has-type': 'off',
      'react/no-danger': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {
    languageOptions: {
      parser: '@typescript-eslint/parser',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
];
