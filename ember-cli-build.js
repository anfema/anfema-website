/* eslint-env node */
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
	const app = new EmberApp(defaults, {
		fingerprint: {
			exclude: ['contents/fastboot-data.js', 'favicon.ico'],
			extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'woff', 'woff2', 'eot'],
			replaceExtensions: ['html', 'css', 'js', 'xml'],
		},
		'ember-cli-uglify': {
			exclude: ['contents/fastboot-data.js'],
		},
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

	app.import('node_modules/fontfaceonload/dist/fontfaceonload.js', {
		using: [{ transformation: 'amd', as: 'font-face-onload' }],
	});

	return app.toTree();
};
