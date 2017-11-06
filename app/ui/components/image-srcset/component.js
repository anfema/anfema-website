import Component from '@ember/component';
import { computed } from '@ember/object';

// src="img_orange_flowers.jpg"
// alt="Flowers"
// sizes="(max-width: 30em) 100vw,
// 		(max-width: 50em) 50vw,
// 		calc(33vw - 100px)"
// srcset="{{image.src}} {{image.width}},
// 		http://via.placeholder.com/400x100 400w,
// 		http://via.placeholder.com/800x100 800w,
// 		http://via.placeholder.com/1600x100 1600w"

const breakpoints = [];

export default Component.extend({
	tagName: 'img',

	attributeBindings: ['src', 'alt', 'sizes', 'srcset', 'width', 'height', 'title'],

	// image: null,
	// defaults: null,

	alt: null,
	width: null,
	height: null,
	title: null,
	class: null,

	src: computed('image.src', function () {
		const image = this.get('image');
		let src = image;

		if (typeof image === 'object') {
			src = image.src;
		}

		if (Array.isArray(src)) {
			src = src[0];

			if (typeof src === 'string') {
				return src;
			}

			src = src.url;
		}

		return src;
	}),

	sizes: computed('defaults', 'image', function () {
		const defaultsSizes = this.get('defaults.sizes');
		const imageSizes = this.get('image.sizes');
		let sizes = imageSizes || defaultsSizes;

		const breakpoints = [
			'420px',
			'780px',
			'1300px',
			'1600px',
		];

		sizes = sizes.map((size, index) => `${breakpoints[index]} ${size}`);

		console.log(sizes);

		return sizes.join(' ');
	}),

	srcset: computed(function () {
		const image = this.get('image');
		let src = image;
		let url = '';
		let width = '';

		//1st case: src-array [url, width]
		if(Array.isArray(src)) {
			for(i = 1; i < src.length; i++) {
				src = src[i];

				//2nd case: src-string only
				if (typeof src === 'string') {
					return src;
				}

				// SCOPE!!!!!
				url = src.url;
				width = src.width;
				console.log('test', src[i]);
			}
		}

		// needs to return the combined srcset-string -> src1 width1, src2 width2, ...
		srcset = Object.assign({
			// scope!!! -> move this block
			url: url,
			width: width,
		}, src, srcset);

		return srcset;
	}),
});
