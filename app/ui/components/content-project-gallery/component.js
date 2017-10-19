import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
	data: null,

	defaults: alias('data.defaults'),

	imageSrcsetDefaults: computed('data.defaults.image-srcset', function () {
		let srcsetDefaults = this.get('data.defaults.image-srcset');

		const defaults = Object.assign({
			sizes: [
				'100vw',
				'100vw',
				'50vw',
				'50vw',
			]
		}, srcsetDefaults);

		return defaults;
	}),

	imageSizes: null,

	images: computed('data.{images,defaults}', function() {
		const defaults = this.get('data.defaults');

		return this.get('data.images').map(image => {
			if (typeof image === 'string') {
				image = { url: image };
			}

			image = Object.assign({
				alt: '',
				width: 736,
				height: 543,
			}, defaults, image);

			return image;
		});
	}),

	init() {
		this._super(...arguments);

		this.get('imageSizes', []);
	}
});
