module.exports = {
	extends: 'anfema/ember',

	rules: {
		'no-console': 'off',
		'import/no-anonymous-default-export': 'off',
	},

	overrides: [
		{
			files: ['testem.js', 'ember-cli-build.js', 'config/**/*.js', 'lib/*/index.js', '.template-lintrc.js'],
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
