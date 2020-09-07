module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2015,
		sourceType: 'module',
	},
	plugins: ['ember'],
	extends: ['anfema/ember', 'eslint:recommended', 'plugin:ember/recommended'],
	env: {
		browser: true,
	},
	rules: {
		'no-console': 'off',
		'import/no-anonymous-default-export': 'off',
	},
	overrides: [
		// node files
		{
			files: [
				'.eslintrc.js',
				'.template-lintrc.js',
				'ember-cli-build.js',
				'testem.js',
				'blueprints/*/index.js',
				'config/**/*.js',
				'lib/*/index.js',
			],
			parserOptions: {
				sourceType: 'script',
				ecmaVersion: 2015,
			},
			env: {
				browser: false,
				node: true,
			},
		},
	],
};
