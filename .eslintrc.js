const prettierConfig = require('./.prettierrc.js');

module.exports = {
  extends: ['@rocketseat/eslint-config/node'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'no-useless-constructor': 'off',
    'no-eval': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        ...prettierConfig,
        semi: true,
        endOfLine: 'auto',
      },
    ],
  },
};
