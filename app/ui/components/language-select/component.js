import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { equal, readOnly } from '@ember/object/computed';

export default Component.extend({
	classNames: ['language-select'],

	intl: service(),

	locale: readOnly('intl.locale.0'),

	isEn: equal('locale', 'en'),
	isDe: equal('locale', 'de'),

	actions: {
		setLocale(locale) {
			this.get('intl').setLocale(locale);
		},
	},
});
