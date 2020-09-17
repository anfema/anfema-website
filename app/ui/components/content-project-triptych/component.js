import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, readOnly } from '@ember/object/computed';

export default Component.extend({
	data: null,

	classNameBindings: ['useAlternateColor:project-text--alt'],

	useAlternateColor: alias('data.useAlternateColor'),

	images: computed('data.{images,defaults}', function() {
		const defaults = this.get('data.defaults');

		return this.get('data.images').map(image => {
			if (typeof image === 'string') {
				image = { url: image };
			}

			image = Object.assign(
				{
					alt: '',
					width: 736,
					height: 552,
				},
				defaults,
				image
			);

			return image;
		});
	}),

	cover: readOnly('images.1'),
	sideImage1: readOnly('images.0'),
	sideImage2: readOnly('images.2'),
});
