import Component from '@ember/component';

export default Component.extend({
	activeItemIndex: null,

	actions: {
		setActiveItemIndex(index) {
			this.set('activeItemIndex', index);
		},
	},
});
