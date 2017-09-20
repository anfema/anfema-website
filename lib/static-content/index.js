/* eslint-env node */
const WatchedDir = require('broccoli-source').WatchedDir;
const funnel = require('broccoli-funnel');
const existsSync = require('exists-sync');
const path = require('path');
const mergeTrees = require('broccoli-merge-trees');

const ContentReducer = require('./lib/contentReducer.js');

module.exports = {
	name: 'static-content',
	addonOptions: {
		inputPath: 'contents/',
		outputPath: 'contents/',
	},
	inputPathAbs: null,
	outputPathAbs: null,
	contentsFolderExists: null,
	inputNode: null,

	isDevelopingAddon() {
		return true;
	},

	included(app) {
		this._super.included.apply(this, arguments);

		// set global variables
		this.outputPathAbs = path.join(app.project.root, this.addonOptions.outputPath);
		this.inputPathAbs = path.join(app.project.root, this.addonOptions.inputPath);
		this.contentsFolderExists = existsSync(this.inputPathAbs);

		// watch input directory
		if (this.contentsFolderExists) {
			const watchedDir = new WatchedDir(this.inputPathAbs);

			this.inputNode = funnel(watchedDir, {
				include: ['**/*.yaml', '**/*.yml'],
			});
		} else {
			throw Error('Contents folder not found!');
		}
	},

	treeForPublic() {
		const trees = [];

		trees.push(this.reduceContents());

		return mergeTrees(trees, { overwrite: true });
	},

	reduceContents() {
		return new ContentReducer([this.inputNode], Object.assign({}, this.addonOptions, {
			outputPathAbsolute: this.outputPathAbs,
			inputPathAbsolute: this.inputPathAbs,
		}));
	},
};
