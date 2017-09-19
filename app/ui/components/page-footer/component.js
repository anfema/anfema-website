import Component from '@ember/component';

export default Component.extend({
	classNames: ['page-footer', 'h-card'],

	year: new Date().getFullYear(),
});
