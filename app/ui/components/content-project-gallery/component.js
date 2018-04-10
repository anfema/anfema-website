import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	data: null,

	isVectorImages: computed('data.images', function() {
		return this.get('data.images.0').endsWith('.svg');
	}),

	images: computed('data.{images,defaults}', function() {
		const defaults = this.get('data.defaults');
		const imagesQty = this.get('data.images').length;
		let orientation = null;
		let layout = null;

		if (this.get('data.defaults').width > this.get('data.defaults').height) {
			orientation = 'landscape';
		} else {
			orientation = 'portrait';
		}

		if ((imagesQty === 1 || imagesQty === 5) && orientation === 'landscape') {
			layout = `${orientation}-${imagesQty}`;
		} else {
			layout = `${orientation}-default`;
		}

		return this.get('data.images').map((image, index) => {
			if (typeof image === 'string') {
				image = { url: image };
			}

			let thisLayout = layout;

			if (layout === 'landscape-5' || layout === 'portrait-default') {
				thisLayout = `${layout}-${index}`;
			}

			image = Object.assign(
				{
					alt: '',
					layout: thisLayout,
				},
				defaults,
				image
			);

			return image;
		});
	}),
});
