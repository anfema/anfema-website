/* eslint-env node */
const WatchedDir = require('broccoli-source').WatchedDir;
const funnel = require('broccoli-funnel');
const existsSync = require('exists-sync');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
const yaml = require('js-yaml');
const stringify = require('json-stable-stringify');

// TODO folders in public have to exist before writing process
// TODO WatchedDir working?
// TODO broccoli-caching-writer

module.exports = {
	name: 'static-content',
	addonOptions: {
		inputPath: 'contents/',
		outputPath: 'public/contents/',
	},
	inputPathAbs: null,
	outputPathAbs: null,
	contentsFolderExists: null,
	inputNode: null,
	encoding: 'utf8',

	isDevelopingAddon() {
		return true;
	},

	included(app) {
		this._super.included.apply(this, arguments);

		this.outputPathAbs = path.join(app.project.root, this.addonOptions.outputPath);
		this.inputPathAbs = path.join(app.project.root, this.addonOptions.inputPath);

		this.contentsFolderExists = existsSync(this.inputPathAbs);

		if (this.contentsFolderExists) {
			const watchedDir = new WatchedDir(this.inputPathAbs);

			this.inputNode = funnel(watchedDir, {
				include: ['**/*.yaml'],
			});
		} else {
			throw Error('Contents folder not found!');
		}
	},

	treeForPublic() {
		if (this.contentsFolderExists) {
			mkdirp.sync(this.outputPathAbs); // create output folder

			this.getAllFilesInDirectory(this.inputPathAbs).forEach((file) => {
				const inputFile = `${this.inputPathAbs}${file}`;
				const outputFile = `${this.outputPathAbs}${file.replace('.yaml', '.json')}`;

				this.ui.writeLine(`Convert to Json: ${inputFile}`);

				// write input file content to output file
				fs.writeFileSync(outputFile, this.readFileContent(inputFile), {
					encoding: this.encoding,
				});
			});
		}
	},

	readFileContent(filepath) {
		const data = fs.readFileSync(filepath);
		const jsonData = yaml.load(data, this.encoding);

		return stringify(jsonData); // return as string
	},

	getAllFilesInDirectory(dir, filelist, subFolder) {
		const files = fs.readdirSync(dir);

		filelist = filelist || [];
		subFolder = subFolder || '';
		files.forEach((file) => {
			if (fs.statSync(dir + file).isDirectory()) {
				subFolder += `${file}/`;
				filelist = this.getAllFilesInDirectory(`${dir}${subFolder}`, filelist, subFolder);
			} else {
				filelist.push(`${subFolder}${file}`);
			}
		});

		return filelist;
	},
};
