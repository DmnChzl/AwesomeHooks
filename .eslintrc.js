const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true,
    browser: true,
    jest: true
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  rules: {
    'comma-dangle': ERROR,
    'no-case-declarations': WARN,
    'no-dupe-keys': WARN,
    'no-console': OFF,
    'no-undef': WARN,
    'no-unused-vars': WARN,
    'no-mixed-spaces-and-tabs': ERROR,
    'react/prop-types': WARN,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': OFF,
    'prettier/prettier': [
      WARN,
      {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true
      }
    ]
  },
  settings: {
    react: {
      version: '16.14.0'
    }
  }
};
