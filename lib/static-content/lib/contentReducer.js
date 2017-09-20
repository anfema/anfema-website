const CachingWriter = require('broccoli-caching-writer');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const stringify = require('json-stable-stringify');

class ContentReducer extends CachingWriter {
	constructor(inputNode, options) {
		if (!Array.isArray(inputNode)) {
			inputNode = [inputNode];
		}

		super(inputNode, {
			annotation: 'Content Reducer',
		});

		this.options = Object.assign({
			outputPath: 'contents',
		}, options);
	}

	build() {
		const outputPath = path.join(this.outputPath, this.options.outputPath);

		mkdirp.sync(outputPath);

		// TODO: Generate index.json for each subfolder somehow
		const files = this._readDirectory();

		files.forEach((file) => {
			const targetPath = path.join(outputPath, file.relativePath);

			mkdirp.sync(targetPath);

			const filePath = path.join(targetPath, `${file.fileName}.json`);

			fs.writeFileSync(filePath, stringify(file.contents), { encoding: 'utf8' });
		});
	}

	_readDirectory() {
		return this.listEntries().map((entry) => {
			const { basePath, relativePath: relativePathWithFileName } = entry;

			const file = fs.readFileSync(path.join(basePath, relativePathWithFileName));
			const contents = yaml.load(file, 'utf8');

			const relativePath = path.dirname(relativePathWithFileName);
			const ext = path.extname(relativePathWithFileName);
			const basename = path.basename(relativePathWithFileName);
			const fileName = basename.substr(0, basename.length - ext.length);
			const matches = fileName.match(/(^\d*)(?:\.?)(.*)/);

			const strippedFileName = matches[2];

			let sortingKey = matches[1];

			if (sortingKey === '') {
				sortingKey = strippedFileName;
			}

			return {
				relativePath,
				sortingKey,
				fileName: strippedFileName,
				contents,
			};
		});
	}
}

module.exports = ContentReducer;
