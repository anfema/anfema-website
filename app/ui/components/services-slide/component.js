import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	classNameBindings: ['isActive:services-slide--active'],

	// data: null,

	selected: false,
});
