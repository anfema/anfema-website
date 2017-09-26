const rc = require('rc');

module.exports = rc('anfema-website-server', {
	distPath: 'dist',
	gzip: true,
	host: '127.0.0.1',
	port: 4000,
	sandboxGlobals: {},
});
