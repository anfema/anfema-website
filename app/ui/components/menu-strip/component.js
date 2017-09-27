import Component from '@ember/component';

export default Component.extend({
	tagName: 'nav',
	classNames: ['menu-strip'],

	/** @type {object} */
	items: null,
});
