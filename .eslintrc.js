module.exports = {
  env: {
    node: true,
  },
  extends: [
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'vue/first-attribute-linebreak': 'off',
    'vue/no-reserved-props': 'off'
  }
}
