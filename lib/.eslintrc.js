module.exports = {
	extends: 'anfema/node',

	rules: {
		'import/no-unresolved': 'off',
	},

	globals: {
		FASTBOOT_DATA: true,
	},
};
