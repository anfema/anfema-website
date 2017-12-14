const CachingWriter = require('broccoli-caching-writer');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const stringify = require('json-stable-stringify');
const Remarkable = require('remarkable');

const md = new Remarkable('full');

function deepMap(obj, valueTransform = value => value, keyTransform = key => key, ctx = null) {
	if (obj !== null && Array.isArray(obj)) {
		return obj.map((val, key) => {
			return typeof val === 'object'
				? deepMap(val, valueTransform, keyTransform, ctx)
				: valueTransform.call(ctx, val, key);
		});
	}

	if (obj !== null && typeof obj === 'object') {
		const res = {};

		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				const val = obj[key];
				const transformedKey = keyTransform(key);

				if (typeof val === 'object') {
					res[transformedKey] = deepMap(val, valueTransform, keyTransform, ctx);
				} else {
					res[transformedKey] = valueTransform.call(ctx, val, key);
				}
			}
		}

		return res;
	}

	return obj;
}

function listFilesByDirectory(files) {
	return files.reduce((directories, entry) => {
		const { relativePath } = entry;

		directories[relativePath] = directories[relativePath] || [];

		directories[relativePath].push(entry);

		return directories;
	}, {});
}

function writeFile(dir, fileName, content) {
	mkdirp.sync(dir);

	const filePath = path.join(dir, fileName);

	fs.writeFileSync(filePath, content, { encoding: 'utf8' });
}

function joinUrl(...items) {
	return path
		.join(...items)
		.split(path.sep)
		.join('/');
}

class ContentReducer extends CachingWriter {
	constructor(inputNode, options) {
		if (!Array.isArray(inputNode)) {
			inputNode = [inputNode];
		}

		super(inputNode, {
			annotation: 'Content Reducer',
		});

		this.options = options;
	}

	build() {
		const outputPath = path.join(this.outputPath, this.options.outputPath);

		mkdirp.sync(outputPath);

		const directories = listFilesByDirectory(this._readFiles());

		const store = {};

		Object.keys(directories).forEach(relativePath => {
			const files = directories[relativePath];
			let index = { files: [] };

			files.forEach(file => {
				const fileName = `${file.fileName}.json`;
				const fileMeta = (file.contents && file.contents.meta) || {};

				if (file.fileName !== 'index') {
					const meta = {
						file: fileName,
						sorting: file.sortingKey,
					};

					if (fileMeta) {
						meta.meta = fileMeta;
					}

					index.files.push(meta);

					writeFile(
						path.join(outputPath, file.relativePath),
						fileName,
						stringify(file.contents)
					);

					store[joinUrl(this.options.outputPath, file.relativePath, fileName)] =
						file.contents;
				} else {
					index = Object.assign({}, file.contents, index);
				}
			});

			writeFile(path.join(outputPath, relativePath), 'index.json', stringify(index));

			store[joinUrl(this.options.outputPath, relativePath, 'index.json')] = index;
		});

		writeFile(outputPath, 'fastboot-data.js', `const FASTBOOT_DATA = ${stringify(store)}`);
	}

	_readFiles() {
		return this.listEntries().map(entry => {
			const { basePath, relativePath: relativePathWithFileName } = entry;
			const file = fs.readFileSync(path.join(basePath, relativePathWithFileName));
			const contents = this._transformContents(file);
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

	_transformContents(contents) {
		contents = yaml.load(contents, 'utf8');

		contents = deepMap(
			contents,
			(value, key) => {
				if (
					key &&
					typeof key === 'string' &&
					key.match(/:markdown$/) &&
					typeof value === 'string'
				) {
					return md.render(value);
				}

				return value;
			},
			key => key.replace(/:markdown$/, '')
		);

		// /* eslint-disable no-invalid-this */
		// contents = traverse(contents).map(function transform(value) {

		// });
		// /* eslint-enable no-invalid-this */

		return contents;
	}
}

module.exports = ContentReducer;
