/* eslint-env node */
const WatchedDir = require('broccoli-source').WatchedDir;
const funnel = require('broccoli-funnel');
const existsSync = require('exists-sync');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
const yaml = require('js-yaml');
const stringify = require('json-stable-stringify');

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
		this.createStaticContent();
	},

	createStaticContent() {
		if (this.contentsFolderExists) {
			mkdirp.sync(this.outputPathAbs); // create new output folder

			// get file structure from input path and generate folder structure in output path
			const inputImage = this.getAllFilesInDirectory(this.inputPathAbs);

			this.ui.writeLine(`input: ${inputImage}`);

			inputImage.forEach((file) => {
				// get input and output file names
				const inputFile = `${this.inputPathAbs}${file}`;
				const outputFile = `${this.outputPathAbs}${this.fileNameToJson(file)}`;

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

	getAllFilesInDirectory(dir, filelist, subFolders) { // TODO replace this with broccoli
		if (!fs.existsSync(dir)) {
			dir = dir.slice(0, dir.lastIndexOf('/'));
			dir = dir.slice(0, dir.lastIndexOf('/'));
			dir = dir.slice(0, dir.lastIndexOf('/') + 1);
			dir += subFolders.slice(subFolders.indexOf('/') + 1, subFolders.length);
			dir += subFolders;
		}
		const files = fs.readdirSync(dir);

		filelist = filelist || [];
		subFolders = subFolders || '';
		files.forEach((file) => {
			if (fs.statSync(dir + file).isDirectory()) {
				subFolders += `${file}/`;
				mkdirp(`${this.outputPathAbs}${file}`); // create folders in output path
				filelist.concat(this.getAllFilesInDirectory(`${dir}${subFolders}`, filelist, subFolders));
			} else {
				this.ui.writeLine(`push: ${`${subFolders}${file}`}`);
				filelist.push(`${subFolders}${file}`);
			}
		});

		return filelist;
	},

	fileNameToJson(file) {
		file = file.replace('.yml', '.json');
		file = file.replace('.yaml', '.json');

		return file;
	},
};
