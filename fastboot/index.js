const FastBootAppServer = require('fastboot-app-server');
const FastBootWatchNotifier = require('fastboot-watch-notifier');
const config = require('./src/config.js');

const notifier = new FastBootWatchNotifier({
	debounceDelay: config.debounceDelay,
	distPath: config.distPath,
	saneOptions: Object.assign({}, config.saneOptions),
});

const server = new FastBootAppServer({
	distPath: config.distPath,
	gzip: config.gzip,
	host: config.host,
	port: config.port,
	sandboxGlobals: Object.assign({}, config.sandboxGlobals),
});

server.start();
