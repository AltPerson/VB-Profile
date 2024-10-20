module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['next/core-web-vitals', 'plugin:import/typescript'],
  plugins: ['import', '@typescript-eslint'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        destructuredArrayIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
		"no-console": ["error", { "allow": ["warn", "error"] }],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"@typescript-eslint/no-inferrable-types": "error",
		"@typescript-eslint/no-use-before-define": ["error"],
		"comma-dangle": ["error", "always-multiline"],
  },
};
