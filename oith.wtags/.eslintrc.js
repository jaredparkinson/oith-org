module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    eqeqeq: ['error', 'always'],
    'no-var': 'error',
    quotes: ['error', 'single'],
    'prefer-const': 'error',
    'member-ordering': [
      true,
      {
        order: [
          'public-static-field',
          'public-static-method',
          'protected-static-field',
          'protected-static-method',
          'private-static-field',
          'private-static-method',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-constructor',
          'protected-constructor',
          'private-constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
        ],
        alphabetize: true,
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
