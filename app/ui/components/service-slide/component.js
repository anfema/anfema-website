import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	classNameBindings: ['isActive:content-slider-slide--active'],

	data: undefined,
	selected: false,
});
