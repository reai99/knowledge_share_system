module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ["plugin:vue/essential"],
  parserOptions: {
    ecmaVersion: 11,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'lines-between-class-members': 0,
    'space-before-function-paren': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'operator-linebreak': ['error', 'before'],
    semi: ['error', 'never'],
    'no-console': "off",
    'no-alert': "off",
    // "indent": ["error", "never"],
  },
}
