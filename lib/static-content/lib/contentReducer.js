const CachingWriter = require('broccoli-caching-writer');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const extend = require('extend');
const stringify = require('json-stable-stringify');

class ContentReducer extends CachingWriter {
	constructor(inputNode, options) {
		if (!Array.isArray(inputNode)) {
			inputNode = [inputNode];
		}
		super(inputNode, {
			annotation: 'Content Reducer',
		});
		this.options = Object.assign(
			{
				log() {
				},
			},
			options
		);
	}

	readDirectory(inputPath, listFiles) {
		const that = this;

		return listFiles.reduce((contents, contentPath) => {
			if (fs.statSync(contentPath).isDirectory()) {
				return contents;
			}
			const data = fs.readFileSync(contentPath);

			const content = yaml.load(data, 'utf8');

			if (!content) {
				that._log(`cannot read path "${contentPath}"`);

				return contents;
			}

			const basename = path.basename(contentPath).split('.')[0];
			const keyedContent = {};

			keyedContent[that[basename]] = content;

			return extend(true, contents, keyedContent);
		}, {});
	}

	filename(key) {
		if (typeof this.options.filename === 'function') {
			return this.options.filename(key);
		}

		return `${key}.json`;
	}

	build() {
		const outputPath = this.options.outputPathAbsolute;
		const contents = this.readDirectory(this.inputPaths[0], this.listFiles());

		mkdirp.sync(outputPath);
		// TODO remove undefined from json output
		Object.keys(contents.undefined).forEach((fName) => {
			const content = contents.undefined[fName];
			// TODO @f.pichler other way to generate subfolders?
			const subFolder = `${content.dir}/`;

			mkdirp.sync(outputPath + subFolder);

			fs.writeFileSync(`${outputPath}${subFolder}${this.filename(fName)}`, stringify(content), { encoding: 'utf8' });
		});
	}
}

module.exports = ContentReducer;
