module.exports = {
  root: true,
  extends: ['@react-native-community'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],

  env: {
    jest: true,
  },

  rules: {
    'max-len': [1, 160, 4],
    'eslint-comments/no-unlimited-disable': 0,
  },
};
