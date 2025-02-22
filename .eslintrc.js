// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    'expo',
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  ignorePatterns: ['/dist/*', '__tests__/**/*-test.{ts,tsx}'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': 'off',
    'no-use-before-define': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'react/no-unescaped-entities': 'off',
    'react/style-prop-object': 'off',
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'react/no-unused-prop-types': 'off',
    'react/no-unstable-nested-components': 'off',
  },
};
