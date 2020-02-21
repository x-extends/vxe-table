module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    "plugin:vue/essential",
      "@vue/standard",
      "@vue/typescript/recommended"
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    "ecmaVersion": 2020
  }
}
