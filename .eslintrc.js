const prettierConfig = require('./.prettierrc.js');

module.exports = {
  extends: ['@rocketseat/eslint-config/node'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'no-useless-constructor': 'off',
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
