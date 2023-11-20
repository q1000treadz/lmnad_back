module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'promise', 'no-loops'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',

    /* common rules */
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: './',
      },
    ],

    /* prettier rules */
    'prettier/prettier': ['error', { printWidth: 80 }],

    /* error rules ts */
    // '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/camelcase': 'off',
    // '@typescript-eslint/naming-convention': [
    //   'error',
    //   {
    //     selector: 'interface',
    //     format: ['PascalCase'],
    //     custom: {
    //       regex: '^I[A-Z]',
    //       match: true,
    //     },
    //   },
    // ],

    /* error rules js */
    'no-loops/no-loops': 2,

    /* error rules node */
    'no-sync': 'error',

    /* error rules code-style */
    'no-console': 'error',
    'newline-before-return': 'error',
    'no-restricted-imports': ['error', { patterns: ['src/*'] }],
    'no-empty-function': ['error', { allow: ['constructors'] }],

    /* disabled rules */
    'import/prefer-default-export': 'off',
    'no-prototype-builtins': 'off',
    'import/no-extraneous-dependencies': 'off',
    'max-classes-per-file': 'off',
    'import/extensions': 'off',
    'no-loops/no-loops': 'off',
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-unresolved': 'off',
    'no-unused-var': 'off',
    'class-methods-use-this': 'off',
    'no-unused-vars': 'off',
    'no-useless-constructor': 'off',
    'no-shadow': 'off',
    'implicit-arrow-linebreak': 'off',
    'indent': 'off',
    'operator-linebreak': 'off',
    'brace-style': 'off',
    'object-curly-newline': 'off',
    'consistent-return': 'off',
    'no-return-await': 'off'
  },
};
