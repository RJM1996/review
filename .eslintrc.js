module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    amd: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 1
  }
}
