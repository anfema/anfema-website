/* eslint-env node */
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
	const app = new EmberApp(defaults, {
		postcssOptions: {
			compile: {
				enabled: false,
			},
			filter: {
				enabled: true,
				plugins: [
					{
						module: autoprefixer,
					},
					{
						module: mqpacker,
						options: {
							sort: true,
						},
					},
				],
			},
		},
	});

	return app.toTree();
};
