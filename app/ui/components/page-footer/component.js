import Component from '@ember/component';

export default Component.extend({
	classNames: ['h-card'],

	year: new Date().getFullYear(),
});
