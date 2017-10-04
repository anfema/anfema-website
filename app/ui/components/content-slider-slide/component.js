import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	classNameBindings: ['isActive:content-slider-slide--active'],

	content: null,
	selected: null,

	isActive: computed('content.id', 'selected', function() {
		return this.get('content.id') === this.get('selected');
	}),
});
