import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	classNameBindings: [
		':content-slider-slide',
		'isActive:content-slider-slide--active',
	],

	content: null,
	activeContent: null,

	isActive: computed('content.id', 'selected', function () {
		return this.get('content.id') === this.get('selected');
	}),
});
