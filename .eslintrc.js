module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'@typescript-eslint/recommended',
		'plugin:n8n-nodes-base/community',
	],
	rules: {
		'n8n-nodes-base/node-param-default-missing': 'error',
		'n8n-nodes-base/node-param-description-missing': 'error',
		'n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options': 'error',
		'n8n-nodes-base/node-param-option-name-wrong-for-get-all': 'error',
		'n8n-nodes-base/node-param-option-name-wrong-for-upsert': 'error',
		'n8n-nodes-base/node-param-resource-without-no-data-expression': 'error',
		'n8n-nodes-base/node-param-should-not-be-in-options': 'error',
		'n8n-nodes-base/node-param-type-options-missing-from-limit': 'error',
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
	ignorePatterns: ['dist/**', 'node_modules/**'],
};