module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: [
      'plugin:vue/essential',
      'eslint:recommended'
    ],
    parserOptions: {
      parser: 'babel-eslint'
    },
    rules: {
      'vue/multi-word-component-names': ['error', {
        'ignores': ['index', 'Ahorcado']  
      }],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    },
    overrides: [
      {
        files: ['**/*.vue'],
        rules: {
          'vue/script-setup-uses-vars': 'error'
        }
      }
    ],
    plugins: ['vue']
  };
  