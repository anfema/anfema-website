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
		this.options = Object.assign(options);
	}

	readDirectory(listFiles) {
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

	build() {
		const outputPath = this.options.outputPathAbsolute;
		const contents = this.readDirectory(this.listFiles());

		mkdirp.sync(outputPath);

		Object.keys(contents.undefined).forEach((fileName) => {
			const content = contents.undefined[fileName]; // TODO remove undefined from json output
			const subFolder = `${content.dir}/`; // TODO @f.pichler other way to generate subfolders?

			mkdirp.sync(outputPath + subFolder);

			fs.writeFileSync(`${outputPath}${subFolder}${fileName}.json`, stringify(content), { encoding: 'utf8' });
		});
	}
}

module.exports = ContentReducer;
