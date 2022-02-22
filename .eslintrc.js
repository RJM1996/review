module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
    amd: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 1,
    'no-console': 0
  }
}
