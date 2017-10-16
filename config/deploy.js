/* eslint-env node */
const fs = require('fs');

module.exports = function(deployTarget) {
	const ENV = {
		build: {},
		scp: {},
	};

	if (deployTarget === 'development') {
		ENV.build.environment = 'production';

		ENV['simply-ssh'] = {
			connection: {
				username: 'homepage',
				host: 'banana.anfema.net',
				privateKey: fs.readFileSync('.travis/id_rsa').toString(),
			},
			dir: '/home/homepage/site',
			keep: 10,
		};
	}

	if (deployTarget === 'production') {
		ENV.build.environment = 'production';
		// configure other plugins for production deploy target here
	}

	return ENV;
};
