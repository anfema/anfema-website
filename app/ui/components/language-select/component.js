import Ember from 'ember';
import { inject } from '@ember/service';

export default Ember.Component.extend({
	intl: inject(),

	actions: {
		setLocale(locale) {
			this.get('intl').setLocale(locale);
		},
	},
});
