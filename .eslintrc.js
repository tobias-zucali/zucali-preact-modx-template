module.exports = ({
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  plugins: [
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-unused-vars': [
      "off",
      { "varsIgnorePattern": "h" }
    ],
    'arrow-parens': [
      'error',
      'always',
    ],
    'arrow-body-style': [
      'error',
      'as-needed',
    ],
    'class-methods-use-this': 'off',
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'function-paren-newline': 'off',
    'import/imports-first': 'off',
    'import/newline-after-import': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unresolved': 'error',
    'import/no-webpack-loader-syntax': 'off',
    'import/prefer-default-export': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'lines-between-class-members': ['error', 'always', {
      exceptAfterSingleLine: true,
    }],
    'max-len': 'off',
    'newline-per-chained-call': 'off',
    'no-confusing-arrow': 'off',
    'no-console': 'warn',
    'no-else-return': 'off',
    'no-use-before-define': 'off',
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true, consistent: true, minProperties: 4 },
      ObjectPattern: { multiline: true, consistent: true, minProperties: 4 },
      ImportDeclaration: { multiline: true, consistent: true, minProperties: 7 },
      ExportDeclaration: { multiline: true, consistent: true, minProperties: 7 },
    }],
    'operator-linebreak': ['error', 'before'],
    'prefer-template': 'error',
    'require-yield': 'off',
    semi: [
      'error',
      'never',
    ],
    'no-unexpected-multiline': 'error',
  },
})
