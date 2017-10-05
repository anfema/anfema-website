import Component from '@ember/component';

export default Component.extend({
	tagName: 'nav',
	classNames: ['menu-strip'],

	/** @type {object[]} */
	items: null,
	/** @type {object} */
	selected: undefined,

	onChange: undefined,

	actions: {
		onItemSelected(item) {
			if (this.onChange && this.selected !== item) {
				this.onChange(item);
			}
		}
	}
});
