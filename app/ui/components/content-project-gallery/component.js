import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	data: null,

	images: computed('data.{images,defaults}', function() {
		const defaults = this.get('data.defaults');

		return this.get('data.images').map(image => {
			if (typeof image === 'string') {
				image = { url: image };
			}

			image = Object.assign(
				{
					alt: '',
				},
				defaults,
				image
			);

			return image;
		});
	}),
});
