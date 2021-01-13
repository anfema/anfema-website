import Component from '@ember/component';
import { action } from '@ember/object';

export default Component.extend({
	// data: null,
	// selected: null,

	activeItemIndex: null,

	actions: {
		setActiveItemIndex(index) {
			this.set('activeItemIndex', index);
		},
	},
});
