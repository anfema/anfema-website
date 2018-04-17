import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default Component.extend({
	intl: service(),

	classNames: ['h-card'],

	year: new Date().getFullYear(),

	language: alias('intl.locale.0'),
});
