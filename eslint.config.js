import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.{ts,js,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2022,
        ...globals.jest,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
      curly: 'error',
      camelcase: 'error',
      'arrow-body-style': ['error', 'always'],
      'require-await': 'error',
      'prefer-arrow-callback': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'FunctionDeclaration',
          message:
            '"function hello() {...}" is not allowed. Please use arrow syntax instead.',
        },
      ],
    },
  },
]
