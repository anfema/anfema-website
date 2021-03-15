'use strict';

module.exports = {
	extends: 'recommended', // octane
	rules: {
		'no-bare-strings': true,
		'attribute-indentation': false,
		'block-indentation': 'tab',
		'no-triple-curlies': false, // remove with ticket #353
	},
};
