module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
    amd: true,
  },
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
    },
  ],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 1,
    'no-console': 0,
  },
}
