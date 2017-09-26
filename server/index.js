const FastBootAppServer = require('fastboot-app-server');
const config = require('./src/config.js');

const server = new FastBootAppServer({
	distPath: config.distPath,
	gzip: config.gzip,
	host: config.host,
	port: config.port,
	sandboxGlobals: Object.assign({}, config.sandboxGlobals, {}),
});

server.start();
