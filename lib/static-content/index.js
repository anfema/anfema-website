/* eslint-env node */
const WatchedDir = require('broccoli-source').WatchedDir;
const funnel = require('broccoli-funnel');
const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const fs = require('fs');

const ContentReducer = require('./lib/contentReducer.js');

module.exports = {
	name: 'static-content',
	addonOptions: {
		inputPath: 'contents/',
		outputPath: 'contents/',
	},
	inputPathAbs: null,
	outputPathAbs: null,
	inputNode: null,

	isDevelopingAddon() {
		return true;
	},

	included(app) {
		this._super.included.apply(this, arguments);

		// set global variables
		this.outputPathAbs = path.join(app.project.root, this.addonOptions.outputPath);
		this.inputPathAbs = path.join(app.project.root, this.addonOptions.inputPath);

		// watch input directory
		if (fs.existsSync(this.inputPathAbs)) {
			const watchedDir = new WatchedDir(this.inputPathAbs);

			this.inputNode = funnel(watchedDir, {
				include: ['**/*.yaml', '**/*.yml'],
			});
		} else {
			throw new Error('Contents folder not found!');
		}
	},

	updateFastBootManifest(manifest) {
		manifest.vendorFiles.push('/contents/fastboot-data.js');

		return manifest;
	},

	treeForPublic() {
		const trees = [];

		trees.push(this.reduceContents());

		return mergeTrees(trees, { overwrite: true });
	},

	reduceContents() {
		return new ContentReducer([this.inputNode], {
			inputPath: this.addonOptions.inputPath,
			outputPath: this.addonOptions.outputPath,
			inputPathAbsolute: this.inputPathAbs,
			outputPathAbsolute: this.outputPathAbs,
		});
	},
};
